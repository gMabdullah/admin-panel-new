import React, { useState, useEffect, useReducer } from "react";

import { Typography, Grid, Stack, Divider, Box, IconButton } from "@mui/material";

import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import AddTwoToneIcon from "@mui/icons-material/AddTwoTone";
import SortByAlphaIcon from "@mui/icons-material/SortByAlpha";
import FilterListIcon from "@mui/icons-material/FilterList";

import useAxios from "axios-hooks";
import { debounce } from "lodash";
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
import { reorder, sortMenuItems } from "orders/HelperFunctions";
import TdTextField from "components/TdTextField";
import Loader from "components/Loader";
let troggleSorting=true

const Items = () => {
  const { eatout_id, user_id } = JSON.parse(
    localStorage.getItem("businessInfo")!
  );

  const { selectedMenu, selectedBranch, selectedCategory, selectedBrand } =
    useSelector((state) => state.dropdown);
  const [items, setItems] = useState<ProductResponse["items"]>();
  console.log("items",items)
  const [applyFilters, setApplyFilters] = React.useState(false);
  const [toggleDrawer, setToggleDrawer] = useState(false);
  const [itemsCount, setItemsCount] = useState("");
  const [sequenceItem,setSequenceItem]=useState([])
  const [searchQueryItems,setSearchQueryItems]=useState<string>("")
  const [linearLoader,setLinearLoader]=useState<boolean>(false)
  console.log("sequenceItem",sequenceItem)
  // const [state, dispatch] = useReducer(reducer, initialState);

  // API Call For Product //
  const [{ data: productData }, getProductApi] = useAxios(
    {
      url: `products?business_id=${eatout_id}&option_set=0&type=1&menu_type_id=${selectedMenu}&num=100&offset=0&query=${searchQueryItems}&cat_id=${selectedCategory}&brand_id=${selectedBrand}&branch_id=${selectedBranch}&admin_id=${user_id}&source=biz`,
      method: "GET",
    },
    { manual: true }
  );
  console.log("productData",productData)
  const handleSearchChange = debounce ((e: { target: { value: string } }) => {
    (async () => {
      debugger
      if(e.target.value!==""){
        setSearchQueryItems(e.target.value)
      }else{
        setSearchQueryItems(e.target.value)
        getProductApi()
      }
      // await getProductApi();
     
     
    })();
     
      
    
  }, 1000);
// API Call For Shorting //
const [{}, shortItemId] = useAxios(
  {
    url: "/sort_items",
    method: "post",
  },
  { manual: true }
);
  /*********Get Item data from API Product for table***********/
  useEffect(() => {
    (async () => {
    
      const productResultApi = await getProductApi();
      //setLinearLoader(true)
      if (productResultApi.data && productResultApi.data.items.length > 0) {
        const { items } = productResultApi.data;
        setItems(items);
       // setLinearLoader(false)

      }

      if (productResultApi.data) {
        const { items_count } = productResultApi.data;
        setItemsCount(items_count);

      }
    })();
  }, [searchQueryItems]);

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
const sortingItems =async ()=>{
  let  sortItems;
    if (troggleSorting) {
      troggleSorting=false;
      sortItems = items?.sort((a:any, b: any) => {
        if (a.name < b.name) return -1;
        if (b.name < a.name) return 1;

        return 0;
      });
    } else {
      troggleSorting=true;
       sortItems = items?.sort((a, b) => {
        if (a.name > b.name) return -1;
        if (b.name > a.name) return 1;
        return 0;
      });
    }
   
  const formData = new FormData();

  setLinearLoader(true)
      sortItems?.map(({ menu_item_id }) => {
      formData.append("categoryArray[]", menu_item_id);
    });
    const shortItemResponse=await shortItemId({
      data:formData
  })
  setItems(sortItems)
  setLinearLoader(false)

}
  const handleDrawerToggle = () => {
    setToggleDrawer((state) => !state);
  };
 // Drag And Drop Shorting
 const shortDragDropItems=async(sortArray:any)=>{      
                                                       
  setLinearLoader(true)
  let shortItems:any=reorder(items,sortArray)
  setItems(shortItems)
  const formData = new FormData();
  for (let index = 0; index < shortItems.length; index++) {
    formData.append("categoryArray[]", shortItems[index].menu_item_id);
  }
 const shortItemResponse=await shortItemId({
    data:formData
})
setLinearLoader(false)
  console.log("shortItems",shortItemResponse)
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
     {  linearLoader && <Loader/>}
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

                <TdTextField
                  type="search"
                  placeholder="Search Items"
                  onChange={handleSearchChange}
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
                    <IconButton onClick={()=>sortingItems()}>
                    <SortByAlphaIcon />
                    </IconButton>
                  </Stack>
                  <IconButton>
                  <Stack>
                    <FilterListIcon />
                  </Stack>
                  </IconButton>
                </Stack>
              </Grid>
            </Grid>
          </Grid>
          <Grid container>
            { itemsCount &&
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
            }
         
          </Grid>
          <Box>
            { productData=== undefined ? (
              <OrderListingSkeleton />
            ) : (
              <DraggableTable items={items} keysOfItems={keysOfItems} setSequenceItem={setSequenceItem} shortDragDropItems={shortDragDropItems} />
            )}
          </Box>
        </MainCard>
      </>
    </ProductsProvider>
  );
};

export default Items;
