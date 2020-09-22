import { AreaSeries, ArgumentScale, Stack } from "@devexpress/dx-react-chart";
import { scaleBand } from "@devexpress/dx-chart-core";
import {
  ArgumentAxis,
  ValueAxis,
  Chart,
  LineSeries,
  Legend,
  Title,
} from "@devexpress/dx-react-chart-material-ui";

import {
  createStyles,
  makeStyles,
  Paper,
  Tabs,
  Theme,
} from "@material-ui/core";
import React, { ChangeEvent, useState } from "react";
import { useContext } from "react";
import { HorizontalTab } from "../../../common/components/tabs";
import { LoadProfileContext } from "../../../loadprofile/LoadProfileContextProvider";

import { MonthlyLoadProfile } from "../../../loadprofile/objects";

type GraphContentProps = {};

const GraphContent: React.FunctionComponent<GraphContentProps> = (
  props: GraphContentProps
) => {
  const { ...others } = props;
  const loadProfileContext = useContext(LoadProfileContext);
  const classes = useStyles();

  const [selectedTab, setSelectedTab] = useState<string>("");

  function handleTabChange(event: ChangeEvent<{}>, newTab: string) {
    setSelectedTab(newTab);
  }

  type TabPanelProps = {
    monthlyLoadProfile: MonthlyLoadProfile;
    value: string;
    index: string;
  };

  function GraphTabPanel(props: TabPanelProps) {
    const { monthlyLoadProfile, value, index } = props;
    if (index === value) {
      return (
        <Paper className={classes.graphContent}>
          <Chart data={[...monthlyLoadProfile.data.values()]}>
            <ArgumentScale factory={scaleBand} />
            <ArgumentAxis showGrid />
            <ValueAxis showGrid />
            {[...monthlyLoadProfile.loadProfiles.values()].map((data) => {
              return (
                <LineSeries
                  valueField={data.meteringPoint}
                  argumentField="date"
                  name={data.meteringPoint}
                />
              );
            })}
            <Stack />
            <Legend />
            <Title
              text={`Billing Period: ${monthlyLoadProfile.billingPeriod.toString()}`}
            />
          </Chart>
        </Paper>
      );
    } else {
      return <></>;
    }
  }

  return (
    <div className={classes.graphContent_root}>
      <div>
        <Tabs
          onChange={handleTabChange}
          indicatorColor="primary"
          value={selectedTab}
        >
          {[...loadProfileContext.monthlyLoadProfiles.values()].map(
            (monthlyLoadProfile) => {
              return (
                <HorizontalTab
                  key={monthlyLoadProfile.billingPeriod.toString()}
                  value={monthlyLoadProfile.billingPeriod.toString()}
                  label={monthlyLoadProfile.billingPeriod.toString()}
                />
              );
            }
          )}
        </Tabs>
      </div>
      <div className={classes.graphContent_graphsContainer}>
        {[...loadProfileContext.monthlyLoadProfiles.values()].map(
          (monthlyLoadpRofile) => {
            return (
              <GraphTabPanel
                monthlyLoadProfile={monthlyLoadpRofile}
                key={`TB ${monthlyLoadpRofile.billingPeriod.toString()}`}
                index={monthlyLoadpRofile.billingPeriod.toString()}
                value={selectedTab}
              />
            );
          }
        )}
      </div>
    </div>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    graphContent_root: {
      height: "100%",
      display: "flex",
      flexDirection: "column",
    },
    graphContent_graphsContainer: {
      flex: 1,
      flexShrink: 0,
      padding: theme.spacing(4),
    },
    graphContent: {
      padding: theme.spacing(3),
    },
  })
);

export default GraphContent;
