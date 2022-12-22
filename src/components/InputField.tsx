import React from "react";

import { TextField } from "@mui/material";

type InputFieldType<T extends React.ElementType> = {
  disabled?: boolean;
  id?: string;
  label?: string;
  variant?: string;
  placeholder?: string;
  defaultValue?: string;
  captionLabel?: string;
  iconPrimary?: React.ReactElement;
  iconSecondary?: React.ReactElement;
  InputField?: string;
  errorState?: string;
} & React.ComponentPropsWithoutRef<T>;

const InputField = <T extends React.ElementType = "input">({
  disabled,
  id,
  label,
  placeholder,
  defaultValue,
  iconPrimary,
  iconSecondary,
  errorState,
  captionLabel,
  ...rest
}: InputFieldType<T>): JSX.Element => {
  return (
    <>
      <TextField
        id={id}
        label={label}
        placeholder={placeholder}
        defaultValue={defaultValue}
        disabled={disabled || false}
        iconPrimary={iconPrimary}
        iconSecondary={iconSecondary}
        formState={errorState}
        captionLabel={captionLabel}
        {...rest}
      />
    </>
  );
};

export default InputField;
