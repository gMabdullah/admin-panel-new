import React from "react";

import { Typography, Grid } from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";

import SearchField from "ui-component/SearchField";
import CustomButton from "views/forms/components/CustomButton";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import MultiSelectDropDown from "ui-component/MultiSelectDropDown";

// dropdown data

const reports = [
  { label: "Reports", id: 1 },
  { label: "Pickup", id: 2 },
  { label: "Delivery", id: 3 },
];

const branches = [
  { label: "All Branches", id: 1 },
  { label: "Model Town Branch", id: 2 },
  { label: "Johar Town Branch", id: 3 },
  { label: "Iqbal Town Branch", id: 4 },
];

const CustomReport = () => {
  const [report, setReport] = React.useState<string[]>([reports[0].label]);

  const handleReportsChange = (event: SelectChangeEvent<typeof report>) => {
    const {
      target: { value },
    } = event;

    setReport(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

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
          <Grid
            item
            xs={6}
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
              Custom Reports
            </Typography>

            <SearchField
              iconPrimary={SearchOutlinedIcon}
              placeholder="Search Order"
              sx={{
                width: "260px",
                height: "40px",
                marginLeft: "36px",
              }}
            />
          </Grid>
          <Grid
            item
            xs={6}
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <CustomButton
              variant={"contained"}
              color={"secondary"}
              sx={{
                p: "12px 24px",
                height: "44px",
                width: "151px",
              }}
            >
              Generate Report
            </CustomButton>
          </Grid>
        </Grid>
      </Grid>

      <Grid container>
        <Grid item xs={12}>
          <MultiSelectDropDown
            value={report}
            onChange={handleReportsChange}
            dropDownList={reports}
            sx={{ width: "160px", height: "40px", mt: "16px" }}
          />

          <MultiSelectDropDown
            value={branchName}
            onChange={handleBranchChange}
            dropDownList={branches}
            sx={{ width: "160px", height: "40px", ml: "8px", mt: "16px" }}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default CustomReport;
