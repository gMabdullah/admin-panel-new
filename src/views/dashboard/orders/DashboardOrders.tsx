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
  );
};

export default DashboardOrders;
