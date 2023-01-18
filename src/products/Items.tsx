import React, { useState, useEffect, useContext } from "react";

import {
  Typography,
  Grid,
  Stack,
  Divider,
  Box,
  IconButton,
  TablePagination,
} from "@mui/material";

import AddTwoToneIcon from "@mui/icons-material/AddTwoTone";
import SortByAlphaIcon from "@mui/icons-material/SortByAlpha";
import FilterListIcon from "@mui/icons-material/FilterList";

import useAxios from "axios-hooks";
import { debounce } from "lodash";
import MainCard from "components/cards/MainCard";
import DraggableTable from "components/DraggableTable";
import CustomButton from "components/CustomButton";
import BranchesDropdown from "components/readytouseComponents/BranchesDropdown";
import BrandsDropdown from "components/readytouseComponents/BrandsDropdown";
import CategoriesDropdown from "components/readytouseComponents/CategoriesDropdown";
import MenuTypesDropdown from "components/readytouseComponents/MenuTypesDropdown";
import { OrderListingSkeleton } from "components/skeleton/OrderListingSkeleton";
import Loader from "components/Loader";

import AddEditItem from "products/AddEditItem";
import { gridIconsCss } from "./Styles";
import { useSelector } from "store";
import { keysOfItems } from "../constants";
import { ProductsProvider, ProductsContext } from "./context/ProductsContext";
import { reorder, sortMenuItems } from "orders/HelperFunctions";
import TdTextField from "components/TdTextField";
import {
  getLocalStorage,
  toCapitalizeFirstLetter,
} from "orders/HelperFunctions";
import { searchFieldStyle } from "business/Styles";
import file from "../assets/files/downloadSample.xlsx";

let troggleSorting = true;

const Items = () => {
  const { eatout_id, user_id } = JSON.parse(
    localStorage.getItem("businessInfo")!
  );

  const { selectedMenu, selectedBranch, selectedCategory, selectedBrand } =
    useSelector((state) => state.dropdown);
  const [items, setItems] = useState<ProductResponse["items"]>([]);
  const [applyFilters, setApplyFilters] = React.useState(false);
  const [toggleDrawer, setToggleDrawer] = useState(false);
  const [itemsCount, setItemsCount] = useState(100);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(100);
  const [apiCallFlag, setApiCallFlag] = React.useState("");
  const [sequenceItem, setSequenceItem] = useState([]);
  const [searchQueryItems, setSearchQueryItems] = useState<string>("");
  const [linearLoader, setLinearLoader] = useState<boolean>(false);
  const { state } = useContext(ProductsContext);

  // API Call For Product //
  const [{ data: productData, loading: productLoading }, getProductsAPI] =
    useAxios(
      {
        url: `products?business_id=${eatout_id}&option_set=0&type=1&menu_type_id=${selectedMenu}&num=${rowsPerPage}&offset=${
          page * rowsPerPage
        }&query=${searchQueryItems}&cat_id=${selectedCategory}&brand_id=${selectedBrand}&branch_id=${selectedBranch}&admin_id=${user_id}&source=biz`,
        method: "GET",
      },
      { manual: true }
    );

  const handleSearchChange = debounce((e: { target: { value: string } }) => {
    (async () => {
      if (e.target.value !== "") {
        setSearchQueryItems(e.target.value);
      } else {
        setSearchQueryItems(e.target.value);
        await getProductsAPI();
      }
    })();
  }, 1000);

  // API Call For Shorting //
  const [{ error: storingError, loading: sortLoading }, shortItemId] = useAxios(
    {
      url: "/sort_items",
      method: "post",
    },
    { manual: true }
  );

  /*********Get Item data from API Product for table***********/

  useEffect(() => {
    (async () => {
      const productResultApi = await getProductsAPI();
      //setLinearLoader(true)
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
      } else {
        setPage(0);
      }

      if (productResultApi.data) {
        const { items_count } = productResultApi.data;
        setItemsCount(items_count);
      }
    })();
  }, [searchQueryItems]);

  useEffect(() => {
    // api call to update the item list according to filters
    if (applyFilters) {
      // setLinearLoader(true);
      getProductsAPI();
      // setLinearLoader(false);
    }
  }, [applyFilters]);

  useEffect(() => {
    if (productData) {
      switch (apiCallFlag) {
        case "PageChange": {
          setItems(productData.items);
          break;
        }
        default: {
          const { items, items_count } = productData;
          setItems(items);
          setItemsCount(Number(items_count));
        }
      }

      // reset filter
      if (applyFilters) {
        setApplyFilters(false);
      }
    }
  }, [productData]);

  useEffect(() => {
    // setLinearLoader(true);
    getProductsAPI();
    // setLinearLoader(false);
  }, [page, rowsPerPage]);

  const applyButtonFilter = () => {
    setApiCallFlag("");
    setApplyFilters(true);
  };

  const sortingItems = async () => {
    let sortItems;
    if (troggleSorting) {
      troggleSorting = false;
      sortItems = items?.sort((a: any, b: any) => {
        if (a.name < b.name) return -1;
        if (b.name < a.name) return 1;

        return 0;
      });
    } else {
      troggleSorting = true;
      sortItems = items?.sort((a, b) => {
        if (a.name > b.name) return -1;
        if (b.name > a.name) return 1;
        return 0;
      });
    }

    const formData = new FormData();

    // setLinearLoader(true);
    sortItems?.map(({ menu_item_id }) => {
      formData.append("categoryArray[]", menu_item_id);
    });
    const shortItemResponse = await shortItemId({
      data: formData,
    });
    setItems(sortItems);
    // setLinearLoader(false);
  };

  const handleDrawerToggle = () => {
    setToggleDrawer((state) => !state);
  };

  // Drag And Drop Shorting
  const shortDragDropItems = async (sortArray: any) => {
    // setLinearLoader(true);
    let shortItems: any = reorder(items, sortArray);
    setItems(shortItems);
    const formData = new FormData();
    for (let index = 0; index < shortItems.length; index++) {
      formData.append("categoryArray[]", shortItems[index].menu_item_id);
    }
    const shortItemResponse = await shortItemId({ data: formData });
    // setLinearLoader(false);
  };

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setApiCallFlag("PageChange");
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setApiCallFlag("");
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <ProductsProvider>
      {toggleDrawer && (
        <AddEditItem
          toggleDrawer={toggleDrawer}
          handleDrawerToggle={handleDrawerToggle}
          getProductApi={getProductsAPI}
        />
      )}

      {(productLoading || sortLoading) && <Loader />}

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
                sx={searchFieldStyle}
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
                // onClick={() => {
                //   let link = document.createElement("a");
                //   link.setAttribute("download", "Menu-Sample.xlsx");
                //   debugger;
                //   link.href = file;
                //   // require("../../src/assets/files/download-sample.xlsx");
                //   document.body.appendChild(link);
                //   link.click();
                //   link.remove();
                // }}
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
                  <IconButton onClick={() => sortingItems()}>
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
          {itemsCount && (
            <Grid item xs={12}>
              <Typography
                variant="h5"
                sx={{
                  mb: "20px",
                  color: "#212121",
                }}
              >
                {`${rowsPerPage} Item(s)`}
              </Typography>
            </Grid>
          )}
        </Grid>
        <Box sx={{ width: "100%", overflow: "hidden" }}>
          {productData === undefined || productLoading || sortLoading ? (
            <OrderListingSkeleton />
          ) : (
            <>
              <DraggableTable
                getProductsAPI={getProductsAPI}
                productLoading={productLoading}
                items={items}
                keysOfItems={keysOfItems}
                setSequenceItem={setSequenceItem}
                shortDragDropItems={shortDragDropItems}
              />
              <TablePagination
                component="div"
                count={itemsCount}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                rowsPerPageOptions={[100, 200, 500, 1000, 2000]}
              />
            </>
          )}
        </Box>
      </MainCard>
    </ProductsProvider>
  );
};

export default Items;
