import React, { useContext, useEffect, useState } from "react";

import {
  Stack,
  Typography,
  Grid,
  Divider,
  Autocomplete,
  TextField,
  IconButton,
} from "@mui/material";
import { Add } from "@mui/icons-material";

import useAxios from "axios-hooks";
import { debounce } from "lodash";

import TdTextField from "components/TdTextField";
import CustomDrawer from "components/CustomDrawer";
import CustomButton from "components/CustomButton";
import CustomizedSwitch from "components/CustomSwitch";
import DropDownSearch, {
  DropDownListType,
} from "components/customDropDown/DropDownSearch";
import { AddEditProductSkeleton } from "components/skeleton/AddEditProductSkeleton";
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
  drawerSkeleton: boolean;
  handleDrawerToggle: () => void;
  getProductApi: any;
}

const AddEditItem = ({
  toggleDrawer,
  drawerSkeleton,
  handleDrawerToggle,
  getProductApi,
}: AddEditItemProps) => {
  const { richEditor } = useSelector((state) => state.main),
    [addCategoryModal, setAddCategoryModal] = useState(false);
  const { state, dispatch } = useContext(ProductsContext);

  console.log("add edit item state = ", state);

  // option sets & attributes API call payload
  const optionSetsOrAttributesAPIPayload = (categoryId = "") => {
    const formData = new FormData();

    // categoryId to get attributes
    if (categoryId) {
      formData.append("category_id", categoryId);
      formData.append("type", "1");
    }

    formData.append("eatout_id", getLocalStorage().eatout_id);
    formData.append("admin_id", getLocalStorage().user_id);
    formData.append("source", "biz");

    return formData;
  };

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

  // option sets & attributes API call
  const [{}, optionSetsOrAttributesAPICall] = useAxios(
    {
      url: "/get_option_sets",
      method: "POST",
      data: optionSetsOrAttributesAPIPayload(),
    },
    {
      manual: true,
    }
  );

  useEffect(() => {
    (async () => {
      // api call for option sets
      const { data } = await optionSetsOrAttributesAPICall({
        data: optionSetsOrAttributesAPIPayload(),
      });

      // status 1 => getting required response from API
      if (data && data.status === "1" && Array.isArray(data.result)) {
        const optionSets = data.result.map(
          (optionSet: { id: string; name: string }) => ({
            value: optionSet.id,
            label: optionSet.name,
          })
        );
        state.allOptionSets = optionSets.sort(compareItem);
      }

      richEditor && splitShortLongDescription();
    })();
  }, []);

  const handleCategorySelection = async (
    event: React.ChangeEvent<{}>,
    value: any,
    name: string
  ) => {
    dispatch({
      type: "dropDown",
      payload: {
        name: "itemCategory",
        value: value
          ? value
          : {
              value: "",
              label: "",
            },
      },
    });

    // call API for attributes if we have selected a category
    if (value) {
      // api call for attributes
      const { data } = await optionSetsOrAttributesAPICall({
        data: optionSetsOrAttributesAPIPayload(value.value),
      });

      if (data && data.status === "1" && Array.isArray(data.result)) {
        const allAttributes = data.result.map((attribute: any) => ({
          attributeId: attribute.id,
          attributeName: attribute.name,
          attributeValue: { value: "", label: "" },
          attributeOptions: attribute.items.map((option: any) => ({
            value: option.id,
            label: option.name,
          })),
        }));

        dispatch({
          type: "dropDown",
          payload: {
            name: "allAttributes",
            value: allAttributes,
          },
        });
      }
    } else {
      // reset allAttributes array
      dispatch({
        type: "dropDown",
        payload: {
          name: "allAttributes",
          value: [],
        },
      });
    }
  };

  const handleBrandSelection = (
    event: React.ChangeEvent<{}>,
    value: any,
    name: string
  ) => {
    dispatch({
      type: "dropDown",
      payload: {
        name: "itemBrand",
        value: value
          ? value
          : {
              value: "",
              label: "",
            },
      },
    });
  };

  const handleOptionSetsSelection = (
    event: React.ChangeEvent<{}>,
    value: any,
    name: string
  ) => {
    dispatch({
      type: "dropDown",
      payload: {
        name: "itemOptionSets",
        value: value,
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
        value: value,
      },
    });
  };

  const handleAttributesSelection = (value: any, index: number) => {
    dispatch({
      type: "allAttributes",
      payload: {
        name: "allAttributes",
        value: {
          value: value
            ? value
            : {
                value: "",
                label: "",
              },
          index,
        },
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
    }
  }

  const handleSwitchChange = debounce(
    (event: React.ChangeEvent<HTMLInputElement>) => {
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
    },
    300
  );

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

  const handleDrawerClose = () => {
    handleDrawerToggle();

    dispatch({
      type: "clearState",
      payload: {},
    });
  };

  const handleFieldChange = debounce(
    (e: { target: { name: any; value: any } }) => {
      if (e.target.value) {
        dispatch({
          type: "textField",
          payload: { name: e.target.name, value: e.target.value },
        });
      }
    },
    300
  );

  const handleAddEditItem = async () => {
    if (!state.itemCategory.label) {
      dispatch({
        type: "fieldError",
        payload: { name: "fieldError", value: "itemCategory" },
      });

      return;
    } else if (!state.itemName) {
      dispatch({
        type: "fieldError",
        payload: { name: "fieldError", value: "itemName" },
      });

      return;
    } else if (!state.itemPrice) {
      dispatch({
        type: "fieldError",
        payload: { name: "fieldError", value: "itemPrice" },
      });

      return;
    } else if (Number(state.itemMaximumDistance) > canadaPostMaximumDistance) {
      dispatch({
        type: "fieldError",
        payload: { name: "fieldError", value: "itemMaximumDistance" },
      });

      return;
    } else if (Number(state.itemMinimumQuantity) < 1) {
      dispatch({
        type: "fieldError",
        payload: { name: "fieldError", value: "itemMinimumQuantity" },
      });

      return;
    } else if (
      (state.itemDiscountStart ? 1 : 0) ^ (state.itemDiscountExpiry ? 1 : 0)
    ) {
      // this if condition uses XOR gate and throws error if any one date field is empty
      dispatch({
        type: "fieldError",
        payload: {
          name: "fieldError",
          value: state.itemDiscountStart
            ? "itemDiscountExpiry"
            : "itemDiscountStart",
        },
      });

      return;
    } else if (
      !state.itemDiscount &&
      state.itemDiscountStart &&
      state.itemDiscountExpiry
    ) {
      dispatch({
        type: "fieldError",
        payload: {
          name: "fieldError",
          value: "itemDiscount",
        },
      });

      return;
    }

    const addItemPayloadKeys = {
      // item_id for edit item otherwise it is empty string
      item_id: state.editItem.editItemId,
      eatout_id: getLocalStorage().eatout_id,
      category_id: state.itemCategory.value,
      name: toCapitalizeFirstLetter(state.itemName).trim(),
      description: richEditor
        ? addShortLongTags().split('"').join("'").replace(/\n/g, "")
        : state.itemDescription,
      allow_note: state.itemSpecialInstructions,
      special_note: state.itemSpecialNote,
      price: state.itemPrice,
      tax: state.itemTax,
      discount: state.itemDiscount,
      weight: state.itemWeight,
      sku: state.itemSku.trim(),
      product_code: state.itemProductCode.trim(),
      universal_product_code: state.itemUniversalProductCode.trim(),
      unit_price: state.itemUnitPrice,
      carton_size: state.itemCartons,
      carton_price: "", // required in api
      pallet_size: state.itemPallets,
      pallet_price: state.itemPalletPrice,
      brand_id: state.itemBrand.value,
      option_sets: state.itemOptionSets
        ? JSON.stringify(
            state.itemOptionSets.map((option: any) => ({
              id: option.value,
            }))
          )
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
      item_weight_with_unit: `${state.itemWeight}${
        state.itemWeightUnit && state.itemWeightUnit.value
      }`,
      discount_expiry: state.itemDiscountExpiry,
      discount_start_at: state.itemDiscountStart,
      attribute_ids: state.allAttributes
        .map(
          (attribute: { attributeValue: { value: string } }) =>
            attribute.attributeValue.value
        )
        .join(),
      product_group_ids: state.itemToGroup
        .map((item: { value: string }) => item.value)
        .join(),
      max_distance: state.itemMaximumDistance,
      item_cost: state.itemCost,
    };

    await addItemAPICall({
      data: addItemAPIPayload({ items: [addItemPayloadKeys] }),
    });

    handleDrawerToggle();
    getProductApi();

    dispatch({
      type: "clearState",
      payload: {},
    });
  };

  return (
    <>
      {addCategoryModal && (
        <AddCategory
          addCategoryModal={addCategoryModal}
          toggleCategoryModal={toggleCategoryModal}
        />
      )}

      <CustomDrawer
        title={state.editItem.editItemFlag ? "Edit Item" : "Add Item"}
        buttonText={state.editItem.editItemFlag ? "Update" : "Add"}
        anchor="right"
        open={toggleDrawer}
        onClose={handleDrawerClose}
        handleCancelClick={handleDrawerClose}
        onClick={handleAddEditItem}
      >
        <Stack sx={{ p: "32px 25px 0px" }}>
          {drawerSkeleton ? (
            <AddEditProductSkeleton />
          ) : (
            <>
              <Typography variant="h5" sx={{ mb: "24px" }}>
                Item Category
              </Typography>

              <Grid container>
                <Grid item xs={12} sx={{ display: "flex" }}>
                  <DropDownSearch
                    label="Category"
                    value={state.itemCategory}
                    options={state.allCategories}
                    handleChange={handleCategorySelection}
                    isError={state.fieldError === "itemCategory" ? true : false}
                    helperText={"Required*"}
                  />

                  <IconButton
                    onClick={toggleCategoryModal}
                    sx={{
                      background: "#24335E",
                      borderRadius: "8px",
                      height: "48px",
                      width: "48px",
                      ml: "7px",
                      "&:hover": {
                        backgroundColor: "#24335E",
                      },
                    }}
                  >
                    <Add htmlColor="#FFFFFF" fontSize="medium" />
                  </IconButton>
                </Grid>
              </Grid>

              <Divider sx={{ m: "31px 0" }} />

              <Grid container>
                <Grid item xs={12} sx={{ mb: "24px" }}>
                  <TdTextField
                    name="itemName"
                    label="Item Name"
                    defaultValue={state.itemName}
                    error={state.fieldError === "itemName" ? true : false}
                    helperText={"Required*"}
                    onChange={handleFieldChange}
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
                      defaultValue={state.itemPrice}
                      error={state.fieldError === "itemPrice" ? true : false}
                      helperText={"Required*"}
                      onChange={handleFieldChange}
                    />
                  </Grid>
                  <Grid item xs={6} sx={{ ml: "8px" }}>
                    <TdTextField
                      name="itemTax"
                      type="number"
                      label="Tax %"
                      defaultValue={state.itemTax}
                      onChange={handleFieldChange}
                    />
                  </Grid>
                </Grid>
              </Grid>

              <Grid container>
                <Grid item xs={12} sx={{ display: "flex", mb: "24px" }}>
                  <Grid item xs={6}>
                    <DropDownSearch
                      label="Brands"
                      value={state.itemBrand}
                      options={state.allBrands}
                      handleChange={handleBrandSelection}
                    />
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
                  <DropDownSearch
                    label="Items to Group"
                    value={state.itemToGroup}
                    options={state.allItemsForGrouping}
                    handleChange={handleItemsToGroupSelection}
                    isMultiSelect={true}
                    disabled={state.allowItemsGrouping}
                  />
                </Grid>
              </Grid>

              <Grid container>
                <Grid item xs={12} sx={{ display: "flex", mb: "24px" }}>
                  <TdTextField
                    name="itemSpecialNote"
                    defaultValue={state.itemSpecialNote}
                    rows={2}
                    multiline={true}
                    type="text"
                    label="Special Note"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        height: "unset !important",
                      },
                    }}
                    onChange={handleFieldChange}
                  />
                </Grid>
              </Grid>

              {state.allAttributes.length > 0 && (
                <>
                  <Grid item xs={12}>
                    <Typography variant="h5">Attributes</Typography>
                  </Grid>
                  <Grid
                    container
                    spacing={{ xs: 1 }}
                    columns={{ xs: 2 }}
                    sx={{ mb: "24px" }}
                  >
                    {state.allAttributes.map(
                      (attribute: AllAttributesType, index: number) => (
                        <Grid
                          item
                          xs={1}
                          key={index}
                          sx={{
                            p: "24px 0px 0px  8px !important",
                          }}
                        >
                          <DropDownSearch
                            label={attribute.attributeName}
                            value={attribute.attributeValue}
                            options={attribute.attributeOptions}
                            handleChange={(event, value, name) =>
                              handleAttributesSelection(value, index)
                            }
                          />
                        </Grid>
                      )
                    )}
                  </Grid>
                </>
              )}

              <Divider sx={{ mb: "15px" }} />

              <Grid container>
                <Grid item xs={12} sx={{ display: "flex", mb: "15px" }}>
                  {/* 1 and 0 => item not available and available respectively */}
                  <CustomizedSwitch
                    defaultChecked={state.itemAvailability === "0"}
                    // checked={state.itemAvailability === "0"}
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
                    defaultChecked={state.itemSpecialInstructions === "1"}
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
            </>
          )}
        </Stack>
      </CustomDrawer>
    </>
  );
};
export default AddEditItem;
