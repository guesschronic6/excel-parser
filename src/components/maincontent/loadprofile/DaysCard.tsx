import {
  makeStyles,
  Theme,
  Card,
  CardHeader,
  Typography,
  CardContent,
} from "@material-ui/core";
import React from "react";
import { LoadProfile_Day } from "../../loadprofile/objects";
import HourCard from "./HourCard";

type DaysCardProp = {
  loadProfileDay: LoadProfile_Day;
};

const DaysCard: React.FunctionComponent<DaysCardProp> = ({
  loadProfileDay,
  ...others
}) => {
  const classes = useStyles();
  return (
    <Card variant="outlined">
      <CardHeader title={loadProfileDay.day} />
      <CardContent>
        {loadProfileDay.loadProfile_hour.map((lpHours) => {
          return (
            <HourCard key={lpHours.hour} loadProfileHour={lpHours}></HourCard>
          );
        })}
      </CardContent>
    </Card>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  cardContent: {
    display: "flex",
    flexDirection: "column",
  },
}));

export default DaysCard;
