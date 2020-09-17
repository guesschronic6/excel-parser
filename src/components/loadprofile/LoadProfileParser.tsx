import React, { useEffect, useState } from "react";
import { FileUtil } from "../common/utils";
import { LoadProfile_Raw } from "./objects";
import extractLoadProfileRawFromWorkbook from "./ExcelParser";

type LoadProfileParserProps = {
  file: File;
  render?: any;
  onFileParsed: (data: LoadProfile_Raw[]) => void;
};

const LoadProfileParser: React.FunctionComponent<LoadProfileParserProps> = ({
  file,
  render,
  onFileParsed,
  ...others
}) => {
  const [progress, setProgress] = useState<number>(0);
  const [progressInfo, setsProgressInfo] = useState<string>("");
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    FileUtil.extractWorkbookFromFile(file)
      .then((workbook) => {
        return extractLoadProfileRawFromWorkbook(
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

  useEffect(() => {
    console.log("errors updated");
    console.log(errors);
  }, [errors]);

  function handleFileParsed(lp_rawDatas: LoadProfile_Raw[]) {
    onFileParsed(lp_rawDatas);
  }

  function handleProgressUpdate(info: string, percent: number) {
    setProgress(percent);
    setsProgressInfo(info);
  }

  return (
    <React.Fragment>
      {render({ progress, progressInfo, fileFromParser: file, errors })}
    </React.Fragment>
  );
};

export default LoadProfileParser;
