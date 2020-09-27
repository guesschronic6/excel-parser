import React, { createContext, useEffect, useState } from "react";
import {
  PowerTransformerLossItem,
  MonthlyPowerTransformerLoss,
} from "./objects";
import { BillingPeriod } from "../common/object";
import { PowerSubstationRawData } from "../power_substation/types";
import PowerTransformerLossUtil from "./PowerTransformerLossUtil";

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
        let d = data as {
          item: PowerTransformerLossItem;
          billingPeriod: BillingPeriod;
        };
        PowerTransformerLossUtil.replacePowerTransformerLossItemAsync(
          d.item,
          d.billingPeriod,
          monthlyPowerTransformerLoss
        ).then((result) => {
          setMonthlyPowerTransformerLoss(
            new MonthlyPowerTransformerLoss(result)
          );
          setBuffer(newBuffer);
        });
      } else if (Array.isArray(data)) {
        PowerTransformerLossUtil.addPowerSubstatoinRawDatasAsync(
          data as PowerSubstationRawData[],
          monthlyPowerTransformerLoss
        ).then((result) => {
          setMonthlyPowerTransformerLoss(
            new MonthlyPowerTransformerLoss(result)
          );
          setBuffer(newBuffer);
        });
      } else {
        PowerTransformerLossUtil.removePowerSubstationFileAsync(
          data as string,
          monthlyPowerTransformerLoss
        ).then((result) => {
          setMonthlyPowerTransformerLoss(
            new MonthlyPowerTransformerLoss(result)
          );
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

  function onPowerSubstationFileParsed(rawDatas: PowerSubstationRawData[]) {
    setBuffer((prevBuffer) => [...prevBuffer, rawDatas]);
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
