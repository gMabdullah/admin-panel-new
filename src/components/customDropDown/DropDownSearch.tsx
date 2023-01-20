import React from "react";

import { Autocomplete, Chip, TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import { useStyles } from "./DropDownStyles";

export interface DropDownListType {
  label: string;
  value: string;
}

interface DropDownListTypeSearchType {
  isError?: boolean;
  label?: string;
  placeholder?: string;
  value?: DropDownListType[];
  helperText?: string;
  onChange?: (selected: DropDownListType[]) => void;
  options: DropDownListType[];
  disabled?: boolean;
  isMultiSelect?: boolean;
  name?: string;
  handleChange?: (
    event: React.ChangeEvent<{}>,
    value: any,
    name: string
  ) => void;
}

const DropDownSearch = ({
  isError,
  label,
  placeholder,
  value,
  onChange,
  helperText,
  options,
  handleChange,
  disabled,
  name,
  isMultiSelect,
}: DropDownListTypeSearchType) => {
  const classes = useStyles();
  const renderTags = (tagValue: any, getTagProps: any) =>
    tagValue.map((option: DropDownListType, index: number) => (
      <Chip
        variant="outlined"
        label={option.label}
        {...getTagProps({ index })}
        className={classes.chip}
        deleteIcon={<CloseIcon />}
      />
    ));

  return (
    <div className={classes.root}>
      <Autocomplete
        disabled={disabled}
        multiple={isMultiSelect}
        id="checkboxes-tags-demo"
        options={options}
        value={value}
        // defaultValue={value}
        filterSelectedOptions
        disableCloseOnSelect
        onChange={handleChange}
        clearOnBlur={true}
        getOptionLabel={(option) => option.label}
        renderInput={(params) => (
          <TextField
            {...params}
            error={isError}
            variant="outlined"
            label={label}
            placeholder={placeholder}
            helperText={helperText}
          />
        )}
        renderTags={isMultiSelect ? renderTags : undefined}
      />
    </div>
  );
};

export default React.memo(DropDownSearch);
