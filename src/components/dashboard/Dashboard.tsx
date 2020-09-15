import { Typography, Box } from "@material-ui/core";
import React, { useState } from "react";
import useStyles from "./use-style";

import Toolbar from "../toolbar";
import FilesDrawer, { useStyles as filesDrawerStyles } from "../filesdrawer";
import clsx from "clsx";
type DashboardProps = {};

const Dashboard: React.FC<DashboardProps> = (props) => {
  const classes = useStyles();
  const filesDrawerClasses = filesDrawerStyles();

  const [openFilesDrawer, setOpenFilesDrawer] = useState<boolean>(true);

  function handleSettingsClick() {}

  function handleFilesToggle() {
    setOpenFilesDrawer(true);
  }

  function handleFilesUntoggle() {
    setOpenFilesDrawer(false);
  }

  return (
    <Box className={classes.root}>
      <Toolbar
        onSettingsClicked={handleSettingsClick}
        onFilesToggled={handleFilesToggle}
        onFilesUntoggled={handleFilesUntoggle}
      />
      <FilesDrawer open={openFilesDrawer} />
      <div
        className={clsx(filesDrawerClasses.content, {
          [filesDrawerClasses.contentShift]: openFilesDrawer,
        })}
      >
        {" "}
        <Typography variant="h1">CONTENT HERE</Typography>
      </div>
    </Box>
  );
};

export default Dashboard;
