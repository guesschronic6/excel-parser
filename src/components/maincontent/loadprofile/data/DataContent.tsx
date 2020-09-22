import { makeStyles, Tabs, Theme } from "@material-ui/core";
import { LoadProfileContext } from "../../../loadprofile/LoadProfileContextProvider";
import React, { ChangeEvent, useContext, useState } from "react";

import MonthlyCard from "./MonthlyCard";
import { HorizontalTab } from "../../../common/components/tabs";
import { MonthlyLoadProfile } from "../../../loadprofile/objects";

type DataContentProps = {};

type DataTabPanelProps = {
  monthlyLoadProfile: MonthlyLoadProfile;
  value: string;
  index: string;
};

function DataTabPanel(props: DataTabPanelProps) {
  const { monthlyLoadProfile, value, index } = props;
  const classes = useStyles();
  if (index === value) {
    return (
      <div className={classes.dataContent_content}>
        <MonthlyCard
          key={`MCM:${monthlyLoadProfile.billingPeriod.month}Y:${monthlyLoadProfile.billingPeriod.year}`}
          monthlyLoadProfile={monthlyLoadProfile}
        />
      </div>
    );
  } else {
    return <></>;
  }
}

const DataContent: React.FunctionComponent<DataContentProps> = ({
  ...others
}) => {
  const loadProfileContext = useContext(LoadProfileContext);
  const classes = useStyles();

  const [selectedTab, setSelectedTab] = useState<string>("");

  function handleTabChange(event: ChangeEvent<{}>, newTab: string) {
    setSelectedTab(newTab);
  }

  return (
    <div className={classes.dataContent_root}>
      <div>
        <Tabs
          onChange={handleTabChange}
          indicatorColor="primary"
          value={selectedTab}
        >
          {[...loadProfileContext.monthlyLoadProfiles.values()].map(
            (monthlyLoadProfile) => {
              return (
                <HorizontalTab
                  key={monthlyLoadProfile.billingPeriod.toString()}
                  value={monthlyLoadProfile.billingPeriod.toString()}
                  label={monthlyLoadProfile.billingPeriod.toString()}
                />
              );
            }
          )}
        </Tabs>
      </div>
      <div className={classes.dataContent_contentContainer}>
        {Array.from(loadProfileContext.monthlyLoadProfiles.values()).map(
          (monthlyLoadProfile) => {
            return (
              <DataTabPanel
                key={`TP: ${monthlyLoadProfile.billingPeriod.toString()}`}
                value={selectedTab}
                index={monthlyLoadProfile.billingPeriod.toString()}
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
  dataContent_root: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  dataContent_contentContainer: {
    flex: 1,
    display: "flex",
    padding: theme.spacing(4),
  },
  dataContent_content: {
    flexShrink: 0,
    gap: `${theme.spacing(3)}px`,
    boxSizing: "border-box",
    padding: theme.spacing(4),
  },
}));

export default DataContent;
