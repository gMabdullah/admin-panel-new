import { useContext } from "react";

import { Grid, Stack } from "@mui/material";

import ExpandablePanel from "components/ExpandablePanel";
import TdTextField from "components/TdTextField";

import { ProductsContext } from "../context/ProductsContext";

const Discount = () => {
  const { state, dispatch } = useContext(ProductsContext);

  // console.log("discount state = ", state);

  // console.log("discount = ", state.itemDiscount);
  // console.log("discount start  = ", state.itemDiscountStart);
  // console.log("discount expire = ", state.itemDiscountExpiry);

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
                value={state.itemDiscount}
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
                name="itemDiscountStart"
                type="date"
                label="Discount Start"
                value={state.itemDiscountStart}
                disablePrevDates={true}
                InputLabelProps={{
                  shrink: true,
                }}
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
                name="itemDiscountExpiry"
                type="date"
                label="Discount Expiry"
                value={state.itemDiscountExpiry}
                disablePrevDates={true}
                InputLabelProps={{
                  shrink: true,
                }}
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

export default Discount;
