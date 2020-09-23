import React, { useContext, useEffect, useState } from "react";
import CustomAccordion from "../CustomAccordion";
import FileCard from "../FileCard";
import { LoadProfileParser } from "../../loadprofile";
import { LoadProfile_Raw } from "../../loadprofile/objects";
import { LoadProfileContext } from "../../loadprofile/LoadProfileContextProvider";
import FileDrop from "../FileDrop";
import { LoadProfileParserRenderProps } from "../../loadprofile/LoadProfileParser";

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
  const [files, setFiles] = useState<Map<string, File>>(new Map());
  const loadProfileContext = useContext(LoadProfileContext);

  async function handleFileDrop(files: File[]) {
    files.forEach((file: File) => {
      setFiles((prevMap) => {
        if (!prevMap.has(file.name)) {
          const duplicate = new Map(prevMap);
          duplicate.set(file.name, file);
          return duplicate;
        } else {
          return prevMap;
        }
      });
    });
  }

  function handleDragEnter() {}

  function handleDragLeave() {}

  function handleFileParsed(lpRawDatas: LoadProfile_Raw[]) {
    loadProfileContext.updateLoadProfiles(lpRawDatas);
  }

  function handleRemoveFile(file: File, meteringPoints: string[]) {
    setFiles((prevMap) => {
      const duplicate = new Map(prevMap);
      duplicate.delete(file.name);
      return duplicate;
    });

    loadProfileContext.deleteLoadProfiles({
      fileName: file.name,
      meteringPoints,
    });
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
        {[...files.values()].map((file) => {
          return (
            <LoadProfileParser
              onFileParsed={handleFileParsed}
              key={file.name}
              file={file}
              onRemoveFile={handleRemoveFile}
              render={(props) => (
                <FileCard
                  progress={props.progress}
                  progressInfo={props.progressInfo}
                  file={props.file}
                  errors={props.errors}
                  onRemoveFile={props.onRemoveFile}
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
