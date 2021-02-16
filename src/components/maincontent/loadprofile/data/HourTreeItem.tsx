import {
  makeStyles,
  Theme,
  createStyles,
  Typography,
  Box,
} from "@material-ui/core";
import { TreeItemProps } from "@material-ui/lab";
import { LoadProfile } from "../../../loadprofile/objects";
import React from "react";
import { StyledTreeItem } from "../../../styled_components";
import clsx from "clsx";

type HourTreeItemProps = TreeItemProps & {
  bgColor?: string;
  color?: string;
  loadProfiles: LoadProfile[];
  totalLoadProfile: LoadProfile;
  dateString?: string;
  hour?: number;
  header?: boolean;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    labelContent: {
      width: "120px",
      fontWeight: "normal",
      flexGrow: 1,
    },
    labelSmall: {
      width: "35px",
    },
    labelHeader: {
      fontWeight: "bold",
    },
  })
);

function HourTreeItem(props: HourTreeItemProps) {
  const classes = useStyles();
  const {
    color,
    bgColor,
    loadProfiles,
    dateString = "",
    hour = 1,
    header = false,
    totalLoadProfile,
    ...other
  } = props;

  return (
    <StyledTreeItem
      nodeId={`${dateString}-${hour}`}
      content={
        header ? (
          <React.Fragment>
            <Typography
              variant="body2"
              className={clsx(classes.labelHeader, classes.labelSmall)}
            >
              Hour
            </Typography>
            {loadProfiles.map((loadProfile) => {
              return (
                <Typography
                  key={`HTI: T: M:${loadProfile.meteringPoint}`}
                  variant="body2"
                  className={classes.labelContent}
                >
                  {loadProfile.meteringPoint}
                </Typography>
              );
            })}
            <Typography
              className={classes.labelContent}
              variant="caption"
              color="inherit"
            >
              Total
            </Typography>
            :
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Typography variant="body2" className={classes.labelSmall}>
              {hour}
            </Typography>
            {loadProfiles.map((loadProfile) => {
              return (
                <Typography
                  key={`HTI: T: K:${loadProfile.meteringPoint}`}
                  variant="body2"
                  className={classes.labelContent}
                >
                  {loadProfile
                    .getDailyLoadProfile(dateString)
                    .hourlyLoadProfiles[hour - 1].getTotalKwdel()
                    .toFixed(2)}
                </Typography>
              );
            })}
            <Typography
              className={classes.labelContent}
              variant="caption"
              color="inherit"
            >
              {totalLoadProfile
                .getDailyLoadProfile(dateString)
                .hourlyLoadProfiles[hour - 1].getRawTotal()
                .toFixed(2)}
            </Typography>
          </React.Fragment>
        )
      }
    />
  );
}

export default HourTreeItem;
