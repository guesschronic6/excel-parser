import React, { useEffect, useState } from "react";
import { FileUtil } from "../../objects/common/utils";
import { LoadProfile_Raw } from "./objects";
import extractLoadProfileRawFromWorkbook from "./ExcelParser";
import { FilecardProps } from "../filesdrawer/FileCard";

type LoadProfileParserProps = {
  file: File;
  render: React.FunctionComponent<FilecardProps>;
  onFileParsed: (data: LoadProfile_Raw[]) => void;
  onRemoveFile: (file: File, meteringPointss: string[]) => void;
};

export type LoadProfileParserRenderProps = {
  progress: number;
  progressInfo: string;
  fileFromParser: File;
  errors: string[];
  onRemoveFile: () => void;
};

const LoadProfileParser: React.FunctionComponent<LoadProfileParserProps> = ({
  file,
  render,
  onFileParsed,
  onRemoveFile,
  ...others
}) => {
  const [progress, setProgress] = useState<number>(0);
  const [progressInfo, setsProgressInfo] = useState<string>("");
  const [errors, setErrors] = useState<string[]>([]);
  const [meteringPoints, setMeteringPoints] = useState<string[]>([]);

  useEffect(() => {
    FileUtil.extractWorkbookFromFile(file)
      .then((workbook) => {
        return extractLoadProfileRawFromWorkbook(
          file.name,
          workbook,
          handleProgressUpdate
        );
      })
      .then((result) => {
        setErrors(result.errors);
        handleFileParsed(result.value);
        setMeteringPoints((meteringPoint) => [
          ...meteringPoint,
          ...result.meteringPoints,
        ]);
      })
      .catch((e) => {
        console.error(e);
        errors.push(e.message);
      });
  }, []);

  function handleFileParsed(lp_rawDatas: LoadProfile_Raw[]) {
    onFileParsed(lp_rawDatas);
  }

  function handleProgressUpdate(info: string, percent: number) {
    setProgress(percent);
    setsProgressInfo(info);
  }

  function handleRemoveFile() {
    onRemoveFile(file, meteringPoints);
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
