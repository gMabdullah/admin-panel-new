import React from "react";
import {Autocomplete,Chip,TextField} from "@mui/material"
import CloseIcon from '@mui/icons-material/Close';
import { useStyles } from "./DropDownStyles";

export interface DropDownListType {
  label: string;
  id: string;
}

interface DropDownListTypeSearchType {
  error?: boolean,
  label?: string,
  placeholder?:string
  value?:DropDownListType[]
  helperText?:string
  onChange: (selected: DropDownListType[]) => void,
  dropDownList: DropDownListType[],
  disabled?:boolean,
  
} 
const  DropDownSearch=({
  error,
  label,
  placeholder,
  value,
  onChange,
  helperText,
  dropDownList,
  disabled,
}:DropDownListTypeSearchType)=> {
  const classes = useStyles();
  

  const handleChange = (event: React.ChangeEvent<{}>, values: DropDownListType[]) => {
    onChange(values);
  };
  return (
    <div className={classes.root}>
      <Autocomplete
      disabled={disabled}
        multiple
        id="checkboxes-tags-demo"
        options={dropDownList}
        disableCloseOnSelect
        onChange={handleChange}
        getOptionLabel={(option) => option.label}
        renderInput={(params) => (
          <TextField
            {...params}
            error={error}
            variant="outlined"
            label={label}
            placeholder={placeholder}
            helperText={helperText}
          />
        )}
        renderTags={(tagValue, getTagProps) =>
          tagValue.map((option, index) => (
            <Chip 
            variant="outlined" 
            label={option.label} 
            {...getTagProps({ index })} 
            className={classes.chip}
            deleteIcon={<CloseIcon/>}
              />
          ))
        }
    
      />
    </div>
  );
}

export default React.memo (DropDownSearch);
