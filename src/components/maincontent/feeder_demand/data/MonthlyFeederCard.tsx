import { Button, createStyles, makeStyles, Theme } from "@material-ui/core";
import { GetAppRounded } from "@material-ui/icons";
import React from "react";
import FeederAndDemand from "../../../feeder_and_demand/objects/FeederAndDemand";
import MonthlyTree from "./MonthlyFeederTree";
import FeederAndDemandUtil from "../../../feeder_and_demand/FeederAndDemandUtil";

type MonthlyFeederCardProps = {
  feederAndDemand: FeederAndDemand;
};

const MonthlyFeederCard: React.FunctionComponent<MonthlyFeederCardProps> = (
  props
) => {
  const { feederAndDemand } = props;
  const classes = useStyles();

  function handleDownloadClick() {
    FeederAndDemandUtil.generateExcelFile(feederAndDemand);
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
          <MonthlyTree feederAndDemand={feederAndDemand} />
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

export default MonthlyFeederCard;
