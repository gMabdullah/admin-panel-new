import React, { useState, useEffect } from "react";

import { Typography, Grid, Stack, Divider, Box } from "@mui/material";

import SearchField from "components/SearchField";
import CustomButton from "components/CustomButton";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import AddTwoToneIcon from "@mui/icons-material/AddTwoTone";
import SortByAlphaIcon from "@mui/icons-material/SortByAlpha";
import FilterListIcon from "@mui/icons-material/FilterList";
import MainCard from "components/cards/MainCard";
import DragDropTableNew from "components/DragDropTableNew";
import useAxios from "axios-hooks";
import BranchesDropdown from "components/readytouseComponents/BranchesDropdown";
import BrandsDropdown from "components/readytouseComponents/BrandsDropdow";
import CategoriesDropdown from "components/readytouseComponents/CategoriesDropdown";
import MenuTypesDropdow from "components/readytouseComponents/MenuTypesDropdow";
import { OrderListingSkeleton } from "components/skeleton/OrderListingSkeleton";
import MenuItemDrawer from "products/addEditMenuItem/MenuItem";
import { gridIconsCss } from "./StylesMenu";
import { useSelector } from "store";
import Progress from "components/Progress";

const Items = () => {
  const { eatout_id, user_id } = JSON.parse(
    localStorage.getItem("businessInfo")!
  );
  const { selectedMenu, selectedBranch, selectedCategory, selectedBrand } = useSelector(
    (state) => state.dropdown
  );
  const [items, setItems] = useState<ProductResponse["items"]>();
  const [applyFilters, setApplyFilters] = React.useState(false);
  const [toggleDrawer, setToggleDrawer] = useState(false);
  const [itemsCount, setItemsCount] = useState(false);
  // API Call For Product //
  const [{ data: productData }, getProductApi] = useAxios(
    {
      url: `products?business_id=${eatout_id}&option_set=0&type=1&menu_type_id=${selectedMenu}&num=100&offset=0&query=&cat_id=${selectedCategory}&brand_id=${selectedBrand}&branch_id=${selectedBranch}&admin_id=${user_id}&source=biz`,
      method: "GET",
    },
    { manual: true }
  );
  console.log("productData", productData);
  /**************************************************** */

  /*********Get Item data from API Product for table***********/
  useEffect(() => {
    (async () => {
      const productResultApi = await getProductApi();
      if (productResultApi.data && productResultApi.data.items.length > 0) {
        const { items } = productResultApi.data;
        setItems(items);
      }
    })();
  }, []);

  useEffect(() => {
    // api call to update the orders list according to filters
    if (applyFilters) {
      debugger;
      (async () => {
        // await getProductApi();
        const productResultApi = await getProductApi();
        if (productResultApi.data && productResultApi.data.items) {
          const { items } = productResultApi.data;
          setItems(items);
        }
      })();
    }
  }, [applyFilters]);
  
  useEffect(() =>{
    // reset filter 
    if (applyFilters) {
      setApplyFilters(false);
    }
  }, [productData])

  const linearLoader = () => {
    // loader on updating the order
    return <Progress type="linear" />;
  };
  // Header Key of the table //

  const keysOfItems: typeKeyOfItem["keysOfItems"] = [
    { key: "image", value: "Image", align: "center" },
    { key: "name", value: "Item Name", align: "left" },
    { key: "category", value: "Category", align: "left" },
    { key: "price", value: "Price", align: "right" },
    { key: "discount", value: "Discount", align: "right" },
    { key: "tax", value: "Tax %", align: "right" },
    { key: "status", value: "Status", align: "left" },
    { key: "", value: "Actions", align: "center" },
  ];
  const applyButtonFilter = () => {
    debugger;
    setApplyFilters(true);
  };
  const handleDrawerToggle = () => {
    setToggleDrawer((state) => !state);
  };
  //
  return (
    <>
      {toggleDrawer && (
        <MenuItemDrawer
          toggleDrawer={toggleDrawer}
          handleDrawerToggle={handleDrawerToggle}
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
        <Grid container>
          <Grid item xs={12} display={"flex"}>
            <Grid item xs={9}>
              <MenuTypesDropdow applyFilter={applyButtonFilter} />
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
              {`400 Item(s)`}
            </Typography>
          </Grid>
        </Grid>
        <Box>
          {productData && productData.length === 0 ? (
            <OrderListingSkeleton />
          ) : (
            <DragDropTableNew items={items} keysOfItems={keysOfItems} />
          )}
        </Box>
      </MainCard>
    </>
  );
};

export default Items;
