import { Grid, Stack, Typography } from "@mui/material";
import CustomButton from "components/CustomButton";

import ExpandableSection from "components/ExpandableSection";
import TdTextField from "components/TdTextField";

const DashboardSales = () => {
  return (
    <div>
      <h1>Dashboard Sales Component</h1>

      <ExpandableSection
        id="applyDiscount"
        title="Apply Discount"
        subTitle="Allows to apply item level discount by setting the discount parameters"
      >
        <Grid container>
          <Grid item xs={12} sx={{ display: "flex", mb: "24px" }}>
            <Grid item xs={6}>
              <TdTextField
                // required={true}
                // value={itemQuantity}
                type="number"
                label="Discount Value"
                // onChange={handleQuantityChange}
                // error={fieldError.quantityField === "" ? false : true}
                // helperText={fieldError.quantityField}
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid container>
          <Grid item xs={12} sx={{ display: "flex" }}>
            <Grid item xs={6}>
              <TdTextField
                // required={true}
                // value={itemQuantity}
                type="date"
                label="Discount Start"
                sx={{ width: "100%" }}
                // onChange={handleQuantityChange}
                // error={fieldError.quantityField === "" ? false : true}
                // helperText={fieldError.quantityField}
              />
            </Grid>
            <Grid item xs={6} sx={{ ml: "8px" }}>
              <TdTextField
                // required={true}
                // value={itemQuantity}
                type="date"
                label="Discount Expiry"
                sx={{ width: "100%" }}
                // onChange={handleQuantityChange}
                // error={fieldError.quantityField === "" ? false : true}
                // helperText={fieldError.quantityField}
              />
            </Grid>
          </Grid>
        </Grid>
      </ExpandableSection>

      <ExpandableSection
        id="inventory"
        title="Inventory"
        subTitle="Allows to add more item details for inventory such as item code, SKU, and Universal item code"
      >
        <Grid container>
          <Grid item xs={12} sx={{ display: "flex", mb: "24px" }}>
            <Grid item xs={6}>
              <TdTextField
                // required={true}
                // value={itemQuantity}
                type="number"
                label="Item Weight"
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
                // type="date"
                label="Item Unit"
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
                type="number"
                label="Price Per"
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
                label="Minimum Quantity"
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
                type="number"
                label="No. of Cartons"
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
                // type="date"
                label="SKU"
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
                label="Unit Price (PKR)"
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
                // type="date"
                label="Product Code"
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
                // type="number"
                label="Universal Product Code"
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
                type="number"
                label="No of Palletes"
                sx={{ width: "100%" }}
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
                label="Pallet Price (PKR)"
                sx={{ width: "100%" }}
                // onChange={handleQuantityChange}
                // error={fieldError.quantityField === "" ? false : true}
                // helperText={fieldError.quantityField}
              />
            </Grid>
          </Grid>
        </Grid>
      </ExpandableSection>

      <ExpandableSection
        id="nutritionValue"
        title="Nutrition Value"
        // subTitle="Allows to add nutritional value to the item"
      >
        <Grid container>
          <Grid item xs={12} sx={{ display: "flex", mb: "12px" }}>
            <Grid item xs={6}>
              <TdTextField
                // required={true}
                // value={itemQuantity}
                // type="number"
                label="Nutrition Name"
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
                label="Nutrition Value"
                // sx={{ width: "100%" }}
                // onChange={handleQuantityChange}
                // error={fieldError.quantityField === "" ? false : true}
                // helperText={fieldError.quantityField}
              />
            </Grid>
          </Grid>
        </Grid>

        <CustomButton
          sx={{
            color: "#DB154D",
            fontSize: "13px",
            lineHeight: "unset",
          }}
        >
          Add Nutrition
        </CustomButton>
      </ExpandableSection>
    </div>
  );
};

export default DashboardSales;
