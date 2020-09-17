import { makeStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "flex",
    flexDirection: "row",
    height: "100%",
    width: "100%",
  },
  content: {
    width: "100%",
    height: "100%",
    position: "relative",
  },
}));

export default useStyles;
