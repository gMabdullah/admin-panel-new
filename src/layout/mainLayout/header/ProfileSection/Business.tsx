import { useNavigate } from "react-router-dom";

// material-ui
import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";

// assets
import { IconList } from "@tabler/icons";

// ==============================|| All Businesses ||============================== //

const Business = () => {
  const navigate = useNavigate();

  return (
    <ListItemButton
      sx={{ borderRadius: "8px" }}
      onClick={() => navigate("/business")}
    >
      <ListItemIcon>
        <IconList stroke={1.5} size="20px" />
      </ListItemIcon>
      <ListItemText
        primary={<Typography variant="body2">Businesses</Typography>}
      />
    </ListItemButton>
  );
};

export default Business;
