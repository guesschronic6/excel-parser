import classes from "*.module.css";
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
    <div className={classes.root}>
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
      <div className={classes.content}>
        {selectedTab === ContentTabs.LOAD_PROFILE && <LoadProfileContent />}
      </div>
    </div>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    display: "flex",
    justifyContent: "stretch",
    height: "100%",
    width: "100%",
    maxHeight: "100%",
    maxWidth: "100%",
  },
  tabs_container: {
    marginTop: theme.spacing(10),
    maxWidth: "300px",
  },
  tabs: {
    display: "inline-block",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(2),
  },
}));

export default MainContent;
