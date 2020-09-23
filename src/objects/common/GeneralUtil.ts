import Feeder from "./enums/Feeder";

function findFeeder(feederText: String): string | null {
  feederText = feederText.toUpperCase();
  for (let feeder of Object.values(Feeder)) {
    if (feeder.toUpperCase() === feederText) {
      return feeder;
    }
  }

  return null;
}

export { findFeeder };
