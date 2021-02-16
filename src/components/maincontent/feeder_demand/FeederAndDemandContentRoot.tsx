import { makeStyles, Tabs, Theme, Typography } from "@material-ui/core";
import React, { ChangeEvent, useContext, useState } from "react";
import { HorizontalTab } from "../../styled_components";
import { FeederAndDemandContext } from "../../feeder_and_demand/FeederAndDemandContextProvider";
import FeederAndDemandContent from "./FeederAndDemandContent";

type FeederAndDemandContentRootProps = {};

const FeederAndDemandContentRoot: React.FunctionComponent<FeederAndDemandContentRootProps> = ({
  ...others
}) => {
  const classes = useStyles();
  const [selectedTab, setSelectedTab] = useState<string>("");
  const feederAndDemandContext = useContext(FeederAndDemandContext);

  function handleTabChange(event: ChangeEvent<{}>, newTab: string) {
    setSelectedTab(newTab);
  }
  return (
    <div className={classes.feederAndDemandContent_root}>
      <div className={classes.feederAndDemand_header}>
        <Typography className={classes.feederAndDemand_title} variant="h5">
          Feeder Demand and Outages :D
        </Typography>
        <Tabs
          onChange={handleTabChange}
          indicatorColor="primary"
          value={selectedTab}
        >
          {[
            ...feederAndDemandContext.monthlyFeederAndDemand.feederAndDemands.values(),
          ].map((feederAndDemands) => {
            return (
              <HorizontalTab
                label={feederAndDemands.billingPeriod.toString()}
                value={feederAndDemands.billingPeriod.toString()}
                key={`T: ${feederAndDemands.billingPeriod.toString()}`}
              />
            );
          })}
        </Tabs>
      </div>
      <div className={classes.feederAndDemand_contentContainer}>
        <div className={classes.feederAndDemandContent}>
          {[
            ...feederAndDemandContext.monthlyFeederAndDemand.feederAndDemands.values(),
          ].map((feederAndDemand) => {
            return (
              <FeederAndDemandContent
                key={`FDC:BP:${feederAndDemand.billingPeriod.toString()}`}
                feederAndDemand={feederAndDemand}
                value={selectedTab}
                index={feederAndDemand.billingPeriod.toString()}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  feederAndDemandContent_root: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    minHeight: "0px",
    minWidth: "0px",
  },
  feederAndDemand_header: {
    display: "flex",
    alignItems: "flex-end",
  },
  feederAndDemand_title: {
    marginRight: theme.spacing(1),
    paddingRight: theme.spacing(3),
    textAlign: "center",
  },
  feederAndDemand_contentContainer: {
    flex: 1,
    overflow: "auto",
    display: "flex",
    flexWrap: "nowrap",
  },
  feederAndDemandContent: {
    flex: 1,
  },
}));

export default FeederAndDemandContentRoot;
