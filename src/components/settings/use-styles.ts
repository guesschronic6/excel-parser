import { makeStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    background: theme.palette.background.paper,
    padding: theme.spacing(3),
    fontSize: "1rem",
    display: "flex",
    flexDirection: "column",
    zIndex: theme.zIndex.mobileStepper,
    position: "absolute",
    top: 0,
    left: 0,
    height: "100%",
    width: "100%",
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
