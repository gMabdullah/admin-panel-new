import { makeStyles } from "@mui/styles";

export const useStyles: any = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& div.MuiOutlinedInput-multiline": {
      fontSize: 13,
    },
    "& label:not(.Mui-focused)": {
      color: "#bababa",
      fontSize: 13,
      fontWeight: "200",
    },
    "& label.MuiInputLabel-outlined": {
      transform: `translate(14px, 12px) scale(1)`,
    },
    "& label.MuiInputLabel-outlined.MuiInputLabel-shrink": {
      transform: `translate(14px, -6px) scale(0.68)`,
    },
    "& .MuiOutlinedInput-multiline": {
      padding: "8px 8px",
    },
    "& label.Mui-focused": {
      color: "#bababa",
      fontWeight: "100",
      fontSize: 13,
    },
    "& label.MuiFormLabel-filled": {
      color: "#bababa",
      fontWeight: "100",
      fontSize: 13,
    },
    "& p.MuiFormHelperText-root": {
      marginLeft: 0,
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "green",
    },
    "& .MuiFormControl-root": {
      width: "100%",
    },

    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#bababa",
        borderWidth: 0.8,
      },
      "&:hover fieldset": {
        borderColor: "#e51451",
      },
      "&.Mui-focused fieldset": {
        borderWidth: 0.8,
        borderColor: "#e51451",
      },
      "&.MuiOutlinedInput-root input": {
        color: "#545454",
        fontSize: 13,
        fontWeight: "200",
      },
      "&.MuiOutlinedInput-root .MuiTypography-root": {
        color: "#545454",
        fontSize: 13,
        fontWeight: "200",
      },
      "& .MuiOutlinedInput-input": {
        padding: "2px !important",
      },
    },
  },
  chip: {
    height: "32px",
    width: "fitContent !important",
    background: "#E5E7EB !important",
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: "12px",
    color: "#212121",
    marginLeft: "8px",
    marginTop: "3px",
    marginBottom: "3px",
    borderRadius: "50px !important",
    "& .MuiChip-deleteIcon": {
      marginLeft: "auto",
    },
  },
}));
