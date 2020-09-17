import { Typography } from "@material-ui/core";
import React from "react";
import { LoadProfile_Hour } from "../../loadprofile/objects";

type HourCardProps = {
  loadProfileHour: LoadProfile_Hour;
};

const HourCard: React.FunctionComponent<HourCardProps> = ({
  loadProfileHour,
  ...others
}) => {
  return (
    <div>
      <Typography variant="body1">{`Hour: ${
        loadProfileHour.hour
      } kwdel: ${loadProfileHour.getTotalKwdel()}`}</Typography>
    </div>
  );
};

export default HourCard;
