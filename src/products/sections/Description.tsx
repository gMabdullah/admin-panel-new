import { Grid, Stack } from "@mui/material";

import ExpandablePanel from "components/ExpandablePanel";
import TdTextField from "components/TdTextField";

const Description = () => {
  return (
    <Stack>
      <ExpandablePanel
        id="description"
        title="Description"
        subTitle="Allows to add description for the product"
      >
        <Grid container>
          <Grid item xs={12} sx={{ display: "flex", mb: "22px" }}>
            <TdTextField rows={6} multiline={true} label="Description" />
          </Grid>
        </Grid>
      </ExpandablePanel>
    </Stack>
  );
};

export default Description;
