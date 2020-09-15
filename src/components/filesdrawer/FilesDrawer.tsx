import { Accordion, Drawer } from "@material-ui/core";
import React, { useState } from "react";
import useStyles from "./use-styles";

type FilesDrawerProps = {
  open: boolean;
};

const FilesDrawer: React.FunctionComponent<FilesDrawerProps> = ({
  open,
  ...others
}) => {
  const classes = useStyles();
  return (
    <Drawer
      variant="persistent"
      open={open}
      anchor="left"
      className={classes.drawer}
      classes={{ paper: classes.drawerPaper }}
    ></Drawer>
  );
};

export default FilesDrawer;
