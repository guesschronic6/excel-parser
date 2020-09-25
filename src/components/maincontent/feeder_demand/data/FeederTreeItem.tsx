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
import FeederAndDemandItem from "../../../../objects/feeder_and_demand/FeederAndDemandItem";
import useTreeItemStyles from "./useTreeItemStyles";

type FederTreeitemProps = TreeItemProps & {
  bgColor?: string;
  color?: string;
  feederAndDemandItem: FeederAndDemandItem;
  header?: boolean;
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

const FederTreeitem: React.FunctionComponent<FederTreeitemProps> = (
  props: FederTreeitemProps
) => {
  const treeItemClasses = useTreeItemStyles();
  const classes = useStyles();
  const {
    color,
    bgColor,
    header = false,
    feederAndDemandItem,
    labelIcon: LabelIcon,
    ...other
  } = props;

  return (
    <TreeItem
      label={
        <div className={treeItemClasses.labelRoot}>
          <LabelIcon color="inherit" className={treeItemClasses.labelIcon} />
          {header ? (
            <React.Fragment>
              <Typography
                classes={{ root: classes.feeder }}
                variant="body2"
                className={treeItemClasses.labelText}
              >
                Feeder
              </Typography>

              <Typography
                classes={{ root: classes.numbers }}
                variant="body2"
                className={classes.labelContent}
              >
                Feeder Input Energy (KWHR)
              </Typography>
              <Typography
                classes={{ root: classes.numbers }}
                variant="body2"
                className={classes.labelContent}
              >
                Demand (KW)
              </Typography>
              <Typography
                classes={{ root: classes.percent }}
                variant="body2"
                className={classes.labelContent}
              >
                Minutes
              </Typography>
              <Typography
                classes={{ root: classes.numbers }}
                variant="body2"
                className={classes.labelContent}
              >
                Hours
              </Typography>
              <Typography
                classes={{ root: classes.numbers }}
                variant="body2"
                className={classes.labelContent}
              >
                Operating Hours
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
                Load Factor
              </Typography>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Typography
                classes={{ root: classes.feeder }}
                variant="body2"
                className={treeItemClasses.labelText}
              >
                {feederAndDemandItem.feeder}
              </Typography>
              <Typography
                classes={{ root: classes.numbers }}
                variant="body2"
                className={classes.labelContent}
              >
                {feederAndDemandItem.feederInput.toFixed(2)}
              </Typography>
              <Typography
                classes={{ root: classes.numbers }}
                variant="body2"
                className={classes.labelContent}
              >
                {feederAndDemandItem.demand.toFixed(2)}
              </Typography>
              <Typography
                classes={{ root: classes.percent }}
                variant="body2"
                className={classes.labelContent}
              >
                {feederAndDemandItem.minutes}
              </Typography>
              <Typography
                classes={{ root: classes.numbers }}
                variant="body2"
                className={classes.labelContent}
              >
                {feederAndDemandItem.hours.toFixed(2)}
              </Typography>
              <Typography
                classes={{ root: classes.numbers }}
                variant="body2"
                className={classes.labelContent}
              >
                {feederAndDemandItem.operatingHours.toFixed(2)}
              </Typography>
              <Typography
                classes={{ root: classes.percent }}
                variant="body2"
                className={classes.labelContent}
              >
                {feederAndDemandItem.powerFactor.toFixed(2)}
              </Typography>
              <Typography
                classes={{ root: classes.percent }}
                variant="body2"
                className={classes.labelContent}
              >
                {feederAndDemandItem.loadFactor.toFixed(2)}
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

export default FederTreeitem;
