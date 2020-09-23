import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";

import { LoadProfileStorage } from "../../loadprofile";
import SettingsPanel from "./SettingsPanel";
import { FormTextField } from "../../common/components/textfields";

type LoadProfileSettingsProps = {};

const LoadProfileSettingsPanel: React.FunctionComponent<LoadProfileSettingsProps> = ({
  ...others
}) => {
  const [kwdel, setKwdel] = useState(0);
  const [khwdel, setKwhdel] = useState(0);
  const [date, setDate] = useState(0);
  const [time, setTime] = useState(0);
  const [dateFormat, setDateFormat] = useState("");
  const [timeFormat, setTimeFormat] = useState("");

  useEffect(() => {
    let lpSettings = LoadProfileStorage.loadSettings();
    setKwdel(lpSettings.kwdelCol);
    setKwhdel(lpSettings.kwhdelCol);
    setDateFormat(lpSettings.dateFormat);
    setDate(lpSettings.dateCol);
    setTime(lpSettings.timeCol);
    setTimeFormat(lpSettings.timeFormat);
  }, []);

  function handleKwdelChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setKwdel(Number(event.target.value));
  }

  function handleKwhdelChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setKwhdel(Number(event.target.value));
  }

  function handleDateChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setDate(Number(event.target.value));
  }

  function handleTimeChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setTime(Number(event.target.value));
  }

  function handleDateFormatChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setDateFormat(event.target.value);
  }

  function handleTimeFormatChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setTimeFormat(event.target.value);
  }
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    LoadProfileStorage.saveSettings({
      kwdelCol: kwdel,
      timeCol: time,
      dateCol: date,
      dateFormat,
      timeFormat,
      kwhdelCol: khwdel,
    });
    alert("Load profile settings saved");
  }

  return (
    <SettingsPanel onSubmit={handleSubmit}>
      <FormTextField
        label="Kwdel Column#"
        placeholder="Kwdel Column#"
        value={kwdel}
        type="number"
        onChange={handleKwdelChange}
        helpertext="the column# of the kwdel value, note: column starts at 0"
      />

      <FormTextField
        label="Kwhdel Column#"
        placeholder="Kwhdel Column#"
        value={khwdel}
        type="number"
        onChange={handleKwhdelChange}
        helpertext="the column# of the kwhdel value, note: column starts at 0"
      />

      <FormTextField
        label="Date Column#"
        placeholder="Date Column#"
        value={date}
        type="number"
        onChange={handleDateChange}
        helpertext="the column# of the date value, note: column starts at 0"
      />
      <FormTextField
        label="Time Column#"
        placeholder="Time Column#"
        value={time}
        type="number"
        onChange={handleTimeChange}
        helpertext="the column# of the time value, note: column starts at 0"
      />
      <FormTextField
        label="Date Format"
        placeholder="Date Format"
        value={dateFormat}
        onChange={handleDateFormatChange}
        helpertext="(MM/DD/YYYY) = '09/22/2020', (MMMM/DD/YYYY) = 'September/22/2020'  "
      />
      <FormTextField
        label="Time Format"
        placeholder="Time Format"
        value={timeFormat}
        onChange={handleTimeFormatChange}
        helpertext="(HH:mm) = '22:15', (hh:mm a) = '10:15 pm', (HH:mm:ss) = '22:15:13' "
      />
    </SettingsPanel>
  );
};

export default LoadProfileSettingsPanel;
