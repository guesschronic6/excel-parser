import { Theme, makeStyles, Typography } from "@material-ui/core";
import React from "react";

type HeaderCellProps = {
  value: string;
};

const HeaderCell: React.FunctionComponent<HeaderCellProps> = ({
  value,
  ...others
}) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Typography className={classes.value} variant="caption" color="primary">
        {value}
      </Typography>
    </div>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: "3px 8px",
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  value: {
    fontWeight: "bold",
    fontSize: "1.2em",
  },
}));

export default HeaderCell;
