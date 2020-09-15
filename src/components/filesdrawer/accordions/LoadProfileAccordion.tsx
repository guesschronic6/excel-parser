import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@material-ui/core";
import Dropzone from "react-dropzone";
import React from "react";

type LoadProfileAccordionProps = {
  expandedPanel: string;
  onPanelChange: (newPanel: string) => void;
};

const panelName = "laodprofile_filespanel";

const LoadProfileAccordion: React.FunctionComponent<LoadProfileAccordionProps> = ({
  expandedPanel,
  onPanelChange,
  ...others
}) => {
  function handlePanelChange(
    event: React.ChangeEvent<{}>,
    newExpanded: boolean
  ) {
    onPanelChange(newExpanded ? panelName : "");
  }

  return (
    <Accordion
      square
      expanded={expandedPanel === panelName}
      onChange={handlePanelChange}
    >
      <AccordionSummary>
        <Typography>Load Profile Files</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Dropzone
          onDrop={(acceptedFiles: File[]) => console.log(acceptedFiles)}
        >
          {({ getRootProps, getInputProps }) => (
            <section>
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <p>Drag 'n' drop some files here, or click to select files</p>
              </div>
            </section>
          )}
        </Dropzone>
      </AccordionDetails>
    </Accordion>
  );
};

export default LoadProfileAccordion;
export { panelName };
