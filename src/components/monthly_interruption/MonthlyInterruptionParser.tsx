import React, { useEffect, useState } from "react";
import { FileUtil } from "../common/utils";
import MonthlyInterruption from "./MonthlyInterruption";
import { MonthlyInterruptionRawData } from "./types";

type LoadProfileParserProps = {
  file: File;
  render?: any;
};

const LoadProfileParser: React.FunctionComponent<LoadProfileParserProps> = (
  props
) => {
  const { file, render, ...others } = props;
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
        fileFromParser: file,
        errors,
        onRemoveFile: handleRemoveFile,
      })}
    </React.Fragment>
  );
};

export default LoadProfileParser;
