import { makeStyles, Tabs, Theme } from "@material-ui/core";
import React, { ChangeEvent, useState } from "react";
import { VerticalTab } from "../styled_components";
import LoadProfileTabPanel from "./loadprofile/LoadProfileTabPanel";
import FeederAndDemandContentRoot from "./feeder_demand/FeederAndDemandContentRoot";
import PowerTransformerLossContentRoot from "./power_transformer_loss/PowerTransformerLossContentRoot";
type MainContentProps = {};

enum ContentTabs {
  LOAD_PROFILE = "lp",
  SUBSTATION_LOSS = "ssl",
  FEEDERDEMAND_OUTAGED = "fdo",
  POWER_BILL = "pbl",
  POWER_TRANSFORMER_LOSS = "pts",
}

type TabPanelProps = {
  index: string;
  value: string;
};

const TabPanel: React.FunctionComponent<TabPanelProps> = (props) => {
  const { value, index, ...others } = props;
  const classes = useStyles();
  return value === index ? (
    <div className={classes.mainContent_content}>{props.children}</div>
  ) : (
    <></>
  );
};

const MainContent: React.FunctionComponent<MainContentProps> = ({
  ...others
}) => {
  const classes = useStyles();
  const [selectedTab, setSelectedTab] = useState<string>(
    ContentTabs.LOAD_PROFILE
  );

  function handleTabChange(event: ChangeEvent<{}>, newTab: string) {
    setSelectedTab(newTab);
  }

  return (
    <div className={classes.maincontent_root}>
      <div className={classes.tabs_container}>
        <Tabs
          className={classes.tabs}
          orientation="vertical"
          value={selectedTab}
          centered={false}
          indicatorColor="primary"
          onChange={handleTabChange}
        >
          <VerticalTab label="Load Profile" value={ContentTabs.LOAD_PROFILE} />
          <VerticalTab label="Power Bill" value={ContentTabs.POWER_BILL} />
          <VerticalTab
            label="Feeder Demand and Outages"
            value={ContentTabs.FEEDERDEMAND_OUTAGED}
          />
          <VerticalTab
            label="Substation Loss"
            value={ContentTabs.SUBSTATION_LOSS}
          />
          <VerticalTab
            label="Power Transformer Loss"
            value={ContentTabs.POWER_TRANSFORMER_LOSS}
          />
        </Tabs>
      </div>
      <TabPanel value={selectedTab} index={ContentTabs.LOAD_PROFILE}>
        <LoadProfileTabPanel />
      </TabPanel>
      <TabPanel value={selectedTab} index={ContentTabs.FEEDERDEMAND_OUTAGED}>
        <FeederAndDemandContentRoot />
      </TabPanel>
      <TabPanel value={selectedTab} index={ContentTabs.POWER_TRANSFORMER_LOSS}>
        <PowerTransformerLossContentRoot />
      </TabPanel>
    </div>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  maincontent_root: {
    height: "100%",
    display: "flex",
  },
  tabs_container: {
    marginTop: theme.spacing(12),
    maxWidth: "300px",
    flexGrow: 0,
  },
  tabs: {
    display: "inline-block",
  },
  mainContent_content: {
    flex: 1,
    width: 0,
  },
}));

export default MainContent;
