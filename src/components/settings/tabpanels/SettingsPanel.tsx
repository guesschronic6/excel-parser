import React, { FormEvent } from "react";
import { Button, createStyles, makeStyles, Theme } from "@material-ui/core";
type LoadProfileSettingsProps = {
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  children: any;
};

const LoadProfileSettingsPanel: React.FunctionComponent<LoadProfileSettingsProps> = (
  props
) => {
  const { onSubmit, children, ...others } = props;
  const classes = useStyles();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSubmit(event);
  }

  return (
    <div className={classes.root}>
      <form
        id="settings-form"
        className={classes.textFieldContainer}
        onSubmit={handleSubmit}
      >
        {children}
      </form>
      <div className={classes.actionContainer}>
        <Button form="settings-form" type="submit" color="primary">
          Save
        </Button>
      </div>
    </div>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: "100%",
      display: "flex",
      flexDirection: "column",
    },
    textFieldContainer: {
      display: "flex",
      flexDirection: "column",
      gap: "10px",
      width: "300px",
      fontSize: "0.9rem",
    },
    actionContainer: {
      marginTop: 10,
    },
  })
);

export default LoadProfileSettingsPanel;
