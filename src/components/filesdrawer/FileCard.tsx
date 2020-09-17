import {
  Box,
  Button,
  Dialog,
  DialogContent,
  LinearProgress,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core";
import { ErrorOutline } from "@material-ui/icons";
import React, { useState } from "react";

type FilecardProps = {
  file: File;
  progressInfo: string;
  progress: number;
  errors?: string[];
};

const FileCard: React.FunctionComponent<FilecardProps> = ({
  file,
  progress,
  progressInfo,
  errors = [],
  ...others
}) => {
  const classes = cardStyles();
  const [openError, setOpenError] = useState(false);

  function handleSeeErrorsClick() {
    console.log(errors);
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
            onClick={handleSeeErrorsClick}
          >
            see errors
          </Button>
          <Button className={classes.button} size="small" color="primary">
            close
          </Button>
        </div>
      </div>
      <Dialog open={openError} onClose={handleCloseErrorDialog}>
        <DialogContent>
          <Box
            maxWidth="500px"
            maxHeight="700px"
            height="500px"
            width="700px"
            overflow="auto"
          >
            {errors.map((error, index) => {
              return (
                <Typography
                  key={`${index}~error`}
                  variant="subtitle1"
                  color="error"
                >
                  {error}
                </Typography>
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
}));

export default FileCard;
