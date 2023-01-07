import React from "react";

import { Drawer, Paper } from "@mui/material";

import PerfectScrollbar from "react-perfect-scrollbar";

const CustomDrawer = ({
  // id,
  // title,
  // subTitle,
  anchor,
  children,
  sx,
  onClose,
  open,
}: {
  // id?: string;
  // title: React.ReactNode | string;
  // subTitle?: React.ReactNode | string;
  anchor: "left" | "top" | "right" | "bottom";
  children: React.ReactNode;
  // children?: React.ReactNode;
  sx?: Object;
  open: boolean;
  onClose: (event: React.SyntheticEvent<{}>) => void;
}) => {
  return (
    <Drawer open={true} anchor={anchor}>
      <Paper
        sx={{
          width: "39vw",
          ...sx,
        }}
      >
        <PerfectScrollbar
          style={{
            height: "100vh",
            overflowX: "hidden",
          }}
        >
          {children}
        </PerfectScrollbar>
      </Paper>
    </Drawer>
  );
};

export default CustomDrawer;
