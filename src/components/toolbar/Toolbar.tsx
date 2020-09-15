import { AppBar, Box, IconButton } from "@material-ui/core";
import { Folder, Settings } from "@material-ui/icons";
import { ToggleButton, ToggleButtonGroup } from "@material-ui/lab";

import useStyles from "./use-styles";

import React, { useState } from "react";

type ToolbarProps = {
  onSettingsClicked: () => void;
  onFilesToggled: () => void;
  onFilesUntoggled: () => void;
};

enum ToggleValues {
  FILES = "files",
  NONE = "",
}

const Toolbar: React.FC<ToolbarProps> = ({
  onFilesToggled,
  onSettingsClicked,
  onFilesUntoggled,
  ...others
}) => {
  const [toggledButton, setToggledButton] = useState<string>(ToggleValues.NONE);

  function handleToggleChange(
    event: React.MouseEvent<HTMLElement>,
    newToggle: string
  ) {
    console.log({
      method: "handleToggleChange()",
      params: { newToggle },
    });

    const prevToggled = toggledButton;
    setToggledButton(newToggle);
    if (newToggle == ToggleValues.FILES) {
      onFilesToggled();
    } else if (prevToggled == ToggleValues.FILES) {
      onFilesUntoggled();
    }
  }

  function handleSettingsClick() {
    console.log({
      method: "handleSettingsClick()",
      params: {},
    });
    onSettingsClicked();
  }

  const classes = useStyles();
  return (
    <AppBar
      elevation={1}
      className={classes.root}
      position="static"
      color="inherit"
    >
      <Box className={classes.container}>
        <Box className={classes.toggleButtonsContainer}>
          <ToggleButtonGroup
            onChange={handleToggleChange}
            value={toggledButton}
            exclusive
          >
            <ToggleButton value={ToggleValues.FILES}>
              <Folder />
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>
        <Box className={classes.otherButtonsContainer}>
          <IconButton onClick={handleSettingsClick}>
            <Settings />
          </IconButton>
        </Box>
      </Box>
    </AppBar>
  );
};

export default Toolbar;
