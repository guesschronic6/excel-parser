import { makeStyles, Tab, Theme } from "@material-ui/core";
import React from "react";

type VerticalTabProps = {
  label: string;
  value: string;
};

const useStyles = makeStyles((theme: Theme) => ({
  tab: {
    textAlign: "start",
    textTransform: "none",
    fontWeight: "normal",
    fontSize: "0.9em",
    borderRight: `1px solid ${theme.palette.divider}`,
  },
  tab_selected: {
    backgroundColor: theme.palette.background.default,
    color: theme.palette.primary.main,
    fontWeight: "bold",
  },
  tab_wrapper: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
}));

const VerticalTab: React.FunctionComponent<VerticalTabProps> = ({
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

export default VerticalTab;
