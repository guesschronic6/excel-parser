import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import SettingsPanel from "./SettingsPanel";
import { FormTextField } from "../../common/components/textfields";
import {
  savePowerSubstationSettings,
  loadPowerSubstationSettings,
} from "../../power_substation/PowerSubstationLocalStorage";

type PowerSubstationPanelProps = {};

const PowerSubstationPanel: React.FunctionComponent<PowerSubstationPanelProps> = (
  props
) => {
  const { ...others } = props;

  const [demandCol, setDemandCol] = useState(0);
  const [kwhrEnergyCol, setKwhrEnergyCol] = useState(0);
  const [feederCol, setFeederCol] = useState(0);
  const [kvarhrEnergyCol, setKvarhrEnergyCol] = useState(0);

  useEffect(() => {
    let settings = loadPowerSubstationSettings();
    setDemandCol(settings.demandKwhrCol);
    setKwhrEnergyCol(settings.kwhrEnergyCol);
    setFeederCol(settings.feederCol);
    setKvarhrEnergyCol(settings.kvarhrEnergyCol);
  }, []);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    savePowerSubstationSettings({
      kwhrEnergyCol,
      demandKwhrCol: demandCol,
      feederCol,
      kvarhrEnergyCol,
    });

    alert("Power Substation Settings Saved");
  }

  function handleDemandChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setDemandCol(Number(event.target.value));
  }

  function handleKvarhrEnergyChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setKvarhrEnergyCol(Number(event.target.value));
  }

  function handleFeederColChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setFeederCol(Number(event.target.value));
  }

  function handleKwhrEnergyChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setKwhrEnergyCol(Number(event.target.value));
  }

  return (
    <SettingsPanel onSubmit={handleSubmit}>
      <FormTextField
        label="Kwhr Energy Column#"
        placeholder="Kwhr Energy Column#"
        value={kwhrEnergyCol}
        type="number"
        onChange={handleKwhrEnergyChange}
        helpertext="the column# of the kwhr energy value, note: column starts at 0"
      />

      <FormTextField
        label="Demand Column#"
        placeholder="Demand Column#"
        value={demandCol}
        type="number"
        onChange={handleDemandChange}
        helpertext="the column# of the demand value, note: column starts at 0"
      />
      <FormTextField
        label="Kvarhr Energy Column#"
        placeholder="Kvarhr Energy Column#"
        value={kvarhrEnergyCol}
        type="number"
        onChange={handleKvarhrEnergyChange}
        helpertext="the column# of the kvarhr value, note: column starts at 0"
      />

      <FormTextField
        label="Feeder Column#"
        placeholder="Feeder Column#"
        value={feederCol}
        onChange={handleFeederColChange}
        type="number"
        helpertext="the column# of the feeder value, note: column starts at 0 "
      />
    </SettingsPanel>
  );
};

export default PowerSubstationPanel;
