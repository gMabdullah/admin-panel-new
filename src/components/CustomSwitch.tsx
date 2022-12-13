import React from "react";

import { FormGroup, FormControlLabel, Switch } from "@mui/material";
import { withStyles } from "@mui/styles";

type switchType<T extends React.ElementType> = {
  onChange?: (event?: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  checked?: boolean;
  value?: string;
  name?: string;
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
  onChange,
  value,
  label,
  name,
  ...rest
}: switchType<T>): JSX.Element => {
  return (
    <>
      <FormGroup>
        <FormControlLabel
          control={
            <PurpleSwitch
              {...rest}
              checked={checked}
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
