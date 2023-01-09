import { useEffect, useState } from "react";

// material-ui
import { Typography } from "@mui/material";

import useAxios from "axios-hooks";

import Loader from "components/Loader";
import NavCollapse from "./navCollapse";
import NavItem from "./navItem";

// ==============================|| SIDEBAR MENU LIST ||============================== //

const MenuList = () => {
  const { eatout_id } = JSON.parse(localStorage.getItem("businessInfo")!);

  const [menuItems, setMenuItems] = useState<Element[] | []>([]);

  const menuItemsAPIPayload = () => {
    const formData = new FormData();

    formData.append("business_id", eatout_id);
    formData.append("source", "biz");
    return formData;
  };

  const [{ loading: sideBarLoader }, menuItemsAPICall] = useAxios(
    {
      url: "/get_menu_json",
      method: "POST",
      data: menuItemsAPIPayload(),
    },
    { manual: true }
  );

  useEffect(() => {
    (async () => {
      const {
        data: { data },
      } = await menuItemsAPICall();

      if (!Array.isArray(data)) {
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
      {sideBarLoader && <Loader />} {menuItems}
    </>
  );
};

export default MenuList;
