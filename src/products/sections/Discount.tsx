import React, { useContext } from "react";

import { Grid, Stack } from "@mui/material";

import { debounce } from "lodash";

import ExpandablePanel from "components/ExpandablePanel";
import TdTextField from "components/TdTextField";

import { ProductsContext } from "../context/ProductsContext";

const Discount = () => {
  const { state, dispatch } = useContext(ProductsContext);

  console.log("discount component");

  const handleFieldChange = debounce(
    (e: { target: { name: string; value: string } }) => {
      dispatch({
        type: "textField",
        payload: { name: e.target.name, value: e.target.value },
      });
    },
    300
  );

  return (
    <Stack>
      <ExpandablePanel
        id="applyDiscount"
        title="Apply Discount"
        subTitle="Allows to apply item level discount by setting the discount parameters"
      >
        <Grid container>
          <Grid item xs={12} sx={{ display: "flex", mb: "24px" }}>
            <Grid item xs={6}>
              <TdTextField
                name="itemDiscount"
                type="number"
                label="Discount Value %"
                defaultValue={state.itemDiscount}
                onChange={handleFieldChange}
                error={state.fieldError === "itemDiscount" ? true : false}
                helperText={"Required*"}
                // error={state.fieldError.itemDiscountField === "" ? false : true}
                // helperText={state.fieldError.itemDiscountField}
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid container>
          <Grid item xs={12} sx={{ display: "flex", mb: "22px" }}>
            <Grid item xs={6}>
              <TdTextField
                name="itemDiscountStart"
                type="date"
                label="Discount Start"
                defaultValue={state.itemDiscountStart}
                error={state.fieldError === "itemDiscountStart" ? true : false}
                helperText={"Required*"}
                disablePrevDates={true}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={handleFieldChange}
              />
            </Grid>
            <Grid item xs={6} sx={{ ml: "8px" }}>
              <TdTextField
                name="itemDiscountExpiry"
                type="date"
                label="Discount Expiry"
                defaultValue={state.itemDiscountExpiry}
                error={state.fieldError === "itemDiscountExpiry" ? true : false}
                helperText={"Required*"}
                disablePrevDates={true}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={handleFieldChange}
              />
            </Grid>
          </Grid>
        </Grid>
      </ExpandablePanel>
    </Stack>
  );
};

export default Discount;
