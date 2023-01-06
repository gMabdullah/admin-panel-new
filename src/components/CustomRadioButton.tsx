import React from "react";

import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";

type radioButtonTypes<T extends React.ElementType> = {
  renderAs?: T;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  label?: string;
  options?: { value: string; label: string }[];
  sx?: Object;
  row?: boolean;
} & React.ComponentPropsWithoutRef<T>;

const CustomRadioButton = <T extends React.ElementType = "select">({
  onChange,
  value,
  options,
  row,
  ...rest
}: radioButtonTypes<T>): JSX.Element => {
  return (
    <>
      <FormControl>
        <RadioGroup row={row} onChange={onChange} value={value} {...rest}>
          {options?.map<object>((option, index) => (
            <FormControlLabel
              value={option.value}
              key={index}
              control={<Radio />}
              label={option.label}
            />
          ))}
        </RadioGroup>
      </FormControl>
    </>
  );
};

export default CustomRadioButton;
