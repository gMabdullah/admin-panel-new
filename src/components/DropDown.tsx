import React from "react";

import { makeStyles } from "@mui/styles";
import { MenuItem, FormControl } from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";

type DropDownType<T extends React.ElementType> = {
  options: {
    label: string;
    id: number;
  }[];
  defaultValue?: {
    label: string;
    id: number;
  };
  label?: string;
  name?: string;
} & React.ComponentPropsWithoutRef<T>;

const useStyles = makeStyles((theme) => ({
  quantityRoot: {
    color: "#F5F5F !important",
    backgroundColor: "#F5F5F5 !important",
    width: "160px",
    height: "40px",
    borderRadius: "58px",
    marginRight: "8px",
    marginBottom: "24px",
    marginTop: "24px",

    "& .MuiOutlinedInput": {
      border: "58px",
    },
    "& .MuiOutlinedInput-root": {
      borderRadius: "58px !important",
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

const DropDown = <T extends React.ElementType = "select">({
  options,
  defaultValue,
  label,
  ...rest
}: DropDownType<T>): JSX.Element => {
  const classes = useStyles();
  const [defualtData, setDefaultData] = React.useState("");
  const handleChange = (event: SelectChangeEvent) => {
    setDefaultData(event.target.value as string);
  };
  return (
    <>
      <FormControl
        variant="outlined"
        classes={{
          root: classes.quantityRoot,
        }}
      >
        <Select
          classes={{
            icon: classes.icon,
          }}
          MenuProps={{ classes: { paper: classes.selectPaper } }}
          defaultValue={defualtData}
          onChange={handleChange}
        >
          {options.map((data, i) => {
            return (
              <MenuItem key={i} value={data.id}>
                {data.label}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </>
  );
};
export default DropDown;
