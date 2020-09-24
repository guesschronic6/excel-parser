import BillingPeriod from "../common/BillingPeriod";
import { FeederAndDemandObject } from "./types";

function calculateOperatingHours(hours: number, billingPeriod: BillingPeriod) {
  return billingPeriod.getTotalDays() * 24 - hours;
}

function createObject(
  feeder: string,
  kwhrEnergy: number,
  demandKwhr: number,
  kvarhrEnergy: number,
  minutes: number,
  billingPeriod: BillingPeriod
): FeederAndDemandObject {
  let hours = (minutes / 60) * 100;
  let operatingHours = calculateOperatingHours(hours, billingPeriod);
  let powerFactor = Math.cos(Math.atan(kvarhrEnergy / kwhrEnergy)) * 100;
  let loadFactor = kwhrEnergy / operatingHours / demandKwhr;
  return {
    feeder,
    feederInput: kwhrEnergy,
    demand: demandKwhr,
    minutes,
    hours,
    operatingHours,
    loadFactor,
    powerFactor,
  };
}

export { calculateOperatingHours, createObject };
