import { Typography } from "@material-ui/core";
import React from "react";
import useStyles from "./use-style";

type DashboardProps = {};

const Dashboard: React.FC<DashboardProps> = (props) => {
  const classes = useStyles();

  return (
    <div>
      <Typography variant="h1">Dashboard</Typography>
    </div>
  );
};

export default Dashboard;
