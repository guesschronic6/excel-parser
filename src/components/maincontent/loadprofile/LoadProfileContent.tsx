import {
  Divider,
  makeStyles,
  Tab,
  Tabs,
  Theme,
  Typography,
} from "@material-ui/core";
import React, { ChangeEvent, useState } from "react";
import { HorizontalTab } from "../../common/components/tabs";
import DataContent from "./data/DataContent";
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

  function handleTabChange(event: ChangeEvent<{}>, newTab: string) {
    setSelectedTab(newTab);
  }
  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <Typography className={classes.title} variant="h5">
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

      <div className={classes.content}>
        {selectedTab === DataTab.DATA && <DataContent></DataContent>}
      </div>
    </div>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: "100%",
    height: "100%",
    maxWidth: "100%",
    maxHeight: "100%",
    display: "flex",
    flexDirection: "column",
  },
  header: {
    display: "flex",
    alignItems: "flex-end",
  },
  title: {
    marginRight: theme.spacing(1),
    paddingRight: theme.spacing(3),
    textAlign: "center",
  },
  content: {
    flexGrow: 1,
    gap: "25px",
    maxHeight: "100%",
    maxWidth: "100%",
    overflow: "auto",
  },
}));

export default LoadProfileContent;
