import { makeStyles, Theme } from "@material-ui/core";

const cardStyles = makeStyles((theme: Theme) => ({
  root: {
    zIndex: theme.zIndex.mobileStepper,
    maxWidth: "100%",
    fontSize: "0.8rem",
    boxSizing: "border-box",
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
    border: `1px solid ${theme.palette.divider}`,
    padding: 10,
    overflowWrap: "break-word",
    wordWrap: "break-word",
  },
  filename: {
    fontSize: "1em",
    color: theme.palette.text.primary,
  },
  progress_text: {
    fontSize: "0.7em",
    color: theme.palette.text.secondary,
    alignSelf: "flex-end",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    gap: "5px",
    justifyContent: "center",
  },
  progress_content: {
    display: "flex",
    flexDirection: "column",
    gap: "3px",
  },
  action: {},
  button: {
    textTransform: "none",
  },
}));

export default cardStyles;
