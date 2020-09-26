import {
  makeStyles,
  Theme,
  createStyles,
  Typography,
  SvgIconProps,
} from "@material-ui/core";
import transitions from "@material-ui/core/styles/transitions";
import { TreeItemProps, TreeItem } from "@material-ui/lab";
import clsx from "clsx";
import React, { ChangeEvent, useContext, useEffect } from "react";
import { FormEvent } from "react";
import { useState } from "react";
import Substation from "../../../../objects/common/enums/Substation";
import PowerTransformerLossItem from "../../../power_transformer_loss/PowerTransformerLossItem";
import useTreeItemStyles from "./useTreeItemStyles";
import { PowerTransformerLossContext } from "../../../power_transformer_loss/PowerTransformerLossContextProvider";
import BillingPeriod from "../../../../objects/common/BillingPeriod";

type PowerTransformerLossItemTreeProps = TreeItemProps & {
  bgColor?: string;
  color?: string;
  powerTransformerLossItem?: PowerTransformerLossItem;
  billingPeriod: BillingPeriod;
  substation: Substation;
  labelIcon: React.ElementType<SvgIconProps>;
};

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
    billingPeriod,
    ...other
  } = props;
  const powerTransformerLossContext = useContext(PowerTransformerLossContext);
  const [demand, setDemand] = useState("0");
  const [demandError, setDemmandError] = useState(false);

  useEffect(() => {
    if (powerTransformerLossItem) {
      setDemand(powerTransformerLossItem.demandMW.toString());
    }
  }, []);

  function handleDemandChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    if (Number(event.target.value)) {
      setDemmandError(false);
    } else {
      setDemmandError(true);
    }
    setDemand(event.target.value);
  }

  function handleDemandSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!demandError && powerTransformerLossItem) {
      let newItem = new PowerTransformerLossItem(
        powerTransformerLossItem.substationItem,
        0,
        powerTransformerLossItem
      );
      newItem.demandMW = Number(demand);
      console.log({ newItem });
      powerTransformerLossContext.onPowerTransformerLossItemChanged(
        newItem,
        billingPeriod
      );
    }
  }

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
              <form className={classes.percent} onSubmit={handleDemandSubmit}>
                <input
                  value={demand}
                  className={clsx(classes.inputField, {
                    [classes.errorField]: demandError,
                  })}
                  onChange={handleDemandChange}
                />
              </form>
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
    inputField: {
      width: "100%",
      border: `1px solid ${theme.palette.divider}`,
      borderRadius: theme.shape.borderRadius,
      outline: "none",
      color: theme.palette.text.primary,
      transition: theme.transitions.create("borderColor", {
        duration: theme.transitions.duration.standard,
        easing: transitions.easing.easeInOut,
      }),
      "&:focus, &:hover": {
        borderColor: theme.palette.primary.main,
      },
    },
    errorField: {
      borderColor: theme.palette.error.main,
      "&:focus, &:hover": {
        borderColor: theme.palette.error.main,
      },
      color: theme.palette.error.main,
    },
  })
);

export default PowerTransformerLossItemTree;
