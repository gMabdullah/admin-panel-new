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
import { compareItem, getLocalStorage } from "orders/HelperFunctions";

interface AddEditItemProps {
  toggleDrawer: boolean;
  handleDrawerToggle: () => void;
}

const AddEditItem = ({
  toggleDrawer,
  handleDrawerToggle,
}: AddEditItemProps) => {
  const { state, dispatch } = useContext(ProductsContext);

  const [selected, setSelected] = useState<DropDownListType[]>([]);

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

  console.log("selected dropdown = ", selected);

  useEffect(() => {}, [selected]);

  useEffect(() => {
    // console.log("all option sets = ", allOptionSets);

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
  // console.log("item price = ", state.itemPrice);
  // console.log("item tax = ", state.itemTax);
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

  return (
    <CustomDrawer
      title="Add Item"
      buttonText="Save"
      anchor="right"
      open={toggleDrawer}
      onClose={handleDrawerToggle}
      handleCancelClick={handleDrawerToggle}
      onClick={handleDrawerToggle}
    >
      <Stack sx={{ p: "32px 25px 0px" }}>
        <Typography variant="h5" sx={{ mb: "24px" }}>
          Item Category
        </Typography>

        <Grid container>
          <Grid item xs={12} sx={{ display: "flex", mb: "12px" }}>
            {/* <TdTextField label="Choose Category" /> */}
            <DropDownSearch
              dropDownList={state.allCategories}
              onChange={setSelected}
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
                dropDownList={state.allBrands}
                onChange={setSelected}
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid container>
          <Grid item xs={12} sx={{ display: "flex", mb: "24px" }}>
            {/* <TdTextField label="Select Option Sets" /> */}
            <DropDownSearch
              dropDownList={state.allOptionSets}
              onChange={setSelected}
              isMultiSelect={true}
            />
          </Grid>
        </Grid>

        <Grid container>
          <Grid item xs={12} sx={{ display: "flex", mb: "24px" }}>
            {/* <TdTextField label="Select Items to Group" /> */}
            <DropDownSearch
              dropDownList={state.allItemsForGrouping}
              onChange={setSelected}
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
