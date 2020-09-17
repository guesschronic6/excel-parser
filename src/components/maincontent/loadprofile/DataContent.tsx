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
          (monthlyLP) => {
            return (
              <MonthlyCard
                key={`montlyLp_${monthlyLP.month}-${monthlyLP.year}`}
                loadProfileMonth={monthlyLP}
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
