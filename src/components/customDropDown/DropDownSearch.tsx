import React from "react";

import { Autocomplete, Chip, TextField } from "@mui/material";
import { Close, ExpandMore } from "@mui/icons-material";

import { useStyles } from "./DropDownStyles";

export interface DropDownListType {
  label: string;
  value: string;
}

interface DropDownListTypeSearchType {
  isError?: boolean;
  label?: string;
  placeholder?: string;
  value: DropDownListType | DropDownListType[] | [];
  helperText?: string;
  options: DropDownListType[];
  disabled?: boolean;
  isMultiSelect?: boolean;
  name?: string;
  handleChange?: (
    event: React.ChangeEvent<{}>,
    value: any,
    name: string
  ) => void;
  popupIcon?: React.ReactNode;
}

const DropDownSearch = ({
  isError,
  label,
  placeholder,
  value,
  helperText,
  options,
  handleChange,
  disabled,
  isMultiSelect,
  popupIcon,
}: DropDownListTypeSearchType) => {
  const classes = useStyles();

  const renderTags = (tagValue: any, getTagProps: any) =>
    tagValue.map((option: DropDownListType, index: number) => (
      <Chip
        variant="outlined"
        label={option.label}
        {...getTagProps({ index })}
        className={classes.chip}
        deleteIcon={<Close />}
      />
    ));

  return (
    <div className={classes.root}>
      <Autocomplete
        disabled={disabled}
        multiple={isMultiSelect}
        id="dropdown-search"
        value={value}
        options={options}
        isOptionEqualToValue={(option, value) => option.label === value.label}
        getOptionLabel={(option) => (option.label ? option.label : "")}
        filterSelectedOptions
        disableCloseOnSelect={isMultiSelect ? true : false}
        onChange={handleChange}
        popupIcon={popupIcon ? popupIcon : <ExpandMore />}
        renderInput={(params) => (
          <TextField
            {...params}
            error={isError}
            variant="outlined"
            label={label}
            placeholder={placeholder}
            helperText={isError && helperText}
          />
        )}
        renderTags={isMultiSelect ? renderTags : undefined}
      />
    </div>
  );
};

export default React.memo(DropDownSearch);
