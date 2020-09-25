import { makeStyles, Tabs, Theme, Typography } from "@material-ui/core";
import React, { ChangeEvent, useContext, useState } from "react";
import { HorizontalTab } from "../../common/components/tabs";
import { PowerTransformerLossContext } from "../../power_transformer_loss/PowerTransformerLossContextProvider";
import PowerTransformerLossContent from "./PowerTransformerLossContent";

type PowerTransformerLossRootProps = {};

const PowerTransformerLossContentRoot: React.FunctionComponent<PowerTransformerLossRootProps> = ({
  ...others
}) => {
  const classes = useStyles();
  const [selectedTab, setSelectedTab] = useState<string>("");
  const powerTransformerLossContext = useContext(PowerTransformerLossContext);

  function handleTabChange(event: ChangeEvent<{}>, newTab: string) {
    setSelectedTab(newTab);
  }
  return (
    <div className={classes.feederAndDemandContent_root}>
      <div className={classes.feederAndDemand_header}>
        <Typography className={classes.feederAndDemand_title} variant="h5">
          Power Transformer Loss
        </Typography>
        <Tabs
          onChange={handleTabChange}
          indicatorColor="primary"
          value={selectedTab}
        >
          {[
            ...powerTransformerLossContext.monthlyPowerTransformerLoss.powerTransformerLosses.values(),
          ].map((powerTransformerLoss) => {
            return (
              <HorizontalTab
                label={powerTransformerLoss.billingPeriod.toString()}
                value={powerTransformerLoss.billingPeriod.toString()}
                key={`T: ${powerTransformerLoss.billingPeriod.toString()}`}
              />
            );
          })}
        </Tabs>
      </div>
      <div className={classes.feederAndDemand_contentContainer}>
        <div className={classes.feederAndDemandContent}>
          {[
            ...powerTransformerLossContext.monthlyPowerTransformerLoss.powerTransformerLosses.values(),
          ].map((powerTransformerLoss) => {
            return (
              <PowerTransformerLossContent
                key={`FDC:BP:${powerTransformerLoss.billingPeriod.toString()}`}
                powerTransformerLoss={powerTransformerLoss}
                value={selectedTab}
                index={powerTransformerLoss.billingPeriod.toString()}
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

export default PowerTransformerLossContentRoot;
