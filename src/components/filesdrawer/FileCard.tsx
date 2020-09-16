import {
  Button,
  LinearProgress,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core";
import { ErrorOutline } from "@material-ui/icons";
import React from "react";

type FilecardProps = {
  file: File;
  progressInfo: string;
  progress: number;
};

const FileCard: React.FunctionComponent<FilecardProps> = ({
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

const cardStyles = makeStyles((theme: Theme) => ({
  root: {
    zIndex: theme.zIndex.mobileStepper,
    maxWidth: "100%",
    fontSize: "0.8rem",
    boxSizing: "border-box",
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
    border: `1px solid ${theme.palette.divider}`,
    padding: 10,
    overflowWrap: "break-word",
    wordWrap: "break-word",
  },
  filename: {
    fontSize: "1em",
    color: theme.palette.text.primary,
  },
  progress_text: {
    fontSize: "0.7em",
    color: theme.palette.text.secondary,
    alignSelf: "flex-end",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    gap: "5px",
    justifyContent: "center",
  },
  progress_content: {
    display: "flex",
    flexDirection: "column",
    gap: "3px",
  },
  action: {},
  button: {
    textTransform: "none",
  },
}));

export default FileCard;
