import React from "react";

import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

interface notification {
  message: string;
  notify: boolean;
  closeNotify: () => void;
  type: "success" | "info" | "warning" | "error";
}

const Notify = ({ message, notify, closeNotify, type }: notification) => {
  const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref
  ) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  // constants
  const horizontal = "center";
  const vertical = "top";

  return (
    <Snackbar
      anchorOrigin={{ vertical, horizontal }}
      open={notify}
      key={vertical + horizontal}
      onClose={closeNotify}
      autoHideDuration={2000}
    >
      <Alert
        onClose={closeNotify}
        sx={{
          width: "313px",
          height: "34px",
          borderRadius: "4px",
          fontFamily: "Roboto",
          fontStyle: "normal",
          fontWeight: 500,
          fontSize: "12px",
          boxShadow: "none",
        }}
        severity={`${type}`}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default Notify;
