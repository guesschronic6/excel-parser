import React, { FunctionComponent } from "react";
import { CssBaseline, ThemeProvider, Box, useTheme } from "@material-ui/core";
import theme from "./theme";
import useStyles from "./use-styles";
import LoadProfileContextProvider from "./loadprofile/LoadProfileContextProvider";
import Dashboard from "./dashboard";
import clsx from "clsx";

type AppProps = {};

const App: FunctionComponent<AppProps> = (props) => {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <LoadProfileContextProvider>
          <Box className={clsx(classes.root)}>
            <Dashboard />
          </Box>
        </LoadProfileContextProvider>
      </CssBaseline>
    </ThemeProvider>
  );
};

export default App;
