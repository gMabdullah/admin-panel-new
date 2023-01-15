import { Stack, Typography, Grid, Divider } from "@mui/material";

import TdTextField from "components/TdTextField";
import CustomDrawer from "components/CustomDrawer";
import CustomButton from "components/CustomButton";
import CustomizedSwitch from "components/CustomSwitch";
import Display from "./sections/Display";
import Discount from "./sections/Discount";
import Inventory from "./sections/Inventory";
import Nutrition from "./sections/Nutrition";
import AddCategory from "./AddCategory";
import { useState } from "react";
import CustomModal from "components/CustomModal";

interface AddEditItemProps {
  toggleDrawer: boolean;
  handleDrawerToggle: () => void;
}

const AddEditItem = ({
  toggleDrawer,
  handleDrawerToggle,
}: AddEditItemProps) => {
  const [addCategoryModal, setAddCategoryModal] = useState(false);
  const toggleCategoryModal = () => {
    setAddCategoryModal((prevState) => !prevState);
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
            <TdTextField label="Choose Category" />
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
        <Display />
        <Divider sx={{ mt: "16px" }} />
        <Discount />
        <Divider />
        <Inventory />
        <Divider />
        <Nutrition />
      </Stack>
    </CustomDrawer>
  );
};

export default AddEditItem;
