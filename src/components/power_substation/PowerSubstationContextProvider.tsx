import React, { createContext, useEffect, useState } from "react";
import Stack from "../../objects/common/Stack";
import {
  PowerSubstationObject,
  PowerSubstationRawData,
} from "../../objects/power_substation/types";
import PowerSubstation from "../../objects/power_substation/PowerSubstation";

export type PowerSubstationUpdateCallback = (
  data: MonthlyPowerSubstationData
) => void;

export type MonthlyPowerSubstationData = {
  map: Map<string, Map<string, PowerSubstationObject>>;
  monthlyPowerSubstation: string;
};

type PowerSubstationContextProps = {
  addNewRawDatas: (rawDatas: PowerSubstationRawData[]) => void;
  monthlyPowerSubstations: MonthlyPowerSubstationData;
  addUpdateCallback: (callback: PowerSubstationUpdateCallback) => void;
};
const PowerSubstationContext = createContext<PowerSubstationContextProps>({
  addNewRawDatas: ([]) => {},
  monthlyPowerSubstations: { map: new Map(), monthlyPowerSubstation: "omar" },
  addUpdateCallback: () => {},
});

type PowerSubstationContextProviderProps = {};

const PowerSubstationContextProvider: React.FunctionComponent<PowerSubstationContextProviderProps> = (
  props
) => {
  const [monthlyPowerSubstations, setMonthlyPowerSubstations] = useState<
    MonthlyPowerSubstationData
  >({ map: new Map(), monthlyPowerSubstation: "omar" });
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
      callback(monthlyPowerSubstations);
    });
  }, [monthlyPowerSubstations]);

  function updateMonhlyPowerSubstation(
    rawDatas: PowerSubstationRawData[]
  ): Promise<MonthlyPowerSubstationData> {
    return new Promise((resolve, reject) => {
      let newMonthlyPowerSubstations: MonthlyPowerSubstationData = {
        map: new Map(monthlyPowerSubstations.map),
        monthlyPowerSubstation: "omar",
      };

      for (let rawData of rawDatas) {
        let billingKey = rawData.billingPeriod.toString();
        if (!newMonthlyPowerSubstations.map.has(billingKey)) {
          newMonthlyPowerSubstations.map.set(billingKey, new Map());
        }

        let powerSubstation = newMonthlyPowerSubstations.map.get(
          billingKey
        ) as Map<string, PowerSubstationObject>;
        powerSubstation.set(
          rawData.feeder,
          PowerSubstation.createObject(rawData)
        );
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
      value={{ addNewRawDatas, monthlyPowerSubstations, addUpdateCallback }}
    >
      {props.children}
    </PowerSubstationContext.Provider>
  );
};

export default PowerSubstationContextProvider;
export { PowerSubstationContext };
