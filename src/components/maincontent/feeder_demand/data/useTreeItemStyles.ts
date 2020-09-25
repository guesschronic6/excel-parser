import { makeStyles, Theme, createStyles } from "@material-ui/core";

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
    },
    labelIcon: {
      marginRight: theme.spacing(1),
    },
    labelText: {
      fontWeight: "normal",
      flexGrow: 0,
    },
  })
);

export default useTreeItemStyles;
