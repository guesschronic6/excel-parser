import { makeStyles, Theme, createStyles } from "@material-ui/core";
import {
  ArrowDownward,
  ArrowRight,
  Functions,
  TrendingUp,
} from "@material-ui/icons";
import { TreeView } from "@material-ui/lab";
import React, { useEffect, useState } from "react";
import { MonthlyLoadProfile } from "../../../loadprofile/objects";
import {
  CoincidentalPeak,
  DiversityFactor,
  NoneCoincidentalPeak,
  LoadProfileMax,
  LoadProfileSum,
} from "../../../loadprofile/types";
import StyledTreeItem from "./StyledTreeItem";

type DetailsTreeProps = {
  monthlyLoadProfile: MonthlyLoadProfile;
};

const DetailsTree: React.FunctionComponent<DetailsTreeProps> = (props) => {
  const { monthlyLoadProfile, ...others } = props;
  const classes = useStyles();

  const [otherDits, setOtherDits] = useState<{
    coincidentPeak: CoincidentalPeak;
    nonCoincidentPeak: NoneCoincidentalPeak;
    diversityFactor: DiversityFactor;
    loadProfilesMax: LoadProfileMax[];
    loadProfilesSum: LoadProfileSum[];
  } | null>(null);

  useEffect(() => {
    let otherDits = monthlyLoadProfile.getCoincidentalPeakAndNonCoincidentalpeak();
    setOtherDits(otherDits);
  }, [monthlyLoadProfile]);

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
          otherDits && otherDits.coincidentPeak
            ? `${otherDits.coincidentPeak.meteringPoint}: ${
                otherDits.coincidentPeak.date.getMonth() + 1
              }/${otherDits.coincidentPeak.date.getDate()}/${otherDits.coincidentPeak.date.getFullYear()} ${
                otherDits.coincidentPeak.hour
              }:00 kwdel: ${otherDits.coincidentPeak.kwdel.toFixed(2)}`
            : ""
        }
      />
      <StyledTreeItem
        nodeId="3"
        labelText="None Coincident Peak"
        labelIcon={Functions}
        labelInfo={
          otherDits && otherDits.nonCoincidentPeak
            ? ` ${otherDits.nonCoincidentPeak.kwdel.toFixed(2)}`
            : ""
        }
      />
      <StyledTreeItem
        nodeId="4"
        labelText="Diversity Factor:"
        labelIcon={Functions}
        labelInfo={
          otherDits && otherDits.diversityFactor
            ? ` ${otherDits.diversityFactor.factor.toFixed(2)}`
            : ""
        }
      />
      <StyledTreeItem
        nodeId="5"
        labelText="Max per metering point:"
        labelIcon={TrendingUp}
        labelInfo={""}
      >
        {otherDits &&
          otherDits.loadProfilesMax &&
          otherDits.loadProfilesMax.map((lpMax) => {
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
        {otherDits &&
          otherDits.loadProfilesSum &&
          otherDits.loadProfilesSum.map((lpSum) => {
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
      display: "inline-block",
      fontSize: "1rem",
      padding: `${theme.spacing(3)}px ${theme.spacing(1)}px`,
    },
  })
);

export default DetailsTree;
