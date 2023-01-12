import React from "react";
import {Autocomplete,Chip,TextField} from "@mui/material"
import CloseIcon from '@mui/icons-material/Close';
import { useStyles } from "./DropDownStyles";

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
  onChange: (selected: string[]) => void;
  dropDownList: string[],
  disabled?:boolean,
  
} 
const  MultiSelect=({
 // size,
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
  const [selected, setSelected] = React.useState<string[]>([]);

  const handleChange = (event: React.ChangeEvent<{}>, values: string[]) => {
    setSelected(values);
    onChange(values);
  };
  return (
    <div className={classes.root}>
      <Autocomplete
        multiple
        id="checkboxes-tags-demo"
        options={dropDownList}
        disableCloseOnSelect
        onChange={handleChange}
        getOptionLabel={(option) => option}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            label="Select options"
            
          />
        )}
        renderTags={(tagValue, getTagProps) =>
          tagValue.map((option, index) => (
            <Chip 
            variant="outlined" 
            label={option} 
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

export default React.memo (MultiSelect);
