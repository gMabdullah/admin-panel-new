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
import AddCategory from "./AddCategory";
import Description from "./sections/Description";
import { ProductsContext } from "./context/ProductsContext";
import {
  compareItem,
  getLocalStorage,
  toCapitalizeFirstLetter,
} from "orders/HelperFunctions";
import CustomModal from "components/CustomModal";
import { useSelector } from "store";
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
  const { richEditor } = useSelector((state) => state.main),
    [shortDescription, setShortDescription] = useState(""),
    [longDescription, setLongDescription] = useState(""),
    [addCategoryModal, setAddCategoryModal] = useState(false);
  const toggleCategoryModal = () => {
    setAddCategoryModal((prevState) => !prevState);
  };
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
  // Populate values of description in Edit Item case
  function splitShortLongDescription() {
    const { itemDescription } = state;
    // check for short description tag exist
    if (itemDescription && itemDescription.includes("<short_desc>")) {
      const shortDesc = itemDescription.slice(
        itemDescription.indexOf("<short_desc>"),
        itemDescription.indexOf("</short_desc>")
      );
      setShortDescription(shortDesc);
    }
    // check if long description tag exist
    if (itemDescription && itemDescription.includes("<long_desc>")) {
      const longDesc = itemDescription.slice(
        itemDescription.indexOf("<long_desc>"),
        itemDescription.indexOf("</long_desc>")
      );
      setLongDescription(longDesc);
    }
    // if short and long description doesn't exist
    if (
      itemDescription &&
      !itemDescription.includes("<short_desc>") &&
      !itemDescription.includes("<long_desc>")
    ) {
      setLongDescription(itemDescription);
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
        shortDescription &&
        `<short_desc>${shortDescription}</short_desc>`.toString(),
      checkLongDesc =
        longDescription &&
        `<long_desc>${longDescription}</long_desc>`.toString(),
      combineIt = `${checkShortDesc}${checkLongDesc}`;
    return combineIt.replace(/\n|\t/g, " ");
  };
  const addItemCallback = async () => {
    const addItemPayloadKeys = {
      item_id: "",
      eatout_id: getLocalStorage().eatout_id,
      category_id: "13420",
      name: toCapitalizeFirstLetter(state.itemName).trim(),
      description: richEditor
        ? addShortLongTags().split('"').join("'").replace(/\n/g, "")
        : state.itemDescription,
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

    await addItemAPICall({
      data: addItemAPIPayload({ items: [addItemPayloadKeys] }),
    });
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
        <Description
          shortDescription={shortDescription}
          longDescription={longDescription}
          setShortDescription={setShortDescription}
          setLongDescription={setLongDescription}
        />
        <Divider />
        <Inventory />
        <Divider />
        <Nutrition />
      </Stack>
    </CustomDrawer>
  );
};
export default AddEditItem;
