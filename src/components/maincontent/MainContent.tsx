import { makeStyles, Tabs, Theme } from "@material-ui/core";
import React, { ChangeEvent, useState } from "react";
import { VerticalTab } from "../common/components/tabs";
import LoadProfileContent from "./loadprofile/LoadProfileContent";
type MainContentProps = {};

enum ContentTabs {
  LOAD_PROFILE = "loadprofile",
  SUBSTATION_REPORT = "substationreport",
}

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
          <VerticalTab
            label="Substation Report"
            value={ContentTabs.SUBSTATION_REPORT}
          />
        </Tabs>
      </div>
      <div className={classes.mainContent_content}>
        {selectedTab === ContentTabs.LOAD_PROFILE && <LoadProfileContent />}
      </div>
    </div>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  maincontent_root: {
    height: "100%",
    display: "flex",
  },
  tabs_container: {
    marginTop: theme.spacing(10),
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
