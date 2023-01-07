// import CustomizedSwitch from "components/CustomizedSwitch";

import { Grid } from "@mui/material";
import CustomizedSwitch from "components/CustomSwitch";

const DashboardCustomers = () => {
  return (
    <div>
      <h1>Dashboard Customer Component</h1>

      <Grid container>
        <Grid item xs={12} sx={{ display: "flex" }}>
          <CustomizedSwitch
            label="Availability"
            sx={{
              "& .MuiFormControlLabel-root": {
                mr: "28px",
                ml: "-6px",
              },
            }}
          />
          <CustomizedSwitch label="Special Instructions" />
        </Grid>
      </Grid>
    </div>
  );
};

export default DashboardCustomers;
