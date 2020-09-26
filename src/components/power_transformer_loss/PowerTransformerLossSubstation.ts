import Substation, {
  SubstationItem,
} from "../../objects/common/enums/Substation";
import PowerSubstationItem from "../../objects/power_substation/PowerSubstationItem";
import PowerTransformerLossItem from "./PowerTransformerLossItem";
import GeneralUtil from "../../objects/common/GeneralUtil";

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

  addPowerSubstationData(data: PowerSubstationItem) {
    console.log(
      "finding substation item of: " +
        data.feeder +
        " from: " +
        this.substation.key
    );
    let substationItem = GeneralUtil.findSubstationItemOfFeeder(
      data.feeder,
      this.substation
    );
    if (substationItem) {
      console.log("substation item found: " + substationItem.toString());
      this.addIfNotExists(substationItem);
      this.substationItems
        .get(this.generateKey(substationItem))
        ?.addPowerSubstatoinData(data);
    } else {
      console.log("sbustation item not found :<");
    }
  }

  private addIfNotExists(substationItem: SubstationItem) {
    let key = this.generateKey(substationItem);
    if (!this.substationItems.has(key)) {
      this.substationItems.set(
        key,
        new PowerTransformerLossItem(substationItem, this.operatingHours)
      );
    }
  }

  private generateKey(substationItem: SubstationItem) {
    return this.substation.key + substationItem.transformer.key;
  }
}
export default PowerTransformerLossSubstation;
