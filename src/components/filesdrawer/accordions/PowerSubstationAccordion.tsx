import React, { useContext, useState } from "react";
import CustomAccordion from "../StyledAccordion";
import FileCard from "../FileCard";
import FileDrop from "../FileDrop";
import PowerSubstationParser from "../../power_substation/PowerSubstationParser";
import { PowerSubstationRawData } from "../../power_substation/types";
import { PowerTransformerLossContext } from "../../power_transformer_loss/PowerTransformerLossContextProvider";
import { FeederAndDemandContext } from "../../feeder_and_demand/FeederAndDemandContextProvider";

type MonthlyInterruptionAccordionProps = {
  expandedPanel: string;
  onPanelChange: (newPanel: string) => void;
};
const panelName = "ps_panel";
const title = "Power Substation Files";

const MonthlyInterruptionAccordion: React.FunctionComponent<MonthlyInterruptionAccordionProps> = (
  props
) => {
  const { expandedPanel, onPanelChange, ...others } = props;
  const [files, setFiles] = useState<Map<string, File>>(new Map());
  const powerTransformerLossContext = useContext(PowerTransformerLossContext);
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

  function handleFileParsed(rawDatas: PowerSubstationRawData[]) {
    powerTransformerLossContext.onPowerSubstationFileParsed(rawDatas);
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
    feederAndDemandContext.onPowerSubstationDataFileRemoved(file.name);
    powerTransformerLossContext.onPowerSubstationFileRemoved(file.name);
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
            <PowerSubstationParser
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
