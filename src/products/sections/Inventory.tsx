import React, { useContext, useState } from "react";
import { Grid, Stack } from "@mui/material";
import ExpandablePanel from "components/ExpandablePanel";
import TdTextField from "components/TdTextField";
import { ProductsContext } from "../context/ProductsContext";
const Inventory = () => {
  const { state, dispatch } = useContext(ProductsContext);
  // console.log("item Weight = ", state.itemWeight);
  // console.log("item Price Per = ", state.itemPricePer);
  // console.log("item Minimum Quantity = ",  state.itemMinimumQuantity);
  // console.log("item cartons = ", typeof state.itemCartons);
  // console.log("item itemSku = ", state.itemSku);
  // console.log("item itemUnitPrice = ", state.itemUnitPrice);
  // console.log("item itemPallets = ", state.itemPallets);
  // console.log("item itemPalletPrice = ", state.itemPalletPrice);
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
                onChange={(e) =>
                  dispatch({
                    type: "textField",
                    payload: { name: e.target.name, value: e.target.value },
                  })
                }
              />
            </Grid>
            <Grid item xs={6} sx={{ ml: "8px" }}>
              <TdTextField label="Weight Unit" />
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
                name="itemMinimumQuantity"
                type="number"
                label="Minimum Quantity"
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
              <TdTextField
                name="itemCartons"
                type="number"
                label="No. of Cartons"
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
              <TdTextField
                name="itemSku"
                label="SKU"
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
                name="itemUnitPrice"
                type="number"
                label="Unit Price"
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
              <TdTextField
                name="itemProductCode"
                label="Product Code"
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
                name="itemUniversalProductCode"
                label="Universal Product Code"
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
          <Grid item xs={12} sx={{ display: "flex", mb: "22px" }}>
            <Grid item xs={6}>
              <TdTextField
                name="itemPallets"
                type="number"
                label="No of Pallets"
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
                name="itemPalletPrice"
                type="number"
                label="Pallet Price"
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
      </ExpandablePanel>
    </Stack>
  );
};
export default Inventory;
