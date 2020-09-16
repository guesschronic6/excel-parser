import { createMuiTheme, makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  button: {
    textTransform: "none",
  },
});

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#45aaf2",
      dark: "#2d98da",
      contrastText: "white",
    },
    secondary: {
      main: "#fc5c65",
      dark: "#eb3b5a",
      contrastText: "white",
    },
    text: {
      primary: "#242A3E",
      secondary: "#B4BEC8",
    },
    background: {
      default: "#F5F7F9",
    },
  },

  props: {
    MuiButtonBase: {},
  },
  overrides: {
    MuiButtonBase: {
      root: {
        textTransform: "none",
      },
    },
    MuiTab: {},
  },
});

export default theme;
