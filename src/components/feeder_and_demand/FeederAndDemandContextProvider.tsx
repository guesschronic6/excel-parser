import React, { createContext, useEffect, useState } from "react";
import { MonthlyInterruptionRawData } from "../monthly_interruption/types";
import { PowerSubstationRawData } from "../power_substation/types";
import FeederAndDemandUtil from "./FeederAndDemandUtil";
import { MonthlyFeederAndDemand } from "./objects";

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
  onMonthlyInterruptionFileRemoved: (fileName: string) => {},
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
    if (buffer.length > 0) {
      processBufferDatas();
    } else {
      let newMonthlyFeederAndDemand = new MonthlyFeederAndDemand(
        monthlyFeederAndDemand
      );
      newMonthlyFeederAndDemand.initValues();
      setMonthlyFeederAndDemand(newMonthlyFeederAndDemand);
    }
  }, [buffer]);

  async function processBufferDatas() {
    let newBuffer = [...buffer];
    let data = newBuffer.pop();
    if (data) {
      let result: MonthlyFeederAndDemand = new MonthlyFeederAndDemand(
        monthlyFeederAndDemand
      );
      if ((data as { data: Data; fileName: string }).data) {
        data = data as { data: Data; fileName: string };
        if (data.data == Data.MonthlyInterruptionData) {
          result = await FeederAndDemandUtil.removeMonthlyInterruptionFileAsync(
            data.fileName,
            result
          );
        } else {
          result = await FeederAndDemandUtil.removePowerSubstationFileAsync(
            data.fileName,
            result
          );
        }
      } else if (Array.isArray(data)) {
        if (data.length > 0) {
          if ((data as PowerSubstationRawData[])[0].kvarhrEnergy) {
            result = await FeederAndDemandUtil.addPowerSubstationRawDataAsync(
              data as PowerSubstationRawData[],
              result
            );
          } else {
            result = await FeederAndDemandUtil.addMonthlyInterruptionRawDataAsync(
              data as MonthlyInterruptionRawData[],
              result
            );
          }
        }
      }
      setMonthlyFeederAndDemand(result);
      setBuffer([...newBuffer]);
    }
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
  function onMonthlyInterruptionFileRemoved(fileName: string) {
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
        onMonthlyInterruptionFileRemoved,
        onPowerSubstationDataFileRemoved,
      }}
    >
      {props.children}
    </FeederAndDemandContext.Provider>
  );
};

export default FeederAndDemandContextProvider;

export { FeederAndDemandContext };
