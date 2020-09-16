import React, { useEffect, useState } from "react";
import CustomAccordion from "../CustomAccordion";
import FileCard from "../FileCard";
import { LoadProfileParser } from "../../parser";
import FileDrop from "../FileDrop";

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

  function handleDragEnter() {}

  function handleDragLeave() {}

  return (
    <CustomAccordion
      onPanelChange={onPanelChange}
      title={title}
      panelName={panelName}
      expandedPanel={expandedPanel}
    >
      <FileDrop
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onFileDrop={handleFileDrop}
        helperText="Drop files here"
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
                <FileCard
                  progress={progress}
                  progressInfo={progressInfo}
                  file={file}
                />
              )}
            />
          );
        })}
      </FileDrop>
    </CustomAccordion>
  );
};

export default LoadProfileAccordion;
export { panelName };
