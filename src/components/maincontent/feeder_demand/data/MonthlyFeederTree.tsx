import React from "react";

import { TreeView } from "@material-ui/lab";
import { ArrowDownward, ArrowRight, Place, Title } from "@material-ui/icons";
import { makeStyles, Theme, createStyles } from "@material-ui/core";

import FeederTreeItem from "./FeederTreeItem";
import {
  FeederAndDemandItem,
  FeederAndDemand,
} from "../../../feeder_and_demand/objects/";
import { Feeder } from "../../../common/object";

type MonthlyFeederTreeProps = {
  feederAndDemand: FeederAndDemand;
};

const MonthlyFeederTree = (props: MonthlyFeederTreeProps) => {
  const { feederAndDemand } = props;
  const classes = useStyles();

  return (
    <TreeView
      className={classes.root}
      defaultCollapseIcon={<ArrowDownward />}
      defaultExpandIcon={<ArrowRight />}
      defaultEndIcon={<div style={{ width: 24 }} />}
    >
      <FeederTreeItem
        feederAndDemandItem={new FeederAndDemandItem(Feeder.ACLEM, 0)}
        nodeId={"header"}
        header={true}
      />
      {[...feederAndDemand.items.values()].map((item) => {
        let key = `FTI:F:${item.feeder}`;
        return (
          <FeederTreeItem feederAndDemandItem={item} key={key} nodeId={key} />
        );
      })}
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

export default MonthlyFeederTree;
