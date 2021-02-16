import React, { useEffect, useState } from "react";
import { FileUtil } from "../common/utils";
import MonthlyInterruptionExcelUtil from "./MonthlyInterruptionExcelUtil";
import { MonthlyInterruptionRawData } from "../monthly_interruption/types";
import { FilecardProps } from "../filesdrawer/FileCard";

type MonthlyInterruptionParserProps = {
  file: File;
  render: React.FunctionComponent<FilecardProps>;
  onFileParsed: (rawDatas: MonthlyInterruptionRawData[]) => void;
  onRemoveFile: (file: File) => void;
};

const LoadProfileParser: React.FunctionComponent<MonthlyInterruptionParserProps> = (
  props
) => {
  const { file, render, onFileParsed, onRemoveFile, ...others } = props;
  const [progress, setProgress] = useState<number>(0);
  const [progressInfo, setsProgressInfo] = useState<string>("");
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    FileUtil.extractWorkbookFromFile(file)
      .then((workbook) => {
        return MonthlyInterruptionExcelUtil.extractRawDatasFromWorkbook(
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
  ) {
    onFileParsed(monthlyInterruptionRawDatas);
  }

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
