import React from "react";

import { Typography, Grid } from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";

import MultiSelectDropDown from "ui-component/MultiSelectDropDown";

// dropdown data
const branches = [
  { label: "All Branches", id: 1 },
  { label: "Model Town Branch", id: 2 },
  { label: "Johar Town Branch", id: 3 },
];

const Feedback = () => {
  const [branchName, setBranchName] = React.useState<string[]>([
    branches[0].label,
  ]);

  const handleBranchChange = (event: SelectChangeEvent<typeof branchName>) => {
    const {
      target: { value },
    } = event;

    setBranchName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  return (
    <>
      <Grid container>
        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h3"
            sx={{
              fontFamily: "Roboto",
              fontStyle: "normal",
              fontWeight: 600,
              fontSize: "24px",
              lineHeight: "28px",
              color: "#212121",
            }}
          >
            Feedback
          </Typography>
        </Grid>
      </Grid>

      <Grid container>
        <Grid item xs={12}>
          <MultiSelectDropDown
            value={branchName}
            onChange={handleBranchChange}
            dropDownList={branches}
            sx={{ width: "160px", height: "40px", mt: "16px" }}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default Feedback;
