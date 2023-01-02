import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Grid, Typography, Card, Checkbox, Paper } from "@mui/material";

import useAxios from "axios-hooks";

import Loader from "components/Loader";
import CustomButton from "components/CustomButton";
import TdTextField from "components/TdTextField";
import Notify from "components/Notify";
import Logo from "assets/Logo";
import {
  paperStyle,
  paperImgStyle,
  poweredTossdownGridStyle,
  rememberForgotPassGridStyle,
  formSectionGrid6Style,
} from "./Styles";

const Login = () => {
  let fields = { emailField: "", passwordField: "" };
  const navigate = useNavigate();

  const [notify, setNotify] = useState<boolean>(false);
  const [notifyMessage, setNotifyMessage] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [fieldError, setFieldError] = useState(fields);

  // login API payload
  const loginAPIPayload = () => {
    const formData = new FormData();

    formData.append("email", email);
    formData.append("password", password);
    formData.append("source", "biz");

    return formData;
  };

  // login API
  const [{ loading: loginLoader }, loginAPICall] = useAxios(
    {
      url: "/eatout_user_login",
      method: "post",
    },
    { manual: true }
  );

  const emailChangeHandler = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setEmail(e.target.value);

    setFieldError({ ...fieldError, emailField: "" });
  };

  const passwordChangeHandler = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setPassword(e.target.value);

    setFieldError({ ...fieldError, passwordField: "" });
  };

  const closeNotify = () => setNotify(false);

  const handleEnterKeyPress = (
    event: React.KeyboardEvent<HTMLElement> | undefined
  ) => {
    if (event && event.key === "Enter") {
      handleLoginClick();
    }
  };

  const handleLoginClick = async () => {
    if (email === "") {
      setFieldError({ ...fieldError, emailField: "Enter your email address" });
      return;
    } else if (password === "") {
      setFieldError({ ...fieldError, passwordField: "Enter your password" });
      return;
    }

    // login API call
    const {
      data: { status, result, message },
    } = await loginAPICall({ data: loginAPIPayload() });

    if (status === "1" && result) {
      localStorage.setItem("tdLogin", "logged in");

      if (result.length > 1) {
        localStorage.setItem("allBusinessesInfo", JSON.stringify(result));
        navigate("/business");
      } else {
        localStorage.setItem("businessInfo", JSON.stringify(result[0]));
        navigate("/orders");
      }
    } else {
      // for wrong credentials & when user don't have access to any business
      setNotifyMessage(message);
      setNotify(true);
    }
  };

  return (
    <>
      {notify && (
        <Notify
          message={notifyMessage}
          type="error"
          notify={notify}
          closeNotify={closeNotify}
        />
      )}

      {loginLoader && <Loader />}

      <Card>
        <Grid container>
          <Grid item xs={12} sx={{ display: "flex", height: "100vh" }}>
            <Grid item xs={6} sx={formSectionGrid6Style}>
              <Grid sx={{ maxWidth: "428px" }}>
                <Grid
                  item
                  xs={12}
                  sx={{ display: "flex", justifyContent: "center", mb: "32px" }}
                >
                  <Logo />
                </Grid>
                <Grid
                  item
                  xs={12}
                  sx={{ display: "flex", justifyContent: "center", mb: "16px" }}
                >
                  <Typography
                    sx={{
                      fontFamily: "Roboto",
                      fontStyle: " normal",
                      fontWeight: 700,
                      fontSize: " 24px",
                      color: "#212121",
                    }}
                  >
                    Hi, Welcome back
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sx={{ display: "flex", justifyContent: "center", mb: "32px" }}
                >
                  <Typography
                    sx={{
                      fontFamily: "Roboto",
                      fontStyle: " normal",
                      fontWeight: 400,
                      fontSize: " 16px",
                      color: "#757575",
                    }}
                  >
                    Enter your credentials to continue
                  </Typography>
                </Grid>
                <Grid item xs={12} sx={{ mb: "24px" }}>
                  <TdTextField
                    type="email"
                    label="Email Address"
                    value={email}
                    onChange={emailChangeHandler}
                    error={fieldError.emailField === "" ? false : true}
                    helperText={fieldError.emailField}
                    autoFocus
                    onKeyPress={handleEnterKeyPress}
                  />
                </Grid>
                <Grid item xs={12} sx={{ mb: "29px" }}>
                  <TdTextField
                    type="password"
                    label="Password"
                    value={password}
                    onChange={passwordChangeHandler}
                    error={fieldError.passwordField === "" ? false : true}
                    helperText={fieldError.passwordField}
                    onKeyPress={handleEnterKeyPress}
                  />
                </Grid>
                <Grid item xs={12} sx={rememberForgotPassGridStyle}>
                  <Grid item sx={{ display: "flex", alignItems: "center" }}>
                    <Checkbox sx={{ p: "unset", mr: "11px" }} />
                    <Typography variant="subtitle1" sx={{ color: "#212121" }}>
                      Remember me
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="subtitle1" sx={{ color: "#212121" }}>
                      Forgot Password?
                    </Typography>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <CustomButton
                    color="secondary"
                    variant={"contained"}
                    onClick={handleLoginClick}
                    sx={{ p: "14px 192.5px" }}
                  >
                    Sign in
                  </CustomButton>
                </Grid>
              </Grid>
              <Grid item xs={12} sx={poweredTossdownGridStyle}>
                <Typography variant="body1" sx={{ color: "#757575" }}>
                  Powered by tossdown.com
                </Typography>
              </Grid>
            </Grid>
            <Grid item xs={6}>
              <Paper elevation={0} sx={paperStyle}>
                <img
                  style={paperImgStyle}
                  src="https://images-beta.tossdown.com/images/1ee2f8d4-b254-4489-b37d-3b6006769dad.webp"
                  alt="Login"
                />
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Card>
    </>
  );
};

export default Login;
