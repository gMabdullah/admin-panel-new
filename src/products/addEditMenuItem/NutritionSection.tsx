import React from "react";

import { Grid, Stack, Typography } from "@mui/material";

// .css-1ayqzxq-MuiPaper-root-MuiAccordion-root.Mui-expanded:last-of-type

import CustomButton from "components/CustomButton";
import ExpandablePanel from "components/ExpandablePanel";
import TdTextField from "components/TdTextField";

const NutritionSection = () => {
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
              <TdTextField
                // required={true}
                // value={itemQuantity}
                // type="number"
                label="Nutrition Name"
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
                label="Nutrition Value"
                // sx={{ width: "100%" }}
                // onChange={handleQuantityChange}
                // error={fieldError.quantityField === "" ? false : true}
                // helperText={fieldError.quantityField}
              />
            </Grid>
          </Grid>
        </Grid>

        <CustomButton
          sx={{
            color: "#DB154D",
            fontSize: "13px",
            lineHeight: "unset",
            // mb: "23px",
          }}
        >
          Add Nutrition
        </CustomButton>
      </ExpandablePanel>
    </Stack>
  );
};

export default NutritionSection;
