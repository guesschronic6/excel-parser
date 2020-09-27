import { createStyles, makeStyles, Tabs, Theme } from "@material-ui/core";
import React, { ChangeEvent } from "react";
import { useState } from "react";
import { HorizontalTab } from "../../styled_components";
import { MonthlyLoadProfile } from "../../loadprofile/objects";
import MonthlyCard from "./data/MonthlyCard";
import LoadProfileGraph from "./graph/LoadProfileGraph";

type LoadProfileContentProps = {
  monthlyLoadProfile: MonthlyLoadProfile;
  index: string;
  value: string;
};

enum DataTab {
  DATA = "data",
  GRAPH = "graph",
  NONE = "",
}

type TabPanelProps = {
  monthlyLoadpRofile: MonthlyLoadProfile;
  value: string;
  index: string;
  children: any;
};

function TabPanel(props: TabPanelProps) {
  const { monthlyLoadpRofile, value, index, children } = props;
  const classes = useStyles();

  return value === index ? (
    <div className={classes.loadProfileContent_tabPanel}>{children}</div>
  ) : (
    <></>
  );
}

const LoadProfileContent: React.FunctionComponent<LoadProfileContentProps> = (
  props
) => {
  const { monthlyLoadProfile, index, value } = props;
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
      <TabPanel
        index={DataTab.DATA}
        value={selectedTab}
        monthlyLoadpRofile={monthlyLoadProfile}
      >
        <MonthlyCard monthlyLoadProfile={monthlyLoadProfile} />
      </TabPanel>
      <TabPanel
        index={DataTab.GRAPH}
        value={selectedTab}
        monthlyLoadpRofile={monthlyLoadProfile}
      >
        <LoadProfileGraph monthlyLoadProfile={monthlyLoadProfile} />
      </TabPanel>
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

export default LoadProfileContent;
