import React, { useEffect, useState } from "react";
import { FileUtil } from "../common/utils";

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
  const [meteringPoints, setMeteringPoints] = useState<string[]>([]);

  function handleFileParsed() {}

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
