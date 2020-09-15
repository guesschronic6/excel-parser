import React from "react";
import useStyles from "./use-styles";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@material-ui/core";
type CustomAccordionProps = {
  expandedPanel: string;
  onPanelChange: (event: React.ChangeEvent<{}>, newExpanded: boolean) => void;
  panelName: string;
  title: string;
  render: any;
};

const CustomAccordion: React.FunctionComponent<CustomAccordionProps> = ({
  expandedPanel,
  onPanelChange,
  panelName,
  title,
  render,
  children,
  ...others
}) => {
  return (
    <Accordion
      square
      expanded={expandedPanel === panelName}
      onChange={onPanelChange}
    >
      <AccordionSummary>
        <Typography>{title}</Typography>
      </AccordionSummary>
      <AccordionDetails>{children}</AccordionDetails>
    </Accordion>
  );
};

export default CustomAccordion;
