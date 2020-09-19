import React, { useEffect, useState } from "react";
import { LoadProfile, MonthlyLoadProfile } from "../../../loadprofile/objects";

import { TreeView } from "@material-ui/lab";
import StyledTreeItem from "./StyledTreeItem";
import { Today } from "@material-ui/icons";
import { Month } from "../../../enums";
import HourTreeItem from "./HourTreeItem";

type DayTreeProps = {
  loadProfiles: LoadProfile[];
  dateString: string;
  nodeId: string;
};

const DayTree = (props: DayTreeProps) => {
  const { loadProfiles, dateString, nodeId } = props;

  const [date, setDate] = useState(new Date());

  useEffect(() => {
    setDate(new Date(dateString));
  }, [dateString]);

  return (
    <StyledTreeItem
      nodeId={nodeId}
      labelText={`${Month[date.getMonth()]} ${date.getDate()}`}
      labelIcon={Today}
    >
      <HourTreeItem
        nodeId={`DTI:D:${dateString}H`}
        dateString={dateString}
        header={true}
        loadProfiles={loadProfiles}
      />
      {[...Array(24).keys()].map((hour) => {
        return (
          <HourTreeItem
            nodeId={`HTI: H:${hour}`}
            key={`HTI: H:${hour}`}
            hour={hour + 1}
            dateString={dateString}
            loadProfiles={loadProfiles}
          />
        );
      })}
    </StyledTreeItem>
  );
};

export default DayTree;
