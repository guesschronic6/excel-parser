import React, { createContext, useContext, useEffect, useState } from "react";
import MonthlyPowerTransformerLoss from "./MonthlyPowerTransformerLoss";
import MonthlyPowerSubstation from "../../objects/power_substation/MonthlyPowerSubstation";
import PowerTransformerLossItem from "./PowerTransformerLossItem";
import BillingPeriod from "../../objects/common/BillingPeriod";
import { PowerSubstationRawData } from "../../objects/power_substation/types";

type PowerTransformerLossContextProviderProps = {};

const tempPowerTransformerLoss = new MonthlyPowerTransformerLoss();

const PowerTransformerLossContext = createContext({
  monthlyPowerTransformerLoss: tempPowerTransformerLoss,
  onPowerTransformerLossItemChanged: (
    item: PowerTransformerLossItem,
    billingPeriod: BillingPeriod
  ) => {},
  onPowerSubstationFileParsed: (rawDatas: PowerSubstationRawData[]) => {},
  onPowerSubstationFileRemoved: (flieName: string) => {},
});

const PowerTransformerLossContextProvider: React.FunctionComponent<PowerTransformerLossContextProviderProps> = (
  props
) => {
  const [
    monthlyPowerTransformerLoss,
    setMonthlyPowerTransformerLoss,
  ] = useState(tempPowerTransformerLoss);

  const [buffer, setBuffer] = useState<
    (
      | PowerSubstationRawData[]
      | { item: PowerTransformerLossItem; billingPeriod: BillingPeriod }
      | string
    )[]
  >([]);

  useEffect(() => {
    console.log({
      method: "useEffect()",
      message: "Buffer  length is: " + buffer.length,
    });
    if (buffer.length > 0) {
      let newBuffer = [...buffer];
      let data = newBuffer.pop();

      if (
        (data as {
          item: PowerTransformerLossItem;
          billingPeriod: BillingPeriod;
        }).item
      ) {
        replacePowerTransformerLossItem(
          data as {
            item: PowerTransformerLossItem;
            billingPeriod: BillingPeriod;
          }
        ).then((result) => {
          setMonthlyPowerTransformerLoss(result);
          setBuffer(newBuffer);
        });
      } else if (Array.isArray(data)) {
        addRawPowerSubstationData(data as PowerSubstationRawData[]).then(
          (result) => {
            setMonthlyPowerTransformerLoss(result);
            setBuffer(newBuffer);
          }
        );
      } else {
        removePowerSubstationData(data as string).then((result) => {
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

  function removePowerSubstationData(fileName: string) {
    return new Promise<MonthlyPowerTransformerLoss>((resolve, reject) => {
      let newData = new MonthlyPowerTransformerLoss(
        monthlyPowerTransformerLoss
      );
      newData.removePowerSubstationData(fileName);

      resolve(newData);
    });
  }

  function onPowerSubstationFileParsed(rawDatas: PowerSubstationRawData[]) {
    setBuffer((prevBuffer) => [...prevBuffer, rawDatas]);
  }

  function addRawPowerSubstationData(rawDatas: PowerSubstationRawData[]) {
    return new Promise<MonthlyPowerTransformerLoss>((resolve, reject) => {
      console.log("Updating PowerTransformerLoss....");
      let newData = new MonthlyPowerTransformerLoss(
        monthlyPowerTransformerLoss
      );
      rawDatas.forEach((rawData) => {
        newData.addRawPowerSubstationData(rawData);
      });

      resolve(newData);
    });
  }

  function onPowerSubstationFileRemoved(fileName: string) {
    setBuffer((prevBuffer) => [...prevBuffer, fileName]);
  }

  function onPowerTransformerLossItemChanged(
    item: PowerTransformerLossItem,
    billingPeriod: BillingPeriod
  ) {
    setBuffer((prevBuffer) => [...prevBuffer, { item, billingPeriod }]);
  }

  return (
    <PowerTransformerLossContext.Provider
      value={{
        monthlyPowerTransformerLoss,
        onPowerTransformerLossItemChanged,
        onPowerSubstationFileParsed,
        onPowerSubstationFileRemoved,
      }}
    >
      {props.children}
    </PowerTransformerLossContext.Provider>
  );
};

export default PowerTransformerLossContextProvider;
export { PowerTransformerLossContext };
