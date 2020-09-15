import React, { FunctionComponent } from "react";
import { CssBaseline, ThemeProvider, Box } from "@material-ui/core";
import theme from "./theme";
import useStyles from "./use-styles";

import Dashboard from "./dashboard";
import clsx from "clsx";

type AppProps = {};

const App: FunctionComponent<AppProps> = (props) => {
  const classes = useStyles();
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <Box className={clsx(classes.root)}>
          <Dashboard />
        </Box>
      </CssBaseline>
    </ThemeProvider>
  );
};

export default App;
