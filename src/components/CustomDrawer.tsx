import React from "react";

import { Drawer, Paper } from "@mui/material";

import PerfectScrollbar from "react-perfect-scrollbar";

const CustomDrawer = () => {
  return (
    <Drawer>
      <Paper>
        <PerfectScrollbar
          style={{
            height: "100vh",
            overflowX: "hidden",
          }}
        ></PerfectScrollbar>
      </Paper>
    </Drawer>
  );
};

export default CustomDrawer;
