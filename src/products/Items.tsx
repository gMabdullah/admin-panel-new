import React, { useState, useEffect, useReducer, useContext } from "react";

import { Typography, Grid, Stack, Divider, Box } from "@mui/material";

import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import AddTwoToneIcon from "@mui/icons-material/AddTwoTone";
import SortByAlphaIcon from "@mui/icons-material/SortByAlpha";
import FilterListIcon from "@mui/icons-material/FilterList";

import useAxios from "axios-hooks";

import MainCard from "components/cards/MainCard";
import DraggableTable from "components/DraggableTable";
import SearchField from "components/SearchField";
import CustomButton from "components/CustomButton";
import BranchesDropdown from "components/readytouseComponents/BranchesDropdown";
import BrandsDropdown from "components/readytouseComponents/BrandsDropdown";
import CategoriesDropdown from "components/readytouseComponents/CategoriesDropdown";
import MenuTypesDropdown from "components/readytouseComponents/MenuTypesDropdown";
import { OrderListingSkeleton } from "components/skeleton/OrderListingSkeleton";
import Progress from "components/Progress";
import AddEditItem from "products/AddEditItem";
import { gridIconsCss } from "./Styles";
import { dispatch, useSelector } from "store";
import { keysOfItems } from "constants/BusinessIds";
import {
  ProductsContext,
  ProductsProvider,
  // reducer,
  // initialState,
} from "./context/ProductsContext";
import {
  getLocalStorage,
  toCapitalizeFirstLetter,
} from "orders/HelperFunctions";

const Items = () => {
  const { eatout_id, user_id } = JSON.parse(
    localStorage.getItem("businessInfo")!
  );

  const { selectedMenu, selectedBranch, selectedCategory, selectedBrand } =
    useSelector((state) => state.dropdown);
  const [items, setItems] = useState<ProductResponse["items"]>();
  const [applyFilters, setApplyFilters] = React.useState(false);
  const [toggleDrawer, setToggleDrawer] = useState(false);
  const [itemsCount, setItemsCount] = useState("");
  const { state } = useContext(ProductsContext);

  // API Call For Product //
  const [{ data: productData }, getProductApi] = useAxios(
    {
      url: `products?business_id=${eatout_id}&option_set=0&type=1&menu_type_id=${selectedMenu}&num=100&offset=0&query=&cat_id=${selectedCategory}&brand_id=${selectedBrand}&branch_id=${selectedBranch}&admin_id=${user_id}&source=biz`,
      method: "GET",
    },
    { manual: true }
  );

  // // add item API call payload
  // const addItemAPIPayload = (item: any) => {
  //   const formData = new FormData();

  //   formData.append("menu_items", JSON.stringify(item));
  //   formData.append("eatout_id", getLocalStorage().eatout_id);
  //   formData.append("admin_id", getLocalStorage().user_id);
  //   formData.append("source", "biz");
  //   return formData;
  // };

  // // add item API call
  // const [{}, addItemAPICall] = useAxios(
  //   {
  //     url: "/add_menu_item_new",
  //     method: "POST",
  //     // data: addItemAPIPayload(),
  //   },
  //   { manual: true }
  // );

  /*********Get Item data from API Product for table***********/
  useEffect(() => {
    (async () => {
      const productResultApi = await getProductApi();
      if (productResultApi.data && productResultApi.data.items.length > 0) {
        const { items } = productResultApi.data;
        setItems(items);

        state.allItemsForGrouping = items.map((item: ProductResponseItem) => {
          if (!item.is_grouped) {
            return {
              value: item.menu_item_id,
              label: item.sku ? item.name + " (" + item.sku + ")" : item.name,
            };
          }
        });

        // state.allItemsForGrouping = [...items];
      }

      if (productResultApi.data) {
        const { items_count } = productResultApi.data;
        setItemsCount(items_count);
      }
    })();
  }, []);

  useEffect(() => {
    // api call to update the orders list according to filters
    if (applyFilters) {
      (async () => {
        // await getProductApi();
        const productResultApi = await getProductApi();
        if (productResultApi.data && productResultApi.data.items) {
          const { items } = productResultApi.data;
          setItems(items);
        }
        if (productResultApi.data) {
          const { items_count } = productResultApi.data;
          setItemsCount(items_count);
        }
      })();
    }
  }, [applyFilters]);

  useEffect(() => {
    // reset filter
    if (applyFilters) {
      setApplyFilters(false);
    }
  }, [productData]);

  const applyButtonFilter = () => {
    setApplyFilters(true);
  };

  const handleDrawerToggle = () => {
    setToggleDrawer((state) => !state);
  };

  // const addItemCallback = () => {
  //   //===============================================================================================================================

  //   // callApiToAddMenuItem = () => {
  //   // let attributeIDsString = "";
  //   // let menuItemIDsString = "";
  //   // const { selectedMenuItem, selectedImagesId } = this.props;
  //   // const {
  //   //   selectedBrands,
  //   //   selectedCategory,
  //   //   itemName,
  //   //   itemDescription,
  //   //   isSpecialNote,
  //   //   specialNote,
  //   //   itemPrice,
  //   //   itemTax,
  //   //   itemDiscount,
  //   //   itemWeight,
  //   //   itemSku,
  //   //   itemProductCode,
  //   //   itemUniversalProductCode,
  //   //   unitPriceItem,
  //   //   itemCarton,
  //   //   itemCartonPrice,
  //   //   itemPallet,
  //   //   itemPalletPrice,
  //   //   isItemAvailable,
  //   //   isItemDisplay,
  //   //   orderLimit,
  //   //   inventoryLimit,
  //   //   pricePer,
  //   //   WeightUnit,
  //   //   discountStart,
  //   //   discountExpiry,
  //   //   minimumOrderQuantity,
  //   //   attributeArray,
  //   //   maxDistance,
  //   // } = this.state;

  //   //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  //   // const eatout_id = localStorage.getItem("eatout_id");
  //   // const brandId = selectedBrands !== null ? selectedBrands.value : "";
  //   // //this check only will execute when product have attributes
  //   // attributeIDsString =
  //   //   attributeArray && attributeArray.filter((n) => n).join();

  //   // const menuItems =
  //   //   this.getProductsForGrouping() !== "" ? this.getProductsForGrouping() : [];
  //   // menuItemIDsString = menuItems.join();

  //   // const optionSets =
  //   //   this.getOptionSets() !== ""
  //   //     ? JSON.stringify(this.getOptionSets())
  //   //     : JSON.stringify([]);
  //   // const filterTags = this.getFilterTag() !== "" ? this.getFilterTag() : [];

  //   // const suggestions =
  //   //   this.getSuggestions() !== "" ? JSON.stringify(this.getSuggestions()) : "";
  //   // const nutritions =
  //   //   this.getNutritions() !== "" ? JSON.stringify(this.getNutritions()) : "";
  //   // const branches =
  //   //   this.getBranchesId() !== "" ? JSON.stringify(this.getBranchesId()) : "";

  //   console.log("state = ", state);

  //   const addItemPayloadKeys = {
  //     item_id: "",
  //     eatout_id: getLocalStorage().eatout_id,
  //     category_id: "13420",
  //     name: toCapitalizeFirstLetter(state.itemName).trim(),
  //     description: state.itemDescription,
  //     allow_note: state.itemSpecialInstructions,
  //     special_note: state.itemSpecialNote,
  //     price: state.itemPrice,
  //     tax: state.itemTax,
  //     tags_ids: "",
  //     discount: "0", // required in api
  //     weight: state.itemWeight,
  //     sku: state.itemSku.trim(),
  //     product_code: state.itemProductCode.trim(),
  //     universal_product_code: state.itemUniversalProductCode.trim(),
  //     unit_price: state.itemUnitPrice,
  //     carton_size: "", // required in api
  //     carton_price: "", // required in api
  //     pallet_size: "", // required in api
  //     pallet_price: state.itemPalletPrice,
  //     brand_id: "",
  //     option_sets: "[]",
  //     nutritions: state.itemNutritions,
  //     suggestions: "", // required in api
  //     branches: "", // required in api
  //     status: state.itemAvailability,
  //     display_source: state.itemDisplay,
  //     order_limit: "",
  //     inv_limit: "",
  //     price_per: state.itemPricePer,
  //     min_qty: state.itemMinimumQuantity,
  //     images: "", // required in api
  //     item_weight_with_unit: "",
  //     // item_weight_with_unit: `${itemWeight} ${
  //     //   Object.keys(WeightUnit).length > 0 ? WeightUnit.value : ""
  //     // }`.trim(),
  //     discount_expiry: "",
  //     discount_start_at: "",
  //     attribute_ids: "",
  //     product_group_ids: "",
  //     max_distance: "0",
  //     // max_distance: maxDistance ? maxDistance : "0",
  //   };
  //   // const addItemPayloadKeys = {
  //   //   item_id: "",
  //   //   eatout_id: "12092",
  //   //   category_id: "13420",
  //   //   name: "Add item test",
  //   //   description: "",
  //   //   allow_note: "0",
  //   //   special_note: "",
  //   //   price: "9999",
  //   //   tax: "2",
  //   //   tags_ids: "",
  //   //   discount: "", // required in api
  //   //   weight: "",
  //   //   sku: "",
  //   //   product_code: "",
  //   //   universal_product_code: "",
  //   //   unit_price: "",
  //   //   carton_size: "", // required in api
  //   //   carton_price: "",
  //   //   pallet_size: "", // required in api
  //   //   pallet_price: "",
  //   //   brand_id: "",
  //   //   option_sets: "[]",
  //   //   nutritions: "",
  //   //   suggestions: "", // required in api
  //   //   branches: "", // required in api
  //   //   status: "0",
  //   //   display_source: "0",
  //   //   order_limit: "",
  //   //   inv_limit: "",
  //   //   price_per: "",
  //   //   min_qty: "",
  //   //   images: "", // required in api
  //   //   item_weight_with_unit: "",
  //   //   // item_weight_with_unit: `${itemWeight} ${
  //   //   //   Object.keys(WeightUnit).length > 0 ? WeightUnit.value : ""
  //   //   // }`.trim(),
  //   //   discount_expiry: "",
  //   //   discount_start_at: "",
  //   //   attribute_ids: "",
  //   //   product_group_ids: "",
  //   //   max_distance: "0",
  //   //   // max_distance: maxDistance ? maxDistance : "0",
  //   // };

  //   addItemAPICall({
  //     data: addItemAPIPayload({ items: [addItemPayloadKeys] }),
  //   });

  //   console.log("add Item Payload Keys = ", addItemPayloadKeys);

  //   // let jsonParamArr = [];
  //   // jsonParamArr.push(addItemPayloadKeys);
  //   // const jsonObj = {
  //   //   items: jsonParamArr,
  //   // };
  //   // var formData = {
  //   //   url: "",
  //   //   body: {
  //   //     menu_items: JSON.stringify(jsonObj),
  //   //   },
  //   // };

  //   // formData = ObjToFormData(formData);
  //   // const api = new YourRestApi();
  //   // this.setState({ isLoadingAddMenuItem: true });
  //   // api
  //   //   .addMenuItemNew(formData)
  //   //   .then((response) => this.apiResponseAddMenuItemNew(response)) // Successfull responce
  //   //   .catch((err) => this.apiError(err)); // Catch any error
  //   // // };

  //   //===============================================================================================================================

  //   // close the drawer
  //   setToggleDrawer((state) => !state);
  // };

  return (
    <ProductsProvider>
      <>
        {toggleDrawer && (
          <AddEditItem
            toggleDrawer={toggleDrawer}
            handleDrawerToggle={handleDrawerToggle}
            // addItemCallback={addItemCallback}
            getProductApi={getProductApi}
          />
        )}

        <MainCard
          title={
            <Grid container spacing={2}>
              <Grid
                item
                xs={6}
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Typography variant="h3">Menu Items</Typography>

                <SearchField
                  iconPrimary={SearchOutlinedIcon}
                  placeholder="Search Item"
                  sx={{
                    width: "260px",
                    height: "40px",
                    marginLeft: "36px",
                  }}
                />
              </Grid>
              <Grid
                item
                xs={6}
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                }}
              >
                <CustomButton
                  variant={"contained"}
                  color={"secondary"}
                  startIcon={<AddTwoToneIcon />}
                  sx={{
                    p: "12px 22px",
                    height: "44px",
                    width: "138px",
                  }}
                  onClick={handleDrawerToggle}
                >
                  Add Item
                </CustomButton>
              </Grid>
            </Grid>
          } // MainCard opening tag closed here
        >
          <Grid container mb={"16px"}>
            <Grid item xs={12} display={"flex"}>
              <Grid item xs={9}>
                <MenuTypesDropdown applyFilter={applyButtonFilter} />
                <BranchesDropdown applyFilter={applyButtonFilter} />
                <BrandsDropdown applyFilter={applyButtonFilter} />
                <CategoriesDropdown applyFilter={applyButtonFilter} />
              </Grid>
              <Grid item xs={3} sx={gridIconsCss}>
                <Stack
                  spacing={0.5}
                  direction="row"
                  divider={
                    <Divider
                      orientation="vertical"
                      sx={{ border: "1px solid #EEEEEE", display: "flex" }}
                      flexItem
                    />
                  }
                >
                  <Stack>
                    <SortByAlphaIcon />
                  </Stack>

                  <Stack>
                    <FilterListIcon />
                  </Stack>
                </Stack>
              </Grid>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={12}>
              <Typography
                variant="h5"
                sx={{
                  mb: "20px",
                  color: "#212121",
                }}
              >
                {`${itemsCount} Item(s)`}
              </Typography>
            </Grid>
          </Grid>
          <Box>
            {productData && productData.length === 0 ? (
              <OrderListingSkeleton />
            ) : (
              <DraggableTable items={items} keysOfItems={keysOfItems} />
            )}
          </Box>
        </MainCard>
      </>
    </ProductsProvider>
  );
};

export default Items;
