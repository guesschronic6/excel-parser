import { AppBar, Box } from "@material-ui/core";
import { Folder, Settings } from "@material-ui/icons";
import { ToggleButtonGroup } from "@material-ui/lab";
import StyledToggleButton from "./StyledToggleButton";

import useStyles from "./use-styles";

import React, { useState } from "react";

type ToolbarProps = {
  onSettingsToggled: () => void;
  onSettingsUntoggled: () => void;
  onFilesToggled: () => void;
  onFilesUntoggled: () => void;
};

enum ToggleValues {
  FILES = "files",
  SETTINGS = "settings",
  NONE = "",
}

const Toolbar: React.FC<ToolbarProps> = ({
  onFilesToggled,
  onSettingsToggled,
  onSettingsUntoggled,
  onFilesUntoggled,
  ...others
}) => {
  const [toggledButton, setToggledButton] = useState<string>(
    ToggleValues.FILES
  );
  const [otherToggledButton, setOtherToggledButton] = useState<string>(
    ToggleValues.NONE
  );

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
    if (newToggle === ToggleValues.FILES) {
      onFilesToggled();
    } else if (prevToggled === ToggleValues.FILES) {
      onFilesUntoggled();
    }
  }

  function handleOtherToggleChange(
    event: React.MouseEvent<HTMLElement>,
    newToggle: string
  ) {
    console.log({
      method: "handleOtherToggleChange()",
      params: { newToggle },
    });

    const prevToggled = otherToggledButton;
    setOtherToggledButton(newToggle);
    if (newToggle === ToggleValues.SETTINGS) {
      onSettingsToggled();
    } else if (prevToggled === ToggleValues.SETTINGS) {
      onSettingsUntoggled();
    }
  }

  const classes = useStyles();
  return (
    <AppBar
      elevation={4}
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
            <StyledToggleButton value={ToggleValues.FILES}>
              <Folder />
            </StyledToggleButton>
          </ToggleButtonGroup>
        </Box>
        <Box className={classes.otherButtonsContainer}>
          <ToggleButtonGroup
            onChange={handleOtherToggleChange}
            value={otherToggledButton}
            exclusive
          >
            <StyledToggleButton value={ToggleValues.SETTINGS}>
              <Settings />
            </StyledToggleButton>
          </ToggleButtonGroup>
        </Box>
      </Box>
    </AppBar>
  );
};

export default Toolbar;
