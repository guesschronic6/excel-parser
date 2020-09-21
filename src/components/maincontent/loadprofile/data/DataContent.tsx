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
    <div className={classes.dataContent_content}>
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
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  dataContent_content: {
    display: "flex",
    flexWrap: "nowrap",
    gap: `${theme.spacing(3)}px`,
    boxSizing: "border-box",
    padding: theme.spacing(5),
    width: 0,
  },
}));

export default DataContent;
