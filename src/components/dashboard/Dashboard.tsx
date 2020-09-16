import { Typography, Box } from "@material-ui/core";
import React, { useState } from "react";
import useStyles from "./use-style";

import Toolbar from "../toolbar";
import FilesDrawer, { useStyles as filesDrawerStyles } from "../filesdrawer";
import clsx from "clsx";
import Settings from "../settings";
type DashboardProps = {};

const Dashboard: React.FC<DashboardProps> = (props) => {
  const classes = useStyles();
  const filesDrawerClasses = filesDrawerStyles();

  const [openFilesDrawer, setOpenFilesDrawer] = useState<boolean>(true);
  const [openSettings, setOpenSettings] = useState<boolean>(true);

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
    <Box className={classes.root}>
      <Toolbar
        onSettingsToggled={handleSettingsToggle}
        onSettingsUntoggled={handleSettingsUntoggle}
        onFilesToggled={handleFilesToggle}
        onFilesUntoggled={handleFilesUntoggle}
      />
      <FilesDrawer open={openFilesDrawer} />
      <div
        className={clsx(classes.content, filesDrawerClasses.content, {
          [filesDrawerClasses.contentShift]: openFilesDrawer,
        })}
      >
        {openSettings && <Settings />}
      </div>
    </Box>
  );
};

export default Dashboard;
