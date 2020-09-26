import React, { createContext, useContext, useEffect, useState } from "react";
import MonthlyPowerTransformerLoss from "./MonthlyPowerTransformerLoss";
import { PowerSubstationContext } from "../power_substation/PowerSubstationContextProvider";
import MonthlyPowerSubstation from "../../objects/power_substation/MonthlyPowerSubstation";
import PowerTransformerLossItem from "./PowerTransformerLossItem";
import BillingPeriod from "../../objects/common/BillingPeriod";

type PowerTransformerLossContextProviderProps = {};

const tempPowerTransformerLoss = new MonthlyPowerTransformerLoss();

const PowerTransformerLossContext = createContext({
  monthlyPowerTransformerLoss: tempPowerTransformerLoss,
  onPowerTransformerLossItemChanged: (
    item: PowerTransformerLossItem,
    billingPeriod: BillingPeriod
  ) => {},
});

const PowerTransformerLossContextProvider: React.FunctionComponent<PowerTransformerLossContextProviderProps> = (
  props
) => {
  const powerSubstationContext = useContext(PowerSubstationContext);

  const [
    monthlyPowerTransformerLoss,
    setMonthlyPowerTransformerLoss,
  ] = useState(tempPowerTransformerLoss);

  const [buffer, setBuffer] = useState<
    (
      | MonthlyPowerSubstation
      | { item: PowerTransformerLossItem; billingPeriod: BillingPeriod }
    )[]
  >([]);

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

      if ((data as MonthlyPowerSubstation).powerSubstations) {
        addPowerSubstationDataToTransformerLoss(
          data as MonthlyPowerSubstation
        ).then((result) => {
          setMonthlyPowerTransformerLoss(result);
          setBuffer(newBuffer);
        });
      } else {
        replacePowerTransformerLossItem(
          data as {
            item: PowerTransformerLossItem;
            billingPeriod: BillingPeriod;
          }
        ).then((result) => {
          setMonthlyPowerTransformerLoss(result);
          setBuffer(newBuffer);
        });
      }
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

  function replacePowerTransformerLossItem(item: {
    item: PowerTransformerLossItem;
    billingPeriod: BillingPeriod;
  }) {
    return new Promise<MonthlyPowerTransformerLoss>((resolve, reject) => {
      console.log("Updating PowerTransformerLoss....");
      console.log({ item });
      let newData = new MonthlyPowerTransformerLoss(
        monthlyPowerTransformerLoss
      );

      newData.replacePowerTransformerLossItem(item.item, item.billingPeriod);

      resolve(newData);
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

  function onPowerTransformerLossItemChanged(
    item: PowerTransformerLossItem,
    billingPeriod: BillingPeriod
  ) {
    setBuffer((prevBuffer) => [...prevBuffer, { item, billingPeriod }]);
  }

  return (
    <PowerTransformerLossContext.Provider
      value={{ monthlyPowerTransformerLoss, onPowerTransformerLossItemChanged }}
    >
      {props.children}
    </PowerTransformerLossContext.Provider>
  );
};

export default PowerTransformerLossContextProvider;
export { PowerTransformerLossContext };
