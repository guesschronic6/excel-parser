import { makeStyles, Theme } from "@material-ui/core";

const loadProfileStyles = makeStyles((theme: Theme) => ({
  root: {
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "column",
  },
  textFieldContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    width: "50%",
    minWidth: "300px",
    fontSize: "0.9rem",
  },
  actionContainer: {
    marginTop: 10,
  },
}));

export default loadProfileStyles;
