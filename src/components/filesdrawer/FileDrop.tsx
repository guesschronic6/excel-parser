import classes from "*.module.css";
import { Box, Typography, makeStyles, Theme } from "@material-ui/core";
import clsx from "clsx";
import React, { useState } from "react";
import Dropzone from "react-dropzone";

type FileDropProps = {
  onFileDrop: (files: File[]) => void;
  onDragEnter: () => void;
  onDragLeave: () => void;
  onDragOver?: () => void;
  helperText: string;
};

const FileDrop: React.FunctionComponent<FileDropProps> = ({
  helperText = "",
  onFileDrop,
  onDragEnter,
  onDragLeave,
  onDragOver = () => {},
  children,
  ...others
}) => {
  const [dragging, setDragging] = useState(false);
  const classes = useStyles();

  function handleDragEnter() {
    setDragging(true);
    onDragEnter();
  }

  function handleDragLeave() {
    setDragging(false);
    onDragLeave();
  }

  return (
    <Box display="flex" flexDirection="column" width="100%">
      <Dropzone
        onDrop={onFileDrop}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
      >
        {({ getRootProps, getInputProps }) => (
          <section
            onMouseEnter={handleDragEnter}
            onMouseLeave={handleDragLeave}
            className={clsx(classes.dropZone, {
              [classes.dropZone_focused]: dragging,
            })}
          >
            <div
              {...getRootProps({ className: `${classes.dropZone_content}` })}
            >
              <input {...getInputProps()} />
              <Typography
                variant="subtitle1"
                color="textSecondary"
                className={classes.dropZoneText}
              >
                {helperText}
              </Typography>
            </div>
          </section>
        )}
      </Dropzone>
      <Box
        display="flex"
        flexDirection="column"
        maxWidth="100%"
        gridGap={5}
        marginTop={1}
      >
        {children}
      </Box>
    </Box>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  dropZone: {
    height: "100%",
    width: "100%",
    cursor: "pointer",
    minHeight: 50,
  },
  dropZone_focused: {
    border: `2px dashed ${theme.palette.text.secondary}`,
  },
  dropZone_content: {
    display: "flex",
    flexDirection: "column",
    maxWidth: "100%",
    gap: "10px",
    flexWrap: "wrap",
    margin: 5,
  },
  dropZoneText: {
    fontSize: "0.8rem",
    fontWeight: "bold",
    padding: "5px",
  },
}));

export default FileDrop;
