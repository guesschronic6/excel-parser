import { makeStyles, Theme, Typography, Divider } from "@material-ui/core";
import React from "react";
import { MonthlyLoadProfile } from "../../loadprofile/objects";
import { Month } from "../../enums";
import DaysCard from "./DaysCard";
type MonthlyCardProps = {
  monthlyLoadProfile: MonthlyLoadProfile;
};

const MonthlyCard: React.FunctionComponent<MonthlyCardProps> = ({
  monthlyLoadProfile,
  ...others
}) => {
  const classes = useStyles();
  return (
    <div className={classes.card}>
      <div className={classes.cardHeader}>
        <Typography variant="h6" className={classes.cardTitle}>{`${
          Month[monthlyLoadProfile.billingPeriod.month - 1]
        } ${monthlyLoadProfile.billingPeriod.year}`}</Typography>
        <Divider />
      </div>
      <div className={classes.cardContent}>
        {[...monthlyLoadProfile.dateStrings.values()].map((dateString) => {
          return (
            <DaysCard
              key={`MC: M:${monthlyLoadProfile.billingPeriod.month} Y:${monthlyLoadProfile.billingPeriod.year} D:${dateString}`}
              monthlyLoadProfile={monthlyLoadProfile}
              dateString={dateString}
            />
          );
        })}
      </div>
    </div>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  card: {
    display: "inline-block",
    backgroundColor: "transparent",
    margin: theme.spacing(5),
    fontSize: "1rem",
  },
  cardContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    flexWrap: "wrap",
    maxWidth: "800px",
    gap: "10px",
  },
  cardHeader: {
    padding: theme.spacing(2),
    fontSize: "1em",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  cardTitle: {
    fontSize: "1.5em",
  },
}));

export default MonthlyCard;
