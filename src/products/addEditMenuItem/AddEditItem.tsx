import { useState } from "react";

import { Stack, Typography, Grid, Divider } from "@mui/material";

import TdTextField from "components/TdTextField";
import CustomDrawer from "components/CustomDrawer";
import CustomButton from "components/CustomButton";
import CustomizedSwitch from "components/CustomSwitch";
import DisplaySection from "./DisplaySection";
import DiscountSection from "./DiscountSection";
import InventorySection from "./InventorySection";
import NutritionSection from "./NutritionSection";

const AddEditItem = () => {
  const [toggleDrawer, setToggleDrawer] = useState(false);

  const handleDrawerToggle = () => {
    setToggleDrawer((state) => !state);
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
            <TdTextField label="Item Name" />
          </Grid>
        </Grid>

        <Grid container>
          <Grid item xs={12} sx={{ display: "flex", mb: "24px" }}>
            <Grid item xs={6}>
              <TdTextField type="number" label="Item Price(PKR)" />
            </Grid>
            <Grid item xs={6} sx={{ ml: "8px" }}>
              <TdTextField type="number" label="Tax %" />
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
            <TdTextField type="text" label="Description" />
          </Grid>
        </Grid>

        <Grid container>
          <Grid item xs={12} sx={{ display: "flex", mb: "24px" }}>
            <TdTextField type="text" label="Special Note" />
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

export default AddEditItem;
