import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@material-ui/core";
import Dropzone from "react-dropzone";
import React from "react";
import CustomAccordion from "./CustomAccordion";

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
  return (
    <CustomAccordion
      onPanelChange={onPanelChange}
      title={title}
      panelName={panelName}
      expandedPanel={expandedPanel}
    >
      <Dropzone onDrop={(acceptedFiles: File[]) => console.log(acceptedFiles)}>
        {({ getRootProps, getInputProps }) => (
          <section>
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <p>Drag 'n' drop some files here, or click to select files</p>
            </div>
          </section>
        )}
      </Dropzone>
    </CustomAccordion>
  );
};

export default LoadProfileAccordion;
export { panelName };
