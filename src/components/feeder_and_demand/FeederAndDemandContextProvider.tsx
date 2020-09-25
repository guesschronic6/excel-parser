import React, { createContext, useContext, useEffect, useState } from "react";
import MonthlyFeederAndDemand from "../../objects/feeder_and_demand/MonthlyFeederAndDemand";
import MonthlyMonthlyInterruption from "../../objects/monthly_interruption/MonthlyMonthlyInterruption";
import MonthlyPowerSubstation from "../../objects/power_substation/MonthlyPowerSubstation";
import { MonthlyIterruptionContext } from "../monthly_interruption/MonthlyInterruptionContextProvider";
import { PowerSubstationContext } from "../power_substation/PowerSubstationContextProvider";

type FeederAndDemandContextProviderProps = {};

const tempMfd = new MonthlyFeederAndDemand();

const FeederAndDemandContext = createContext({
  monthlyFeederAndDemand: new MonthlyFeederAndDemand(),
});

const FeederAndDemandContextProvider: React.FunctionComponent<FeederAndDemandContextProviderProps> = (
  props
) => {
  const powerSubstationContext = useContext(PowerSubstationContext);
  const monthlyInterruptionCotnext = useContext(MonthlyIterruptionContext);

  const [buffer, setBuffer] = useState<
    (MonthlyPowerSubstation | MonthlyMonthlyInterruption)[]
  >([]);
  const [monthlyFeederAndDemand, setMonthlyFeederAndDemand] = useState<
    MonthlyFeederAndDemand
  >(tempMfd);

  useEffect(() => {
    powerSubstationContext.addUpdateCallback(onMonthlyPowerSubstationUpdated);
    monthlyInterruptionCotnext.addUpdateCallback(onMonthlyInterruptionUpdated);
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
        if ((data as MonthlyPowerSubstation).powerSubstations) {
          result = await addMonthlyPowerSubstationData(
            data as MonthlyPowerSubstation,
            result
          );
        } else {
          result = await addMonthlyMonthlyInterruptionData(
            data as MonthlyMonthlyInterruption,
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

  function addMonthlyPowerSubstationData(
    data: MonthlyPowerSubstation,
    mfd: MonthlyFeederAndDemand
  ) {
    return new Promise<MonthlyFeederAndDemand>((resolve, reject) => {
      for (let mps of data.powerSubstations.values()) {
        let billingPeriod = mps.billingPeriod;
        for (let ps of mps.items.values()) {
          mfd.addPowerSubstationData(ps, billingPeriod);
        }
      }
      resolve(mfd);
    });
  }

  function addMonthlyMonthlyInterruptionData(
    data: MonthlyMonthlyInterruption,
    mfd: MonthlyFeederAndDemand
  ) {
    return new Promise<MonthlyFeederAndDemand>((resolve, reject) => {
      for (let mmi of data.monthlyInterruptions.values()) {
        let billingPeriod = mmi.billingPeriod;
        for (let mi of mmi.items.values()) {
          mfd.addMonthlyInterruptionData(mi, billingPeriod);
        }
      }
      resolve(mfd);
    });
  }

  function onMonthlyPowerSubstationUpdated(data: MonthlyPowerSubstation) {
    console.log("MonthlyPowerSubstationData Updated...");
    setBuffer((prevBuffer) => [...prevBuffer, data]);
  }

  function onMonthlyInterruptionUpdated(data: MonthlyMonthlyInterruption) {
    console.log("MonthlyPower Interruption data Updated...");
    setBuffer((prevBuffer) => [...prevBuffer, data]);
  }

  return (
    <FeederAndDemandContext.Provider
      value={{
        monthlyFeederAndDemand,
      }}
    >
      {props.children}
    </FeederAndDemandContext.Provider>
  );
};

export default FeederAndDemandContextProvider;

export { FeederAndDemandContext };
