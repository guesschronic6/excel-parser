import { expect } from "chai";
import GeneralUtil from "../src/objects/common/GeneralUtil";
import Substation from "../src/objects/common/enums/Substation";
import Feeder from "../src/objects/common/enums/Feeder";

describe("Local State", () => {
  it("Substation Should be SANJOSE_GUSU", () => {
    expect(GeneralUtil.findSubstationOfFeeder(Feeder.SAN_JOSE)).to.equal(
      Substation.SANJOSE_GUSU
    );
  });
});
