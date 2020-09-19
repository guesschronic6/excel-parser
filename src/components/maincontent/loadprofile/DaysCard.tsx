import { makeStyles, Theme, Typography, Divider } from "@material-ui/core";
import React from "react";
import {
  DailyLoadProfile,
  LoadProfile,
  MonthlyLoadProfile,
} from "../../loadprofile/objects";
import HourCard from "./HourCard";
import HeaderCell from "./HeaderCell";
import BodyCell from "./BodyCell";
import { Month } from "../../enums";

type DaysCardProp = {
  monthlyLoadProfile: MonthlyLoadProfile;
  dateString: string;
};

const DaysCard: React.FunctionComponent<DaysCardProp> = ({
  monthlyLoadProfile,
  dateString,
  ...others
}) => {
  const classes = useStyles();
  let date = new Date(dateString);

  return (
    <div className={classes.root}>
      <div className={classes.cardHeader}>
        <Typography className={classes.cardTitle} variant="caption">{`${
          Month[date.getMonth() - 1]
        }, ${date.getDate()}`}</Typography>
        <Divider />
      </div>
      <div className={classes.cardContent}>
        <div className={classes.column}>
          <HeaderCell value="Hours" />
          {[...Array(24).keys()].map((hour) => {
            return (
              <BodyCell
                key={`MC: M:${monthlyLoadProfile.billingPeriod.month} Y:${monthlyLoadProfile.billingPeriod.year} D:${dateString} H:${hour}`}
                variant="description"
                value={(hour + 1).toString()}
              />
            );
          })}
        </div>
        {[...Array.from(monthlyLoadProfile.loadProfiles.values())].map(
          (loadProfile) => {
            return (
              <div
                key={`MC: M:${monthlyLoadProfile.billingPeriod.month} Y:${monthlyLoadProfile.billingPeriod.year} D:${dateString} T:${loadProfile.meteringPoint}`}
                className={classes.column}
              >
                <HeaderCell value={loadProfile.meteringPoint} />
                {loadProfile
                  .getDailyLoadProfile(dateString)
                  .hourlyLoadProfiles.map((lpHours) => (
                    <BodyCell
                      key={`MC: M:${monthlyLoadProfile.billingPeriod.month} Y:${monthlyLoadProfile.billingPeriod.year} D:${dateString} T:${loadProfile.meteringPoint} H:${lpHours.hour}`}
                      variant="info"
                      value={lpHours.getTotalKwdel().toFixed(2)}
                    />
                  ))}
              </div>
            );
          }
        )}
      </div>
    </div>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "inline-block",
    backgroundColor: "inherit",
    marginLeft: theme.spacing(3),
  },
  cardContent: {
    display: "flex",
    padding: `0px ${theme.spacing(1)}px`,
    marginTop: theme.spacing(1),
  },
  cardHeader: {
    display: "flex",
    flexDirection: "column",
    gap: "5px",
    padding: theme.spacing(1),
  },
  cardTitle: {
    fontSize: "0.9em",
    textTransform: "lowercase",
  },
  column: {
    display: "flex",
    flexDirection: "column",
  },
}));

export default DaysCard;
