import { makeStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => ({
  dropZone: {
    height: "100%",
    width: "100%",
    cursor: "pointer",
    minHeight: 50,
  },
  dropZone_focused: {
    border: `2px dashed ${theme.palette.text.secondary}`,
  },
  dropZone_content: {
    display: "flex",
    flexDirection: "column",
    maxWidth: "100%",
    gap: "10px",
    flexWrap: "wrap",
    margin: 5,
  },
  dropZoneText: {
    fontSize: "0.8rem",
    fontWeight: "bold",
    padding: "5px",
  },
  loadprofileCard: {},
}));

export default useStyles;
