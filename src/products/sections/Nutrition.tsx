import { Grid, Stack } from "@mui/material";

import CustomButton from "components/CustomButton";
import ExpandablePanel from "components/ExpandablePanel";
import TdTextField from "components/TdTextField";

const Nutrition = () => {
  return (
    <Stack sx={{ mb: "23px" }}>
      <ExpandablePanel
        id="nutritionValue"
        title="Nutrition Value"
        subTitle="Allows to add nutritional value to the item"
        sx={{
          "& .MuiAccordionSummary-content": {
            m: "24px 0 0",
          },
        }}
      >
        <Grid container>
          <Grid item xs={12} sx={{ display: "flex", mb: "12px", mt: "24px" }}>
            <Grid item xs={6}>
              <TdTextField label="Nutrition Name" />
            </Grid>
            <Grid item xs={6} sx={{ ml: "8px" }}>
              <TdTextField type="number" label="Nutrition Value" />
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
      </ExpandablePanel>
    </Stack>
  );
};

export default Nutrition;
