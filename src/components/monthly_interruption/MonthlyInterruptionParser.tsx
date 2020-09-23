import React, { useEffect, useState } from "react";
import { FileUtil } from "../../objects/common/utils";
import MonthlyInterruption from "../../objects/monthly_interruption/MonthlyInterruption";
import { MonthlyInterruptionRawData } from "../../objects/monthly_interruption/types";
import { FilecardProps } from "../filesdrawer/FileCard";

type LoadProfileParserProps = {
  file: File;
  render: React.FunctionComponent<FilecardProps>;
  onFileParsed: (rawDatas: MonthlyInterruptionRawData[]) => void;
};

const LoadProfileParser: React.FunctionComponent<LoadProfileParserProps> = (
  props
) => {
  const { file, render, onFileParsed, ...others } = props;
  const [progress, setProgress] = useState<number>(0);
  const [progressInfo, setsProgressInfo] = useState<string>("");
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    FileUtil.extractWorkbookFromFile(file)
      .then((workbook) => {
        return MonthlyInterruption.extractRawDatasFromWorkbook(
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
    monthlyInterruptionRawDatas: MonthlyInterruptionRawData[]
  ) {}

  function handleProgressUpdate(info: string, percent: number) {
    setProgress(percent);
    setsProgressInfo(info);
  }

  function handleRemoveFile() {}

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
