import Dropzone, { useDropzone } from "react-dropzone";
import React, { useEffect, useState } from "react";
import CustomAccordion from "../CustomAccordion";
import LoadProfileCard from "./LoadProfileCard";
import { Box, Typography } from "@material-ui/core";
import { LoadProfileParser } from "../../parser";
import useStyles from "./use-styles";
import clsx from "clsx";

type LoadProfileAccordionProps = {
  expandedPanel: string;
  onPanelChange: (newPanel: string) => void;
};

const panelName = "laodprofile_filespanel";
const title = "Load Profile Files";

const LoadProfileAccordion: React.FunctionComponent<LoadProfileAccordionProps> = ({
  expandedPanel,
  onPanelChange,
  ...others
}) => {
  const [files, setFiles] = useState<{ key: string; value: File }[]>([]);
  const [dragging, setDragging] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    console.log("new fiels added");
  }, [files, setFiles]);

  async function handleFileDrop(files: File[]) {
    files.forEach((file: File) => {
      setFiles((prevMap) => {
        const duplicate = prevMap.filter(
          (keyvalue) => keyvalue.key === file.name
        );
        if (duplicate.length !== 0) return prevMap;
        return [...prevMap, { key: file.name, value: file }];
      });
    });
  }

  function handleDragEnter() {
    setDragging(true);
  }

  function handleDragLeave() {
    setDragging(false);
  }

  return (
    <CustomAccordion
      onPanelChange={onPanelChange}
      title={title}
      panelName={panelName}
      expandedPanel={expandedPanel}
    >
      <Box display="flex" flexDirection="column" width="100%">
        <Dropzone
          onDrop={handleFileDrop}
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
                  Drag 'n' drop some files here, or click to select files
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
          {files.map((file) => {
            return (
              <LoadProfileParser
                key={file.key}
                file={file.value}
                render={({
                  progress,
                  progressInfo,
                  file,
                }: {
                  progress: number;
                  progressInfo: string;
                  file: File;
                }) => (
                  <LoadProfileCard
                    progress={progress}
                    progressInfo={progressInfo}
                    file={file}
                  />
                )}
              />
            );
          })}

          {/* {files.map((file) => {
            return <LoadProfileCard key={file.key} file={file.value} />;
          })} */}
        </Box>
      </Box>
    </CustomAccordion>
  );
};

export default LoadProfileAccordion;
export { panelName };
