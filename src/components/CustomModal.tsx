import React from "react";

import {
  Divider,
  Grid,
  IconButton,
  Paper,
  Typography,
  Modal,
} from "@mui/material";
import { HighlightOffTwoTone as CloseIcon } from "@mui/icons-material";

import PerfectScrollbar from "react-perfect-scrollbar";

const CustomModal = ({
  title,
  buttonText,
  header,
  children,
  sx,
  onClose,
  footer,
  open,
  onClick,
  handleCancelClick,
  paperStyle,
  scrollbarStyle,
}: {
  title?: React.ReactNode | string;
  buttonText?: string;
  header?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  sx?: object;
  open: boolean;
  onClose?: (event: React.SyntheticEvent<{}>) => void;
  onClick?: (event?: React.MouseEvent<HTMLButtonElement>) => void;
  handleCancelClick?: (event?: React.MouseEvent<HTMLButtonElement>) => void;
  paperStyle?: object;
  scrollbarStyle?: object;
}) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Paper sx={{ ...paperStyle }}>
        <Grid container>
          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              p: "32px 40px !important",
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
        <PerfectScrollbar style={{ ...scrollbarStyle }}>
          {children}
        </PerfectScrollbar>
      </Paper>
    </Modal>
  );
};

export default CustomModal;
