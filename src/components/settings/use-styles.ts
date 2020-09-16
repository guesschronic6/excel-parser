import { makeStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: "100%",
    height: "100%",
    maxHeight: "100%",
    background: theme.palette.background.paper,
    padding: theme.spacing(3),
    fontSize: "1rem",
    display: "flex",
    flexDirection: "column",
    zIndex: theme.zIndex.mobileStepper,
  },
  title_div: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  title: {
    marginTop: theme.spacing(5),
    fontSize: "1.3em",
  },
  tabs: {
    display: "inline-block",
  },
  tab: {
    textAlign: "start",
    textTransform: "none",
    fontWeight: "normal",
    fontSize: "0.9em",
    borderRight: `1px solid ${theme.palette.divider}`,
  },
  tab_selected: {
    backgroundColor: theme.palette.background.default,
    color: theme.palette.primary.main,
    fontWeight: "bold",
  },
  tab_wrapper: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  content: {
    marginTop: theme.spacing(5),
    display: "flex",
    flexGrow: 1,
  },
  tab_panel: {
    flexGrow: 1,
  },
}));

export default useStyles;
