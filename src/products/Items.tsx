import React, { useState, useEffect, useRef } from "react";

import {
  Typography,
  Grid,
  Stack,
  Divider,
  Box,
  TablePagination,
} from "@mui/material";

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
import { useSelector } from "store";
import { keysOfItems } from "constants/BusinessIds";

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
  // API Call For Product //
  const [{ data: productData }, getProductsAPI] = useAxios(
    {
      url: `products?business_id=${eatout_id}&option_set=0&type=1&menu_type_id=${selectedMenu}&num=${rowsPerPage}&offset=${
        page * rowsPerPage
      }&query=&cat_id=${selectedCategory}&brand_id=${selectedBrand}&branch_id=${selectedBranch}&admin_id=${user_id}&source=biz`,
      method: "GET",
    },
    { manual: true }
  );

  /*********Get Item data from API Product for table***********/
  useEffect(() => {
    (async () => {
      const productResultApi = await getProductsAPI();
      if (productResultApi.data && productResultApi.data.items.length > 0) {
        const { items } = productResultApi.data;
        setItems(items);
      } else {
        setPage(0);
      }

      if (productResultApi.data) {
        const { items_count } = productResultApi.data;
        setItemsCount(Number(items_count));
      }
    })();
  }, []);

  useEffect(() => {
    // api call to update the item list according to filters
    if (applyFilters) {
      getProductsAPI();
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
    getProductsAPI();
  }, [page, rowsPerPage]);

  const applyButtonFilter = () => {
    setApiCallFlag("");
    setApplyFilters(true);
  };

  const handleDrawerToggle = () => {
    setToggleDrawer((state) => !state);
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
              {`${rowsPerPage} Item(s)`}
            </Typography>
          </Grid>
        </Grid>
        <Box sx={{ width: "100%", overflow: "hidden" }}>
          {productData && productData.length === 0 ? (
            <OrderListingSkeleton />
          ) : (
            <DraggableTable items={items} keysOfItems={keysOfItems} />
          )}
          <TablePagination
            component="div"
            count={itemsCount}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[100, 200, 500, 1000, 2000]}
          />
        </Box>
      </MainCard>
    </>
  );
};

export default Items;
