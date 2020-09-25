import React from "react";

import { TreeView } from "@material-ui/lab";
import StyledTreeItem from "../../../common/components/StyledTreeItem";
import {
  ArrowDownward,
  ArrowRight,
  CalendarToday,
  Place,
  PlaceOutlined,
  Title,
} from "@material-ui/icons";
import { makeStyles, Theme, createStyles } from "@material-ui/core";
import PowerTransformerLossSubstation from "../../../power_transformer_loss/PowerTransformerLossSubstation";
import PowerTransformerLossItemTree from "./PowerTransformerLossItemTree";

type PowerTransformerLossSubstationTreeProps = {
  powerTransformerLossSubstation: PowerTransformerLossSubstation;
};

const PowerTransformerLossSubstationTree = (
  props: PowerTransformerLossSubstationTreeProps
) => {
  const { powerTransformerLossSubstation } = props;
  const classes = useStyles();

  return (
    <TreeView
      className={classes.root}
      defaultCollapseIcon={<ArrowDownward />}
      defaultExpandIcon={<ArrowRight />}
      defaultEndIcon={<div style={{ width: 24 }} />}
    >
      <StyledTreeItem
        nodeId={powerTransformerLossSubstation.substation.key}
        labelText={powerTransformerLossSubstation.substation.text}
        labelIcon={Place}
      >
        <PowerTransformerLossItemTree
          labelIcon={Title}
          substation={powerTransformerLossSubstation.substation}
          nodeId="header"
        />
        {[...powerTransformerLossSubstation.substationItems.values()].map(
          (substationItem) => {
            let key = `PFTS:H:${substationItem.substationItem.toString()}`;
            return (
              <PowerTransformerLossItemTree
                labelIcon={PlaceOutlined}
                powerTransformerLossItem={substationItem}
                substation={powerTransformerLossSubstation.substation}
                key={key}
                nodeId={key}
              />
            );
          }
        )}
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

export default PowerTransformerLossSubstationTree;
