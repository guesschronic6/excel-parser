import Feeder from "./enums/Feeder";

function findFeeder(feederText: String): string | null {
  feederText = feederText.toUpperCase();
  for (let feeder in Object.values(Feeder)) {
    if (isNaN(Number(feeder)) && feeder.toUpperCase() === feederText)
      return feeder;
  }
  return null;
}

export { findFeeder };
