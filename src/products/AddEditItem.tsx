import React, { useContext, useState } from "react";

import { Switch, Stack, Typography, Grid, Divider } from "@mui/material";

import TdTextField from "components/TdTextField";
import CustomDrawer from "components/CustomDrawer";
import CustomButton from "components/CustomButton";
import CustomizedSwitch from "components/CustomSwitch";
import Display from "./sections/Display";
import Discount from "./sections/Discount";
import Inventory from "./sections/Inventory";
import Nutrition from "./sections/Nutrition";
import Description from "./sections/Description";
import { ProductsContext } from "./context/ProductsContext";

interface AddEditItemProps {
  toggleDrawer: boolean;
  handleDrawerToggle: () => void;
}

const AddEditItem = ({
  toggleDrawer,
  handleDrawerToggle,
}: AddEditItemProps) => {
  const { state, dispatch } = useContext(ProductsContext);

  // const [checked, setChecked] = useState(true);

  // console.log("all categories = ", state.allCategories);
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
            <TdTextField label="Choose Category" />
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
              <TdTextField label="Select Brand" />
            </Grid>
          </Grid>
        </Grid>

        <Grid container>
          <Grid item xs={12} sx={{ display: "flex", mb: "24px" }}>
            <TdTextField label="Select Option Sets" />
          </Grid>
        </Grid>

        <Grid container>
          <Grid item xs={12} sx={{ display: "flex", mb: "24px" }}>
            <TdTextField label="Select Items to Group" />
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
              // onChange={(e) => console.log(e)}
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
