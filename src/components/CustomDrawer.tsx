import React from "react";

import {
  Divider,
  Drawer,
  Grid,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import {
  HighlightOffTwoTone as CloseIcon,
  Visibility as PreviewIcon,
  ArrowBackOutlined,
} from "@mui/icons-material";

import PerfectScrollbar from "react-perfect-scrollbar";
import MainCard from "./cards/MainCard";
import CustomButton from "components/CustomButton";

const CustomDrawer = ({
  // id,
  title,
  buttonText,
  // subTitle,
  anchor,
  children,
  sx,
  onClose,
  open,
}: {
  // id?: string;
  title: React.ReactNode | string;
  buttonText: string;
  // subTitle?: React.ReactNode | string;
  anchor: "left" | "top" | "right" | "bottom";
  children: React.ReactNode;
  // children?: React.ReactNode;
  sx?: Object;
  open: boolean;
  onClose: (event: React.SyntheticEvent<{}>) => void;
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

              // onClick={packingSlipComponent}
              // disabled={selectionModel.length > 0 ? false : true}
            >
              Cancel
            </CustomButton>

            <CustomButton
              variant={"contained"}
              sx={{
                p: "12px 50.5px",
                ml: "12px",
                // height: "44px",
                // width: "151px",
                // border: "1px solid #CCD1DB",
              }}
              color={"secondary"}
              // onClick={packingSlipComponent}
              // disabled={selectionModel.length > 0 ? false : true}
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
