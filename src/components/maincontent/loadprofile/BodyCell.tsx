import { Theme, makeStyles, Typography } from "@material-ui/core";
import clsx from "clsx";
import React from "react";

type BodyCellProps = {
  value: string;
  variant?: string;
};

const BodyCell: React.FunctionComponent<BodyCellProps> = ({
  value,
  variant = "info",
  ...others
}) => {
  const classes = useStyles();
  return (
    <div
      className={clsx(classes.root, {
        [classes.description]: variant === "description",
        [classes.info]: variant === "info",
      })}
    >
      <Typography className={classes.value} variant="caption">
        {value}
      </Typography>
    </div>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: "3px 8px",
  },
  value: {
    fontWeight: "normal",
    fontSize: "1em",
  },
  description: {
    border: `1px solid ${theme.palette.divider}`,
  },
  info: {
    border: `1px solid ${theme.palette.divider}`,
  },
}));

export default BodyCell;
