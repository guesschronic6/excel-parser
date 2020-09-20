import {
  LinearProgress,
  makeStyles,
  Tabs,
  Theme,
  Typography,
} from "@material-ui/core";
import React, { ChangeEvent, useContext, useState } from "react";
import { HorizontalTab } from "../../common/components/tabs";
import DataContent from "./data/DataContent";
import { LoadProfileContext } from "../../loadprofile/LoadProfileContextProvider";
type LoadProfileContentProps = {};

enum DataTab {
  DATA = "data",
  GRAPH = "graph",
  NONE = "",
}

const LoadProfileContent: React.FunctionComponent<LoadProfileContentProps> = ({
  ...others
}) => {
  const classes = useStyles();
  const [selectedTab, setSelectedTab] = useState<string>(DataTab.DATA);
  const loadProfileContext = useContext(LoadProfileContext);

  function handleTabChange(event: ChangeEvent<{}>, newTab: string) {
    setSelectedTab(newTab);
  }
  return (
    <div className={classes.loadProfileContent_root}>
      <div className={classes.loadProfileContent_Header}>
        <Typography className={classes.loadProfileContent_Title} variant="h5">
          Load Profile
        </Typography>
        <Tabs
          onChange={handleTabChange}
          indicatorColor="primary"
          value={selectedTab}
        >
          <HorizontalTab label="Data" value={DataTab.DATA} />
          <HorizontalTab label="Graph" value={DataTab.GRAPH} />
        </Tabs>
      </div>
      <div className={classes.loadProfileContent_Content}>
        {selectedTab === DataTab.DATA && <DataContent></DataContent>}
      </div>
    </div>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  loadProfileContent_root: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    minWidth: 0,
    minHeight: 0,
  },
  loadProfileContent_Header: {
    display: "flex",
    alignItems: "flex-end",
  },
  loadProfileContent_Title: {
    marginRight: theme.spacing(1),
    paddingRight: theme.spacing(3),
    textAlign: "center",
  },
  loadProfileContent_Content: {
    flexGrow: 1,
    display: "flex",
    minHeight: "0px",
    minWidth: "0px",
  },
}));

export default LoadProfileContent;
