import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  LinearProgress,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core";
import { ErrorOutline } from "@material-ui/icons";
import React, { useState } from "react";

export type FilecardProps = {
  file: File;
  progressInfo: string;
  progress: number;
  errors?: string[];
  onRemoveFile: () => void;
};

const FileCard: React.FunctionComponent<FilecardProps> = ({
  file,
  progress,
  progressInfo,
  errors = [],
  onRemoveFile,
  ...others
}) => {
  const classes = cardStyles();
  const [openError, setOpenError] = useState(false);

  function handleSeeErrorsClick() {
    setOpenError(true);
  }

  function handleCloseErrorDialog() {
    setOpenError(false);
  }

  return (
    <React.Fragment>
      <div className={classes.root}>
        <div className={classes.content}>
          <Typography className={classes.filename}>{file.name}</Typography>
          <div className={classes.progress_content}>
            <LinearProgress
              value={progress}
              variant={
                progress === 0 || progress === 100
                  ? "determinate"
                  : "indeterminate"
              }
            />
            <Typography className={classes.progress_text}>
              {progressInfo}
            </Typography>
          </div>
        </div>
        <div className={classes.action}>
          {errors.length !== 0 && (
            <Button
              className={classes.button}
              size="small"
              color="secondary"
              startIcon={<ErrorOutline color="error" />}
              onClick={handleSeeErrorsClick}
            >
              see errors
            </Button>
          )}
          <Button
            className={classes.button}
            onClick={onRemoveFile}
            size="small"
            color="primary"
          >
            Remove
          </Button>
        </div>
      </div>
      <Dialog open={openError} onClose={handleCloseErrorDialog}>
        <DialogTitle>
          <Typography variant="h6" color="error">
            Errors
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {file.name}
          </Typography>
          <Divider />
        </DialogTitle>
        <DialogContent>
          <Box overflow="auto" padding="5px 25px">
            {errors.map((error, index) => {
              return (
                <div key={index} className={classes.error_container}>
                  <Typography
                    component="p"
                    className={classes.error_text}
                    key={`${index}~error`}
                  >
                    {error}
                  </Typography>
                  <Divider />
                </div>
              );
            })}
          </Box>
        </DialogContent>
      </Dialog>
    </React.Fragment>
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
  error_container: {
    maxWidth: "100%",
    width: "550px",
  },
  error_text: {
    fontSize: "0.9rem",
    padding: "10px 5px",
    whiteSpace: "pre-wrap",
  },
}));

export default FileCard;
