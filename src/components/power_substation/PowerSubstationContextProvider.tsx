import React, { createContext, useEffect, useState } from "react";
import Stack from "../../objects/common/Stack";
import { PowerSubstationRawData } from "../../objects/power_substation/types";
import MonthlyPowerSubstation from "../../objects/power_substation/MonthlyPowerSubstation";

export type PowerSubstationUpdateCallback = (
  data: MonthlyPowerSubstation
) => void;

type PowerSubstationContextProps = {
  addNewRawDatas: (rawDatas: PowerSubstationRawData[]) => void;
  monthlyPowerSubstation: MonthlyPowerSubstation;
  addUpdateCallback: (callback: PowerSubstationUpdateCallback) => void;
};
const PowerSubstationContext = createContext<PowerSubstationContextProps>({
  addNewRawDatas: ([]) => {},
  monthlyPowerSubstation: new MonthlyPowerSubstation(),
  addUpdateCallback: () => {},
});

type PowerSubstationContextProviderProps = {};

const PowerSubstationContextProvider: React.FunctionComponent<PowerSubstationContextProviderProps> = (
  props
) => {
  const [monthlyPowerSubstation, setMonthlyPowerSubstations] = useState<
    MonthlyPowerSubstation
  >(new MonthlyPowerSubstation());
  const [buffer, setBuffer] = useState<Stack<PowerSubstationRawData[]>>(
    new Stack()
  );

  const [updatecallbacks, setUpdateCallbacks] = useState<
    PowerSubstationUpdateCallback[]
  >([]);
  useEffect(() => {
    async function doSomething() {
      console.log("checking if buffer is empty...");
      if (!buffer.isEmpty()) {
        let rawData = buffer.pop();
        let result = await updateMonhlyPowerSubstation(
          rawData as PowerSubstationRawData[]
        );
        console.log(result);
        setMonthlyPowerSubstations(result);
        setBuffer(new Stack(buffer));
      } else {
        console.log("buffer is empty");
      }
    }

    doSomething();
  }, [buffer]);

  useEffect(() => {
    updatecallbacks.forEach((callback) => {
      callback(monthlyPowerSubstation);
    });
  }, [monthlyPowerSubstation]);

  function updateMonhlyPowerSubstation(
    rawDatas: PowerSubstationRawData[]
  ): Promise<MonthlyPowerSubstation> {
    return new Promise((resolve, reject) => {
      let newMonthlyPowerSubstations = new MonthlyPowerSubstation(
        monthlyPowerSubstation
      );

      for (let rawData of rawDatas) {
        newMonthlyPowerSubstations.addRawData(rawData);
      }
      resolve(newMonthlyPowerSubstations);
    });
  }

  function addNewRawDatas(rawDatas: PowerSubstationRawData[]) {
    setBuffer((prevBuffer) => {
      prevBuffer.push(rawDatas);
      return new Stack(prevBuffer);
    });
  }

  function addUpdateCallback(callback: PowerSubstationUpdateCallback) {
    setUpdateCallbacks((prevCallbacks) => [...prevCallbacks, callback]);
  }

  return (
    <PowerSubstationContext.Provider
      value={{ addNewRawDatas, monthlyPowerSubstation, addUpdateCallback }}
    >
      {props.children}
    </PowerSubstationContext.Provider>
  );
};

export default PowerSubstationContextProvider;
export { PowerSubstationContext };
