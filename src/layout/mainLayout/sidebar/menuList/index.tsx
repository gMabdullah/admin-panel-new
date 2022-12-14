import { memo } from "react";

// material-ui
import { Typography } from "@mui/material";

// project imports
import menuItem from "menuItems";
import NavCollapse from "./navCollapse";
import NavItem from "./navItem";

// ==============================|| SIDEBAR MENU LIST ||============================== //

const MenuList = () => {
  const navItems = menuItem.items.map((item) => {
    switch (item.type) {
      case "collapse":
        return <NavCollapse key={item.id} menu={item} level={1} />;
      case "item":
        return <NavItem key={item.id} item={item} level={1} />;
      default:
        return (
          <Typography key={item.id} variant="h6" color="error" align="center">
            Menu Items Error
          </Typography>
        );
    }
  });

  return <>{navItems}</>;
};

export default memo(MenuList);
