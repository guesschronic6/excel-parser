import { PowerSubstationSettings } from "./types";

enum PowerSubstationSettingsKey {
  FEEDER = "ps_feeder",
  DEMAND = "ps_demand",
  KWHRENERGY = "ps_kwhrenergy",
  KVARHRENERGY = "ps_kvarhrenergy",
}

function savePowerSubstationSettings(settings: PowerSubstationSettings) {
  localStorage.setItem(
    PowerSubstationSettingsKey.DEMAND,
    settings.demandKwhrCol.toString()
  );
  localStorage.setItem(
    PowerSubstationSettingsKey.FEEDER,
    settings.feederCol.toString()
  );
  localStorage.setItem(
    PowerSubstationSettingsKey.KWHRENERGY,
    settings.kwhrEnergyCol.toString()
  );
  localStorage.setItem(
    PowerSubstationSettingsKey.KVARHRENERGY,
    settings.kvarhrEnergyCol.toString()
  );
}

function loadPowerSubstationSettings(): PowerSubstationSettings {
  return {
    kvarhrEnergyCol:
      Number(localStorage.getItem(PowerSubstationSettingsKey.KVARHRENERGY)) ||
      0,
    kwhrEnergyCol:
      Number(localStorage.getItem(PowerSubstationSettingsKey.KWHRENERGY)) || 1,
    demandKwhrCol:
      Number(localStorage.getItem(PowerSubstationSettingsKey.DEMAND)) || 2,
    feederCol:
      Number(localStorage.getItem(PowerSubstationSettingsKey.FEEDER)) || 3,
  };
}

export { savePowerSubstationSettings, loadPowerSubstationSettings };
