import { Typography, LinearProgress, Button } from "@material-ui/core";
import { ErrorOutline } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import cardStyles from "./card-styles";
import LoadProfile from "../../common/loadprofile";
import LoadProfileExcelParser from "../../common/loadprofile/ExcelParser";

type LoadProfileProps = {
  file: File;
};

const LoadProfileCard: React.FunctionComponent<LoadProfileProps> = ({
  file,
  ...others
}) => {
  const [progress, setProgress] = useState<{
    message: string;
    percent: number;
  } | null>(null);
  const [errors, setErrors] = useState<string[]>([]);
  const classes = cardStyles();

  useEffect(() => {
    let excelParser = new LoadProfileExcelParser(file);
    excelParser.extractMonthlyLoadProfileFromFile(onProgress);
  }, []);

  function onProgress(message: string, progress: number) {
    setProgress({ message, percent: progress });
  }

  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <Typography className={classes.filename}>{file.name}</Typography>
        <div className={classes.progress_content}>
          {progress && (
            <LinearProgress value={progress?.percent} variant="determinate" />
          )}
          <Typography
            className={classes.progress_text}
          >{`processing ${progress?.message}%`}</Typography>
        </div>
      </div>
      <div className={classes.action}>
        <Button
          className={classes.button}
          size="small"
          color="secondary"
          startIcon={<ErrorOutline color="error" />}
        >
          see errors
        </Button>
        <Button className={classes.button} size="small" color="primary">
          close
        </Button>
      </div>
    </div>
  );
};

export default LoadProfileCard;
