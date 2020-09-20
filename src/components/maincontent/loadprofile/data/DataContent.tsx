import { makeStyles, Theme } from "@material-ui/core";
import { LoadProfileContext } from "../../../loadprofile/LoadProfileContextProvider";
import React, { useContext } from "react";

import MonthlyCard from "./MonthlyCard";

type DataContentProps = {};

const DataContent: React.FunctionComponent<DataContentProps> = ({
  ...others
}) => {
  const loadProfileContext = useContext(LoadProfileContext);
  const classes = useStyles();

  return (
    <div className={classes.dateCotnent_root}>
      <div className={classes.dateCotnent_content}>
        {Array.from(loadProfileContext.monthlyLoadProfiles.values()).map(
          (monthlyLoadProfile) => {
            return (
              <MonthlyCard
                key={`MCM:${monthlyLoadProfile.billingPeriod.month}Y:${monthlyLoadProfile.billingPeriod.year}`}
                monthlyLoadProfile={monthlyLoadProfile}
              />
            );
          }
        )}
      </div>
    </div>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  dateCotnent_root: {
    flex: 1,
    overflow: "auto",
    padding: theme.spacing(4),
  },
  dateCotnent_content: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "stretch",
    padding: theme.spacing(5),
    gap: `${theme.spacing(3)}px`,
    boxSizing: "border-box",
  },
}));

export default DataContent;
