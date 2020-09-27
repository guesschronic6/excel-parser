import { createStyles, makeStyles, Tabs, Theme } from "@material-ui/core";
import React, { ChangeEvent } from "react";
import { useState } from "react";
import { HorizontalTab } from "../../styled_components";
import { PowerTransformerLoss } from "../../power_transformer_loss/objects";
import MonthlyPowerTransformerLossCard from "./data/MonthlyPowerTransformerLossCard";

type PowerTransformerLossContentProps = {
  powerTransformerLoss: PowerTransformerLoss;
  index: string;
  value: string;
};

enum DataTab {
  DATA = "data",
  GRAPH = "graph",
  NONE = "",
}

type TabPanelProps = {
  value: string;
  index: string;
  children: any;
};

function TabPanel(props: TabPanelProps) {
  const { value, index, children } = props;
  const classes = useStyles();

  return value === index ? (
    <div className={classes.loadProfileContent_tabPanel}>{children}</div>
  ) : (
    <></>
  );
}

const PowerTransformerLossContent: React.FunctionComponent<PowerTransformerLossContentProps> = (
  props
) => {
  const { powerTransformerLoss, index, value } = props;
  const [selectedTab, setSelectedTab] = useState<string>(DataTab.DATA);
  const classes = useStyles();

  function handleTabChange(event: ChangeEvent<{}>, newTab: string) {
    setSelectedTab(newTab);
  }

  return index === value ? (
    <div className={classes.loadProfileContent_root}>
      <div>
        <Tabs
          onChange={handleTabChange}
          indicatorColor="primary"
          value={selectedTab}
        >
          <HorizontalTab label="Data" value={DataTab.DATA} />
          <HorizontalTab label="Graph" value={DataTab.GRAPH} />
        </Tabs>
      </div>
      <TabPanel index={DataTab.DATA} value={selectedTab}>
        <MonthlyPowerTransformerLossCard
          powerTransformerLoss={powerTransformerLoss}
        />
      </TabPanel>
      {/* <TabPanel index={DataTab.GRAPH} value={selectedTab}></TabPanel> */}
    </div>
  ) : (
    <></>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    loadProfileContent_root: {
      height: "100%",
      display: "flex",
      flexDirection: "column",
    },
    loadProfileContent_tabPanel: {
      flex: 1,
      padding: theme.spacing(3),
    },
  })
);

export default PowerTransformerLossContent;
