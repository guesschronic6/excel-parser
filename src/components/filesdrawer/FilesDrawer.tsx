import { Drawer } from "@material-ui/core";
import React, { useState } from "react";
import useStyles from "./use-styles";
import LoadProfileAccordion, {
  panelName as loadProfilePanelName,
} from "./accordions/LoadProfileAccordion";
import MonthlyInterruptionAccordion from "./accordions/MonthlyInterruptionAccordion";
import PowerSubstationAccordion from "./accordions/PowerSubstationAccordion";

type FilesDrawerProps = {
  open: boolean;
};

const FilesDrawer: React.FunctionComponent<FilesDrawerProps> = ({
  open,
  ...others
}) => {
  const classes = useStyles();

  const [expandedPanel, setExpandedPanel] = useState<string>(
    loadProfilePanelName
  );

  function handlePanelChange(newExpandedPanel: string) {
    setExpandedPanel(newExpandedPanel);
  }

  return (
    <Drawer
      variant="persistent"
      open={open}
      anchor="left"
      className={classes.drawer}
      classes={{ paper: classes.drawerPaper }}
    >
      <LoadProfileAccordion
        onPanelChange={handlePanelChange}
        expandedPanel={expandedPanel}
      />
      <MonthlyInterruptionAccordion
        onPanelChange={handlePanelChange}
        expandedPanel={expandedPanel}
      />
      <PowerSubstationAccordion
        onPanelChange={handlePanelChange}
        expandedPanel={expandedPanel}
      />
    </Drawer>
  );
};

export default FilesDrawer;
