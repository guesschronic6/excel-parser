import React, { FunctionComponent } from "react";
import {
  CssBaseline,
  ThemeProvider,
  makeStyles,
  Theme,
} from "@material-ui/core";
import theme from "./theme";
import LoadProfileContextProvider from "./loadprofile/LoadProfileContextProvider";
import Dashboard from "./dashboard";
import clsx from "clsx";
import FeederAndDemandContextProvider from "./feeder_and_demand/FeederAndDemandContextProvider";
import PowerTransformerLossContextProvider from "./power_transformer_loss/PowerTransformerLossContextProvider";

type AppProps = {};

const App: FunctionComponent<AppProps> = (props) => {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <LoadProfileContextProvider>
          <FeederAndDemandContextProvider>
            <PowerTransformerLossContextProvider>
              <div className={clsx(classes.root)}>
                <Dashboard />
              </div>
            </PowerTransformerLossContextProvider>
          </FeederAndDemandContextProvider>
        </LoadProfileContextProvider>
      </CssBaseline>
    </ThemeProvider>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    height: "100vh",
    backgroundColor: theme.palette.background.default,
  },
}));

export default App;
