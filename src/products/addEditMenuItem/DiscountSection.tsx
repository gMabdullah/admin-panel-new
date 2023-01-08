import React from "react";

import { Grid, Stack, Typography } from "@mui/material";

import CustomButton from "components/CustomButton";
import ExpandablePanel from "components/ExpandablePanel";
import TdTextField from "components/TdTextField";

const DiscountSection = () => {
  return (
    <Stack>
      <ExpandablePanel
        id="applyDiscount"
        title="Apply Discount"
        subTitle="Allows to apply item level discount by setting the discount parameters"
        // sx={{ mt: "16px" }}
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
          <Grid item xs={12} sx={{ display: "flex", mb: "22px" }}>
            <Grid item xs={6}>
              <TdTextField
                // required={true}
                // value={itemQuantity}
                type="date"
                label="Discount Start"
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
                type="date"
                label="Discount Expiry"
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

export default DiscountSection;
