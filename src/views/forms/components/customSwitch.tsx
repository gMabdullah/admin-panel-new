import React from 'react'
import { FormGroup, FormControlLabel, Switch } from '@mui/material';
import { withStyles } from "@mui/styles";
type switchType={
  onChange?: (event?:React.ChangeEvent<HTMLInputElement>) => void,
  label?:string,
  checked?:boolean,
  value?:string,
  name?:string
}
const PurpleSwitch = withStyles({
  switchBase: {
    color: "#fafafa",
    "&$checked": {
      color: "#e51451",
    },
    "&$checked + $track": {
      backgroundColor: "#f79297",
    },
  },
  checked: {},
  track: {},
})(Switch);

const  CustomizedSwitch=({checked,
  onChange,
  value,
  label,
  name}:switchType)=> {
  return (
    <>
    <FormGroup>

    <FormControlLabel
        control={
          <PurpleSwitch
            checked={checked}
            onChange={onChange}
            value={value}
            name={name}
          />
        }
        label={label}
      />
    </FormGroup>
    </>
  )
}

export default CustomizedSwitch