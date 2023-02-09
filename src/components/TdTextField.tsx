import React from "react";

import { withStyles } from "@mui/styles";
import { InputAdornment, TextField, IconButton } from "@mui/material";
import {
  Email,
  SearchOutlined,
  VisibilityOff,
  Visibility,
} from "@mui/icons-material";

import moment from "moment";

type TextFieldType<T extends React.ElementType> = {
  type?: string;
  disablePrevDates?: boolean;
  defaultValue?: string;
  label?: string;
  id?: number;
  disabled?: boolean;
  multiline?: boolean;
  onKeyPress?: (event?: React.KeyboardEvent<HTMLElement>) => void;
  onKeyUp?: (event?: React.KeyboardEvent<HTMLElement>) => void;
  onKeyDown?: (event?: React.KeyboardEvent<HTMLElement>) => void;
  rows?: number;
  textTransform?: string;
  helperText?: React.ReactNode;
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLTextAreaElement | HTMLInputElement>;
  Adornment?: boolean;
  closeIcon?: boolean;
  sx?: object;
  className?: object;
  error?: boolean;
  InputLabelProps?: {
    shrink: boolean;
  };
  required?: boolean;
} & React.ComponentPropsWithoutRef<T>;

const fieldSX = {
  width: "100%",
  margin: 0,
};

const CssTextField = withStyles({
  root: (props) => ({
    "& div.MuiOutlinedInput-multiline": {
      fontSize: props.size === "small" ? 13 : 15,
    },
    "& label:not(.Mui-focused)": {
      color: "#bababa",
      fontSize: props.size === "small" ? 13 : 15,
      fontWeight: "200",
    },
    "& label.MuiInputLabel-outlined": {
      transform:
        props.size === "small"
          ? props.type === "date"
            ? `translate(14px, -6px) scale(0.68)`
            : `translate(14px, 12px) scale(1)`
          : "",
      paddingRight: props.type === "date" || props.multiline === true ? 5 : "",
      paddingLeft: props.type === "date" || props.multiline === true ? 5 : "",
    },
    "& label.MuiInputLabel-outlined.MuiInputLabel-shrink": {
      transform:
        props.size === "small" ? `translate(14px, -6px) scale(0.68)` : "",
      paddingRight: props.type === "date" || props.multiline === true ? 5 : "",
      paddingLeft: props.type === "date" || props.multiline === true ? 5 : "",
    },
    "& .MuiOutlinedInput-multiline": {
      padding: "8px 8px",
    },
    "& label.Mui-focused": {
      color: "#bababa",
      fontWeight: "100",
      fontSize: props.size === "small" ? 13 : 15,
    },
    "& label.MuiFormLabel-filled": {
      color: "#bababa",
      fontWeight: "100",
      fontSize: props.size === "small" ? 13 : 15,
    },
    "& p.MuiFormHelperText-root": {
      marginLeft: 0,
      color: "red",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "green",
    },
    "& .MuiOutlinedInput-root": {
      height: "48px",

      "& fieldset": {
        borderColor: "#bababa",
        borderWidth: 0.8,
        cursor: props.disabled === true ? "not-allowed" : "arrow",
      },
      "&:hover fieldset": {
        borderColor: "#e51451",
      },
      "&.Mui-focused fieldset": {
        borderWidth: 0.8,
        borderColor: "#e51451",
      },
      "&.MuiOutlinedInput-root input": {
        color: "#545454",
        fontSize: props.size === "small" ? 13 : 15,
        fontWeight: "200",
        textTransform: (props) => props.texttransform,
      },
      "&.MuiOutlinedInput-root .MuiTypography-root": {
        color: "#545454",
        fontSize: props.size === "small" ? 13 : 15,
        fontWeight: "200",
      },
      "& .MuiOutlinedInput-input": {
        padding: props.size === "small" ? 11 : "12.5px",
        color: "#545454",
        fontSize: props.size === "small" ? 13 : 15,
        fontWeight: "200",
      },
    },
    "& .MuiIconButton-label": {
      "& .MuiSvgIcon-root": {
        fontSize: "1.2rem",
      },
    },
  }),
})(TextField);

const TdTextField = <T extends React.ElementType = "input">({
  type,
  disablePrevDates,
  label,
  id,
  disabled,
  multiline,
  onKeyPress,
  rows,
  textTransform,
  helperText,
  onChange,
  onBlur,
  Adornment,
  error,
  closeIcon,
  defaultValue,
  sx,
  className,
  required,
  onKeyUp,
  onKeyDown,
  InputLabelProps,
  ...rest
}: TextFieldType<T>): JSX.Element => {
  const [values, setValues] = React.useState({
    showPassword: false,
  });
  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = () => {
    //   event.preventDefault();
  };

  return (
    <CssTextField
      InputProps={{
        startAdornment: type === "search" && (
          <InputAdornment style={{ cursor: "pointer" }} position="start">
            <SearchOutlined />
          </InputAdornment>
        ),
        inputProps: {
          min:
            type === "date"
              ? disablePrevDates
                ? moment().format("YYYY-MM-DD")
                : "0000-01-01"
              : 0,
          max: "2100-01-01",
        },
        endAdornment: Adornment ? (
          type === "password" ? (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
              >
                {values.showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          ) : type === "email" ? (
            <InputAdornment style={{ cursor: "pointer" }} position="start">
              <Email />
            </InputAdornment>
          ) : (
            <InputAdornment position="start"></InputAdornment>
          )
        ) : null,
      }}
      type={
        type
          ? type === "password"
            ? values.showPassword
              ? "text"
              : "password"
            : type
          : "text"
      }
      inputProps={{ min: "0", step: "1" }}
      label={label}
      id={id}
      className={className}
      disabled={disabled === true ? true : false}
      required={required === true ? true : false}
      autoComplete="off"
      margin="normal"
      variant="outlined"
      multiline={multiline === true ? true : false}
      onKeyPress={onKeyPress}
      onKeyUp={onKeyUp}
      onKeyDown={onKeyDown}
      rows={rows}
      texttransform={textTransform ? textTransform : ""}
      helperText={error && helperText}
      onChange={onChange}
      onBlur={onBlur}
      defaultValue={defaultValue}
      InputLabelProps={InputLabelProps}
      sx={{ ...fieldSX, ...sx }}
      error={error}
      {...rest}
    />
  );
};
export default TdTextField;
