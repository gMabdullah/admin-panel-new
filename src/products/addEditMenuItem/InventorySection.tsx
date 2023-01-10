import { Grid, Stack } from "@mui/material";

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
              <TdTextField type="number" label="Item Weight" />
            </Grid>
            <Grid item xs={6} sx={{ ml: "8px" }}>
              <TdTextField label="Item Unit" />
            </Grid>
          </Grid>
        </Grid>

        <Grid container>
          <Grid item xs={12} sx={{ display: "flex", mb: "24px" }}>
            <Grid item xs={6}>
              <TdTextField type="number" label="Price Per" />
            </Grid>
            <Grid item xs={6} sx={{ ml: "8px" }}>
              <TdTextField type="number" label="Minimum Quantity" />
            </Grid>
          </Grid>
        </Grid>

        <Grid container>
          <Grid item xs={12} sx={{ display: "flex", mb: "24px" }}>
            <Grid item xs={6}>
              <TdTextField type="number" label="No. of Cartons" />
            </Grid>
          </Grid>
        </Grid>

        <Grid container>
          <Grid item xs={12} sx={{ display: "flex", mb: "24px" }}>
            <Grid item xs={6}>
              <TdTextField label="SKU" />
            </Grid>
            <Grid item xs={6} sx={{ ml: "8px" }}>
              <TdTextField type="number" label="Unit Price (PKR)" />
            </Grid>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={12} sx={{ display: "flex", mb: "24px" }}>
            <Grid item xs={6}>
              <TdTextField label="Product Code" />
            </Grid>
            <Grid item xs={6} sx={{ ml: "8px" }}>
              <TdTextField label="Universal Product Code" />
            </Grid>
          </Grid>
        </Grid>

        <Grid container>
          <Grid item xs={12} sx={{ display: "flex", mb: "22px" }}>
            <Grid item xs={6}>
              <TdTextField type="number" label="No of Palletes" />
            </Grid>
            <Grid item xs={6} sx={{ ml: "8px" }}>
              <TdTextField type="number" label="Pallet Price (PKR)" />
            </Grid>
          </Grid>
        </Grid>
      </ExpandablePanel>
    </Stack>
  );
};

export default InventorySection;
