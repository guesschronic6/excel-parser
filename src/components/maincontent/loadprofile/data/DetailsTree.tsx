import { makeStyles, Theme, createStyles } from "@material-ui/core";
import {
  ArrowDownward,
  ArrowRight,
  Functions,
  TrendingUp,
} from "@material-ui/icons";
import { TreeView } from "@material-ui/lab";
import React from "react";
import { MonthlyLoadProfile } from "../../../loadprofile/objects";

import StyledTreeItem from "./StyledTreeItem";

type DetailsTreeProps = {
  monthlyLoadProfile: MonthlyLoadProfile;
};

const DetailsTree: React.FunctionComponent<DetailsTreeProps> = (props) => {
  const { monthlyLoadProfile, ...others } = props;
  const classes = useStyles();

  return (
    <TreeView
      className={classes.root}
      defaultExpanded={["1"]}
      defaultCollapseIcon={<ArrowDownward />}
      defaultExpandIcon={<ArrowRight />}
      defaultEndIcon={<div style={{ width: 24 }}></div>}
    >
      <StyledTreeItem
        nodeId="2"
        labelText="Coincident Peak"
        labelIcon={TrendingUp}
        labelInfo={
          monthlyLoadProfile.coincidentPeak
            ? `${monthlyLoadProfile.coincidentPeak.meteringPoint}: ${
                monthlyLoadProfile.coincidentPeak.date.getMonth() + 1
              }/${monthlyLoadProfile.coincidentPeak.date.getDate()}/${monthlyLoadProfile.coincidentPeak.date.getFullYear()} ${
                monthlyLoadProfile.coincidentPeak.hour
              }:00 kwdel: ${monthlyLoadProfile.coincidentPeak.kwdel.toFixed(2)}`
            : ""
        }
      />
      <StyledTreeItem
        nodeId="3"
        labelText="None Coincident Peak"
        labelIcon={Functions}
        labelInfo={
          monthlyLoadProfile.nonCoincidentPeak
            ? ` ${monthlyLoadProfile.nonCoincidentPeak.toFixed(2)}`
            : ""
        }
      />
      <StyledTreeItem
        nodeId="4"
        labelText="Diversity Factor:"
        labelIcon={Functions}
        labelInfo={
          monthlyLoadProfile.diversityFactor
            ? ` ${monthlyLoadProfile.diversityFactor.toFixed(2)}`
            : ""
        }
      />
      <StyledTreeItem
        nodeId="5"
        labelText="Max per metering point:"
        labelIcon={TrendingUp}
        labelInfo={""}
      >
        {monthlyLoadProfile.loadProfilesMax.map((lpMax) => {
          return (
            <StyledTreeItem
              key={`LM:S${lpMax.meteringPoint}`}
              nodeId={`LM:S${lpMax.meteringPoint}`}
              labelIcon={TrendingUp}
              labelText={`${lpMax.meteringPoint}`}
              labelInfo={` ${
                lpMax.date.getMonth() + 1
              }/${lpMax.date.getDate()}/${lpMax.date.getFullYear()} ${
                lpMax.hour
              }:00 kwdel: ${lpMax.kwdel.toFixed(2)}`}
            />
          );
        })}
      </StyledTreeItem>
      <StyledTreeItem
        nodeId="7"
        labelText="Sum per metering point:"
        labelIcon={Functions}
        labelInfo={""}
      >
        {monthlyLoadProfile.loadProfilesSum.map((lpSum) => {
          return (
            <StyledTreeItem
              key={`LS:S${lpSum.meteringPoint}`}
              nodeId={`LS:S${lpSum.meteringPoint}`}
              labelIcon={Functions}
              labelText={`${lpSum.meteringPoint}`}
              labelInfo={` ${lpSum.kwdel.toFixed(2)}`}
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
  })
);

export default DetailsTree;
