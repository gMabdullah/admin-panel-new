import { SyntheticEvent, useState } from "react";

import { Stack, Typography, Grid, Divider } from "@mui/material";

import TdTextField from "components/TdTextField";
import CustomDrawer from "components/CustomDrawer";
import CustomButton from "components/CustomButton";
import CustomizedSwitch from "components/CustomSwitch";
import DisplaySection from "./DisplaySection";
import DiscountSection from "./DiscountSection";
import InventorySection from "./InventorySection";
import NutritionSection from "./NutritionSection";
interface drawerPropsType {
  toggleDrawer:boolean,
  handleDrawerToggle: () => void
}
const MenuItemDrawer = ({toggleDrawer,handleDrawerToggle}:drawerPropsType) => {
  
  return (
    <CustomDrawer
      title="Add Item"
      buttonText="Save"
      anchor="right"
      open={toggleDrawer}
      onClose={handleDrawerToggle}
    >
      <Stack sx={{ p: "32px 25px 0px" }}>
        <Typography variant="h5" sx={{ mb: "24px" }}>
          Item Category
        </Typography>

        <Grid container>
          <Grid item xs={12} sx={{ display: "flex", mb: "12px" }}>
            {/* <Grid item xs={6}> */}
            <TdTextField
              // required={true}
              // value={itemQuantity}
              // type="number"
              label="Choose Category"
              // onChange={handleQuantityChange}
              // error={fieldError.quantityField === "" ? false : true}
              // helperText={fieldError.quantityField}
            />
            {/* </Grid> */}
          </Grid>
        </Grid>

        <Grid container>
          <Grid item xs={12}>
            <CustomButton
              sx={{
                // ml: "25px",
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
            {/* <Grid item xs={6}> */}
            <TdTextField
              // required={true}
              // value={itemQuantity}
              // type="number"
              label="Item Name"
              // onChange={handleQuantityChange}
              // error={fieldError.quantityField === "" ? false : true}
              // helperText={fieldError.quantityField}
            />
            {/* </Grid> */}
          </Grid>
        </Grid>

        <Grid container>
          <Grid item xs={12} sx={{ display: "flex", mb: "24px" }}>
            <Grid item xs={6}>
              <TdTextField
                // required={true}
                // value={itemQuantity}
                type="number"
                label="Item Price(PKR)"
                // sx={{ width: "100%" }}
                // onChange={handleQuantityChange}
                // error={fieldError.quantityField === "" ? false : true}
                // helperText={fieldError.quantityField}
              />
            </Grid>
            <Grid item xs={6} sx={{ ml: "8px" }}>
              <TdTextField
                // required={true}
                // value={itemQuantity}
                type="number"
                label="Tax %"
                // sx={{ width: "100%" }}
                // onChange={handleQuantityChange}
                // error={fieldError.quantityField === "" ? false : true}
                // helperText={fieldError.quantityField}
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid container>
          <Grid item xs={12} sx={{ display: "flex", mb: "24px" }}>
            <Grid item xs={6}>
              <TdTextField
                // required={true}
                // value={itemQuantity}
                // type="number"
                label="Select Brand"
                // onChange={handleQuantityChange}
                // error={fieldError.quantityField === "" ? false : true}
                // helperText={fieldError.quantityField}
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid container>
          <Grid item xs={12} sx={{ display: "flex", mb: "24px" }}>
            {/* <Grid item xs={6}> */}
            <TdTextField
              // required={true}
              // value={itemQuantity}
              // type="number"
              label="Select Option Sets"
              // onChange={handleQuantityChange}
              // error={fieldError.quantityField === "" ? false : true}
              // helperText={fieldError.quantityField}
            />
            {/* </Grid> */}
          </Grid>
        </Grid>

        <Grid container>
          <Grid item xs={12} sx={{ display: "flex", mb: "24px" }}>
            {/* <Grid item xs={6}> */}
            <TdTextField
              // required={true}
              // value={itemQuantity}
              // type="number"
              label="Select Items to Group"
              // onChange={handleQuantityChange}
              // error={fieldError.quantityField === "" ? false : true}
              // helperText={fieldError.quantityField}
            />
            {/* </Grid> */}
          </Grid>
        </Grid>

        <Grid container>
          <Grid item xs={12} sx={{ display: "flex", mb: "24px" }}>
            {/* <Grid item xs={6}> */}
            <TdTextField
              // required={true}
              // value={itemQuantity}
              type="text"
              label="Description"
              // onChange={handleQuantityChange}
              // error={fieldError.quantityField === "" ? false : true}
              // helperText={fieldError.quantityField}
            />
            {/* </Grid> */}
          </Grid>
        </Grid>

        <Grid container>
          <Grid item xs={12} sx={{ display: "flex", mb: "24px" }}>
            {/* <Grid item xs={6}> */}
            <TdTextField
              // required={true}
              // value={itemQuantity}
              type="text"
              label="Special Note"
              // onChange={handleQuantityChange}
              // error={fieldError.quantityField === "" ? false : true}
              // helperText={fieldError.quantityField}
            />
            {/* </Grid> */}
          </Grid>
        </Grid>

        <Divider sx={{ mb: "15px" }} />

        <Grid container>
          <Grid item xs={12} sx={{ display: "flex", mb: "15px" }}>
            <CustomizedSwitch
              label="Availability"
              sx={{
                "& .MuiFormControlLabel-root": {
                  mr: "28px",
                  ml: "-6px",
                },
              }}
            />
            <CustomizedSwitch label="Special Instructions" />
          </Grid>
        </Grid>

        <Divider sx={{ mb: "24px" }} />
        <DisplaySection />
        <Divider sx={{ mt: "16px" }} />
        <DiscountSection />
        <Divider />
        <InventorySection />
        <Divider />
        <NutritionSection />
      </Stack>
    </CustomDrawer>
  );
};

export default MenuItemDrawer;
