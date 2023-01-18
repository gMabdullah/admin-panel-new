import { EditTwoTone, DeleteTwoTone } from "@mui/icons-material";
import useAxios from "axios-hooks";
import React, { useState } from "react";
import { IconButton, Menu, MenuItem, Typography } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { AxiosPromise, AxiosRequestConfig } from "axios";
import { RefetchOptions } from "axios-hooks";

interface itemProps {
  row: any;
  getProductsAPI: (
    config?: AxiosRequestConfig<any> | undefined,
    options?: RefetchOptions | undefined
  ) => AxiosPromise<any>;
  productLoading?: boolean;
}

const TableActionsButton = ({
  row,
  getProductsAPI,
  productLoading,
}: itemProps) => {
  const { eatout_id, user_id } = JSON.parse(
    localStorage.getItem("businessInfo")!
  );
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const ITEM_HEIGHT = 37;

  const payload = () => {
    const formData = new FormData();
    formData.append("eatout_id", eatout_id);
    formData.append("menu_id", row.menu_item_id);
    formData.append("admin_id", user_id);
    formData.append("source", "biz");
    return formData;
  };
  // delete_menu_item
  const [{ error: deleteError, loading: deleteLoading }, productDeleteAPI] =
    useAxios(
      {
        url: "/delete_menu_item",
        method: "post",
      },
      { manual: true }
    );
  const handleClick = (event: React.MouseEvent<HTMLElement>) =>
    setAnchorEl(event.currentTarget);

  const deleteProduct = async () => {
    await productDeleteAPI({
      data: payload(),
    });
    await getProductsAPI();
    handleClose();
  };

  const handleClose = () => setAnchorEl(null);

  if (deleteError) return <p>Delete Product Failed</p>;
  return (
    <>
      <IconButton
        aria-label="options"
        aria-controls="options-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="options-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: "94px",
          },
        }}
      >
        <MenuItem
          onClick={handleClose}
          disabled={(productLoading || deleteLoading) && true}
        >
          <EditTwoTone sx={{ fontSize: "1.3rem" }} />
          <Typography
            variant="body1"
            sx={{
              color: "#212121",
              ml: "8px",
            }}
          >
            Edit
          </Typography>
        </MenuItem>
        <MenuItem
          onClick={deleteProduct}
          disabled={(productLoading || deleteLoading) && true}
        >
          <DeleteTwoTone sx={{ fontSize: "1.3rem" }} />
          <Typography
            variant="body1"
            sx={{
              color: "#212121",
              ml: "8px",
            }}
          >
            Delete
          </Typography>
        </MenuItem>
      </Menu>
    </>
  );
};

export default TableActionsButton;
