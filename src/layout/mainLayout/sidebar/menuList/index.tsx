import React, { useEffect, memo, useState } from "react";

// material-ui
import { Typography } from "@mui/material";

import useAxios from "axios-hooks";

// project imports
// import menuItem from "menuItems";
import NavCollapse from "./navCollapse";
import NavItem from "./navItem";
import Loader from "components/Loader";

// ==============================|| SIDEBAR MENU LIST ||============================== //

const MenuList = () => {
  const { eatout_id } = JSON.parse(localStorage.getItem("businessInfo")!);

  const [menuItems, setMenuItems] = useState([]);

  const menuItemsPayload = () => {
    const formData = new FormData();

    formData.append("business_id", eatout_id);
    // formData.append("admin_id", user_id);
    formData.append("source", "biz");
    return formData;
  };

  const [{ data: menuItem, loading: sideMenuLoader }, menuJSONAPICall] =
    useAxios(
      {
        url: "/get_menu_json",
        method: "POST",
        data: menuItemsPayload(),
      },
      { manual: true }
    );

  useEffect(() => {
    (async () => {
      await menuJSONAPICall();
    })();
  }, []);

  useEffect(() => {
    menuItem && menuItem.data && setMenuItems(menuItem.data.items);
  }, [menuItem]);

  let navItems: any[] = [];

  if (menuItems.length > 0) {
    navItems = menuItems.map((item: any) => {
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

    console.log("mmmmmmmmmm = ", navItems);
  }

  return (
    <>
      {sideMenuLoader && <Loader />} {navItems}
    </>
  );
};

export default MenuList;
