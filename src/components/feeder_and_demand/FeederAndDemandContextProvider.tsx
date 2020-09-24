import React, { createContext, useContext, useEffect, useState } from "react";
import MonthlyFeederAndDemand from "../../objects/feeder_and_demand/MonthlyFeederAndDemand";
import MonthlyMonthlyInterruption from "../../objects/monthly_interruption/MonthlyMonthlyInterruption";
import MonthlyPowerSubstation from "../../objects/power_substation/MonthlyPowerSubstation";
import { MonthlyIterruptionContext } from "../monthly_interruption/MonthlyInterruptionContextProvider";
import { PowerSubstationContext } from "../power_substation/PowerSubstationContextProvider";

type FeederAndDemandContextProviderProps = {};

const FeederAndDemandContext = createContext({});

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
  >();

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
      console.log("Updating monthly feeder and demand");
      let newBuffer = [...buffer];
      let data = newBuffer.pop();
      console.log({ data });
      if (data) {
        let result: MonthlyFeederAndDemand = new MonthlyFeederAndDemand(
          monthlyFeederAndDemand
        );
        if ((data as MonthlyPowerSubstation).powerSubstations) {
          console.log("Adding Monthly Power Substation Data...");
          result = await addMonthlyPowerSubstationData(
            data as MonthlyPowerSubstation,
            result
          );
        } else {
          console.log("Adding Monthly MOnthly interruption Data...");
          result = await addMonthlyMonthlyInterruptionData(
            data as MonthlyMonthlyInterruption,
            result
          );
        }
        setMonthlyFeederAndDemand(result);
        setBuffer([...newBuffer]);
      }
    }
    console.log("Checking if buffer is not empty...");
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
      console.log({
        message: "Monthly Feeder And Demand to be updated: ",
        mfd,
      });

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
      console.log({
        message: "Monthly Feeder And Demand to be updated: ",
        mfd,
      });

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
    <FeederAndDemandContext.Provider value={{}}>
      {props.children}
    </FeederAndDemandContext.Provider>
  );
};

export default FeederAndDemandContextProvider;

export { FeederAndDemandContext };
