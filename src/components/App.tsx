import React, { FunctionComponent } from "react";
import {
  CssBaseline,
  ThemeProvider,
  Box,
  makeStyles,
  Theme,
} from "@material-ui/core";
import theme from "./theme";
import LoadProfileContextProvider from "./loadprofile/LoadProfileContextProvider";
import Dashboard from "./dashboard";
import clsx from "clsx";
import MonthlyInterruptionContextProvider from "./monthly_interruption/MonthlyInterruptionContextProvider";
import PowerSubstationContextProvider from "./power_substation/PowerSubstationContextProvider";
import FeederAndDemandContextProvider from "./feeder_and_demand/FeederAndDemandContextProvider";

type AppProps = {};

const App: FunctionComponent<AppProps> = (props) => {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <LoadProfileContextProvider>
          <MonthlyInterruptionContextProvider>
            <PowerSubstationContextProvider>
              <FeederAndDemandContextProvider>
                <div className={clsx(classes.root)}>
                  <Dashboard />
                </div>
              </FeederAndDemandContextProvider>
            </PowerSubstationContextProvider>
          </MonthlyInterruptionContextProvider>
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
