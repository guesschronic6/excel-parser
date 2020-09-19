import {
  SvgIconProps,
  makeStyles,
  Theme,
  createStyles,
  Typography,
  Box,
} from "@material-ui/core";
import { TreeItemProps, TreeItem } from "@material-ui/lab";
import { LoadProfile } from "../../../loadprofile/objects";
import React, { useCallback, useEffect } from "react";
import useTreeItemStyles from "./useTreeItemStyles";

type HourTreeItemProps = TreeItemProps & {
  bgColor?: string;
  color?: string;
  loadProfiles: LoadProfile[];
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
    ...other
  } = props;

  const getTotal = useCallback(() => {
    let total = 0;
    for (let loadProfile of loadProfiles.values()) {
      let val = loadProfile.dailyLoadProfiles
        .get(dateString)
        ?.hourlyLoadProfiles[hour - 1].getTotalKwdel();
      if (val) {
        total += val;
      }
    }
    return total;
  }, [loadProfiles]);

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
              {getTotal().toFixed(2)}
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
