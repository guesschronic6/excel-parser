import {
  makeStyles,
  Theme,
  createStyles,
  Typography,
  SvgIconProps,
} from "@material-ui/core";
import { Place } from "@material-ui/icons";
import { TreeItemProps } from "@material-ui/lab";
import React from "react";
import { FeederAndDemandItem } from "../../../feeder_and_demand/objects";
import { StyledTreeItem } from "../../../styled_components";

type FederTreeitemProps = TreeItemProps & {
  bgColor?: string;
  color?: string;
  feederAndDemandItem: FeederAndDemandItem;
  nodeId: string;
  header?: boolean;
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
  const classes = useStyles();
  const {
    color,
    bgColor,
    header = false,
    feederAndDemandItem,
    nodeId,
    ...other
  } = props;

  return (
    <StyledTreeItem
      nodeId={nodeId}
      content={
        header ? (
          <React.Fragment>
            <Typography classes={{ root: classes.feeder }} variant="body2">
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
            <Typography classes={{ root: classes.feeder }} variant="body2">
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
              {feederAndDemandItem.totalMinutes}
            </Typography>
            <Typography
              classes={{ root: classes.numbers }}
              variant="body2"
              className={classes.labelContent}
            >
              {feederAndDemandItem.totalHours.toFixed(2)}
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
        )
      }
    />
  );
};

export default FederTreeitem;
