import React, { useContext, useEffect, useState } from "react";

import { Stack, Typography, Grid, Divider } from "@mui/material";

import useAxios from "axios-hooks";

import TdTextField from "components/TdTextField";
import CustomDrawer from "components/CustomDrawer";
import CustomButton from "components/CustomButton";
import CustomizedSwitch from "components/CustomSwitch";
import DropDownSearch, {
  DropDownListType,
} from "components/customDropDown/DropDownSearch";
import Display from "./sections/Display";
import Discount from "./sections/Discount";
import Inventory from "./sections/Inventory";
import Nutrition from "./sections/Nutrition";
import Description from "./sections/Description";
import { ProductsContext } from "./context/ProductsContext";
import {
  compareItem,
  getLocalStorage,
  toCapitalizeFirstLetter,
} from "orders/HelperFunctions";

interface AddEditItemProps {
  toggleDrawer: boolean;
  handleDrawerToggle: () => void;
  getProductApi: any;
  // addItemCallback: () => void;
}

const AddEditItem = ({
  toggleDrawer,
  handleDrawerToggle,
  getProductApi,
}: // addItemCallback,
AddEditItemProps) => {
  const { state, dispatch } = useContext(ProductsContext);

  const [selectedCategory, setSelectedCategory] = useState<DropDownListType[]>(
    []
  );
  const [selectedBrand, setSelectedBrand] = useState<DropDownListType[]>([]);
  const [selectedOptionSet, setSelectedOptionSet] = useState<
    DropDownListType[]
  >([]);
  const [selectedGroupedItem, setSelectedGroupedItem] = useState<
    DropDownListType[]
  >([]);

  // add item API call payload
  const addItemAPIPayload = (item: any) => {
    const formData = new FormData();

    formData.append("menu_items", JSON.stringify(item));
    formData.append("eatout_id", getLocalStorage().eatout_id);
    formData.append("admin_id", getLocalStorage().user_id);
    formData.append("source", "biz");
    return formData;
  };

  // add item API call
  const [{}, addItemAPICall] = useAxios(
    {
      url: "/add_menu_item_new",
      method: "POST",
      // data: addItemAPIPayload(),
    },
    { manual: true }
  );

  // option sets API call payload
  const optionSetsAPIPayload = () => {
    const formData = new FormData();

    formData.append("eatout_id", getLocalStorage().eatout_id);
    formData.append("admin_id", getLocalStorage().user_id);
    formData.append("source", "biz");
    return formData;
  };

  // option sets API call
  const [{ data: allOptionSets }, optionSetsAPICall] = useAxios(
    {
      url: "/get_option_sets",
      method: "POST",
      data: optionSetsAPIPayload(),
    }
    // { manual: true }
  );

  // console.log("selected dropdown = ", selectedCategory);
  // console.log("selected selectedBrand = ", selectedBrand);
  // console.log("selected selectedOptionSet = ", selectedOptionSet);
  // console.log("selected selectedGroupedItem = ", selectedGroupedItem);

  // useEffect(() => {
  //   if (!Array.isArray(selectedCategory)) {
  //     dispatch({
  //       type: "dropDown",
  //       payload: { name: "itemCategoryId", value: selectedCategory.value },
  //     });
  //     console.log(
  //       "ccccccccccccccccccccccccccccccccccccccccccc = ",
  //       state.itemCategoryId
  //     );
  //   }
  // }, [selectedCategory]);
  // useEffect(() => {}, [selectedBrand]);
  // useEffect(() => {}, [selectedOptionSet]);
  // useEffect(() => {}, [selectedGroupedItem]);

  useEffect(() => {
    // console.log("all option sets = ", allOptionSets);

    // status 1 => getting required response from API
    if (
      allOptionSets &&
      allOptionSets.status === "1" &&
      Array.isArray(allOptionSets.result)
    ) {
      const optionSets = allOptionSets.result.map(
        (optionSet: { id: string; name: string }) => ({
          value: optionSet.id,
          label: optionSet.name,
        })
      );

      state.allOptionSets = optionSets.sort(compareItem);
    }

    // console.log("all  state .option sets = ", state.allOptionSets);

    // state.allOptionSets
  }, [allOptionSets]);

  // const [checked, setChecked] = useState(true);

  // console.log("all categories = ", state.allCategories);
  // console.log("all brands = ", state.allBrands);
  // console.log("all group items = ", state.allItemsForGrouping);
  // console.log("all option sets = ", state.allOptionSets);

  // console.log("item Name = ", state.itemName);
  console.log("item price = ", state.itemPrice);
  console.log("item tax = ", state.itemTax);
  // console.log("item Special Note = ", state.itemSpecialNote);
  // console.log("item availability = ", state.itemAvailability);
  // console.log("item Special instructions = ", state.itemSpecialInstructions);

  const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.name === "itemSpecialInstructions") {
      dispatch({
        type: "switchComponent",
        payload: {
          name: event.target.name,
          value: event.target.checked ? "1" : "0",
        },
      });
    }
    if (event.target.name === "itemAvailability") {
      dispatch({
        type: "switchComponent",
        payload: {
          name: event.target.name,
          value: event.target.checked ? "0" : "1",
        },
      });
    }
  };

  const addItemCallback = async () => {
    //===============================================================================================================================

    // callApiToAddMenuItem = () => {
    // let attributeIDsString = "";
    // let menuItemIDsString = "";
    // const { selectedMenuItem, selectedImagesId } = this.props;
    // const {
    //   selectedBrands,
    //   selectedCategory,
    //   itemName,
    //   itemDescription,
    //   isSpecialNote,
    //   specialNote,
    //   itemPrice,
    //   itemTax,
    //   itemDiscount,
    //   itemWeight,
    //   itemSku,
    //   itemProductCode,
    //   itemUniversalProductCode,
    //   unitPriceItem,
    //   itemCarton,
    //   itemCartonPrice,
    //   itemPallet,
    //   itemPalletPrice,
    //   isItemAvailable,
    //   isItemDisplay,
    //   orderLimit,
    //   inventoryLimit,
    //   pricePer,
    //   WeightUnit,
    //   discountStart,
    //   discountExpiry,
    //   minimumOrderQuantity,
    //   attributeArray,
    //   maxDistance,
    // } = this.state;

    //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    // const eatout_id = localStorage.getItem("eatout_id");
    // const brandId = selectedBrands !== null ? selectedBrands.value : "";
    // //this check only will execute when product have attributes
    // attributeIDsString =
    //   attributeArray && attributeArray.filter((n) => n).join();

    // const menuItems =
    //   this.getProductsForGrouping() !== "" ? this.getProductsForGrouping() : [];
    // menuItemIDsString = menuItems.join();

    // const optionSets =
    //   this.getOptionSets() !== ""
    //     ? JSON.stringify(this.getOptionSets())
    //     : JSON.stringify([]);
    // const filterTags = this.getFilterTag() !== "" ? this.getFilterTag() : [];

    // const suggestions =
    //   this.getSuggestions() !== "" ? JSON.stringify(this.getSuggestions()) : "";
    // const nutritions =
    //   this.getNutritions() !== "" ? JSON.stringify(this.getNutritions()) : "";
    // const branches =
    //   this.getBranchesId() !== "" ? JSON.stringify(this.getBranchesId()) : "";

    console.log("state = ", state);

    const addItemPayloadKeys = {
      item_id: "",
      eatout_id: getLocalStorage().eatout_id,
      category_id: "13420",
      name: toCapitalizeFirstLetter(state.itemName).trim(),
      description: state.itemDescription,
      allow_note: state.itemSpecialInstructions,
      special_note: state.itemSpecialNote,
      price: state.itemPrice,
      tax: state.itemTax,
      tags_ids: "",
      discount: "0", // required in api
      weight: state.itemWeight,
      sku: state.itemSku.trim(),
      product_code: state.itemProductCode.trim(),
      universal_product_code: state.itemUniversalProductCode.trim(),
      unit_price: state.itemUnitPrice,
      carton_size: "", // required in api
      carton_price: "", // required in api
      pallet_size: "", // required in api
      pallet_price: state.itemPalletPrice,
      brand_id: "",
      option_sets: "[]",
      nutritions: state.itemNutritions,
      suggestions: "", // required in api
      branches: "", // required in api
      status: state.itemAvailability,
      display_source: state.itemDisplay,
      order_limit: "",
      inv_limit: "",
      price_per: state.itemPricePer,
      min_qty: state.itemMinimumQuantity,
      images: "", // required in api
      item_weight_with_unit: "",
      // item_weight_with_unit: `${itemWeight} ${
      //   Object.keys(WeightUnit).length > 0 ? WeightUnit.value : ""
      // }`.trim(),
      discount_expiry: "",
      discount_start_at: "",
      attribute_ids: "",
      product_group_ids: "",
      max_distance: "0",
      // max_distance: maxDistance ? maxDistance : "0",
    };
    // const addItemPayloadKeys = {
    //   item_id: "",
    //   eatout_id: "12092",
    //   category_id: "13420",
    //   name: "Add item test",
    //   description: "",
    //   allow_note: "0",
    //   special_note: "",
    //   price: "9999",
    //   tax: "2",
    //   tags_ids: "",
    //   discount: "", // required in api
    //   weight: "",
    //   sku: "",
    //   product_code: "",
    //   universal_product_code: "",
    //   unit_price: "",
    //   carton_size: "", // required in api
    //   carton_price: "",
    //   pallet_size: "", // required in api
    //   pallet_price: "",
    //   brand_id: "",
    //   option_sets: "[]",
    //   nutritions: "",
    //   suggestions: "", // required in api
    //   branches: "", // required in api
    //   status: "0",
    //   display_source: "0",
    //   order_limit: "",
    //   inv_limit: "",
    //   price_per: "",
    //   min_qty: "",
    //   images: "", // required in api
    //   item_weight_with_unit: "",
    //   // item_weight_with_unit: `${itemWeight} ${
    //   //   Object.keys(WeightUnit).length > 0 ? WeightUnit.value : ""
    //   // }`.trim(),
    //   discount_expiry: "",
    //   discount_start_at: "",
    //   attribute_ids: "",
    //   product_group_ids: "",
    //   max_distance: "0",
    //   // max_distance: maxDistance ? maxDistance : "0",
    // };

    await addItemAPICall({
      data: addItemAPIPayload({ items: [addItemPayloadKeys] }),
    });

    console.log("add Item Payload Keys = ", addItemPayloadKeys);

    // let jsonParamArr = [];
    // jsonParamArr.push(addItemPayloadKeys);
    // const jsonObj = {
    //   items: jsonParamArr,
    // };
    // var formData = {
    //   url: "",
    //   body: {
    //     menu_items: JSON.stringify(jsonObj),
    //   },
    // };

    // formData = ObjToFormData(formData);
    // const api = new YourRestApi();
    // this.setState({ isLoadingAddMenuItem: true });
    // api
    //   .addMenuItemNew(formData)
    //   .then((response) => this.apiResponseAddMenuItemNew(response)) // Successfull responce
    //   .catch((err) => this.apiError(err)); // Catch any error
    // // };

    //===============================================================================================================================

    // close the drawer
    // setToggleDrawer((state) => !state);
    getProductApi();
    handleDrawerToggle();
  };

  return (
    <CustomDrawer
      title="Add Item"
      buttonText="Save"
      anchor="right"
      open={toggleDrawer}
      onClose={handleDrawerToggle}
      handleCancelClick={handleDrawerToggle}
      onClick={addItemCallback}
    >
      <Stack sx={{ p: "32px 25px 0px" }}>
        <Typography variant="h5" sx={{ mb: "24px" }}>
          Item Category
        </Typography>

        <Grid container>
          <Grid item xs={12} sx={{ display: "flex", mb: "12px" }}>
            {/* <TdTextField label="Choose Category" /> */}
            <DropDownSearch
              label="Category"
              dropDownList={state.allCategories}
              onChange={setSelectedCategory}
            />
          </Grid>
        </Grid>

        <Grid container>
          <Grid item xs={12}>
            <CustomButton
              sx={{
                p: "unset",
                color: "#DB154D",
                fontSize: "13px",
                lineHeight: "unset",
              }}
            >
              Add New Category
            </CustomButton>
          </Grid>
        </Grid>

        <Divider sx={{ m: "24px 0 31px" }} />

        <Grid container>
          <Grid item xs={12} sx={{ mb: "24px" }}>
            <TdTextField
              name="itemName"
              label="Item Name"
              onChange={(e) =>
                dispatch({
                  type: "textField",
                  payload: { name: e.target.name, value: e.target.value },
                })
              }
            />
          </Grid>
        </Grid>

        <Grid container>
          <Grid item xs={12} sx={{ display: "flex", mb: "24px" }}>
            <Grid item xs={6}>
              <TdTextField
                name="itemPrice"
                type="number"
                label="Item Price"
                onChange={(e) =>
                  dispatch({
                    type: "textField",
                    payload: { name: e.target.name, value: e.target.value },
                  })
                }
              />
            </Grid>
            <Grid item xs={6} sx={{ ml: "8px" }}>
              <TdTextField
                name="itemTax"
                type="number"
                label="Tax %"
                onChange={(e) =>
                  dispatch({
                    type: "textField",
                    payload: { name: e.target.name, value: e.target.value },
                  })
                }
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid container>
          <Grid item xs={12} sx={{ display: "flex", mb: "24px" }}>
            <Grid item xs={6}>
              {/* <TdTextField label="Select Brand" /> */}
              <DropDownSearch
                label="Brands"
                dropDownList={state.allBrands}
                onChange={setSelectedBrand}
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid container>
          <Grid item xs={12} sx={{ display: "flex", mb: "24px" }}>
            {/* <TdTextField label="Select Option Sets" /> */}
            <DropDownSearch
              label="Option Sets"
              dropDownList={state.allOptionSets}
              onChange={setSelectedOptionSet}
              isMultiSelect={true}
            />
          </Grid>
        </Grid>

        <Grid container>
          <Grid item xs={12} sx={{ display: "flex", mb: "24px" }}>
            {/* <TdTextField label="Select Items to Group" /> */}
            <DropDownSearch
              label="Items to Group"
              dropDownList={state.allItemsForGrouping}
              onChange={setSelectedGroupedItem}
              isMultiSelect={true}
            />
          </Grid>
        </Grid>

        <Grid container>
          <Grid item xs={12} sx={{ display: "flex", mb: "24px" }}>
            <TdTextField
              name="itemSpecialNote"
              rows={2}
              multiline={true}
              type="text"
              label="Special Note"
              onChange={(e) =>
                dispatch({
                  type: "textField",
                  payload: { name: e.target.name, value: e.target.value },
                })
              }
            />
          </Grid>
        </Grid>

        <Divider sx={{ mb: "15px" }} />

        <Grid container>
          <Grid item xs={12} sx={{ display: "flex", mb: "15px" }}>
            {/* 1 and 0 => item not available and available respectively */}
            <CustomizedSwitch
              checked={state.itemAvailability === "0"}
              // value={state.itemAvailability}
              name="itemAvailability"
              label="Availability"
              sx={{
                "& .MuiFormControlLabel-root": {
                  mr: "28px",
                  ml: "-6px",
                },
              }}
              onChange={handleSwitchChange}
            />
            {/* 1 and 0 => allow and don't allow special instruction respectively */}
            <CustomizedSwitch
              checked={state.itemSpecialInstructions === "1"}
              // value={state.itemSpecialInstructions}
              name="itemSpecialInstructions"
              label="Special Instructions"
              onChange={handleSwitchChange}
            />
          </Grid>
        </Grid>

        <Divider sx={{ mb: "24px" }} />
        <Display />
        <Divider sx={{ mt: "16px" }} />
        <Discount />
        <Divider />
        <Description />
        <Divider />
        <Inventory />
        <Divider />
        <Nutrition />
      </Stack>
    </CustomDrawer>
  );
};

export default AddEditItem;
