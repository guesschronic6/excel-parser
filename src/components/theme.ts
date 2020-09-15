import { createMuiTheme } from "@material-ui/core";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#d1d8e0",
      dark: "#a5b1c2",
      contrastText: "#4b6584",
    },
    text: {
      primary: "#4b6584",
      secondary: "#778ca3",
    },
  },
});

export default theme;
