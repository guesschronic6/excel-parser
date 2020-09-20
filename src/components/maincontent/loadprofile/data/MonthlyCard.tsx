import { createStyles, makeStyles, Theme } from "@material-ui/core";
import React from "react";
import { MonthlyLoadProfile } from "../../../loadprofile/objects";
import DetailsTree from "./DetailsTree";
import MonthlyTree from "./MonthlyTree";

type MonthlyCardProps = {
  monthlyLoadProfile: MonthlyLoadProfile;
};

const MonthlyCard: React.FunctionComponent<MonthlyCardProps> = (props) => {
  const { monthlyLoadProfile } = props;
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <MonthlyTree monthlyLoadProfile={monthlyLoadProfile} />
      <DetailsTree monthlyLoadProfile={monthlyLoadProfile} />
    </div>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      backgroundColor: theme.palette.background.paper,
      borderRadius: theme.shape.borderRadius,
      border: `1px solid ${theme.palette.divider}`,
      boxSizing: "border-box",
    },
  })
);

export default MonthlyCard;
