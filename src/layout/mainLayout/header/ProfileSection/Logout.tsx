import { useNavigate } from "react-router-dom";

// material-ui
import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";

// assets
import { IconLogout } from "@tabler/icons";

// ==============================|| PROFILE MENU ||============================== //

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    navigate("/");
    localStorage.removeItem("businessInfo");
    localStorage.removeItem("tdLogin");
  };

  return (
    <ListItemButton sx={{ borderRadius: "8px" }} onClick={handleLogout}>
      <ListItemIcon>
        <IconLogout stroke={1.5} size="20px" />
      </ListItemIcon>
      <ListItemText primary={<Typography variant="body2">Logout</Typography>} />
    </ListItemButton>
  );
};

export default Logout;
