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
import GraphContent from "./graph/GraphContent";

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
      <div className={classes.loadProfileContent_contentWrapper}>
        <div className={classes.loadProfileContent_content}>
          {selectedTab === DataTab.DATA && <DataContent />}
          {selectedTab === DataTab.GRAPH && <GraphContent />}
        </div>
      </div>
    </div>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  loadProfileContent_root: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    minHeight: "0px",
    minWidth: "0px",
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
  loadProfileContent_contentWrapper: {
    flex: 1,
    overflow: "auto",
    display: "flex",
    flexWrap: "nowrap",
  },
  loadProfileContent_content: {
    flex: 1,
    padding: theme.spacing(5),
  },
}));

export default LoadProfileContent;
