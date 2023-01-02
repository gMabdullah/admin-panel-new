import { useNavigate } from "react-router-dom";

import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { IconLogout } from "@tabler/icons";

import { clearStorage } from "orders/HelperFunctions";

// ==============================|| Logout ||============================== //

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
    clearStorage();
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
