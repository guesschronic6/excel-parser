import { makeStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: 50,
    height: "100%",
    zIndex: theme.zIndex.drawer + 10,
  },
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    height: "100%",
    width: "100%",
  },
  toggleButtonsContainer: {},
  otherButtonsContainer: {
    display: "flex",
    flexDirection: "column",
  },
}));

export default useStyles;
