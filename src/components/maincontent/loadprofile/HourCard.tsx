import { Typography } from "@material-ui/core";
import React from "react";
import { HourlyLoadProfile } from "../../loadprofile/objects";

type HourCardProps = {
  hourlyLoadProfile: HourlyLoadProfile;
};

const HourCard: React.FunctionComponent<HourCardProps> = ({
  hourlyLoadProfile,
  ...others
}) => {
  return (
    <div>
      <Typography variant="body1">{`Hour: ${
        hourlyLoadProfile.hour
      } kwdel: ${hourlyLoadProfile.getTotalKwdel()}`}</Typography>
    </div>
  );
};

export default HourCard;
