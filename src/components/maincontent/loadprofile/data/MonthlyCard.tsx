import { Button, createStyles, makeStyles, Theme } from "@material-ui/core";
import { GetAppRounded } from "@material-ui/icons";
import React from "react";
import { MonthlyLoadProfile } from "../../../loadprofile/objects";
import DetailsTree from "./DetailsTree";
import MonthlyTree from "./MonthlyTree";
import generateLoadProfileExcel from "../../../loadprofile/ExcelGenerator";

type MonthlyCardProps = {
  monthlyLoadProfile: MonthlyLoadProfile;
};

const MonthlyCard: React.FunctionComponent<MonthlyCardProps> = (props) => {
  const { monthlyLoadProfile } = props;
  const classes = useStyles();

  function handleDownloadClick() {
    generateLoadProfileExcel(monthlyLoadProfile);
  }

  return (
    <div className={classes.monthlyCard_root}>
      <div className={classes.monthlyCard_paper}>
        <div className={classes.monthlyCard_paperAction}>
          <Button
            onClick={handleDownloadClick}
            className={classes.downloadBtn}
            size="small"
            startIcon={<GetAppRounded />}
          >
            download
          </Button>
        </div>
        <div className={classes.monthlyCard_paperContent}>
          <MonthlyTree monthlyLoadProfile={monthlyLoadProfile} />
          <DetailsTree monthlyLoadProfile={monthlyLoadProfile} />
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

export default MonthlyCard;
