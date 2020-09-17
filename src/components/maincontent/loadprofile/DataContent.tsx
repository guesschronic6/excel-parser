import { makeStyles, Theme } from "@material-ui/core";
import { LoadProfileContext } from "../../loadprofile/LoadProfileContextProvider";
import React, { useContext } from "react";

type DataContentProps = {};

const DataContent: React.FunctionComponent<DataContentProps> = ({
  ...others
}) => {
  const loadProfileContext = useContext(LoadProfileContext);
  const classes = useStyles();

  return <div className={classes.root}></div>;
};

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    maxHeigh: "100%",
    overflow: "scroll",
    maxWidth: "100%",
    display: "flex",
    gap: "20px",
    padding: 20,
  },
}));

export default DataContent;
