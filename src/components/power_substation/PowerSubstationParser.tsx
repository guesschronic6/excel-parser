import React, { useEffect, useState } from "react";
import { FileUtil } from "../../objects/common/utils";
import PowerSubstation from "../../objects/power_substation/PowerSubstation";
import { PowerSubstationRawData } from "../../objects/power_substation/types";
import { FilecardProps } from "../filesdrawer/FileCard";

type PowerSubstationParserProps = {
  file: File;
  render: React.FunctionComponent<FilecardProps>;
  onFileParsed: (rawDatas: PowerSubstationRawData[]) => void;
  onRemoveFile: (file: File) => void;
};

const LoadProfileParser: React.FunctionComponent<PowerSubstationParserProps> = (
  props
) => {
  const { file, render, onFileParsed, onRemoveFile, ...others } = props;
  const [progress, setProgress] = useState<number>(0);
  const [progressInfo, setsProgressInfo] = useState<string>("");
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    FileUtil.extractWorkbookFromFile(file)
      .then((workbook) => {
        return PowerSubstation.extractRawDatasFromWorkbook(
          file.name,
          workbook,
          handleProgressUpdate
        );
      })
      .then((result) => {
        setErrors(result.errors);
        handleFileParsed(result.value);
      })
      .catch((e) => {
        console.error(e);
        errors.push(e.message);
      });
  }, []);

  function handleFileParsed(
    monthlyInterruptionRawDatas: PowerSubstationRawData[]
  ) {}

  function handleProgressUpdate(info: string, percent: number) {
    setProgress(percent);
    setsProgressInfo(info);
  }

  function handleRemoveFile() {
    onRemoveFile(file);
  }

  return (
    <React.Fragment>
      {render({
        progress,
        progressInfo,
        file,
        errors,
        onRemoveFile: handleRemoveFile,
      })}
    </React.Fragment>
  );
};

export default LoadProfileParser;
