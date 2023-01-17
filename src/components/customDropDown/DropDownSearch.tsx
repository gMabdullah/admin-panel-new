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
  onChange: (selected: DropDownListType[]) => void;
  dropDownList: DropDownListType[];
  disabled?: boolean;
  isMultiSelect?: boolean;
  name?: string;
}

const DropDownSearch = ({
  isError,
  label,
  placeholder,
  value,
  onChange,
  helperText,
  dropDownList,
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
  const handleChange = (
    event: React.ChangeEvent<{}>,
    values: any,
    name: string
  ) => {
    onChange(values);
  };

  return (
    <div className={classes.root}>
      <Autocomplete
        disabled={disabled}
        multiple={isMultiSelect}
        id="checkboxes-tags-demo"
        options={dropDownList}
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
