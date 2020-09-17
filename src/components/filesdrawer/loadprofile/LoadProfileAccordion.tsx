import React, { useContext, useEffect, useState } from "react";
import CustomAccordion from "../CustomAccordion";
import FileCard from "../FileCard";
import { LoadProfileParser } from "../../loadprofile";
import { LoadProfile_Raw } from "../../loadprofile/objects";
import { LoadProfileContext } from "../../loadprofile/LoadProfileContextProvider";
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
  const loadProfileContext = useContext(LoadProfileContext);

  useEffect(() => {
    console.log("New File Added...");
  }, [files, setFiles]);

  async function handleFileDrop(files: File[]) {
    files.forEach((file: File) => {
      //Set the files...IF dupplicate, returns
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

  function handleFileParsed(lpRawDatas: LoadProfile_Raw[]) {
    loadProfileContext.updateLoadProfiles(lpRawDatas);
  }

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
              onFileParsed={handleFileParsed}
              key={file.key}
              file={file.value}
              render={({
                progress,
                progressInfo,
                fileFromParser,
                errors,
              }: {
                progress: number;
                progressInfo: string;
                fileFromParser: File;
                errors: string[];
              }) => (
                <FileCard
                  progress={progress}
                  progressInfo={progressInfo}
                  file={fileFromParser}
                  errors={errors}
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
