import classes from "*.module.css";
import { Typography, LinearProgress, Button } from "@material-ui/core";
import { ErrorOutline } from "@material-ui/icons";
import React, { useState } from "react";
import cardStyles from "./card-styles";

type LoadProfileProps = {
  file: File;
};

const LoadProfileCard: React.FunctionComponent<LoadProfileProps> = ({
  file,
  ...others
}) => {
  const [progress, setProgress] = useState<number>(0);
  const [errors, setErrors] = useState<string[]>([]);
  const classes = cardStyles();

  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <Typography className={classes.filename}>{file.name}</Typography>
        <div className={classes.progress_content}>
          <LinearProgress value={progress} variant="determinate" />
          <Typography
            className={classes.progress_text}
          >{`processing ${progress}%`}</Typography>
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
