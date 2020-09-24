import React, { createContext, useEffect, useMemo, useState } from "react";
import Stack from "../../objects/common/Stack";
import { MonthlyInterruptionRawData } from "../../objects/monthly_interruption/types";
import MonthlyInterruption from "../../objects/monthly_interruption/MonthlyInterruption";
import MonthlyMonthlyInterruption from "../../objects/monthly_interruption/MonthlyMonthlyInterruption";

export type MonthlyInterruptionUpdatecallback = (
  data: MonthlyMonthlyInterruption
) => void;

type MonthlyInterruptionContextProps = {
  addNewRawData: (rawDatas: MonthlyInterruptionRawData[]) => void;
  monthlyInterruptions: MonthlyMonthlyInterruption;
  addUpdateCallback: (callback: MonthlyInterruptionUpdatecallback) => void;
};

const MonthlyIterruptionContext = createContext<
  MonthlyInterruptionContextProps
>({
  addNewRawData: ([]) => {},
  monthlyInterruptions: new MonthlyMonthlyInterruption(),
  addUpdateCallback: () => {},
});

type MonthlyInterruptionContextProviderProps = {};

const MonthlyInterruptionContextProvider: React.FunctionComponent<MonthlyInterruptionContextProviderProps> = (
  props
) => {
  const [monthlyInterruptions, setMonthlyInterruptions] = useState<
    MonthlyMonthlyInterruption
  >();

  const [updateCallbacks, setUpdateCallbacks] = useState<
    MonthlyInterruptionUpdatecallback[]
  >([]);

  const [buffer, setBuffer] = useState<Stack<MonthlyInterruptionRawData[]>>(
    new Stack()
  );

  useEffect(() => {
    setMonthlyInterruptions(new MonthlyMonthlyInterruption());
  }, []);
  useEffect(() => {
    updateCallbacks.forEach((callback) => {
      callback(monthlyInterruptions as MonthlyMonthlyInterruption);
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
    return new Promise<MonthlyMonthlyInterruption>((resolve, reject) => {
      console.log("Updating Monthly Interruptions....");
      let newMonthlyInterruptions = new MonthlyMonthlyInterruption(
        monthlyInterruptions
      );

      for (let rawData of rawDatas) {
        newMonthlyInterruptions.addRawData(rawData);
      }
      resolve(newMonthlyInterruptions);
    });
  }

  function addUpdateCallback(callBack: MonthlyInterruptionUpdatecallback) {
    setUpdateCallbacks((prevCallbacks) => {
      return [...prevCallbacks, callBack];
    });
  }

  return monthlyInterruptions ? (
    <MonthlyIterruptionContext.Provider
      value={{ addNewRawData, monthlyInterruptions, addUpdateCallback }}
    >
      {props.children}
    </MonthlyIterruptionContext.Provider>
  ) : (
    <></>
  );
};

export default MonthlyInterruptionContextProvider;
export { MonthlyIterruptionContext };
