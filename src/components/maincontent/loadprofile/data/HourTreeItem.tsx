import {
  makeStyles,
  Theme,
  createStyles,
  Typography,
  Box,
} from "@material-ui/core";
import { TreeItemProps, TreeItem } from "@material-ui/lab";
import { LoadProfile } from "../../../loadprofile/objects";
import React, { useEffect } from "react";
import useTreeItemStyles from "./useTreeItemStyles";

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
  })
);

function HourTreeItem(props: HourTreeItemProps) {
  const treeItemClasses = useTreeItemStyles();
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

  useEffect(() => {
    console.log("HourTreeItemRendered: Hour: " + hour);
  }, []);

  return (
    <TreeItem
      label={
        <div className={treeItemClasses.labelRoot}>
          <Box minWidth="35px">
            {header ? (
              <Typography variant="body2" className={treeItemClasses.labelText}>
                Hour
              </Typography>
            ) : (
              <Typography variant="body2" className={treeItemClasses.labelText}>
                {hour}
              </Typography>
            )}
          </Box>
          {header
            ? loadProfiles.map((loadProfile) => {
                return (
                  <Typography
                    key={`HTI: T: M:${loadProfile.meteringPoint}`}
                    variant="body2"
                    className={classes.labelContent}
                  >
                    {loadProfile.meteringPoint}
                  </Typography>
                );
              })
            : loadProfiles.map((loadProfile) => {
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
          {header ? (
            <Typography
              className={classes.labelContent}
              variant="caption"
              color="inherit"
            >
              {`Total `}
            </Typography>
          ) : (
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
}

export default HourTreeItem;
