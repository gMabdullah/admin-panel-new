import React from "react";

import {
  Divider,
  Drawer,
  Grid,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import { HighlightOffTwoTone as CloseIcon } from "@mui/icons-material";

import PerfectScrollbar from "react-perfect-scrollbar";

import CustomButton from "components/CustomButton";

const CustomDrawer = ({
  title,
  buttonText,
  anchor,
  children,
  sx,
  onClose,
  open,
  onClick,
  handleCancelClick,
}: {
  title: React.ReactNode | string;
  buttonText: string;
  anchor: "left" | "top" | "right" | "bottom";
  children: React.ReactNode;
  sx?: Object;
  open: boolean;
  onClose: (event: React.SyntheticEvent<{}>) => void;
  onClick: (event?: React.MouseEvent<HTMLButtonElement>) => void;
  handleCancelClick: (event?: React.MouseEvent<HTMLButtonElement>) => void;
}) => {
  return (
    <Drawer open={open} onClose={onClose} anchor={anchor}>
      <Paper
        sx={{
          height: "100vh",
          width: "39vw",
          ...sx,
        }}
      >
        <Grid container>
          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              p: "32px 25px !important",
            }}
          >
            <Typography variant="h2" sx={{ color: "#212121" }}>
              {title}
            </Typography>

            <IconButton onClick={onClose} sx={{ p: "unset" }}>
              <CloseIcon htmlColor="#D84315" fontSize="large" />
            </IconButton>
          </Grid>
        </Grid>

        <Divider />

        <PerfectScrollbar
          style={{
            height: "calc(100vh - 181px)",
            overflowX: "hidden",
          }}
        >
          {children}
        </PerfectScrollbar>

        <Grid container>
          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "end",
              p: "16px 25px !important",
              boxShadow: "0px -3px 24px rgba(0, 0, 0, 0.12)",
            }}
          >
            <CustomButton
              variant={"contained"}
              sx={{
                p: "12px 44.5px",
                background: "#F5F5F5",
                color: "#212121",

                "&:hover": {
                  backgroundColor: "#F5F5F5",
                },
              }}
              onClick={handleCancelClick}
            >
              Cancel
            </CustomButton>

            <CustomButton
              variant={"contained"}
              sx={{
                p: "12px 50.5px",
                ml: "12px",
              }}
              color={"secondary"}
              onClick={onClick}
            >
              {buttonText}
            </CustomButton>
          </Grid>
        </Grid>
      </Paper>
    </Drawer>
  );
};

export default CustomDrawer;
