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
import Business from "./Business";

import { chipStyle, logoStyle, popupStyle } from "./Styles";

// assets
import { IconSettings } from "@tabler/icons";

// ==============================|| PROFILE MENU ||============================== //

const ProfileSection = () => {
  const { eatout_logo } = JSON.parse(localStorage.getItem("businessInfo")!);
  const allBusinesses = JSON.parse(localStorage.getItem("allBusinessesInfo")!);

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
        sx={chipStyle}
        icon={
          <Avatar
            src={eatout_logo}
            sx={logoStyle}
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
                      <List component="nav" sx={popupStyle}>
                        {allBusinesses && allBusinesses.length > 1 && (
                          <Business />
                        )}
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
