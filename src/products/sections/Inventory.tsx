import React, { useContext } from "react";

import { Grid, Stack } from "@mui/material";

import ExpandablePanel from "components/ExpandablePanel";
import TdTextField from "components/TdTextField";
import DropDownSearch from "components/customDropDown/DropDownSearch";
import { ProductsContext } from "../context/ProductsContext";
import { weightUnits } from "../../constants";
import { debounce } from "lodash";

const Inventory = () => {
  const { state, dispatch } = useContext(ProductsContext);

  const handleWeightUnitSelection = (
    event: React.ChangeEvent<{}>,
    value: any,
    name: string
  ) => {
    dispatch({
      type: "dropDown",
      payload: {
        name: "itemWeightUnit",
        value: value,
      },
    });
  };

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
        id="inventory"
        title="Inventory"
        subTitle="Allows to add more item details for inventory such as item code, SKU, and Universal item code"
      >
        <Grid container>
          <Grid item xs={12} sx={{ display: "flex", mb: "24px" }}>
            <Grid item xs={6}>
              <TdTextField
                name="itemWeight"
                type="number"
                label="Item Weight"
                defaultValue={state.itemWeight}
                onChange={handleFieldChange}
              />
            </Grid>
            <Grid item xs={6} sx={{ ml: "8px" }}>
              <DropDownSearch
                label="Weight Unit"
                value={state.itemWeightUnit}
                options={weightUnits}
                handleChange={handleWeightUnitSelection}
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid container>
          <Grid item xs={12} sx={{ display: "flex", mb: "24px" }}>
            <Grid item xs={6}>
              <TdTextField
                name="itemPricePer"
                type="number"
                label="Price Per"
                defaultValue={state.itemPricePer}
                onChange={handleFieldChange}
              />
            </Grid>
            <Grid item xs={6} sx={{ ml: "8px" }}>
              <TdTextField
                name="itemMinimumQuantity"
                type="number"
                label="Minimum Quantity"
                defaultValue={state.itemMinimumQuantity}
                error={
                  state.fieldError === "itemMinimumQuantity" ? true : false
                }
                helperText={"Min quantity: 1"}
                onChange={handleFieldChange}
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid container>
          <Grid item xs={12} sx={{ display: "flex", mb: "24px" }}>
            <Grid item xs={6}>
              <TdTextField
                name="itemCost"
                type="number"
                label="Item Cost"
                defaultValue={state.itemCost}
                onChange={handleFieldChange}
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid container>
          <Grid item xs={12} sx={{ display: "flex", mb: "24px" }}>
            <Grid item xs={6}>
              <TdTextField
                name="itemSku"
                label="SKU"
                defaultValue={state.itemSku}
                onChange={handleFieldChange}
              />
            </Grid>
            <Grid item xs={6} sx={{ ml: "8px" }}>
              <TdTextField
                name="itemUnitPrice"
                type="number"
                label="Unit Price"
                defaultValue={state.itemUnitPrice}
                onChange={handleFieldChange}
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid container>
          <Grid item xs={12} sx={{ display: "flex", mb: "24px" }}>
            <Grid item xs={6}>
              <TdTextField
                name="itemProductCode"
                label="Product Code"
                defaultValue={state.itemProductCode}
                onChange={handleFieldChange}
              />
            </Grid>
            <Grid item xs={6} sx={{ ml: "8px" }}>
              <TdTextField
                name="itemUniversalProductCode"
                label="Universal Product Code"
                defaultValue={state.itemUniversalProductCode}
                onChange={handleFieldChange}
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid container>
          <Grid item xs={12} sx={{ display: "flex", mb: "22px" }}>
            <Grid item xs={6}>
              <TdTextField
                name="itemPallets"
                type="number"
                label="No of Pallets"
                defaultValue={state.itemPallets}
                onChange={handleFieldChange}
              />
            </Grid>
            <Grid item xs={6} sx={{ ml: "8px" }}>
              <TdTextField
                name="itemPalletPrice"
                type="number"
                label="Pallet Price"
                defaultValue={state.itemPalletPrice}
                onChange={handleFieldChange}
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid container>
          <Grid item xs={12} sx={{ display: "flex", mb: "24px" }}>
            <Grid item xs={6}>
              <TdTextField
                name="itemCartons"
                type="number"
                label="No. of Cartons"
                defaultValue={state.itemCartons}
                onChange={handleFieldChange}
              />
            </Grid>
            <Grid item xs={6} sx={{ ml: "8px" }}>
              <TdTextField
                name="itemMaximumDistance"
                type="number"
                label="Maximum Distance"
                defaultValue={state.itemMaximumDistance}
                error={
                  state.fieldError === "itemMaximumDistance" ? true : false
                }
                helperText={"Max distance: 10000"}
                onChange={handleFieldChange}
              />
            </Grid>
          </Grid>
        </Grid>
      </ExpandablePanel>
    </Stack>
  );
};

export default Inventory;
