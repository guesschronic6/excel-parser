import React, { useEffect, useState } from "react";
import { LoadProfile } from "../../../loadprofile/objects";

import { StyledTreeItem } from "../../../styled_components";
import { Today } from "@material-ui/icons";
import { Month } from "../../../common/object";
import HourTreeItem from "./HourTreeItem";

type DayTreeProps = {
  loadProfiles: LoadProfile[];
  totalLoadProfile: LoadProfile;
  dateString: string;
  nodeId: string;
};

const DayTree = (props: DayTreeProps) => {
  const { loadProfiles, dateString, nodeId, totalLoadProfile } = props;

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
        totalLoadProfile={totalLoadProfile}
      />
      {[...Array(24).keys()].map((hour) => {
        return (
          <HourTreeItem
            nodeId={`HTI: H:${hour}`}
            key={`HTI: H:${hour}`}
            hour={hour + 1}
            dateString={dateString}
            loadProfiles={loadProfiles}
            totalLoadProfile={totalLoadProfile}
          />
        );
      })}
    </StyledTreeItem>
  );
};

export default DayTree;
