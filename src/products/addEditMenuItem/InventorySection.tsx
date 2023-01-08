import React from "react";

import { Grid, Stack, Typography } from "@mui/material";

import CustomButton from "components/CustomButton";
import ExpandablePanel from "components/ExpandablePanel";
import TdTextField from "components/TdTextField";

const InventorySection = () => {
  return (
    <Stack>
      <ExpandablePanel
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
          <Grid item xs={12} sx={{ display: "flex", mb: "22px" }}>
            <Grid item xs={6}>
              <TdTextField
                // required={true}
                // value={itemQuantity}
                type="number"
                label="No of Palletes"
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
                label="Pallet Price (PKR)"
                // sx={{ width: "100%" }}
                // onChange={handleQuantityChange}
                // error={fieldError.quantityField === "" ? false : true}
                // helperText={fieldError.quantityField}
              />
            </Grid>
          </Grid>
        </Grid>
      </ExpandablePanel>
    </Stack>
  );
};

export default InventorySection;
