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
import CustomModal from "components/CustomModal";
import Display from "./sections/Display";
import Discount from "./sections/Discount";
import Inventory from "./sections/Inventory";
import Nutrition from "./sections/Nutrition";
import AddCategory from "./AddCategory";
import Description from "./sections/Description";
import { ProductsContext } from "./context/ProductsContext";
import {
  compareItem,
  getLocalStorage,
  toCapitalizeFirstLetter,
} from "orders/HelperFunctions";
import { canadaPostMaximumDistance } from "../constants";
import { useSelector } from "store";

interface AddEditItemProps {
  toggleDrawer: boolean;
  handleDrawerToggle: () => void;
  getProductApi: any;
}

const AddEditItem = ({
  toggleDrawer,
  handleDrawerToggle,
  getProductApi,
}: AddEditItemProps) => {
  const { richEditor } = useSelector((state) => state.main),
    [addCategoryModal, setAddCategoryModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<DropDownListType[]>(
    []
  );
  const { state, dispatch } = useContext(ProductsContext);

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
  const [{ data: allOptionSets }, optionSetsAPICall] = useAxios({
    url: "/get_option_sets",
    method: "POST",
    data: optionSetsAPIPayload(),
  });

  useEffect(() => {
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
  }, [allOptionSets]);

  useEffect(() => {
    richEditor && splitShortLongDescription();
  }, []);

  const handleCategorySelection = (
    event: React.ChangeEvent<{}>,
    value: any,
    name: string
  ) => {
    dispatch({
      type: "dropDown",
      payload: {
        name: "itemCategoryId",
        value: value.value,
      },
    });
  };

  const handleBrandSelection = (
    event: React.ChangeEvent<{}>,
    value: any,
    name: string
  ) => {
    dispatch({
      type: "dropDown",
      payload: {
        name: "itemBrandId",
        value: value.value,
      },
    });
  };

  const handleOptionSetsSelection = (
    event: React.ChangeEvent<{}>,
    value: any,
    name: string
  ) => {
    console.log("dropdown event = ", event);

    dispatch({
      type: "dropDown",
      payload: {
        name: "itemOptionSets",
        value: value,
        // value: value.map((option: any) => ({
        //   id: option.value,
        // })),
      },
    });
  };

  const handleItemsToGroupSelection = (
    event: React.ChangeEvent<{}>,
    value: any,
    name: string
  ) => {
    dispatch({
      type: "dropDown",
      payload: {
        name: "itemToGroup",
        value: value
          .map((item: { value: string }) => {
            return item.value;
          })
          .join(),
      },
    });
  };

  const toggleCategoryModal = () => {
    setAddCategoryModal((prevState) => !prevState);
  };

  // Populate values of description in Edit Item case
  function splitShortLongDescription() {
    const { itemDescription } = state;
    // check for short description tag exist
    if (itemDescription && itemDescription.includes("<short_desc>")) {
      const shortDesc = itemDescription.slice(
        itemDescription.indexOf("<short_desc>"),
        itemDescription.indexOf("</short_desc>")
      );
      // setShortDescription(shortDesc);

      // update description state of editor
      dispatch({
        type: "editor",
        payload: { name: "itemShortDescription", value: shortDesc },
      });
    }
    // check if long description tag exist
    if (itemDescription && itemDescription.includes("<long_desc>")) {
      const longDesc = itemDescription.slice(
        itemDescription.indexOf("<long_desc>"),
        itemDescription.indexOf("</long_desc>")
      );
      // setLongDescription(longDesc);

      // update description state of editor
      dispatch({
        type: "editor",
        payload: { name: "itemLongDescription", value: longDesc },
      });
    }
    // if short and long description doesn't exist
    if (
      itemDescription &&
      !itemDescription.includes("<short_desc>") &&
      !itemDescription.includes("<long_desc>")
    ) {
      // update description state of editor
      dispatch({
        type: "editor",
        payload: { name: "itemLongDescription", value: itemDescription },
      });

      // setLongDescription(itemDescription);
      alert("item description in case of no short long tags");
    }
  }

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

  const addShortLongTags = () => {
    const checkShortDesc =
        state.itemShortDescription &&
        `<short_desc>${state.itemShortDescription}</short_desc>`.toString(),
      checkLongDesc =
        state.itemLongDescription &&
        `<long_desc>${state.itemLongDescription}</long_desc>`.toString(),
      combineIt = `${checkShortDesc}${checkLongDesc}`;
    return combineIt.replace(/\n|\t/g, " ");
  };

  const addItemCallback = async () => {
    if (!state.itemName) {
      dispatch({
        type: "fieldError",
        payload: { name: "itemNameField" },
      });

      return;
    }

    // if (canadaPostMaximumDistance) {
    // }

    //========================================================================================

    // if (selectedCategory === null) {
    //   this.setState({ selectedCategoryError: "Category can't be empty" });
    //   return false;
    // } else if (itemName === "") {
    //   this.setState({ itemNameError: "Item Name can't be empty" });
    //   return false;
    // } else if (itemPrice === "") {
    //   this.setState({ itemPriceError: "Item Price can't be empty" });
    //   return false;
    // } else if (!/^\d+(\.\d{1,2})?$/.test(itemPrice)) {
    //   this.setState({
    //     itemPriceError: "Invalid Item Price Should be (xx.xx)",
    //   });
    //   return false;
    // } else if (maxDistance >= maximumCandaPostDistance) {
    //   this.setState({
    //     maxDistanceError: "Maximum Distance is out of the range",
    //   });
    //   return false;
    // } else if ((discountStart ? 1 : 0) ^ (discountExpiry ? 1 : 0)) {
    //   this.setState({ discountDatesError: "Discount Dates are Must" });
    //   return false;
    // }

    // return true;

    //========================================================================================

    const addItemPayloadKeys = {
      item_id: "",
      eatout_id: getLocalStorage().eatout_id,
      category_id: state.itemCategoryId,
      name: toCapitalizeFirstLetter(state.itemName).trim(),
      description: richEditor
        ? addShortLongTags().split('"').join("'").replace(/\n/g, "")
        : state.itemDescription,
      allow_note: state.itemSpecialInstructions,
      special_note: state.itemSpecialNote,
      price: state.itemPrice,
      tax: state.itemTax,
      tags_ids: "",
      discount: state.itemDiscount,
      weight: state.itemWeight,
      sku: state.itemSku.trim(),
      product_code: state.itemProductCode.trim(),
      universal_product_code: state.itemUniversalProductCode.trim(),
      unit_price: state.itemUnitPrice,
      carton_size: "", // required in api
      carton_price: "", // required in api
      pallet_size: "", // required in api
      pallet_price: state.itemPalletPrice,
      brand_id: state.itemBrandId,
      option_sets: state.itemOptionSets
        ? JSON.stringify(state.itemOptionSets)
        : JSON.stringify([]),
      nutritions: state.itemNutritions
        ? JSON.stringify(state.itemNutritions)
        : "",
      suggestions: "", // required in api
      branches: "", // required in api
      status: state.itemAvailability,
      display_source: state.itemDisplay,
      order_limit: "",
      inv_limit: "",
      price_per: state.itemPricePer,
      min_qty: state.itemMinimumQuantity,
      images: "", // required in api
      item_weight_with_unit:
        `${state.itemWeight}${state.itemWeightUnit}`.trim(),
      discount_expiry: state.itemDiscountExpiry,
      discount_start_at: state.itemDiscountStart,
      attribute_ids: "",
      product_group_ids: state.itemToGroup,
      max_distance: state.itemMaximumDistance,
      item_cost: state.itemCost,
    };

    await addItemAPICall({
      data: addItemAPIPayload({ items: [addItemPayloadKeys] }),
    });

    handleDrawerToggle();
    getProductApi();
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
      {addCategoryModal && (
        <CustomModal
          title="Add Category"
          buttonText="Add Category"
          open={addCategoryModal}
          onClose={toggleCategoryModal}
          children={<AddCategory toggleCategoryModal={toggleCategoryModal} />}
          paperStyle={{
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "45vw",
            position: "absolute",
          }}
          scrollbarStyle={{
            height: "100%",
            maxHeight: "98vh",
            overflowX: "hidden",
            borderRadius: "8px",
          }}
        />
      )}

      <Stack sx={{ p: "32px 25px 0px" }}>
        <Typography variant="h5" sx={{ mb: "24px" }}>
          Item Category
        </Typography>

        <Grid container>
          <Grid item xs={12} sx={{ display: "flex", mb: "12px" }}>
            {/* <DropDownSearch
              label="Category"
              options={state.allCategories}
              // onChange={setSelectedCategory}
              handleChange={handleCategorySelection}
            /> */}
          </Grid>
        </Grid>

        <Grid container>
          <Grid item xs={12}>
            <CustomButton
              onClick={toggleCategoryModal}
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
              value={state.itemName}
              error={state.fieldError.itemNameField === "" ? false : true}
              helperText={state.fieldError.itemNameField}
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
                value={state.itemPrice}
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
                value={state.itemTax}
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
              {/* <DropDownSearch
                label="Brands"
                value={{ label: "Pound (lb)", value: "lb" }}
                options={state.allBrands}
                handleChange={handleBrandSelection}
              /> */}
            </Grid>
          </Grid>
        </Grid>

        <Grid container>
          <Grid item xs={12} sx={{ display: "flex", mb: "24px" }}>
            <DropDownSearch
              label="Option Sets"
              value={state.itemOptionSets}
              options={state.allOptionSets}
              handleChange={handleOptionSetsSelection}
              isMultiSelect={true}
            />
          </Grid>
        </Grid>

        <Grid container>
          <Grid item xs={12} sx={{ display: "flex", mb: "24px" }}>
            {/* <DropDownSearch
              label="Items to Group"
              options={state.allItemsForGrouping}
              // onChange={setSelectedGroupedItem}
              handleChange={handleItemsToGroupSelection}
              isMultiSelect={true}
            /> */}
          </Grid>
        </Grid>

        <Grid container>
          <Grid item xs={12} sx={{ display: "flex", mb: "24px" }}>
            <TdTextField
              name="itemSpecialNote"
              value={state.itemSpecialNote}
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
