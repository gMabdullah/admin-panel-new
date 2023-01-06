import { Stack, Typography } from "@mui/material";
import CustomRadioButton from "components/CustomRadioButton";
import { useState } from "react";

const DashboardOrders = () => {
  const [deliveryChargesList, setDeliveryChargesList] = useState([
    {
      label: "",
      value: "",
    },
  ]);

  return (
    <Stack>
      <Typography variant="h5" sx={{ mb: "12px" }}>
        Display
      </Typography>

      <CustomRadioButton
        row={true}
        sx={{
          "& .MuiFormControlLabel-root": {
            mr: "25px",
          },
          "& .MuiTypography-root": {
            fontSize: "12px",
          },
          "& .MuiRadio-root ": {
            p: "8px",
          },
        }}
        options={[
          { label: "All", value: "0" },
          { label: "None", value: "1" },
          { label: "Web", value: "2" },
          { label: "POS", value: "3" },
        ]}
        value={""} // onChange={canadaPostHandler}
        // value={canadaPostDeliveryCharges}
      />
    </Stack>
  );
};

export default DashboardOrders;
