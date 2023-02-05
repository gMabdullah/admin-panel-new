import React, { useContext, useState } from "react";

import { IconButton, Menu, MenuItem, Typography } from "@mui/material";
import { EditTwoTone, DeleteTwoTone, MoreVert } from "@mui/icons-material";

import useAxios, { RefetchOptions } from "axios-hooks";
import { AxiosPromise, AxiosRequestConfig } from "axios";

import { ProductsContext } from "products/context/ProductsContext";

interface itemProps {
  row: any;
  getProductsAPI: (
    config?: AxiosRequestConfig<any> | undefined,
    options?: RefetchOptions | undefined
  ) => AxiosPromise<any>;
  productLoading?: boolean;
  disableOnRowSelection?: boolean;
  triggerEditProduct: (
    itemId: string,
    dispatch: React.Dispatch<Action>
  ) => void;
}

const TableActionsButton = ({
  row,
  getProductsAPI,
  productLoading,
  disableOnRowSelection,
  triggerEditProduct,
}: itemProps) => {
  const { eatout_id, user_id } = JSON.parse(
    localStorage.getItem("businessInfo")!
  );
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const ITEM_HEIGHT = 37;

  const { dispatch } = useContext(ProductsContext);

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

  const editProduct = async () => {
    // close the action buttons popup
    handleClose();

    dispatch({
      type: "populateEditItemValues",
      payload: {
        value: {
          editItem: {
            editItemFlag: true,
            editItemId: "",
          },
        },
      },
    });

    // open the add/edit item drawer and call API to get item
    triggerEditProduct(row.menu_item_id, dispatch);
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
        <MoreVert />
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
          onClick={editProduct}
          disabled={
            (productLoading || deleteLoading || disableOnRowSelection) && true
          }
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
          disabled={
            (productLoading || deleteLoading || disableOnRowSelection) && true
          }
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
