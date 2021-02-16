import React from "react";
import { MonthlyLoadProfile } from "../../../loadprofile/objects";

import { TreeView } from "@material-ui/lab";
import { StyledTreeItem } from "../../../styled_components";
import { ArrowDownward, ArrowRight, CalendarToday } from "@material-ui/icons";
import { makeStyles, Theme, createStyles } from "@material-ui/core";
import { Month } from "../../../common/object";
import DayTreeItem from "./DayTreeItem";

type MonthlyTreeProps = {
  monthlyLoadProfile: MonthlyLoadProfile;
};

const MonthlyTree = (props: MonthlyTreeProps) => {
  const { monthlyLoadProfile } = props;
  const classes = useStyles();

  return (
    <TreeView
      className={classes.root}
      defaultExpanded={["1"]}
      defaultCollapseIcon={<ArrowDownward />}
      defaultExpandIcon={<ArrowRight />}
      defaultEndIcon={<div style={{ width: 24 }} />}
    >
      <StyledTreeItem
        nodeId="1"
        labelText={`${Month[monthlyLoadProfile.billingPeriod.month - 1]} ${
          monthlyLoadProfile.billingPeriod.year
        }`}
        labelIcon={CalendarToday}
      >
        {[...monthlyLoadProfile.dateStrings.values()].map((dateString) => {
          let loadProfiles = [
            ...Array.from(monthlyLoadProfile.loadProfiles.values()),
          ];
          let key = `DTI:D:${dateString}`;
          return (
            <DayTreeItem
              totalLoadProfile={monthlyLoadProfile.totalLoadpRofile}
              key={key}
              nodeId={key}
              loadProfiles={loadProfiles}
              dateString={dateString}
            />
          );
        })}
      </StyledTreeItem>
    </TreeView>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexShrink: 0,
      fontSize: "1rem",
      padding: `${theme.spacing(1)}px ${theme.spacing(1)}px`,
    },
    title: {
      fontSize: "1.5em",
    },
    dayTree: {
      flexGrow: 1,
      maxWidth: 400,
    },
  })
);

export default MonthlyTree;
