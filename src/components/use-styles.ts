import { makeStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    maxHeight: "100vh",
    maxWidth: "100vw",
    height: "100vh",
    width: "100vw",
    backgroundColor: theme.palette.background.default,
  },
}));

export default useStyles;
