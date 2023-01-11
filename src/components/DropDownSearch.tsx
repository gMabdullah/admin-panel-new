import React from "react";
import {Autocomplete,TextField} from "@mui/material"

import { makeStyles, withStyles } from "@mui/styles";

export interface DropDownListType {
  label: string;
  value: string;
}

interface DropDownListTypeSearchType {
 // size?:'"small" | "medium" | undefined',
  error?: boolean,
  label?: string,
  placeholder?:string
  value?:DropDownListType[]
  helperText?:string
  onChange?:any;
  dropDownList: DropDownListType[];
  disabled?:boolean,
  onInputChange: any
  getOptionSelected:any
} 

const useStyles = makeStyles((theme: { spacing: (arg0: number) => any; }) => ({
  root: {
    width: 500,
    "& > * + *": {
      marginTop: theme.spacing(3),
    },
  },
}));

const CssTextField = withStyles({
  root: (props: { size: string; disabled: boolean; inHead: any; }) => ({
    "& div.MuiOutlinedInput-multiline": {
      fontSize:
        props.size === "small" ? 13 : 15,
    },
    "& label:not(.Mui-focused)": {
      color: "#bababa",
      fontSize:
        props.size === "small" ? 13 : 15,
      fontWeight: "200",
    },
    "& label.MuiInputLabel-outlined": {
      transform: props.size === "small" ? `translate(14px, 12px) scale(1)` : "",
    },
    "& label.MuiInputLabel-outlined.MuiInputLabel-shrink": {
      transform:
        props.size === "small" ? `translate(14px, -6px) scale(0.68)` : "",
    },
    "& .MuiOutlinedInput-multiline": {
      padding: "8px 8px",
    },
    "& label.Mui-focused": {
      color: "#bababa",
      fontWeight: "100",
      fontSize:
        props.size === "small" ? 13 : 15,
    },
    "& label.MuiFormLabel-filled": {
      color: "#bababa",
      fontWeight: "100",
      fontSize:
        props.size === "small" ? 13 : 15,
    },
    "& p.MuiFormHelperText-root": {
      marginLeft: 0,
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "green",
    },
    "& .MuiFormControl-root": {
      width: "100%",
    },

    "& .MuiOutlinedInput-root": {
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
        borderColor: "#e51451"
      },
      "&.MuiOutlinedInput-root input": {
        color: "#545454",
        fontSize:
          props.size === "small" ? 13 : 15,
        fontWeight: "200",
        textTransform: (props: { texttransform: any; }) => props.texttransform,
      },
      "&.MuiOutlinedInput-root .MuiTypography-root": {
        color: "#545454",
        fontSize:
          props.size === "small" ? 13 : 15,
        fontWeight: "200",
      },
      "& .MuiOutlinedInput-input": {
        padding: props.size === "small" ? 11 : "",
      },
      "& .MuiOutlinedInput-adornedEnd .MuiAutocomplete-endAdornment": {
        display: props.inHead ? "none" : "",
      },
    },
  }),
});

const  MultiSelect=({
 // size,
  error,
  label,
  placeholder,
  value,
  onChange,
  helperText,
  dropDownList,
  onInputChange,
  disabled,
  getOptionSelected
}:DropDownListTypeSearchType)=> {
  const classes = useStyles();
  return (
    <Autocomplete
      multiple
      //disabled={disabled}
      options={dropDownList}
      getOptionLabel={(option:any) => option.label}
      value={value}
      onChange={(event: any, newValue: any) => {
        onChange(newValue);
      }}
   size={"small"}
      filterSelectedOptions={true}
    //  getOptionSelected={getOptionSelected}
      renderInput={(params: any) => (
        <TextField
          {...params}
          onChange={onInputChange}
          error={error}
          variant="outlined"
          label={label}
          placeholder={placeholder}
          helperText={helperText}
        />
      )}
    />
  );
}

export default React.memo(MultiSelect);
