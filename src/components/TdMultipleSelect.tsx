import React, { useState } from 'react';
import { TextField,MenuItem ,Chip} from "@mui/material";
import { withStyles } from "@mui/styles";

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
          fontSize: props.size === "small" ? 13 : 15,
        },
        "& label.MuiFormLabel-filled": {
          color: "#bababa",
          fontWeight: "100",
          fontSize: props.size === "small" ? 13 : 15,
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
            padding: props.size === "small" ? 11 : "",
          },
          "& .MuiOutlinedInput-adornedEnd .MuiAutocomplete-endAdornment": {
            display: props.inHead ? "none" : "",
          },
        },
      }),
  })(TextField);

interface Option {
  value: string;
  label: string;
}

const options: Option[] = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
];

export default function MultipleSelectDropdown() {
  //const classes = useStyles();
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedOptions(event.target.value as string[]);
  };

  return (
   
    <CssTextField
    noValidate
      id="standard-select-multiple"
      select
      autoComplete="off"
      label="Multiple Select"
      value={selectedOptions}
      onChange={handleChange}
    
      SelectProps={{
        multiple: true,
      }}
      inputProps={{ min: "0", step: "1" }}
      InputProps={{
        startAdornment: selectedOptions.map((option) => (
          <Chip label={option} key={option} />
        )),
      }}
      helperText="Please select multiple options"
    >
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </CssTextField>

  );
}
