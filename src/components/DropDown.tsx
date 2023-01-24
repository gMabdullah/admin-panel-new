import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import { MenuItem, FormControl } from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";

type DropDownType<T extends React.ElementType> = {
  options: {
    label: string;
    value: string | number;
  }[];
  defaultValue?: string;
  label?: string;
  name?: string;
  value?: string;
  error?: boolean;
  isStaticDropDown?:boolean;
  helperText?: React.ReactNode;
  handleChange: (event: SelectChangeEvent) => void;
} & React.ComponentPropsWithoutRef<T>;

const theme = createTheme({
  typography: {
    allVariants: {
      fontSize: "14px",
      color: "#212121",

      fontFamily: `Roboto`,
      fontWeight: 400,
      lineHeight: "1.334em",
    },
  },
});

const useStyles = makeStyles((theme) => ({
  quantityRoot: {
    fontSize: "14px",
    // color: "#212121",

    fontFamily: `Roboto`,
    fontWeight: 400,
    lineHeight: "1.334em",
    color: "#F5F5F !important",
    backgroundColor: "#F5F5F5 !important",
    width: "160px",
    borderRadius: "58px",
    marginRight: "8px",
    

    "& .MuiOutlinedInput": {
      border: "58px",
    },
    "& .MuiOutlinedInput-root": {
      borderRadius: "58px !important",
    },
    "& .MuiList-root": {
      padding: "14px !important",
    },
    height: "fit-content",
    "& .MuiOutlinedInput-input": {
      background: "none",
      p: "11px 67.9px 11px 14.88px",
    },
    "& .MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input ": {
      borderRadius: "58px !important",
    },
    "& .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
    "& .Mui-disabled": {
      color: "#FFFFFF",
      opacity: 0.6,
    },
    "& .Mui-disabled .MuiOutlinedInput-notchedOutline": {
      border: "20px solid #484850",
    },
  },
  staticDropDownRoot: {
    fontSize: "14px",
    // color: "#212121",

    fontFamily: `Roboto`,
    fontWeight: 400,
    lineHeight: "1.334em",
    color: "#F5F5F !important",
    backgroundColor: "#F5F5F5 !important",
   // width: "160px",
    borderRadius: "8px !important",
    marginRight: "8px",
    height: "44px",
    width: "146px",

    "& .MuiOutlinedInput": {
      border: "58px !important",
    },
    "& .MuiOutlinedInput-root": {
      borderRadius: "8px !important",
    },
    "& .MuiList-root": {
      padding: "14px !important",
    },
   // height: "fit-content",
    "& .MuiOutlinedInput-input": {
      background: "none",
      p: "11px 67.9px 11px 14.88px !important",
    },
    "& .MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input ": {
      borderRadius: "58px !important",
    },
    "& .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
    "& .Mui-disabled": {
      color: "#FFFFFF",
      opacity: 0.6,
    },
    "& .Mui-disabled .MuiOutlinedInput-notchedOutline": {
      border: "20px solid #484850",
    },
  },
  selectRoot: {
    color: "#FFFFFF",
  },
  
  icon: {
    color: "#212121",
    Width: "6.67px",
    Height: "3.33px",
  },
  selectPaper: {
    backgroundColor: "#1E1E24",
    border: "1px solid #484850",
    borderRadius: "5px",
    color: "#FFFFFF",
  },
}));
const MenuProps = {
  PaperProps: {
    sx: {
      width: "211px",
      maxHeight: "262px !important",
      marginTop: "8px",
      boxShadow: "0px 1px 4px rgba(0, 0, 0, 0.1)",

      marginLeft: "22px",
      background: "#FFFFFF",
      borderRadius: "unset",

      "& .MuiOutlinedInput-input": {
        background: "none",
        p: "11px 67.9px 11px 14.88px",
      },
      "& .Mui-checked": {
        color: "#2196F3",
      },
    },
  },
};
const DropDown = <T extends React.ElementType = "select">({
  options,
  defaultValue,
  label,
  value,
  name,
  error,
  isStaticDropDown,
  helperText,
  handleChange,
  ...rest
}: DropDownType<T>): JSX.Element => {
  const classes = useStyles();

  return (
    <>
      <FormControl
        variant="outlined"
        classes={{
          root: isStaticDropDown ? classes.staticDropDownRoot : classes.quantityRoot,
        }}
      >
        <Select
          error={error}
          // helperText={helperText}
          classes={{
            icon: classes.icon,
          }}
          name={name}
          sx={{
            borderRadius: isStaticDropDown ? "8px !important" : "58px !important",
            "& .MuiOutlinedInput-root": {
              borderRadius: isStaticDropDown ? "8px !important" : "58px !important",
            },
            "& .MuiOutlinedInput": {
              border: "58px",
            },
          }}
          defaultValue={defaultValue}
          value={isStaticDropDown ? defaultValue : (value ? value : "")}
          onChange={handleChange}
          MenuProps={MenuProps}
        >
          {/* <ThemeProvider theme={theme}> */}
          {options.map((option, index) => {
            return (
              <MenuItem
                key={index}
                value={option.value}
                hidden={index == 0 ? true : false}
              >
                {option.label}
              </MenuItem>
            );
          })}
          {/* </ThemeProvider> */}
        </Select>
      </FormControl>
    </>
  );
};
export default DropDown;
