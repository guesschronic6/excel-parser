import React, { createContext, useEffect, useState } from "react";
import Stack from "../../objects/common/Stack";
import {
  MonthlyInterruptionObject,
  MonthlyInterruptionRawData,
} from "../../objects/monthly_interruption/types";
import MonthlyInterruption from "../../objects/monthly_interruption/MonthlyInterruption";

export type MonthlyMonthlyInterruptionData = Map<
  string,
  Map<string, MonthlyInterruptionObject>
>;

export type MonthlyInterruptionUpdatecallback = (
  data: MonthlyMonthlyInterruptionData
) => void;

type MonthlyInterruptionContextProps = {
  addNewRawData: (rawDatas: MonthlyInterruptionRawData[]) => void;
  monthlyInterruptions: MonthlyMonthlyInterruptionData;
  addUpdateCallback: (callback: MonthlyInterruptionUpdatecallback) => void;
};

const MonthlyIterruptionContext = createContext<
  MonthlyInterruptionContextProps
>({
  addNewRawData: ([]) => {},
  monthlyInterruptions: new Map<
    string,
    Map<string, MonthlyInterruptionObject>
  >(),
  addUpdateCallback: () => {},
});

type MonthlyInterruptionContextProviderProps = {};

const MonthlyInterruptionContextProvider: React.FunctionComponent<MonthlyInterruptionContextProviderProps> = (
  props
) => {
  const [monthlyInterruptions, setMonthlyInterruptions] = useState<
    Map<string, Map<string, MonthlyInterruptionObject>>
  >(new Map());

  const [updateCallbacks, setUpdateCallbacks] = useState<
    MonthlyInterruptionUpdatecallback[]
  >([]);

  const [buffer, setBuffer] = useState<Stack<MonthlyInterruptionRawData[]>>(
    new Stack()
  );

  useEffect(() => {
    updateCallbacks.forEach((callback) => {
      callback(monthlyInterruptions);
    });
  }, [monthlyInterruptions]);

  useEffect(() => {
    async function update() {
      console.log("Checking if buffer is not empty...");
      if (!buffer.isEmpty()) {
        try {
          console.log("Buffer isn ot empty...");
          console.log(buffer);
          let rawDatas = buffer.pop();
          let result = await updateMonthlyInterruptions(
            rawDatas as MonthlyInterruptionRawData[]
          );
          console.log(result);
          setMonthlyInterruptions(result);
          setBuffer(new Stack(buffer));
        } catch (e) {
          console.log(e);
        }
      }
    }
    update();
  }, [buffer]);

  function addNewRawData(rawdatas: MonthlyInterruptionRawData[]) {
    setBuffer((prevBuffer) => {
      console.log("Pushing to buffer....");
      prevBuffer.push(rawdatas);
      return new Stack(prevBuffer);
    });
  }

  function updateMonthlyInterruptions(rawDatas: MonthlyInterruptionRawData[]) {
    return new Promise<MonthlyMonthlyInterruptionData>((resolve, reject) => {
      console.log("Updating Monthly Interruptions....");
      let newMonthlyInterruptions = new Map(monthlyInterruptions);

      for (let rawData of rawDatas) {
        console.log("Parsing raw data:");
        let billingKey = rawData.billingPeriod.toString();
        if (!newMonthlyInterruptions.has(billingKey)) {
          newMonthlyInterruptions.set(billingKey, new Map());
        }
        let monthlyInterruptionsMap = newMonthlyInterruptions.get(
          billingKey
        ) as Map<string, MonthlyInterruptionObject>;
        if (!monthlyInterruptionsMap.has(rawData.feeder)) {
          monthlyInterruptionsMap.set(
            rawData.feeder,
            MonthlyInterruption.createObject(rawData)
          );
        } else {
          let object = monthlyInterruptionsMap.get(
            rawData.feeder
          ) as MonthlyInterruptionObject;
          MonthlyInterruption.utils.addToObject(rawData, object);
        }
      }
      resolve(newMonthlyInterruptions);
    });
  }

  function addUpdateCallback(callBack: MonthlyInterruptionUpdatecallback) {
    setUpdateCallbacks((prevCallbacks) => {
      return [...prevCallbacks, callBack];
    });
  }

  return (
    <MonthlyIterruptionContext.Provider
      value={{ addNewRawData, monthlyInterruptions, addUpdateCallback }}
    >
      {props.children}
    </MonthlyIterruptionContext.Provider>
  );
};

export default MonthlyInterruptionContextProvider;
export { MonthlyIterruptionContext };
