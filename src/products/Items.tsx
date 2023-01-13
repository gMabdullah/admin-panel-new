import React, { useState, useEffect, useReducer } from "react";

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
  ProductsProvider,
  // reducer,
  // initialState,
} from "./context/ProductsContext";
import { reorder } from "orders/HelperFunctions";

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
  const [sequenceItem,setSequenceItem]=useState([])
  console.log("sequenceItem",sequenceItem)
  // const [state, dispatch] = useReducer(reducer, initialState);

  // API Call For Product //
  const [{ data: productData }, getProductApi] = useAxios(
    {
      url: `products?business_id=${eatout_id}&option_set=0&type=1&menu_type_id=${selectedMenu}&num=100&offset=0&query=&cat_id=${selectedCategory}&brand_id=${selectedBrand}&branch_id=${selectedBranch}&admin_id=${user_id}&source=biz`,
      method: "GET",
    },
    { manual: true }
  );

  /*********Get Item data from API Product for table***********/
  useEffect(() => {
    (async () => {
      const productResultApi = await getProductApi();
      if (productResultApi.data && productResultApi.data.items.length > 0) {
        const { items } = productResultApi.data;
        setItems(items);
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
 // Drag And Drop Shorting
 const shortDragDropItems=(sortArray:any)=>{      
                                                       
  debugger
  let shortItems=reorder(items,sortArray)
  debugger
  //let shortItems:any

  // eslint-disable-next-line @typescript-eslint/no-redeclare
  //let shortItems=reorder(items,sequenceItem)
}
  return (
    <ProductsProvider>
      <>
        {toggleDrawer && (
          <AddEditItem
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
              <DraggableTable items={items} keysOfItems={keysOfItems} setSequenceItem={setSequenceItem} shortDragDropItems={shortDragDropItems}/>
            )}
          </Box>
        </MainCard>
      </>
    </ProductsProvider>
  );
};

export default Items;
