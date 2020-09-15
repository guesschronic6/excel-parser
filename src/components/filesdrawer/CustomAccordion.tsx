import React from "react";
import useStyles from "./accordion-styles";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@material-ui/core";
import { ExpandMore } from "@material-ui/icons";

type CustomAccordionProps = {
  expandedPanel: string;
  onPanelChange: (newPanel: string) => void;
  panelName: string;
  title: string;
  render?: any;
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
  const classes = useStyles();

  function handlePanelChange(
    event: React.ChangeEvent<{}>,
    newExpanded: boolean
  ) {
    onPanelChange(newExpanded ? panelName : "");
  }

  return (
    <Accordion
      className={classes.accordion}
      square
      expanded={expandedPanel === panelName}
      onChange={handlePanelChange}
    >
      <AccordionSummary
        className={classes.accordionSummary}
        expandIcon={<ExpandMore />}
      >
        <Typography className={classes.accordionTitle}>{title}</Typography>
      </AccordionSummary>
      <AccordionDetails className={classes.accordionDetails}>
        {children}
      </AccordionDetails>
    </Accordion>
  );
};

export default CustomAccordion;
