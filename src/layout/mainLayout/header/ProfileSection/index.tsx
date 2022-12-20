import { useEffect, useRef, useState } from "react";

// material-ui
import { useTheme } from "@mui/material/styles";
import {
  Avatar,
  Box,
  Chip,
  ClickAwayListener,
  List,
  Paper,
  Popper,
} from "@mui/material";

// project imports
import MainCard from "components/cards/MainCard";
import Transitions from "components/extended/Transitions";
import Logout from "./Logout";

// assets
import { IconSettings } from "@tabler/icons";

// ==============================|| PROFILE MENU ||============================== //

const ProfileSection = () => {
  const { eatout_logo } = JSON.parse(`${localStorage.getItem("businessInfo")}`);

  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<any>(null);
  const prevOpen = useRef(open);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (
    event: React.MouseEvent<HTMLDivElement> | MouseEvent | TouchEvent
  ) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <>
      <Chip
        sx={{
          height: "48px",
          p: "8px 15px 8px 8px",
          alignItems: "center",
          borderRadius: "27px",
          transition: "all .2s ease-in-out",
          background: "#E5E7EB",
          border: "none",

          "& .MuiChip-label": {
            lineHeight: 0,
            pr: "unset",
            pl: "18px",
          },

          "& .MuiChip-icon": {
            m: "unset",
          },
        }}
        icon={
          <Avatar
            src={eatout_logo}
            sx={{
              background: "white !important",
              height: "32px",
              width: "32px",
              cursor: "pointer",

              "& .MuiAvatar-img": {
                objectFit: "contain !important",
              },
            }}
            ref={anchorRef}
            aria-controls={open ? "menu-list-grow" : undefined}
            aria-haspopup="true"
            color="inherit"
          />
        }
        label={<IconSettings stroke={1.5} size="24px" />}
        variant="outlined"
        ref={anchorRef}
        aria-controls={open ? "menu-list-grow" : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
      />

      <Popper
        placement="bottom"
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        popperOptions={{
          modifiers: [
            {
              name: "offset",
              options: {
                offset: [0, 14],
              },
            },
          ],
        }}
      >
        {({ TransitionProps }) => (
          <ClickAwayListener onClickAway={handleClose}>
            <Transitions in={open} {...TransitionProps}>
              <Paper>
                {open && (
                  <MainCard
                    border={false}
                    elevation={16}
                    content={false}
                    boxShadow
                    shadow={theme.shadows[16]}
                  >
                    <Box>
                      <List
                        component="nav"
                        sx={{
                          width: "100%",
                          maxWidth: 200,
                          minWidth: 150,
                          p: "unset",
                          backgroundColor: theme.palette.background.paper,
                          borderRadius: "10px",
                          [theme.breakpoints.down("md")]: {
                            minWidth: "50%",
                          },
                        }}
                      >
                        <Logout />
                      </List>
                    </Box>
                  </MainCard>
                )}
              </Paper>
            </Transitions>
          </ClickAwayListener>
        )}
      </Popper>
    </>
  );
};

export default ProfileSection;
