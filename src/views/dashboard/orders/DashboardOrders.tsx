import { Stack, Typography } from "@mui/material";
import CustomDrawer from "components/CustomDrawer";
import CustomRadioButton from "components/CustomRadioButton";
import MenuItem from "products/addEditMenuItem/MenuItem";
import { SyntheticEvent, useState } from "react";

const DashboardOrders = () => {
  return (
    <>
      <MenuItem />

      <Stack>
        <Typography variant="h5" sx={{ mb: "12px" }}>
          Display
        </Typography>

        <CustomRadioButton
          row={true}
          options={[
            { label: "All", value: "All" },
            { label: "None", value: "None" },
            { label: "Web", value: "Web" },
            { label: "POS", value: "POS" },
          ]}
          value={"All"} // onChange={canadaPostHandler}
          // value={canadaPostDeliveryCharges}
        />
      </Stack>
    </>
  );
};

export default DashboardOrders;
