import { makeStyles, Tabs, Theme, Typography } from "@material-ui/core";
import React, { ChangeEvent, useContext, useState } from "react";
import { HorizontalTab } from "../../styled_components";
import { LoadProfileContext } from "../../loadprofile/LoadProfileContextProvider";
import LoadProfileContent from "./LoadProfileContent";

type LoadProfileContentProps = {};

const LoadProfileTabPanel: React.FunctionComponent<LoadProfileContentProps> = ({
  ...others
}) => {
  const classes = useStyles();
  const [selectedTab, setSelectedTab] = useState<string>("");
  const loadProfileContext = useContext(LoadProfileContext);

  function handleTabChange(event: ChangeEvent<{}>, newTab: string) {
    setSelectedTab(newTab);
  }
  return (
    <div className={classes.loadProfileContent_root}>
      <div className={classes.loadProfileContent_Header}>
        <Typography className={classes.loadProfileContent_Title} variant="h5">
          Load Profile
        </Typography>
        <Tabs
          onChange={handleTabChange}
          indicatorColor="primary"
          value={selectedTab}
        >
          {[...loadProfileContext.monthlyLoadProfiles.values()].map(
            (monthlyLoadProfile) => {
              return (
                <HorizontalTab
                  label={monthlyLoadProfile.billingPeriod.toString()}
                  value={monthlyLoadProfile.billingPeriod.toString()}
                  key={`T: ${monthlyLoadProfile.billingPeriod.toString()}`}
                />
              );
            }
          )}
        </Tabs>
      </div>
      <div className={classes.loadProfileContent_contentWrapper}>
        <div className={classes.loadProfileContent_content}>
          {[...loadProfileContext.monthlyLoadProfiles.values()].map(
            (monthlyLoadProfile) => {
              return (
                <LoadProfileContent
                  key={`C: ${monthlyLoadProfile.billingPeriod.toString()}`}
                  monthlyLoadProfile={monthlyLoadProfile}
                  value={selectedTab}
                  index={monthlyLoadProfile.billingPeriod.toString()}
                />
              );
            }
          )}
        </div>
      </div>
    </div>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  loadProfileContent_root: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    minHeight: "0px",
    minWidth: "0px",
  },
  loadProfileContent_Header: {
    display: "flex",
    alignItems: "flex-end",
  },
  loadProfileContent_Title: {
    marginRight: theme.spacing(1),
    paddingRight: theme.spacing(3),
    textAlign: "center",
  },
  loadProfileContent_contentWrapper: {
    flex: 1,
    overflow: "auto",
    display: "flex",
    flexWrap: "nowrap",
  },
  loadProfileContent_content: {
    flex: 1,
  },
}));

export default LoadProfileTabPanel;
