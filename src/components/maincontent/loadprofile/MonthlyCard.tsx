import {
  Card,
  CardHeader,
  makeStyles,
  Theme,
  Typography,
  CardContent,
} from "@material-ui/core";
import React from "react";
import { LoadProfile_Month } from "../../loadprofile/objects";
import { Month } from "../../enums";
import DaysCard from "./DaysCard";
type MonthlyCardProps = {
  loadProfileMonth: LoadProfile_Month;
};

const MonthlyCard: React.FunctionComponent<MonthlyCardProps> = ({
  loadProfileMonth,
  ...others
}) => {
  const classes = useStyles();
  return (
    <div className={classes.card}>
      <CardHeader title={Month[loadProfileMonth.month - 1]} />

      <CardContent className={classes.cardContent}>
        {loadProfileMonth.loadProfileDays.map((lpDays) => {
          return <DaysCard key={lpDays.day} loadProfileDay={lpDays}></DaysCard>;
        })}
      </CardContent>
    </div>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  card: {
    display: "inline-block",
    backgroundColor: theme.palette.background.paper,
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius,
    margin: theme.spacing(5),
  },
  cardContent: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    maxWidth: "800px",
    gap: "10px",
  },
}));

export default MonthlyCard;
