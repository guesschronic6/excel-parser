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
  onFileRemoved: (fileName: string) => void;
};

const MonthlyIterruptionContext = createContext<
  MonthlyInterruptionContextProps
>({
  addNewRawData: ([]) => {},
  monthlyInterruptions: new MonthlyMonthlyInterruption(),
  addUpdateCallback: () => {},
  onFileRemoved: (fileName: string) => {},
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

  const [buffer, setBuffer] = useState<
    (MonthlyInterruptionRawData[] | string)[]
  >([]);

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
      if (buffer.length > 0) {
        try {
          console.log("Buffer isn ot empty...");
          console.log(buffer);
          let data = buffer.pop() as unknown;

          if ((data as MonthlyInterruptionRawData[]).length) {
            let result = await updateMonthlyInterruptions(
              data as MonthlyInterruptionRawData[]
            );
            setMonthlyInterruptions(result);
          } else {
            let result = await removeFile(data as string);
            setMonthlyInterruptions(result);
          }
          setBuffer([...buffer]);
        } catch (e) {
          console.log(e);
        }
      }
    }
    update();
  }, [buffer]);

  function addNewRawData(rawdatas: MonthlyInterruptionRawData[]) {
    setBuffer((prevBuffer) => [...prevBuffer, rawdatas]);
  }

  function removeFile(fileName: string) {
    return new Promise<MonthlyMonthlyInterruption>((resolve, reject) => {
      let newMonthlyInterruptions = new MonthlyMonthlyInterruption(
        monthlyInterruptions
      );
      newMonthlyInterruptions.removeFile(fileName);
      resolve(newMonthlyInterruptions);
    });
  }

  function onFileRemoved(fileName: string) {
    setBuffer((prevBuffer) => [...prevBuffer, fileName]);
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
      value={{
        addNewRawData,
        monthlyInterruptions,
        addUpdateCallback,
        onFileRemoved,
      }}
    >
      {props.children}
    </MonthlyIterruptionContext.Provider>
  ) : (
    <></>
  );
};

export default MonthlyInterruptionContextProvider;
export { MonthlyIterruptionContext };
