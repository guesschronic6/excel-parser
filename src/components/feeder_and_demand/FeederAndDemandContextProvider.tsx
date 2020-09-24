import React, { createContext, useContext, useEffect, useState } from "react";
import Stack from "../../objects/common/Stack";
import MonthlyFeederAndDemand from "../../objects/feeder_and_demand/MonthlyFeederAndDemand";
import { MonthlyInterruptionObject } from "../../objects/monthly_interruption/types";
import {
  MonthlyIterruptionContext,
  MonthlyMonthlyInterruptionData,
} from "../monthly_interruption/MonthlyInterruptionContextProvider";
import {
  MonthlyPowerSubstationData,
  PowerSubstationContext,
} from "../power_substation/PowerSubstationContextProvider";

type FeederAndDemandContextProviderProps = {};

const FeederAndDemandContext = createContext({});

const FeederAndDemandContextProvider: React.FunctionComponent<FeederAndDemandContextProviderProps> = (
  props
) => {
  const powerSubstationContext = useContext(PowerSubstationContext);
  const monthlyInterruptionCotnext = useContext(MonthlyIterruptionContext);

  const [buffer, setBuffer] = useState<
    Stack<MonthlyPowerSubstationData | MonthlyMonthlyInterruptionData>
  >(new Stack());
  const [monthlyFeederAndDemand, setMonthlyFeederAndDemand] = useState<
    MonthlyFeederAndDemand
  >(new MonthlyFeederAndDemand());

  useEffect(() => {
    powerSubstationContext.addUpdateCallback(onMonthlyPowerSubstationUpdated);
    monthlyInterruptionCotnext.addUpdateCallback(onMonthlyInterruptionUpdated);
  }, []);

  useEffect(() => {}, [buffer]);

  function onMonthlyPowerSubstationUpdated(data: MonthlyPowerSubstationData) {
    console.log("MonthlyPowerSubstationData Updated...");
    setBuffer((prevBuffer) => {
      prevBuffer.push(data);
      return new Stack(prevBuffer);
    });
  }

  function onMonthlyInterruptionUpdated(data: MonthlyMonthlyInterruptionData) {
    console.log("MonthlyPower Interruption data Updated...");
    setBuffer((prevBuffer) => {
      prevBuffer.push(data);
      return new Stack(prevBuffer);
    });
  }

  return (
    <FeederAndDemandContext.Provider value={{}}>
      {props.children}
    </FeederAndDemandContext.Provider>
  );
};

export default FeederAndDemandContextProvider;

export { FeederAndDemandContext };
