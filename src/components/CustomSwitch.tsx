import React from "react";

import { FormGroup, FormControlLabel, Switch } from "@mui/material";
import { withStyles } from "@mui/styles";

type switchType<T extends React.ElementType> = {
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  value?: string;
  name?: string;
  sx?: object;
};

const PurpleSwitch = withStyles({
  switchBase: {
    color: "#fafafa",
    "&$checked": {
      color: "#e51451",
    },
    "&$checked + $track": {
      backgroundColor: "#f79297",
    },
  },
  checked: {},
  track: {},
})(Switch);

const CustomizedSwitch = <T extends React.ElementType = "button">({
  checked,
  defaultChecked,
  onChange,
  value,
  label,
  name,
  sx,
  ...rest
}: switchType<T>): JSX.Element => {
  return (
    <>
      <FormGroup sx={sx}>
        <FormControlLabel
          control={
            <PurpleSwitch
              {...rest}
              checked={checked}
              defaultChecked={defaultChecked}
              onChange={onChange}
              value={value}
              name={name}
            />
          }
          label={label}
        />
      </FormGroup>
    </>
  );
};

export default CustomizedSwitch;
