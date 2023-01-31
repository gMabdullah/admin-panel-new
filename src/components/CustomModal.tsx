import React from "react";

import { Paper, Modal } from "@mui/material";

import PerfectScrollbar from "react-perfect-scrollbar";

const CustomModal = ({
  title,
  header,
  children,
  onClose,
  footer,
  open,
  paperStyle,
  scrollbarStyle,
}: {
  title?: React.ReactNode | string;
  header?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  open: boolean;
  onClose?: (event: React.SyntheticEvent<{}>) => void;
  paperStyle?: object;
  scrollbarStyle?: object;
}) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Paper
        sx={{
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "45vw",
          position: "absolute",
          ...paperStyle,
        }}
      >
        {header}

        <PerfectScrollbar
          style={{
            height: "100%",
            maxHeight: "98vh",
            overflowX: "hidden",
            borderRadius: "8px",

            ...scrollbarStyle,
          }}
        >
          {children}
        </PerfectScrollbar>

        {footer}
      </Paper>
    </Modal>
  );
};

export default CustomModal;
