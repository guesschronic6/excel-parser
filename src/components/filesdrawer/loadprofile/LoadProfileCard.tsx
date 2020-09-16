import { Typography, LinearProgress, Button } from "@material-ui/core";
import { ErrorOutline } from "@material-ui/icons";
import React, { useCallback, useEffect, useState } from "react";
import cardStyles from "./card-styles";
import LoadProfile from "../../common/loadprofile";
import LoadProfileExcelParser from "../../common/loadprofile/LoadProfileExcelParser";

type LoadProfileProps = {
  file: File;
  progressInfo: string;
  progress: number;
};

const LoadProfileCard: React.FunctionComponent<LoadProfileProps> = ({
  file,
  progress,
  progressInfo,
  ...others
}) => {
  const classes = cardStyles();

  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <Typography className={classes.filename}>{file.name}</Typography>
        <div className={classes.progress_content}>
          <LinearProgress value={progress} variant="determinate" />
          <Typography className={classes.progress_text}>
            {progressInfo}
          </Typography>
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
