import * as React from "react";

import { Checkbox, ListItemText, FormControl, MenuItem } from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import CustomButton from "components/CustomButton";

const theme = createTheme({
  typography: {
    allVariants: {
      fontSize: "13px",
      color: "#000000",
      lineHeight: "28px",
      fontFamily: `Roboto`,
      fontWeight: 500,
    },
  },
});

const MenuProps = {
  PaperProps: {
    sx: {
      width: "311px",
      maxHeight: "262px !important",
      marginTop: "8px",
      boxShadow: "0px 1px 4px rgba(0, 0, 0, 0.1)",

      marginLeft: "77px",
      background: "#FFFFFF",
      borderRadius: "unset",

      "& .MuiMenuItem-root": {
        padding: "0px 6px",
      },

      "& .Mui-checked": {
        color: "#2196F3",
      },
    },
  },
};
export interface DropDownListType {
  label: string;
  value: string;
}

type MultiSelectPropType = {
  value?: string[];
  onChange?: (event: SelectChangeEvent<string[]>) => void;
  dropDownList?: DropDownListType[];
  size?: "small" | "medium" | "large";
  sx?: Object;
  onChangeButton?: (event?: React.MouseEvent<HTMLButtonElement>) => void;
};

const MultiSelectDropDown: React.FC<MultiSelectPropType> = ({
  value,
  onChange,
  dropDownList,
  sx,
  onChangeButton,
}) => {
  return (
    <FormControl
      sx={{
        "& .MuiOutlinedInput-notchedOutline": {
          border: "unset",
        },
      }}
    >
      <Select
        multiple
        value={value ? value : []}
        onChange={onChange}
        renderValue={(selected) => selected.join(", ")}
        MenuProps={MenuProps}
        sx={{
          background: "#F5F5F5",
          borderRadius: "58px",
          height: "fit-content",
          "& .MuiOutlinedInput-input": {
            background: "none",
            p: "11px 67.9px 11px 14.88px",
          },
          "& .MuiSvgIcon-root": {
            color: "#212121",
          },

          ...sx,
        }}
      >
        {/* <ThemeProvider theme={theme}> */}
        {dropDownList &&
          dropDownList.map((obj) => (
            <MenuItem key={obj.label} value={obj.label}>
              <Checkbox checked={value!.indexOf(obj.label) > -1} />
              <ListItemText primary={obj.label} />
            </MenuItem>
          ))}
        {/* </ThemeProvider> */}
        <CustomButton
          variant={"contained"}
          color={"secondary"}
          sx={{
            p: "12px 16px",
            height: "44px",
            width: "279px",
            borderRadius: "4px",
            size: "medium",
            m: "40px 16.18px 0px",
            position: "sticky",
            bottom: 0,
          }}
          onClick={onChangeButton}
        >
          Apply
        </CustomButton>
      </Select>
    </FormControl>
  );
};

export default MultiSelectDropDown;
