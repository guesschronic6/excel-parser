import { makeStyles, Theme, Typography } from "@material-ui/core";
import { LoadProfileContext } from "../../loadprofile/LoadProfileContextProvider";

import React, { useContext } from "react";
import MonthlyCard from "./MonthlyCard";

type DataContentProps = {};

const DataContent: React.FunctionComponent<DataContentProps> = ({
  ...others
}) => {
  const loadProfileContext = useContext(LoadProfileContext);
  const classes = useStyles();

  return (
    <React.Fragment>
      <div>
        {Array.from(loadProfileContext.monthlyLoadProfiles.values()).map(
          (monthlyLoadProfile) => {
            return (
              <MonthlyCard
                key={`MC: M:${monthlyLoadProfile.billingPeriod.month} Y:${monthlyLoadProfile.billingPeriod.year}`}
                monthlyLoadProfile={monthlyLoadProfile}
              />
            );
          }
        )}
      </div>
    </React.Fragment>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  root: {},
}));

export default DataContent;
