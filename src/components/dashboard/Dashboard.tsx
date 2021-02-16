import React, { useState } from "react";

import Toolbar from "../toolbar";
import FilesDrawer, { useStyles as filesDrawerStyles } from "../filesdrawer";
import clsx from "clsx";
import Settings from "../settings";
import { MainContent } from "../maincontent";
import { makeStyles, Theme } from "@material-ui/core";
type DashboardProps = {};

const Dashboard: React.FC<DashboardProps> = (props) => {
  const classes = useStyles();
  const filesDrawerClasses = filesDrawerStyles();

  const [openFilesDrawer, setOpenFilesDrawer] = useState<boolean>(true);
  const [openSettings, setOpenSettings] = useState<boolean>(false);

  function handleSettingsToggle() {
    setOpenSettings(true);
  }

  function handleSettingsUntoggle() {
    setOpenSettings(false);
  }

  function handleFilesToggle() {
    setOpenFilesDrawer(true);
  }

  function handleFilesUntoggle() {
    setOpenFilesDrawer(false);
  }

  return (
    <div className={classes.dashboard_root}>
      <Toolbar
        onSettingsToggled={handleSettingsToggle}
        onSettingsUntoggled={handleSettingsUntoggle}
        onFilesToggled={handleFilesToggle}
        onFilesUntoggled={handleFilesUntoggle}
      />
      <FilesDrawer open={openFilesDrawer} />
      <div
        className={clsx(classes.dashboard_content, filesDrawerClasses.content, {
          [filesDrawerClasses.contentShift]: openFilesDrawer,
        })}
      >
        {openSettings && <Settings />}
        <MainContent />
      </div>
    </div>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  dashboard_root: {
    display: "flex",
    height: "100%",
  },
  dashboard_content: {
    flex: 1,
    position: "relative",
    minHeight: "0px",
    width: 0,
  },
}));

export default Dashboard;
