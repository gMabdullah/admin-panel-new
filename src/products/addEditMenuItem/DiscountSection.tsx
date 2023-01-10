import { Grid, Stack } from "@mui/material";

import ExpandablePanel from "components/ExpandablePanel";
import TdTextField from "components/TdTextField";

const DiscountSection = () => {
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
              <TdTextField type="number" label="Discount Value" />
            </Grid>
          </Grid>
        </Grid>

        <Grid container>
          <Grid item xs={12} sx={{ display: "flex", mb: "22px" }}>
            <Grid item xs={6}>
              <TdTextField type="date" label="Discount Start" />
            </Grid>
            <Grid item xs={6} sx={{ ml: "8px" }}>
              <TdTextField type="date" label="Discount Expiry" />
            </Grid>
          </Grid>
        </Grid>
      </ExpandablePanel>
    </Stack>
  );
};

export default DiscountSection;
