import { makeStyles, TextField, Theme } from "@material-ui/core";
import React, { ChangeEvent } from "react";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    fontSize: "1em",
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.background.paper,
    "&.Mui-focused": {
      backgroundColor: theme.palette.background.default,
      border: `1px solid ${theme.palette.primary.main}`,
    },
    "&:hover": {
      backgroundColor: theme.palette.background.default,
    },
    focused: {},
  },
}));

type FormTextFieldProps = {
  value?: string | number;
  name?: string;
  label?: string;
  placeholder?: string;
  helpertext?: string;
  error?: boolean;
  type?: string;
  limitZero?: boolean;
  onChange?: (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
};

const FormTextField: React.FunctionComponent<FormTextFieldProps> = ({
  label,
  value = "",
  name = "",
  placeholder = "",
  helpertext = "",
  error = false,
  type = "text",
  onChange = (event) => {},
  limitZero = true,
}) => {
  const classes = useStyles();

  function handleChange(
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) {
    if (type === "number" && Number(event.target.value) < 0) {
      return;
    } else {
      onChange(event);
    }
  }
  return (
    <TextField
      variant="filled"
      label={label}
      value={value}
      name={name}
      placeholder={placeholder}
      error={error}
      helperText={helpertext}
      type={type}
      InputProps={{
        disableUnderline: true,
        classes: { root: classes.root },
      }}
      margin="dense"
      onChange={handleChange}
    />
  );
};

export default FormTextField;
