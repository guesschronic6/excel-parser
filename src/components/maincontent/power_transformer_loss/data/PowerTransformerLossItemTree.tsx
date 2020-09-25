import {
  makeStyles,
  Theme,
  createStyles,
  Typography,
  Box,
  SvgIconProps,
} from "@material-ui/core";
import { TreeItemProps, TreeItem } from "@material-ui/lab";
import React, { useEffect } from "react";
import Substation from "../../../../objects/common/enums/Substation";
import PowerTransformerLossItem from "../../../power_transformer_loss/PowerTransformerLossItem";
import useTreeItemStyles from "./useTreeItemStyles";

type PowerTransformerLossItemTreeProps = TreeItemProps & {
  bgColor?: string;
  color?: string;
  powerTransformerLossItem?: PowerTransformerLossItem;
  substation: Substation;
  labelIcon: React.ElementType<SvgIconProps>;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    labelContent: {
      width: "120px",
      fontWeight: "normal",
      flexGrow: 1,
    },
    feeder: {
      width: "200px",
    },
    numbers: {
      width: "130px",
      maxWidth: "130px",
    },
    percent: {
      width: "90px",
      maxWidth: "90px",
    },
  })
);

const PowerTransformerLossItemTree: React.FunctionComponent<PowerTransformerLossItemTreeProps> = (
  props
) => {
  const treeItemClasses = useTreeItemStyles();
  const classes = useStyles();
  const {
    color,
    bgColor,
    powerTransformerLossItem,
    substation,
    labelIcon: LabelIcon,
    ...other
  } = props;

  return (
    <TreeItem
      label={
        <div className={treeItemClasses.labelRoot}>
          <LabelIcon color="inherit" className={treeItemClasses.labelIcon} />
          {!powerTransformerLossItem ? (
            <React.Fragment>
              <Typography
                classes={{ root: classes.feeder }}
                variant="body2"
                className={treeItemClasses.labelText}
              >
                Substation
              </Typography>

              <Typography
                classes={{ root: classes.feeder }}
                variant="body2"
                className={classes.labelContent}
              >
                Transformer
              </Typography>
              <Typography
                classes={{ root: classes.numbers }}
                variant="body2"
                className={classes.labelContent}
              >
                Energy (MWHR)
              </Typography>
              <Typography
                classes={{ root: classes.percent }}
                variant="body2"
                className={classes.labelContent}
              >
                Demand (MW)
              </Typography>
              <Typography
                classes={{ root: classes.percent }}
                variant="body2"
                className={classes.labelContent}
              >
                Power Factor
              </Typography>
              <Typography
                classes={{ root: classes.percent }}
                variant="body2"
                className={classes.labelContent}
              >
                Load (MVA)
              </Typography>
              <Typography
                classes={{ root: classes.percent }}
                variant="body2"
                className={classes.labelContent}
              >
                Percent Loading
              </Typography>
              <Typography
                classes={{ root: classes.percent }}
                variant="body2"
                className={classes.labelContent}
              >
                Operation Hours
              </Typography>
              <Typography
                classes={{ root: classes.percent }}
                variant="body2"
                className={classes.labelContent}
              >
                Ave. Load (MW)
              </Typography>
              <Typography
                classes={{ root: classes.percent }}
                variant="body2"
                className={classes.labelContent}
              >
                Load Factor
              </Typography>
              <Typography
                classes={{ root: classes.percent }}
                variant="body2"
                className={classes.labelContent}
              >
                Loss Factor
              </Typography>
              <Typography
                classes={{ root: classes.numbers }}
                variant="body2"
                className={classes.labelContent}
              >
                Core Loss
              </Typography>
              <Typography
                classes={{ root: classes.numbers }}
                variant="body2"
                className={classes.labelContent}
              >
                Winding Loss
              </Typography>
              <Typography
                classes={{ root: classes.numbers }}
                variant="body2"
                className={classes.labelContent}
              >
                Auxiliary Loss
              </Typography>
              <Typography
                classes={{ root: classes.numbers }}
                variant="body2"
                className={classes.labelContent}
              >
                Total Losses
              </Typography>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Typography
                classes={{ root: classes.feeder }}
                variant="body2"
                className={treeItemClasses.labelText}
              >
                {substation.text}
              </Typography>

              <Typography
                classes={{ root: classes.feeder }}
                variant="body2"
                className={classes.labelContent}
              >
                {powerTransformerLossItem.substationItem.transformer.text}
              </Typography>
              <Typography
                classes={{ root: classes.numbers }}
                variant="body2"
                className={classes.labelContent}
              >
                {powerTransformerLossItem.energMwhr.toFixed(2)}
              </Typography>
              <Typography
                classes={{ root: classes.percent }}
                variant="body2"
                className={classes.labelContent}
              >
                {powerTransformerLossItem.demandMW.toFixed(2)}
              </Typography>
              <Typography
                classes={{ root: classes.percent }}
                variant="body2"
                className={classes.labelContent}
              >
                {powerTransformerLossItem.powerFactor.toFixed(2)}
              </Typography>
              <Typography
                classes={{ root: classes.percent }}
                variant="body2"
                className={classes.labelContent}
              >
                {powerTransformerLossItem.loadMVA.toFixed(2)}
              </Typography>
              <Typography
                classes={{ root: classes.percent }}
                variant="body2"
                className={classes.labelContent}
              >
                {powerTransformerLossItem.percentLoading.toFixed(2)}
              </Typography>
              <Typography
                classes={{ root: classes.percent }}
                variant="body2"
                className={classes.labelContent}
              >
                {powerTransformerLossItem.operationHours}
              </Typography>
              <Typography
                classes={{ root: classes.percent }}
                variant="body2"
                className={classes.labelContent}
              >
                {powerTransformerLossItem.averageLoad.toFixed(2)}
              </Typography>
              <Typography
                classes={{ root: classes.percent }}
                variant="body2"
                className={classes.labelContent}
              >
                {powerTransformerLossItem.loadFactor.toFixed(2)}
              </Typography>
              <Typography
                classes={{ root: classes.percent }}
                variant="body2"
                className={classes.labelContent}
              >
                {powerTransformerLossItem.lossFactor.toFixed(2)}
              </Typography>
              <Typography
                classes={{ root: classes.numbers }}
                variant="body2"
                className={classes.labelContent}
              >
                {powerTransformerLossItem.coreLoss.toFixed(2)}
              </Typography>
              <Typography
                classes={{ root: classes.numbers }}
                variant="body2"
                className={classes.labelContent}
              >
                {powerTransformerLossItem.windingLoss.toFixed(2)}
              </Typography>
              <Typography
                classes={{ root: classes.numbers }}
                variant="body2"
                className={classes.labelContent}
              >
                {powerTransformerLossItem.auxiliaryLoss.toFixed(2)}
              </Typography>
              <Typography
                classes={{ root: classes.numbers }}
                variant="body2"
                className={classes.labelContent}
              >
                {powerTransformerLossItem.totalLosses.toFixed(2)}
              </Typography>
            </React.Fragment>
          )}
        </div>
      }
      style={{
        "--tree-view-color": color,
        "--tree-view-bg-color": bgColor,
      }}
      classes={{
        root: treeItemClasses.root,
        content: treeItemClasses.content,
        expanded: treeItemClasses.expanded,
        selected: treeItemClasses.selected,
        group: treeItemClasses.group,
        label: treeItemClasses.label,
      }}
      {...other}
    />
  );
};

export default PowerTransformerLossItemTree;
