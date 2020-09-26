import React, { createContext, useEffect, useState } from "react";
import MonthlyFeederAndDemand from "./MonthlyFeederAndDemand";
import { MonthlyInterruptionRawData } from "../../objects/monthly_interruption/types";
import { PowerSubstationRawData } from "../../objects/power_substation/types";

type FeederAndDemandContextProviderProps = {};

const tempMfd = new MonthlyFeederAndDemand();

enum Data {
  MonthlyInterruptionData,
  PowerSubstationData,
}

const FeederAndDemandContext = createContext({
  monthlyFeederAndDemand: new MonthlyFeederAndDemand(),
  onMonthlyInterruptionOrPowerSubstationFileParsed: (
    rawDatas: MonthlyInterruptionRawData[] | PowerSubstationRawData[]
  ) => {},
  onPowerSubstationDataFileRemoved: (fileName: string) => {},
  onMonthlyInterruptionDataFileRemoved: (fileName: string) => {},
});

const FeederAndDemandContextProvider: React.FunctionComponent<FeederAndDemandContextProviderProps> = (
  props
) => {
  const [buffer, setBuffer] = useState<
    (
      | PowerSubstationRawData[]
      | MonthlyInterruptionRawData[]
      | { data: Data; fileName: string }
    )[]
  >([]);
  const [monthlyFeederAndDemand, setMonthlyFeederAndDemand] = useState<
    MonthlyFeederAndDemand
  >(tempMfd);

  useEffect(() => {
    setMonthlyFeederAndDemand(new MonthlyFeederAndDemand());
  }, []);

  useEffect(() => {
    console.log(monthlyFeederAndDemand);
  }, [monthlyFeederAndDemand]);

  useEffect(() => {
    async function updateMonthlyFeederAndDemand() {
      let newBuffer = [...buffer];
      let data = newBuffer.pop();
      if (data) {
        let result: MonthlyFeederAndDemand = new MonthlyFeederAndDemand(
          monthlyFeederAndDemand
        );
        if ((data as { data: Data; fileName: string }).data) {
          data = data as { data: Data; fileName: string };
          if (data.data == Data.MonthlyInterruptionData) {
            result = await removeMonthlyInterruptionData(data.fileName, result);
          } else {
            result = await removePowerSubstationData(data.fileName, result);
          }
        } else if ((data as PowerSubstationRawData[])[0]) {
          result = await addRawPowerSubstationData(
            data as PowerSubstationRawData[],
            result
          );
        } else {
          result = await addRawMonthlyInterruptionData(
            data as MonthlyInterruptionRawData[],
            result
          );
        }
        setMonthlyFeederAndDemand(result);
        setBuffer([...newBuffer]);
      }
    }
    if (buffer.length <= 0) {
      let newMonthlyFeederAndDemand = new MonthlyFeederAndDemand(
        monthlyFeederAndDemand
      );
      newMonthlyFeederAndDemand.initValues();
      setMonthlyFeederAndDemand(newMonthlyFeederAndDemand);
    } else {
      updateMonthlyFeederAndDemand();
    }
  }, [buffer]);

  function addRawPowerSubstationData(
    rawDatas: PowerSubstationRawData[],
    mfd: MonthlyFeederAndDemand
  ) {
    return new Promise<MonthlyFeederAndDemand>((resolve, reject) => {
      console.log("Adding power substation raw datas...");
      rawDatas.forEach((rawData) => {
        mfd.addRawPowerSubstationData(rawData);
      });
      resolve(mfd);
    });
  }

  function addRawMonthlyInterruptionData(
    rawDatas: MonthlyInterruptionRawData[],
    mfd: MonthlyFeederAndDemand
  ) {
    return new Promise<MonthlyFeederAndDemand>((resolve, reject) => {
      rawDatas.forEach((rawData) => {
        mfd.addRawMonthlyInterruptionData(rawData);
      });
      resolve(mfd);
    });
  }

  function removeMonthlyInterruptionData(
    fileName: string,
    mfd: MonthlyFeederAndDemand
  ) {
    return new Promise<MonthlyFeederAndDemand>((resolve, reject) => {
      mfd.removeMonthlyInterruptionDataByFilename(fileName);
      resolve(mfd);
    });
  }
  function removePowerSubstationData(
    fileName: string,
    mfd: MonthlyFeederAndDemand
  ) {
    return new Promise<MonthlyFeederAndDemand>((resolve, reject) => {
      mfd.removePowerSubstationDataByFilename(fileName);
      resolve(mfd);
    });
  }

  function onMonthlyInterruptionOrPowerSubstationFileParsed(
    rawDatas: MonthlyInterruptionRawData[] | PowerSubstationRawData[]
  ) {
    setBuffer((prevBuffer) => [...prevBuffer, rawDatas]);
  }

  function onPowerSubstationDataFileRemoved(fileName: string) {
    setBuffer((prevBuffer) => [
      ...prevBuffer,
      { data: Data.PowerSubstationData, fileName },
    ]);
  }
  function onMonthlyInterruptionDataFileRemoved(fileName: string) {
    setBuffer((prevBuffer) => [
      ...prevBuffer,
      { data: Data.MonthlyInterruptionData, fileName },
    ]);
  }

  return (
    <FeederAndDemandContext.Provider
      value={{
        monthlyFeederAndDemand,
        onMonthlyInterruptionOrPowerSubstationFileParsed,
        onMonthlyInterruptionDataFileRemoved,
        onPowerSubstationDataFileRemoved,
      }}
    >
      {props.children}
    </FeederAndDemandContext.Provider>
  );
};

export default FeederAndDemandContextProvider;

export { FeederAndDemandContext };
