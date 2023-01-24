// material-ui
import { useTheme } from "@mui/material/styles";
import { Avatar, Box } from "@mui/material";

// project imports
import LogoSection from "../logoSection";
import MobileSection from "./MobileSection";
import ProfileSection from "./ProfileSection";
import NotificationSection from "./NotificationSection";
import { useDispatch, useSelector } from "store";
import { openDrawer } from "store/slices/menu";

// assets
import { IconMenu2 } from "@tabler/icons";
import CustomDateRangePicker, {
  DateRange,
} from "components/datePicker/CustomDateRangerPicker";
import { setDate } from "store/slices/Main";
import Orders, { applyDates } from "orders/businessOrders/Orders";

// ==============================|| MAIN NAVBAR / HEADER ||============================== //

const Header = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { drawerOpen } = useSelector((state) => state.menu);
  const { showDatePicker } = useSelector((state) => state.main);  // Enable and Disable Date Picker

  const onChange = (date: any) => {
    const startDate = date[0];
    const endDate = date[1];
    dispatch(
      setDate({
        startDate,
        endDate,
      })
    );
  };
  return (
    <>
      {/* logo & toggler button */}
      <Box
        sx={{
          width: 228,
          display: "flex",
          [theme.breakpoints.down("md")]: {
            width: "auto",
          },
          alignItems: "center",
        }}
      >
        <Box
          component="span"
          sx={{ display: { xs: "none", md: "block" }, flexGrow: 1 }}
        >
          <LogoSection />
        </Box>
        <Avatar
          variant="rounded"
          sx={{
            ...theme.typography.commonAvatar,
            ...theme.typography.mediumAvatar,
            overflow: "hidden",
            transition: "all .2s ease-in-out",
            background:
              theme.palette.mode === "dark"
                ? theme.palette.dark.main
                : theme.palette.secondary.light,
            color:
              theme.palette.mode === "dark"
                ? theme.palette.secondary.main
                : theme.palette.secondary.dark,
            "&:hover": {
              background:
                theme.palette.mode === "dark"
                  ? theme.palette.secondary.main
                  : theme.palette.secondary.dark,
              color:
                theme.palette.mode === "dark"
                  ? theme.palette.secondary.light
                  : theme.palette.secondary.light,
            },
          }}
          onClick={() => dispatch(openDrawer(!drawerOpen))}
          color="inherit"
        >
          <IconMenu2 stroke={1.5} size="20px" />
        </Avatar>
      </Box>

      <Box sx={{ flexGrow: 0.1 }} />
      {
        showDatePicker && <CustomDateRangePicker onChange={onChange} />

      }
      
      <Box sx={{ flexGrow: 1 }} />
      {/* notification & profile */}
      <NotificationSection />
      <ProfileSection />

      {/* mobile header */}
      <Box sx={{ display: { xs: "block", sm: "none" } }}>
        <MobileSection />
      </Box>
    </>
  );
};

export default Header;
