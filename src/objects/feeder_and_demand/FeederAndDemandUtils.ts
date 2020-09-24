import BillingPeriod from "../common/BillingPeriod";

function calculateOperatingHours(hours: number, billingPeriod: BillingPeriod) {
  return billingPeriod.getTotalDays() * 24 - hours;
}

export { calculateOperatingHours };
