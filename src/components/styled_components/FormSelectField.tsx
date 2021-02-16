import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Theme,
  createStyles,
  InputBase,
  withStyles,
} from "@material-ui/core";
import React from "react";
import clsx from "clsx";

const BootstrapInput = withStyles((theme: Theme) =>
  createStyles({
    root: {
      "label + &": {
        marginTop: theme.spacing(3),
      },
    },
    input: {
      borderRadius: theme.shape.borderRadius,
      position: "relative",
      backgroundColor: theme.palette.background.paper,
      border: theme.palette.divider,
      fontSize: "1rem",
      padding: "10px 26px 10px 12px",
      transition: theme.transitions.create(["border-color"]),
      // Use the system font instead of the default Roboto font.
      fontFamily: [
        "-apple-system",
        "BlinkMacSystemFont",
        '"Segoe UI"',
        "Roboto",
        '"Helvetica Neue"',
        "Arial",
        "sans-serif",
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(","),
      "&:focus, &:hover": {
        borderColor: theme.palette.primary.main,
      },
    },
  })
)(InputBase);

type FormSelectFieldProps = {
  value: string;
  onChange: (event: React.ChangeEvent<{ value: unknown }>) => void;
  items: { value: string; text: string }[];
  label: string;
  className?: string;
};

const FormSelectField: React.FunctionComponent<FormSelectFieldProps> = (
  props
) => {
  const { value, onChange, items, label, className, ...others } = props;
  return (
    <FormControl className={className} {...others}>
      <InputLabel id={props.label}>{props.label}</InputLabel>
      <Select
        labelId={label}
        value={value}
        onChange={onChange}
        input={<BootstrapInput />}
      >
        {items.map((item) => {
          return <MenuItem value={item.value}>{item.text}</MenuItem>;
        })}
      </Select>
    </FormControl>
  );
};

export default FormSelectField;
