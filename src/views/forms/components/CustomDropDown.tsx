import React from "react";

import { Autocomplete, TextField } from "@mui/material";

type DropDownType<T extends React.ElementType> = {
  disableClearable?: boolean;
  disablePortal?: boolean;
  sx?: Object;
  options: {
    label: string;
    id: number;
  }[];
  defaultValue?: {
    label: string;
    id: number;
  };
  size?: "small" | "medium" | "large";
  style?: React.CSSProperties;
  label?: "string";
  renderInput?: (params?: React.MouseEvent<HTMLButtonElement>) => void;
} & React.ComponentPropsWithoutRef<T>;

const DropDown = <T extends React.ElementType = "select">({
  style,
  sx,
  options,
  defaultValue,
  label,
  renderInput,
  ...rest
}: DropDownType<T>): JSX.Element => {
  return (
    <Autocomplete
      {...rest}
      style={style}
      sx={sx}
      disableClearable
      options={options}
      defaultValue={defaultValue}
      renderInput={(params) => <TextField {...params} />}
    />
  );
};

export default DropDown;
