import React, { createContext, useContext, useEffect, useState } from "react";
import MonthlyPowerTransformerLoss from "./MonthlyPowerTransformerLoss";
import { PowerSubstationContext } from "../power_substation/PowerSubstationContextProvider";
import MonthlyPowerSubstation from "../../objects/power_substation/MonthlyPowerSubstation";

type PowerTransformerLossContextProviderProps = {};

const tempPowerTransformerLoss = new MonthlyPowerTransformerLoss();

const PowerTransformerLossContext = createContext({
  monthlyPowerTransformerLoss: tempPowerTransformerLoss,
});

const PowerTransformerLossContextProvider: React.FunctionComponent<PowerTransformerLossContextProviderProps> = (
  props
) => {
  const powerSubstationContext = useContext(PowerSubstationContext);

  const [
    monthlyPowerTransformerLoss,
    setMonthlyPowerTransformerLoss,
  ] = useState(tempPowerTransformerLoss);

  const [buffer, setBuffer] = useState<MonthlyPowerSubstation[]>([]);

  useEffect(() => {
    powerSubstationContext.addUpdateCallback(onMonthlyPowerSubstationUpdated);
  }, []);

  useEffect(() => {
    console.log({
      method: "useEffect()",
      message: "Buffer  length is: " + buffer.length,
    });
    if (buffer.length > 0) {
      let newBuffer = [...buffer];
      let data = newBuffer.pop();
      addPowerSubstationDataToTransformerLoss(
        data as MonthlyPowerSubstation
      ).then((result) => {
        setMonthlyPowerTransformerLoss(result);
        setBuffer(newBuffer);
      });
    } else {
      initPowerTransformerLossValues().then((result) => {
        setMonthlyPowerTransformerLoss(result);
      });
    }
  }, [buffer]);

  useEffect(() => {
    console.log({ monthlyPowerTransformerLoss });
  }, [monthlyPowerTransformerLoss]);

  function onMonthlyPowerSubstationUpdated(
    monthlyPowerSubstation: MonthlyPowerSubstation
  ) {
    console.log("Monthly Power Substation Added....");
    setBuffer((prevBuffer) => [...prevBuffer, monthlyPowerSubstation]);
  }

  function initPowerTransformerLossValues() {
    return new Promise<MonthlyPowerTransformerLoss>((resolve, reject) => {
      let newPlts = new MonthlyPowerTransformerLoss(
        monthlyPowerTransformerLoss
      );
      newPlts.initValues();
      resolve(newPlts);
    });
  }

  function addPowerSubstationDataToTransformerLoss(
    monthlyPowerSubstation: MonthlyPowerSubstation
  ) {
    return new Promise<MonthlyPowerTransformerLoss>((resolve, reject) => {
      console.log("Updating PowerTransformerLoss....");
      let newData = new MonthlyPowerTransformerLoss(
        monthlyPowerTransformerLoss
      );

      for (let powerSubstation of monthlyPowerSubstation.powerSubstations.values()) {
        for (let item of powerSubstation.items.values()) {
          newData.addPowerSubstationData(item, powerSubstation.billingPeriod);
        }
      }

      resolve(newData);
    });
  }

  return (
    <PowerTransformerLossContext.Provider
      value={{ monthlyPowerTransformerLoss }}
    >
      {props.children}
    </PowerTransformerLossContext.Provider>
  );
};

export default PowerTransformerLossContextProvider;
export { PowerTransformerLossContext };
