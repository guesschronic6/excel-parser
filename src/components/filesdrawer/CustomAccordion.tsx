import React from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  makeStyles,
  Theme,
  createStyles,
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
        classes={{ content: classes.content }}
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

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    accordion: {
      border: "1px solid rgba(0, 0, 0, .125)",
      boxShadow: "none",
      "&:not(:last-child)": {
        borderBottom: 0,
      },
      "&:before": {
        display: "none",
      },
      "&$expanded": {
        margin: "auto",
      },
      expanded: {},
    },

    accordionSummary: {
      borderBottom: "1px solid rgba(0, 0, 0, .125)",

      marginBottom: -1,
      minHeight: 30,
      "&$expanded": {
        minHeight: 30,
        backgroundColor: "black",
      },
      expanded: {},
    },
    content: {
      margin: 2,
    },
    accordionTitle: {
      fontSize: "0.8rem",
      asdf: {},
    },
    expanded: {},
    accordionDetails: {
      backgroundColor: theme.palette.background.default,
      padding: "5px",
      position: "relative",
    },
  })
);

export default CustomAccordion;
