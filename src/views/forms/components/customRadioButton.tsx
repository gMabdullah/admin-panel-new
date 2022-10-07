import React from 'react'
import { FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material';
type customRadioButton<T extends React.ElementType>={
  renderAs?: T;

  onChange?: (event?:React.ChangeEvent<HTMLInputElement>) => void,
  defualtValue?:string,
  label?:string,
  options?:{value:string ,label:string}[],
  sx?: Object,
    
}& React.ComponentPropsWithoutRef<T>

  const customRadioButton=<T extends React.ElementType = "select">
  ({
    onChange,
    defualtValue,
    options, 
   ...rest
  }:customRadioButton<T>): JSX.Element=> {
  return (
    <>
    <FormControl>
   <RadioGroup  
   onChange={onChange} 
   value={defualtValue} 
   {...rest}
   >
{options?.map<object>((option, index) => (
  <FormControlLabel value={option.value} key={index} control={<Radio />} label={option.label}/>  ))}
  </RadioGroup> 
    </FormControl>
    </> 
  )
}

export default customRadioButton