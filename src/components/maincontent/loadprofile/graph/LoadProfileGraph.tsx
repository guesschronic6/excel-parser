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

import { createStyles, makeStyles, Paper, Theme } from "@material-ui/core";
import React from "react";

import { MonthlyLoadProfile } from "../../../loadprofile/objects";

type LoadProfileGraphProps = {
  monthlyLoadProfile: MonthlyLoadProfile;
};

const LoadProfileGraph: React.FunctionComponent<LoadProfileGraphProps> = (
  props
) => {
  const { monthlyLoadProfile, ...others } = props;
  const classes = useStyles();

  return (
    <Paper className={classes.graphContent}>
      <Chart data={[...monthlyLoadProfile.chartData.values()]}>
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
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    graphContent: {
      padding: theme.spacing(3),
    },
  })
);

export default LoadProfileGraph;
