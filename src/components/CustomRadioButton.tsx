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
  value: string | SVGSVGElement;
  label?: string;
  options?: { value: string; label: string }[];
  sx?: object;
  row?: boolean;
} & React.ComponentPropsWithoutRef<T>;

const radioButtonStyle = {
  "& .MuiFormControlLabel-root": {
    mr: "25px",
  },
  "& .MuiTypography-root": {
    fontSize: "12px",
  },
  "& .MuiRadio-root ": {
    p: "8px",
  },
  "& .Mui-checked": {
    color: "#DB154D !important",
  },
};

const CustomRadioButton = <T extends React.ElementType = "select">({
  onChange,
  value,
  options,
  row,
  sx,
  ...rest
}: radioButtonTypes<T>): JSX.Element => {
  return (
    <>
      <FormControl
        sx={{
          ...radioButtonStyle,
          ...sx,
        }}
      >
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
