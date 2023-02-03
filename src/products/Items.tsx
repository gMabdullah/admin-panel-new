import React, { useState, useEffect, useContext, lazy, Suspense } from "react";

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
import { SelectChangeEvent } from "@mui/material/Select";

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
import Notify from "components/Notify";

import AddEditItem from "products/AddEditItem";
import { gridIconsCss } from "./Styles";
import { useDispatch, useSelector } from "store";
import {
  bulkActions,
  itemExportColumns,
  keysOfItems,
  weightUnits,
} from "../constants";
import { ProductsProvider, ProductsContext } from "./context/ProductsContext";
import { setProductColumn, toggleDatePicker } from "../store/slices/Main";
import {
  getLocalStorage,
  reorder,
  sortMenuItems,
} from "orders/HelperFunctions";
import TdTextField from "components/TdTextField";

import { searchFieldStyle } from "business/Styles";
import DropDown from "components/DropDown";
import file from "../assets/files/downloadSample.xlsx";
import ExcelExport from "components/ExcelExport";
import Filters from "components/Filters";

const ImportMenuExcel = lazy(() => import("./sections/ImportMenuExcel"));

let toggleSorting = true;
const dropdownImportExport = [
  {
    label: "Import/Export",
    value: "import_export",
  },
  {
    label: "Import New Items",
    value: "Import New Items",
  },
  {
    label: "Update Existing Item",
    value: "Update Existing Item",
  },
  {
    label: "Export items(.pdf)",
    value: "Export items(.pdf)",
  },
  {
    label: "Export Items (.xlsx)",
    value: "Export Items (.xlsx)",
  },
  {
    label: "Download Sample",
    value: "Download Sample",
  },
];
let countObj = {
  withImages: 0,
  withNoImages: 0,
  available: 0,
  unAvailable: 0,
  availableWithImg: 0,
  unAvailableWithImg: 0,
  availableWithNoImg: 0,
  unAvailableWithNoImg: 0,
  displayNone: 0,
  displayWeb: 0,
  displayPOS: 0,
};
const Items = () => {
  const dispatch = useDispatch(),
    { state } = useContext(ProductsContext);

  // state.itemName = "klklklkl";
  // console.log("ssssssssssssssssstate = ", state);

  const { eatout_id, user_id } = JSON.parse(
    localStorage.getItem("businessInfo")!
  );
  useEffect(() => {
    dispatch(toggleDatePicker(false));
    dispatch(setProductColumn(keysOfItems));
  });

  const { selectedMenu, selectedBranch, selectedCategory, selectedBrand } =
    useSelector((state) => state.dropdown);
  const [items, setItems] = useState<ProductResponse["items"] | []>([]);
  const [applyFilters, setApplyFilters] = React.useState(false);
  const [toggleDrawer, setToggleDrawer] = useState(false);
  const [drawerSkeleton, setDrawerSkeleton] = useState(false);
  const [itemsCount, setItemsCount] = useState(100);
  const [importExportValue, setImportExportValue] =
    useState<string>("import_export");
  const [bulkActionsValue, setBulkActionsValue] =
    useState<string>("bulkActions");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(100);
  const [apiCallFlag, setApiCallFlag] = React.useState("");
  const [sequenceItem, setSequenceItem] = useState([]);
  const [searchQueryItems, setSearchQueryItems] = useState<string>("");
  const [linearLoader, setLinearLoader] = useState<boolean>(false);
  // const { state } = useContext(ProductsContext);
  const [count, setCount] = useState(countObj);
  const [notify, setNotify] = useState<boolean>(false);
  const [notifyMessage, setNotifyMessage] = useState("");
  const [notifyType, setNotifyType] = useState<
    "success" | "info" | "warning" | "error"
  >("info");
  // const [menuItem, setMenuItem] = useState<any>([]);
  //   {
  //   withImages: [],
  //   withNoImages: [],
  //   available: [],
  //   unAvailable: [],
  //   availableWithImg: [],
  //   unAvailableWithImg: [],
  //   availableWithNoImg: [],
  //   unAvailableWithNoImg: [],
  //   displayNone: [],
  //   displayWeb: [],
  //   displayPOS: [],
  // }

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

  // get single item API call (for edit item)
  const [{}, singleItemAPICall] = useAxios(
    {
      method: "get",
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
      // return ungroup items in an array
      // combination of filter and map functions
      state.allItemsForGrouping = productData.items.reduce(
        (items: DropdownValue[], item: ProductResponseItem) => {
          if (!item.is_grouped) {
            items.push({
              value: item.menu_item_id,
              label: item.sku ? item.name + " (" + item.sku + ")" : item.name,
            });
          }
          return items;
        },
        []
      );
    }
  }, [productData]);

  useEffect(() => {
    getProductsAPI();
  }, [page, rowsPerPage]);

  const applyButtonFilter = () => {
    setApiCallFlag("");
    setApplyFilters(true);
  };

  const sortingItems = async () => {
    let sortItems;
    if (toggleSorting) {
      toggleSorting = false;
      sortItems = items?.sort((a: any, b: any) => {
        if (a.name < b.name) return -1;
        if (b.name < a.name) return 1;

        return 0;
      });
    } else {
      toggleSorting = true;
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

  const handleBulkActionsChange = (
    event: SelectChangeEvent<typeof bulkActionsValue>
  ) => {
    const {
      target: { value },
    } = event;

    setBulkActionsValue(value);
  };

  const handleImportExportChange = (
    event: SelectChangeEvent<typeof importExportValue>
  ) => {
    const {
      target: { value },
    } = event;
    if (value == "Download Sample") {
      let link = document.createElement("a");
      link.setAttribute("download", "Menu-Sample.xlsx");
      link.href = file;
      document.body.appendChild(link);
      link.click();
      link.remove();
    }
    setImportExportValue(value);
  };

  // Drag And Drop Shorting
  const shortDragDropItems = async (sortArray: any) => {
    let shortItems: any = reorder(items, sortArray);
    setItems(shortItems);
    const formData = new FormData();
    for (let index = 0; index < shortItems.length; index++) {
      formData.append("categoryArray[]", shortItems[index].menu_item_id);
    }
    const shortItemResponse = await shortItemId({ data: formData });
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

  //xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

  const triggerEditProduct = async (
    itemId: string,
    dispatch: React.Dispatch<Action>
  ) => {
    // alert("triggerEditProduct");
    // open the add/edit item drawer
    handleDrawerToggle();

    // state.itemName = "klklklkl";

    setDrawerSkeleton(true);

    // get single item API call (for edit item)
    const {
      data,
      // data: { items },
    } = await singleItemAPICall({
      url: `/product_details?business_id=${
        getLocalStorage().eatout_id
      }&item_id=${itemId}&admin_id=${getLocalStorage().user_id}&source=biz`,
    });

    if (data) {
      const { items } = data;

      //removed the selected item from available options for product grouping
      const availableProductsToGroup = state.allItemsForGrouping.filter(
        (item: { value: any }) => item.value !== items[0].menu_item_id
      );

      // const optionSets =
      //   items[0].options.length > 0
      //     ? items[0].options.map((option: { id: string; name: string }) => ({
      //         value: option.id,
      //         label: option.name,
      //       }))
      //     : [
      //         {
      //           value: "",
      //           label: "",
      //         },
      //       ];

      // check item can either be grouped or not
      if (items[0].is_grouped === true && items[0].is_parent === false) {
        dispatch({
          type: "editItem",
          payload: { name: "allowItemsGrouping", value: true },
        });
      }

      // filter the selected category
      const selectedCategory = state.allCategories.filter(
        (category: { value: any }) => category.value === items[0].menu_cat_id
      );

      // set value for weight unit dropdown
      const selectedItemWeightUnit = weightUnits.filter(
        (unit) => unit.value === items[0].weight_unit.trim().toLowerCase()
      );

      // setDrawerSkeleton(false);

      // console.log("items[0]", items);

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

            itemName: data.items[0].name,
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

            // itemOptionSets: optionSets,
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

      setDrawerSkeleton(false);

      // console.log("state after dispatch = ", state);
    } else {
      alert("lklklklk");
      setNotifyMessage("Something went wrong");
      setNotifyType("error");
      setNotify(true);
    }
  };

  const closeNotify = () => setNotify(false);

  //xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

  return (
    <ProductsProvider>
      {notify && (
        <Notify
          message={notifyMessage}
          type={notifyType}
          notify={notify}
          closeNotify={closeNotify}
        />
      )}

      {toggleDrawer && (
        <AddEditItem
          toggleDrawer={toggleDrawer}
          drawerSkeleton={drawerSkeleton}
          handleDrawerToggle={handleDrawerToggle}
          getProductApi={getProductsAPI}
        />
      )}

      <Suspense
        fallback={
          <div>
            <Loader />
          </div>
        }
      >
        {(importExportValue === "Import New Items" ||
          importExportValue === "Update Existing Item") && (
          <ImportMenuExcel
            importType={importExportValue}
            setImportExportValue={setImportExportValue}
          />
        )}
      </Suspense>
      {(productLoading || sortLoading) && <Loader />}

      {importExportValue == "Export Items (.xlsx)" && (
        <ExcelExport
          tableData={itemExportColumns}
          listingData={productData.items}
          exportType={"ProductListing"}
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
              <Stack direction={"row"} justifyContent={"center"}>
                <DropDown
                  options={bulkActions}
                  value={bulkActionsValue}
                  handleChange={handleBulkActionsChange}
                  defaultValue="bulkActions"
                  isStaticDropDown={true}
                  sx={{ mr: "11px" }}
                />

                <DropDown
                  options={dropdownImportExport}
                  value={importExportValue}
                  handleChange={handleImportExportChange}
                  defaultValue="import_export"
                  isStaticDropDown={true}
                  sx={{ mr: "11px" }}
                />

                <CustomButton
                  variant={"contained"}
                  color={"secondary"}
                  startIcon={<AddTwoToneIcon />}
                  sx={{ p: "12px 32px" }}
                  onClick={handleDrawerToggle}
                >
                  Add Item
                </CustomButton>
              </Stack>
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
                <Filters
                  items={items}
                  setItems={setItems}
                  productLoading={productLoading}
                  productData={productData}
                />
              </Stack>
            </Grid>
          </Grid>
        </Grid>

        <Grid container>
          {items && (
            <Grid item xs={12}>
              <Typography
                variant="h5"
                sx={{
                  mb: "20px",
                  color: "#212121",
                }}
              >
                {`${items.length} Item(s)`}
              </Typography>
              {bulkActionsValue !== "bulkActions" && (
                <CustomButton
                  onClick={() => setBulkActionsValue("bulkActions")}
                >
                  Cancel
                </CustomButton>
              )}
            </Grid>
          )}
        </Grid>

        <Box sx={{ width: "100%", overflow: "hidden" }}>
          {productData === undefined ? (
            <OrderListingSkeleton />
          ) : (
            <>
              <DraggableTable
                getProductsAPI={getProductsAPI}
                productLoading={productLoading}
                items={items}
                setSequenceItem={setSequenceItem}
                shortDragDropItems={shortDragDropItems}
                triggerEditProduct={triggerEditProduct}
                checkBox={bulkActionsValue !== "bulkActions"}
              />
              <TablePagination
                component="div"
                count={items.length}
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
