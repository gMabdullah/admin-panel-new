import { useEffect, useState } from "react";

// material-ui
import { Typography } from "@mui/material";

import useAxios from "axios-hooks";

import { SidebarSkeleton } from "components/skeleton/SidebarSkeleton";
import NavCollapse from "./navCollapse";
import NavItem from "./navItem";

// ==============================|| SIDEBAR MENU LIST ||============================== //

const MenuList = () => {
  const { eatout_id } = JSON.parse(localStorage.getItem("businessInfo")!);

  const [menuItems, setMenuItems] = useState<Element[] | []>([]);

  // menu items json API call payload
  const menuItemsAPIPayload = () => {
    const formData = new FormData();

    formData.append("business_id", eatout_id);
    formData.append("source", "biz");
    return formData;
  };

  // menu items json API call
  const [{}, menuItemsAPICall] = useAxios(
    {
      url: "/get_menu_json",
      method: "POST",
      data: menuItemsAPIPayload(),
    },
    { manual: true }
  );

  useEffect(() => {
    (async () => {
      // menu items json API call
      const {
        data: { data, status },
      } = await menuItemsAPICall();

      // status 200 (getting required data in API response)
      if (status === "200" && !Array.isArray(data)) {
        const navItems = data.items.map((item: any) => {
          switch (item.type) {
            case "collapse":
              return <NavCollapse key={item.id} menu={item} level={1} />;
            case "item":
              return <NavItem key={item.id} item={item} level={1} />;
            default:
              return (
                <Typography
                  key={item.id}
                  variant="h6"
                  color="error"
                  align="center"
                >
                  Menu Items Error
                </Typography>
              );
          }
        });

        setMenuItems(navItems);
      }
    })();
  }, []);

  return (
    <>
      {menuItems.length === 0 && <SidebarSkeleton />}
      {menuItems}
    </>
  );
};

export default MenuList;
