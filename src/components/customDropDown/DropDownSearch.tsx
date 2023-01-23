import React, { useEffect, useState } from "react";

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
  value: DropDownListType | DropDownListType[] | [];
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
  // const [filteredOptions, setFilteredOptions] = useState<
  //   DropDownListType[] | []
  // >([]);

  // useEffect(() => {
  //   if (value.length > 0) {
  //     const remainingOptions = value.forEach((item) => {
  //       options.filter((option) => option.value !== item.value);
  //     });

  //     setFilteredOptions(remainingOptions);
  //   }
  // }, [value]);

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
        id="checkbox"
        value={value}
        options={options}
        // isOptionEqualToValue={(option, value) => option.label === value.label}
        getOptionLabel={(option) => (option.label ? option.label : "")}
        // inputValue={value}
        // value={filteredOptions}
        // defaultValue={[value[0]]}
        // filterSelectedOptions
        // getOptionSelected={(option, value) => option.label === value.label}
        disableCloseOnSelect={isMultiSelect ? true : false}
        onChange={handleChange}
        clearOnBlur={true}
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
