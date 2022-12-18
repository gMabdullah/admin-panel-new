import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

// material-ui
import { useTheme } from "@mui/material/styles";
import {
  Avatar,
  Box,
  Chip,
  ClickAwayListener,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Popper,
  Typography,
} from "@mui/material";

// project imports
import MainCard from "components/cards/MainCard";
import Transitions from "components/extended/Transitions";

// assets
import { IconLogout, IconSettings } from "@tabler/icons";
import useConfig from "hooks/useConfig";

// ==============================|| PROFILE MENU ||============================== //

const ProfileSection = () => {
  const { eatout_logo } = JSON.parse(`${localStorage.getItem("businessInfo")}`);

  const theme = useTheme();
  const { borderRadius } = useConfig();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  /**
   * anchorRef is used on different components and specifying one type leads to other components throwing an error
   * */
  const anchorRef = useRef<any>(null);

  const handleLogout = async () => {
    navigate("/");
    localStorage.removeItem("businessInfo");
    localStorage.removeItem("tdLogin");
  };

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

  const prevOpen = useRef(open);

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
                        <ListItemButton
                          sx={{ borderRadius: `${borderRadius}px` }}
                          onClick={handleLogout}
                        >
                          <ListItemIcon>
                            <IconLogout stroke={1.5} size="20px" />
                          </ListItemIcon>
                          <ListItemText
                            primary={
                              <Typography variant="body2">Logout</Typography>
                            }
                          />
                        </ListItemButton>
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
