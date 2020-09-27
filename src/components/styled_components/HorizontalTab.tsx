import { makeStyles, Tab, Theme } from "@material-ui/core";
import React from "react";

type HorizontalTabProps = {
  label: string;
  value: string;
};

const useStyles = makeStyles((theme: Theme) => ({
  tab: {
    textAlign: "start",
    textTransform: "none",
    fontWeight: "normal",
    fontSize: "0.9em",
    borderBottom: `1px solid ${theme.palette.divider}`,
    padding: 0,
    minWidth: "100px",
    lineHeight: 0,
  },
  tab_selected: {
    backgroundColor: theme.palette.background.default,
    color: theme.palette.primary.main,
    fontWeight: "bold",
  },
  tab_wrapper: {},
}));

const HorizontalTab: React.FunctionComponent<HorizontalTabProps> = ({
  label,
  value,
  ...others
}) => {
  const classes = useStyles();
  return (
    <Tab
      classes={{
        root: classes.tab,
        wrapper: classes.tab_wrapper,
        selected: classes.tab_selected,
      }}
      value={value}
      label={label}
      {...others}
    />
  );
};

export default HorizontalTab;
