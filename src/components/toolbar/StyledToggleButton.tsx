import { makeStyles, Theme } from "@material-ui/core";
import { ToggleButton } from "@material-ui/lab";
import React from "react";

type StyledToggleButtonProps = {
  value?: string;
};

const StyledToggleButton: React.FunctionComponent<StyledToggleButtonProps> = ({
  value,
  children,
  ...others
}) => {
  const classes = useStyles();
  return (
    <ToggleButton classes={{ root: classes.root }} value={value} {...others}>
      {children}
    </ToggleButton>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    border: "none",
    borderRadius: 0,
    "&.Mui-selected": {
      backgroundColor: theme.palette.background.default,
      color: theme.palette.primary.main,
    },
    "&:hover, &.Mui-selected:hover": {
      color: theme.palette.primary.main,
      backgroundColor: theme.palette.background.default,
    },
    selected: {},
  },
}));

export default StyledToggleButton;
