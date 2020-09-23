import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import SettingsPanel from "./SettingsPanel";
import { FormTextField } from "../../common/components/textfields";
import MonthlyInterruption from "../../monthly_interruption/MonthlyInterruption";

type MonthlyInterruptionPanelProps = {};

const MonthlyInterruptionPanel: React.FunctionComponent<MonthlyInterruptionPanelProps> = (
  props
) => {
  const { ...others } = props;

  const [durationCol, setDurationCol] = useState(0);
  const [dateCol, setDateCol] = useState(0);
  const [feederCol, setFeederCol] = useState(0);
  const [dateFormat, setDateFormat] = useState("");

  useEffect(() => {
    let settings = MonthlyInterruption.loadSettings();
    setDurationCol(settings.durationCol);
    setDateCol(settings.dateCol);
    setFeederCol(settings.feederCol);
    setDateFormat(settings.dateFormat);
  }, []);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    MonthlyInterruption.saveSettings({
      dateCol,
      durationCol,
      feederCol,
      dateFormat,
    });

    alert("Monthly Interruption Settings Saved");
  }

  function handleDurationColChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setDurationCol(Number(event.target.value));
  }

  function handleDateColChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setDateCol(Number(event.target.value));
  }

  function handleDateFormatChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setDateFormat(event.target.value);
  }

  function handleFeederColChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setFeederCol(Number(event.target.value));
  }

  return (
    <SettingsPanel onSubmit={handleSubmit}>
      <FormTextField
        label="Feeder Column#"
        placeholder="Feeder Column#"
        value={dateCol}
        type="number"
        onChange={handleFeederColChange}
        helpertext="the column# of the feeder value, note: column starts at 0"
      />

      <FormTextField
        label="Duration Column#"
        placeholder="Duration Column#"
        value={durationCol}
        type="number"
        onChange={handleDurationColChange}
        helpertext="the column# of the duration value, note: column starts at 0"
      />
      <FormTextField
        label="Date Column#"
        placeholder="Date Column#"
        value={dateCol}
        type="number"
        onChange={handleDateColChange}
        helpertext="the column# of the date value, note: column starts at 0"
      />

      <FormTextField
        label="Date Format"
        placeholder="Date Format"
        value={dateFormat}
        onChange={handleDateFormatChange}
        helpertext="(MM/DD/YYYY) = '09/22/2020', (MMMM/DD/YYYY) = 'September/22/2020'  "
      />
    </SettingsPanel>
  );
};

export default MonthlyInterruptionPanel;
