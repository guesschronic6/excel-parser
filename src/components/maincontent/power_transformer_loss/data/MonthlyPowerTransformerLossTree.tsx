import React from "react";

import { TreeView } from "@material-ui/lab";
import StyledTreeItem from "../../../common/components/StyledTreeItem";
import { ArrowDownward, ArrowRight, CalendarToday } from "@material-ui/icons";
import { makeStyles, Theme, createStyles } from "@material-ui/core";
import PowerTransformerLoss from "../../../power_transformer_loss/PowerTransformerLoss";
import PowerTransformerLossSubstationTree from "./PowerTransformerLossSubstationTree";

type MonthlyPowerTransformerLossTreeProps = {
  powerTransformerLoss: PowerTransformerLoss;
};

const MonthlyPowerTransformerLossTree = (
  props: MonthlyPowerTransformerLossTreeProps
) => {
  const { powerTransformerLoss } = props;
  const classes = useStyles();

  return (
    <TreeView
      className={classes.root}
      defaultCollapseIcon={<ArrowDownward />}
      defaultExpandIcon={<ArrowRight />}
      defaultEndIcon={<div style={{ width: 24 }} />}
    >
      <StyledTreeItem
        nodeId="1"
        labelText={powerTransformerLoss.billingPeriod.toString()}
        labelIcon={CalendarToday}
      >
        {[...powerTransformerLoss.items.values()].map((item) => {
          let key = `PFT:F:${item.substation.key}`;
          return (
            <PowerTransformerLossSubstationTree
              powerTransformerLossSubstation={item}
              billingPeriod={powerTransformerLoss.billingPeriod}
              key={key}
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

export default MonthlyPowerTransformerLossTree;
