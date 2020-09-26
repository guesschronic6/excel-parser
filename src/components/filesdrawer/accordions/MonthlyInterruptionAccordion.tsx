import React, { useContext, useEffect, useState } from "react";
import { MonthlyInterruptionRawData } from "../../../objects/monthly_interruption/types";
import MonthlyInterruptionParser from "../../monthly_interruption/MonthlyInterruptionParser";
import CustomAccordion from "../StyledAccordion";
import FileCard from "../FileCard";
import FileDrop from "../FileDrop";
import { FeederAndDemandContext } from "../../feeder_and_demand/FeederAndDemandContextProvider";

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

  const feederAndDemandContext = useContext(FeederAndDemandContext);

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

  function handleFileParsed(rawDatas: MonthlyInterruptionRawData[]) {
    feederAndDemandContext.onMonthlyInterruptionOrPowerSubstationFileParsed(
      rawDatas
    );
  }

  function handleRemoveFile(file: File) {
    setFiles((prevMap) => {
      const duplicate = new Map(prevMap);
      duplicate.delete(file.name);
      return duplicate;
    });
    feederAndDemandContext.onMonthlyInterruptionDataFileRemoved(file.name);
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
            <MonthlyInterruptionParser
              onFileParsed={handleFileParsed}
              onRemoveFile={handleRemoveFile}
              key={file.name}
              file={file}
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

export default MonthlyInterruptionAccordion;
export { panelName };
