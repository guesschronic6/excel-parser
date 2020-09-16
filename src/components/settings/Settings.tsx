import classes from "*.module.css";
import { Tabs, Typography, Tab, Box } from "@material-ui/core";
import React, { ChangeEvent, useState } from "react";
import useStyles from "./use-styles";
import { LoadProfileSettingsPanel } from "./tabpanels";
import { LoadProfile } from "../common";

type SettingsProps = {};

enum SettingsTabs {
  LoadProfileTab = "lp_tab",
  FeederDemandTab = "fd_tab",
}

function CustomTab({
  label,
  value,
  ...others
}: {
  label: string;
  value: string;
}) {
  const classes = useStyles();
  return (
    <Tab
      classes={{
        root: classes.tab,
        wrapper: classes.tab_wrapper,
        selected: classes.tab_selected,
      }}
      value={value}
      label={label}
      {...others}
    />
  );
}
interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  const classes = useStyles();
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-prevent-tabpanel-${index}`}
      aria-labelledby={`scrollable-prevent-tab-${index}`}
      className={classes.tab_panel}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

const Settings: React.FunctionComponent<SettingsProps> = ({ ...others }) => {
  const [selectedTab, setSelectedTab] = useState<string>(
    SettingsTabs.LoadProfileTab
  );

  const classes = useStyles();

  function handleTabChange(event: ChangeEvent<{}>, newTab: string) {
    setSelectedTab(newTab);
  }

  return (
    <div className={classes.root}>
      <div className={classes.title_div}>
        <Typography className={classes.title}>Settings</Typography>
      </div>
      <div className={classes.content}>
        <Tabs
          className={classes.tabs}
          orientation="vertical"
          value={selectedTab}
          centered={false}
          indicatorColor="primary"
          onChange={handleTabChange}
        >
          <CustomTab
            label="Load Profile Settings"
            value={SettingsTabs.LoadProfileTab}
          />
          <CustomTab
            value={SettingsTabs.FeederDemandTab}
            label="Feeder and Demand Settings"
          />
        </Tabs>
        <TabPanel value={selectedTab} index={SettingsTabs.LoadProfileTab}>
          <LoadProfileSettingsPanel />
        </TabPanel>
        <div>{selectedTab === SettingsTabs.LoadProfileTab && <></>}</div>
      </div>
    </div>
  );
};

export default Settings;
