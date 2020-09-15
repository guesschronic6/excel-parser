import { makeStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => ({
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
    "&$expanded": {
      margin: "12px 0",
    },
  },
  accordionTitle: {
    fontSize: "1rem",
    asdf: {},
  },
  expanded: {},
  accordionDetails: {
    backgroundColor: theme.palette.background.default,
    padding: "5px",
    position: "relative",
  },
}));

export default useStyles;
