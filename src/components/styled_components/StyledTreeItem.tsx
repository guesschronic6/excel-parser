import {
  createStyles,
  makeStyles,
  SvgIconProps,
  Theme,
  Typography,
} from "@material-ui/core";
import { TreeItemProps, TreeItem } from "@material-ui/lab";
import clsx from "clsx";
import React, { ReactElement } from "react";

declare module "csstype" {
  interface Properties {
    "--tree-view-color"?: string;
    "--tree-view-bg-color"?: string;
  }
}

type StyledTreeItemProps = TreeItemProps & {
  bgColor?: string;
  color?: string;
  labelIcon?: React.ElementType<SvgIconProps>;
  labelInfo?: string;
  labelText?: string;
  content?: any;
  bold?: boolean;
};

function StyledTreeItem(props: StyledTreeItemProps) {
  const classes = useTreeItemStyles();
  const {
    labelText = "",
    labelIcon: LabelIcon,
    labelInfo = "",
    color,
    content: Content,
    bgColor,
    bold,
    ...other
  } = props;

  return (
    <TreeItem
      label={
        <div className={clsx(classes.labelRoot, classes.bold && bold)}>
          {Content ? (
            <React.Fragment>
              {LabelIcon ? (
                <LabelIcon color="inherit" className={classes.labelIcon} />
              ) : (
                <></>
              )}
              {Content}
            </React.Fragment>
          ) : (
            <React.Fragment>
              {LabelIcon ? (
                <LabelIcon color="inherit" className={classes.labelIcon} />
              ) : (
                <></>
              )}
              <Typography variant="body2" className={classes.labelText}>
                {labelText}
              </Typography>
              <Typography variant="caption" color="inherit">
                {labelInfo}
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
        root: classes.root,
        content: classes.content,
        expanded: classes.expanded,
        selected: classes.selected,
        group: classes.group,
        label: classes.label,
      }}
      {...other}
    />
  );
}

const useTreeItemStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingLeft: theme.spacing(3),

      color: theme.palette.text.primary,
      "&:hover > $content": {
        backgroundColor: theme.palette.action.hover,
      },
      "&:focus > $content, &$selected > $content": {
        color: theme.palette.primary.main,
      },
      "&:focus > $content $label, &:hover > $content $label, &$selected > $content $label": {
        backgroundColor: "transparent",
      },
    },
    content: {
      color: theme.palette.text.primary,
      borderTopRightRadius: theme.spacing(2),
      borderBottomRightRadius: theme.spacing(2),
      paddingRight: theme.spacing(1),
      fontWeight: theme.typography.fontWeightMedium,
      "$expanded > &": {
        fontWeight: theme.typography.fontWeightRegular,
      },
    },
    group: {
      marginLeft: 0,
      "& $content": {
        paddingLeft: theme.spacing(2),
      },
    },
    expanded: {},
    selected: {},
    label: {
      fontWeight: "inherit",
      color: "inherit",
    },
    labelRoot: {
      display: "flex",
      alignItems: "center",
      gap: `${theme.spacing(2)}px`,
      padding: theme.spacing(0.5, 1),
      fontWeight: "normal",
    },
    labelIcon: {
      marginRight: theme.spacing(1),
    },
    labelText: {
      fontWeight: "inherit",
      flexGrow: 0,
    },
    bold: {
      fontWeight: "bold",
    },
  })
);

export default StyledTreeItem;
