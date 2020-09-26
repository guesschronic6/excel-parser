import { Button, createStyles, makeStyles, Theme } from "@material-ui/core";
import { GetAppRounded } from "@material-ui/icons";
import React from "react";
import PowerTransformerLoss from "../../../power_transformer_loss/PowerTransformerLoss";
import MonthlyPowerTransformerLossTree from "./MonthlyPowerTransformerLossTree";
import PowerTransformerLossUtil from "../../../power_transformer_loss/PowerTransformerLossUtil";

type MonthlyPoowerTransformerLossCard = {
  powerTransformerLoss: PowerTransformerLoss;
};

const MonthlyPowerTransformerLossCard: React.FunctionComponent<MonthlyPoowerTransformerLossCard> = (
  props
) => {
  const { powerTransformerLoss } = props;
  const classes = useStyles();

  function handleDownloadClick() {
    PowerTransformerLossUtil.generateExcelFile(powerTransformerLoss);
  }
  return (
    <div className={classes.monthlyCard_root}>
      <div className={classes.monthlyCard_paper}>
        <div className={classes.monthlyCard_paperAction}>
          <Button
            className={classes.downloadBtn}
            size="small"
            startIcon={<GetAppRounded />}
            onClick={handleDownloadClick}
          >
            download
          </Button>
        </div>
        <div className={classes.monthlyCard_paperContent}>
          <MonthlyPowerTransformerLossTree
            powerTransformerLoss={powerTransformerLoss}
          />
        </div>
      </div>
    </div>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    monthlyCard_root: {
      display: "inline-flex",
      boxSizing: "border-box",
      flexWrap: "nowrap",
    },
    monthlyCard_paper: {
      flexGrow: 0,
      flexShrink: 0,
      display: "flex",
      flexDirection: "column",
      backgroundColor: theme.palette.background.paper,
      borderRadius: theme.shape.borderRadius,
      border: `1px solid ${theme.palette.divider}`,
      boxSizing: "border-box",
      padding: theme.spacing(2),
    },
    monthlyCard_paperAction: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
    },
    monthlyCard_paperContent: {
      display: "flex",
      flexShrink: 0,
    },
    downloadBtn: {
      fontSize: "14px",
      textTransform: "none",
      fontWeight: "lighter",
    },
  })
);

export default MonthlyPowerTransformerLossCard;
