import { Substation, SubstationItem } from "../../common/object";
import PowerTransformerLossItem from "./PowerTransformerLossItem";

class PowerTransformerLossSubstation {
  substation: Substation;
  //key = substation.key + transformer.key
  substationItems: Map<string, PowerTransformerLossItem>;
  operatingHours: number;
  constructor(substation: Substation, operatingHours: number) {
    this.substation = substation;
    this.substationItems = new Map();
    this.operatingHours = operatingHours;
  }

  replacePowerTransformerLossItem(item: PowerTransformerLossItem) {
    this.substationItems.set(this.generateKey(item.substationItem), item);
  }

  addIfNotExistsOrElseGet(substationItem: SubstationItem) {
    let key = this.generateKey(substationItem);
    if (!this.substationItems.has(key)) {
      this.substationItems.set(
        key,
        new PowerTransformerLossItem(substationItem, this.operatingHours)
      );
    }
    return this.substationItems.get(key) as PowerTransformerLossItem;
  }

  generateKey(substationItem: SubstationItem) {
    return this.substation.key + substationItem.transformer.key;
  }
}
export default PowerTransformerLossSubstation;
