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
import React, {
  ChangeEvent,
  useContext,
  useEffect,
  useState,
  FormEvent,
} from "react";
import { BillingPeriod, Substation } from "../../../common/object";
import { PowerTransformerLossItem } from "../../../power_transformer_loss/objects";
import { PowerTransformerLossContext } from "../../../power_transformer_loss/PowerTransformerLossContextProvider";
import { StyledTreeItem } from "../../../styled_components";

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
  const classes = useStyles();
  const {
    color,
    bgColor,
    powerTransformerLossItem,
    substation,
    labelIcon: LabelIcon,
    billingPeriod,
    nodeId,
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
    <StyledTreeItem
      nodeId={nodeId}
      bold={!powerTransformerLossItem}
      content={
        !powerTransformerLossItem ? (
          <React.Fragment>
            <Typography classes={{ root: classes.feeder }} variant="body2">
              Substation
            </Typography>

            <Typography classes={{ root: classes.feeder }} variant="body2">
              Transformer
            </Typography>
            <Typography classes={{ root: classes.numbers }} variant="body2">
              Energy (MWHR)
            </Typography>
            <Typography classes={{ root: classes.percent }} variant="body2">
              Demand (MW)
            </Typography>
            <Typography classes={{ root: classes.percent }} variant="body2">
              Power Factor
            </Typography>
            <Typography classes={{ root: classes.percent }} variant="body2">
              Load (MVA)
            </Typography>
            <Typography classes={{ root: classes.percent }} variant="body2">
              Percent Loading
            </Typography>
            <Typography classes={{ root: classes.percent }} variant="body2">
              Operation Hours
            </Typography>
            <Typography classes={{ root: classes.percent }} variant="body2">
              Ave. Load (MW)
            </Typography>
            <Typography classes={{ root: classes.percent }} variant="body2">
              Load Factor
            </Typography>
            <Typography classes={{ root: classes.percent }} variant="body2">
              Loss Factor
            </Typography>
            <Typography classes={{ root: classes.numbers }} variant="body2">
              Core Loss
            </Typography>
            <Typography classes={{ root: classes.numbers }} variant="body2">
              Winding Loss
            </Typography>
            <Typography classes={{ root: classes.numbers }} variant="body2">
              Auxiliary Loss
            </Typography>
            <Typography classes={{ root: classes.numbers }} variant="body2">
              Total Losses
            </Typography>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Typography classes={{ root: classes.feeder }} variant="body2">
              {substation.text}
            </Typography>

            <Typography classes={{ root: classes.feeder }} variant="body2">
              {powerTransformerLossItem.substationItem.transformer.text}
            </Typography>
            <Typography classes={{ root: classes.numbers }} variant="body2">
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
            <Typography classes={{ root: classes.percent }} variant="body2">
              {powerTransformerLossItem.powerFactor.toFixed(2)}
            </Typography>
            <Typography classes={{ root: classes.percent }} variant="body2">
              {powerTransformerLossItem.loadMVA.toFixed(2)}
            </Typography>
            <Typography classes={{ root: classes.percent }} variant="body2">
              {powerTransformerLossItem.percentLoading.toFixed(2)}
            </Typography>
            <Typography classes={{ root: classes.percent }} variant="body2">
              {powerTransformerLossItem.operationHours}
            </Typography>
            <Typography classes={{ root: classes.percent }} variant="body2">
              {powerTransformerLossItem.averageLoad.toFixed(2)}
            </Typography>
            <Typography classes={{ root: classes.percent }} variant="body2">
              {powerTransformerLossItem.loadFactor.toFixed(2)}
            </Typography>
            <Typography classes={{ root: classes.percent }} variant="body2">
              {powerTransformerLossItem.lossFactor.toFixed(2)}
            </Typography>
            <Typography classes={{ root: classes.numbers }} variant="body2">
              {powerTransformerLossItem.coreLoss.toFixed(2)}
            </Typography>
            <Typography classes={{ root: classes.numbers }} variant="body2">
              {powerTransformerLossItem.windingLoss.toFixed(2)}
            </Typography>
            <Typography classes={{ root: classes.numbers }} variant="body2">
              {powerTransformerLossItem.auxiliaryLoss.toFixed(2)}
            </Typography>
            <Typography classes={{ root: classes.numbers }} variant="body2">
              {powerTransformerLossItem.totalLosses.toFixed(2)}
            </Typography>
          </React.Fragment>
        )
      }
    />
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    feeder: {
      width: "200px",
      fontWeight: "inherit",
    },
    numbers: {
      width: "130px",
      maxWidth: "130px",
      fontWeight: "inherit",
    },
    percent: {
      width: "90px",
      maxWidth: "90px",
      fontWeight: "inherit",
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
