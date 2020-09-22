import React, { useContext, useEffect, useState } from "react";
import CustomAccordion from "../CustomAccordion";
import FileCard from "../FileCard";
import { LoadProfileParser } from "../../loadprofile";
import { LoadProfile_Raw } from "../../loadprofile/objects";
import { LoadProfileContext } from "../../loadprofile/LoadProfileContextProvider";
import FileDrop from "../FileDrop";

type MonthlyInterruptionAccordionProps = {
  expandedPanel: string;
  onPanelChange: (newPanel: string) => void;
};
const panelName = "mi_panel";
const title = "Monthly Interruption Files";

const MonthlyInterruptionAccordion: React.FunctionComponent<MonthlyInterruptionAccordionProps> = ({
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
        {/* {[...files.values()].map((file) => {
          return (
            <LoadProfileParser
              onFileParsed={handleFileParsed}
              key={file.name}
              file={file}
              onRemoveFile={handleRemoveFile}
              render={({
                progress,
                progressInfo,
                fileFromParser,
                onRemoveFile,
                errors,
              }: LoadProfileParserRenderProps) => (
                <FileCard
                  progress={progress}
                  progressInfo={progressInfo}
                  file={fileFromParser}
                  errors={errors}
                  onRemoveFile={onRemoveFile}
                />
              )}
            />
          );
        })} */}
      </FileDrop>
    </CustomAccordion>
  );
};

export default MonthlyInterruptionAccordion;
export { panelName };
