import { Tabs, Typography, Box } from "@material-ui/core";
import React, { ChangeEvent, useState } from "react";
import useStyles from "./use-styles";
import {
  LoadProfileSettingsPanel,
  MonthlyInterruptionSettingsPanel,
} from "./tabpanels";
import { VerticalTab } from "../common/components/tabs";
import PowerSubstationPanel from "./tabpanels/PowerSubstationPanel";

type SettingsProps = {};

enum SettingsTabs {
  LOADPROFILE_TAB = "lp_tab",
  MONTHLYINTERRUPTION_TAB = "mi_tab",
  POWERSUBSTATION_TAB = "ps_tab",
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
    SettingsTabs.LOADPROFILE_TAB
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
          <VerticalTab
            label="Load Profile Settings"
            value={SettingsTabs.LOADPROFILE_TAB}
          />
          <VerticalTab
            value={SettingsTabs.MONTHLYINTERRUPTION_TAB}
            label="Monthly Interruption Settings"
          />
          <VerticalTab
            value={SettingsTabs.POWERSUBSTATION_TAB}
            label="Power Substation Settings"
          />
        </Tabs>
        <TabPanel value={selectedTab} index={SettingsTabs.LOADPROFILE_TAB}>
          <LoadProfileSettingsPanel />
        </TabPanel>
        <TabPanel
          value={selectedTab}
          index={SettingsTabs.MONTHLYINTERRUPTION_TAB}
        >
          <MonthlyInterruptionSettingsPanel />
        </TabPanel>
        <TabPanel value={selectedTab} index={SettingsTabs.POWERSUBSTATION_TAB}>
          <PowerSubstationPanel />
        </TabPanel>
      </div>
    </div>
  );
};

export default Settings;
