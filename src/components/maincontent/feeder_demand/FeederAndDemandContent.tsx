import { createStyles, makeStyles, Tabs, Theme } from "@material-ui/core";
import React, { ChangeEvent } from "react";
import { useState } from "react";
import { HorizontalTab } from "../../styled_components";
import FeederAndDemand from "../../feeder_and_demand/objects/FeederAndDemand";
import MonthlyFeederCard from "./data/MonthlyFeederCard";

type FeederAndDemandContentProps = {
  feederAndDemand: FeederAndDemand;
  index: string;
  value: string;
};

enum DataTab {
  DATA = "data",
  GRAPH = "graph",
  NONE = "",
}

type TabPanelProps = {
  value: string;
  index: string;
  children: any;
};

function TabPanel(props: TabPanelProps) {
  const { value, index, children } = props;
  const classes = useStyles();

  return value === index ? (
    <div className={classes.loadProfileContent_tabPanel}>{children}</div>
  ) : (
    <></>
  );
}

const FeederAndDemandContent: React.FunctionComponent<FeederAndDemandContentProps> = (
  props
) => {
  const { feederAndDemand, index, value } = props;
  const [selectedTab, setSelectedTab] = useState<string>(DataTab.DATA);
  const classes = useStyles();

  function handleTabChange(event: ChangeEvent<{}>, newTab: string) {
    setSelectedTab(newTab);
  }

  return index === value ? (
    <div className={classes.loadProfileContent_root}>
      <div>
        <Tabs
          onChange={handleTabChange}
          indicatorColor="primary"
          value={selectedTab}
        >
          <HorizontalTab label="Data" value={DataTab.DATA} />
          <HorizontalTab label="Graph" value={DataTab.GRAPH} />
        </Tabs>
      </div>
      <TabPanel index={DataTab.DATA} value={selectedTab}>
        <MonthlyFeederCard feederAndDemand={feederAndDemand} />
      </TabPanel>
      {/* <TabPanel index={DataTab.GRAPH} value={selectedTab}></TabPanel> */}
    </div>
  ) : (
    <></>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    loadProfileContent_root: {
      height: "100%",
      display: "flex",
      flexDirection: "column",
    },
    loadProfileContent_tabPanel: {
      flex: 1,
      padding: theme.spacing(3),
    },
  })
);

export default FeederAndDemandContent;
