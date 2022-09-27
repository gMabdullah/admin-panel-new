import React from 'react'
import { makeStyles, withStyles } from "@mui/styles";
import { InputAdornment } from '@mui/material';
import { IconButton } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import SearchIcon from '@mui/icons-material/Search';
import EmailIcon from '@mui/icons-material/Email';

import { TextField } from '@mui/material';
import moment from 'moment';
type TextFieldType<T extends React.ElementType> ={
    type?:string,
    disableprevDates?:boolean,
    defaultValue?:string,
    label?:string,
    id?:number,
    disabled?:boolean,
    multiline?:boolean
    onKeyPress?:(event?:React.KeyboardEvent<HTMLElement>) => void; 
    row?:boolean,
    textTransform?:string,
    helperText?:React.ReactNode,
   onChange?: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>
   onBlur?: React.FocusEventHandler<HTMLTextAreaElement | HTMLInputElement> 
   Adornment?:boolean,
   closeIcon?:boolean,
   
} & React.ComponentPropsWithoutRef<T>;
const useStyles = makeStyles((theme) => ({
  textField: {
    width: "100%",
    marginLeft: 0,
    marginBottom: 0,
    marginTop: 0,
    marginRight: theme.spacing(1),
  },
}));
const CssTextField = withStyles({
  root: (props) => ({
    "& div.MuiOutlinedInput-multiline": {
      fontSize:
        props.size === "small" ? 13 : 15,
    },
    "& label:not(.Mui-focused)": {
      color: "#bababa",
      fontSize:
        props.size === "small" ? 13 : 15,
      fontWeight: "200",
    },
    "& label.MuiInputLabel-outlined": {
      transform:
        props.size === "small"
          ? props.type === "date"
            ? `translate(14px, -6px) scale(0.68)`
            : `translate(14px, 12px) scale(1)`
          : "",
      backgroundColor:
        props.type === "date" || props.multiline === true ? "white" : "",
      paddingRight: props.type === "date" || props.multiline === true ? 5 : "",
      paddingLeft: props.type === "date" || props.multiline === true ? 5 : "",
    },
    "& label.MuiInputLabel-outlined.MuiInputLabel-shrink": {
      transform:
        props.size === "small" ? `translate(14px, -6px) scale(0.68)` : "",
      paddingRight: props.type === "date" || props.multiline === true ? 5 : "",
      paddingLeft: props.type === "date" || props.multiline === true ? 5 : "",
    },
    "& .MuiOutlinedInput-multiline": {
      padding: "8px 8px",
    },
    "& label.Mui-focused": {
      color: "#bababa",
      fontWeight: "100",
      fontSize:
        props.size === "small" ? 13 : 15,
    },
    "& label.MuiFormLabel-filled": {
      color: "#bababa",
      fontWeight: "100",
      fontSize:
        props.size === "small" ? 13 : 15,
    },
    "& p.MuiFormHelperText-root": {
      marginLeft: 0,
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "green",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#bababa",
        borderWidth: 0.8,
        cursor: props.disabled === true ? "not-allowed" : "arrow",
      },
      "&:hover fieldset": {
        borderColor: "#e51451",
      },
      "&.Mui-focused fieldset": {
        borderWidth: 0.8,
        borderColor:"#e51451",
      },
      "&.MuiOutlinedInput-root input": {
        color: "#545454",
        fontSize:
          props.size === "small" ? 13 : 15,
        fontWeight: "200",
        textTransform: (props) => props.texttransform,
      },
      "&.MuiOutlinedInput-root .MuiTypography-root": {
        color: "#545454",
        fontSize:
          props.size === "small" ? 13 : 15,
        fontWeight: "200",
      },
      "& .MuiOutlinedInput-input": {
        padding: props.size === "small" ? 11 : "",

        color: "#545454",
        fontSize:
          props.size === "small" ? 13 : 15,
        fontWeight: "200",
      },
    },
    "& .MuiIconButton-label": {
      "& .MuiSvgIcon-root": {
        fontSize: "1.2rem",
      },
    },    
  }),
})(TextField);
const TdTextField=<T extends React.ElementType = "input">({type,disableprevDates,label,id,disabled,multiline,onKeyPress,row,textTransform,helperText,onChange,onBlur,Adornment,closeIcon,defaultValue,  ...rest}:TextFieldType<T>): JSX.Element=> {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    showPassword: false,
  });
  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };
  const handleMouseDownPassword = () => {
 //   event.preventDefault();
  };

  return (    
    <CssTextField
    InputProps={{ 
      startAdornment:   type === "search" &&  (
        <InputAdornment style={{ cursor: "pointer" }} position="start"><SearchIcon/></InputAdornment>
      ),
        inputProps: {
          min:
            type === "date"
              ? disableprevDates
                ? moment().format("YYYY-MM-DD")
                : "0000-01-01"
              : 0,
          max: "2100-01-01",
        },endAdornment: Adornment ? (
          type === "password" ? (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
              >
                {values.showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          ) : type === "email" ? (
            <InputAdornment style={{ cursor: "pointer" }} position="start">
             
              <EmailIcon
            
              />
            </InputAdornment>): (
            <InputAdornment position="start">
              {/* <ColorCircularProgress thickness={4} size={24} /> */}
            </InputAdornment>
          )
        ) : null
    }}
    
    type={
      type
        ? type === "password"
          ? values.showPassword
            ? "text"
            : "password"
          : type
        : "text"
    }
    inputProps={{ min: "0", step: "1" }}
   
    label={label}
    id={id}
    className={classes.textField}
    disabled={disabled === true ? true : false}
    autoComplete="off"
    margin="normal"
    variant="outlined"
    multiline={multiline === true ? true : false}
    onKeyPress={onKeyPress}
    row={row}
    textTransform={textTransform?textTransform:""}
    helperText={helperText}
    onChange={onChange}
    onBlur={onBlur}
    defaultValue={defaultValue}
    {...rest}
    />
  )
}

export default TdTextField