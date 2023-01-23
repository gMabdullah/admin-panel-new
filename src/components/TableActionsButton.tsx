import React, { useContext, useState } from "react";

import { IconButton, Menu, MenuItem, Typography } from "@mui/material";
import { EditTwoTone, DeleteTwoTone, MoreVert } from "@mui/icons-material";

import useAxios, { RefetchOptions } from "axios-hooks";
// import { RefetchOptions } from "axios-hooks";
import { AxiosPromise, AxiosRequestConfig } from "axios";

import { ProductsContext } from "products/context/ProductsContext";
import { getLocalStorage } from "orders/HelperFunctions";
import { weightUnits } from "../constants";

interface itemProps {
  row: any;
  getProductsAPI: (
    config?: AxiosRequestConfig<any> | undefined,
    options?: RefetchOptions | undefined
  ) => AxiosPromise<any>;
  productLoading?: boolean;
  handleDrawerToggle: () => void;
}

const TableActionsButton = ({
  row,
  getProductsAPI,
  productLoading,
  handleDrawerToggle,
}: itemProps) => {
  const { eatout_id, user_id } = JSON.parse(
    localStorage.getItem("businessInfo")!
  );
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const ITEM_HEIGHT = 37;

  const { state, dispatch } = useContext(ProductsContext);

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

  // get single item API call (for edit item)
  const [{}, singleItemAPICall] = useAxios(
    {
      method: "get",
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
    // get single item API call (for edit item)
    const {
      // data,
      data: { items },
    } = await singleItemAPICall({
      url: `/product_details?business_id=${
        getLocalStorage().eatout_id
      }&item_id=${row.menu_item_id}&admin_id=${
        getLocalStorage().user_id
      }&source=biz`,
    });

    //removed the selected item from available options for product grouping
    const availableProductsToGroup = state.allItemsForGrouping.filter(
      (item) => item.value !== items[0].menu_item_id
    );

    // check item can either be grouped or not
    if (items[0].is_grouped === true && items[0].is_parent === false) {
      dispatch({
        type: "editItem",
        payload: { name: "allowItemsGrouping", value: true },
      });
    }

    // filter the selected category
    const selectedCategory = state.allCategories.filter(
      (category) => category.value === items[0].menu_cat_id
    );

    // set value for weight unit dropdown
    const selectedItemWeightUnit = weightUnits.filter(
      (unit) =>
        unit.value === items[0] && items[0].weight_unit.trim().toLowerCase()
    );

    dispatch({
      type: "populateEditItemValues",
      payload: {
        value: {
          allItemsForGrouping: availableProductsToGroup,
          itemCategory:
            selectedCategory.length === 0
              ? {
                  value: "",
                  label: "",
                }
              : selectedCategory[0],

          itemName: items[0].name,
          itemPrice: items[0].price,
          itemTax: items[0].tax,

          itemBrand: items[0].item_brand[0].brand_name
            ? {
                value: items[0].item_brand[0].brand_id,
                label: items[0].item_brand[0].brand_name,
              }
            : {
                value: "",
                label: "",
              },

          itemOptionSets: items[0].options.map(
            (option: { id: string; name: string }) => ({
              value: option.id,
              label: option.name,
            })
          ),

          itemToGroup: items[0].grouped_products.map(
            (product: { product_id: string; sku: string; name: string }) => ({
              value: product.product_id,
              label: product.sku
                ? product.name + " (" + product.sku + ")"
                : product.name,
            })
          ),

          itemSpecialNote: items[0].note,
          itemAvailability: items[0].status, // 1 and 0 => item not available and available respectively
          itemSpecialInstructions: items[0].allow_note, // 1 and 0 => allow and don't allow special instruction respectively
          itemDisplay: items[0].display_source, // 0, 1, 2, and 3 => display (all , none, web, and pos) respectively

          itemDiscount: items[0].discount_display,
          itemDiscountStart: items[0].discount_start_at,
          itemDiscountExpiry: items[0].discount_expiry,

          itemDescription: items[0].desc, //////////////////having desc for editor also => check with editor
          itemShortDescription: "",
          itemLongDescription: "",

          itemWeight: items[0].weight_value,
          itemWeightUnit: selectedItemWeightUnit[0],

          itemPricePer: items[0].price_per,
          itemMinimumQuantity: items[0].min_qty,

          itemCost: items[0].item_cost,

          itemSku: items[0].sku,
          itemUnitPrice: items[0].unit_price,
          itemProductCode: items[0].product_code,
          itemUniversalProductCode: items[0].upc,
          itemPallets: items[0].pallet,
          itemPalletPrice: items[0].pallet_price,
          itemCartons: items[0].carton,
          itemMaximumDistance: items[0].max_distance,
          itemNutritions:
            items[0].nutritions.length > 0
              ? JSON.parse(items[0].nutritions)
              : "",

          editItem: {
            editItemFlag: true,
            editItemId: items[0].menu_item_id,
          },
        },
      },
    });

    // close the action buttons popup
    handleClose();

    // open the add/edit item drawer
    handleDrawerToggle();
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
