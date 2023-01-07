import { Stack, Typography } from "@mui/material";
import CustomDrawer from "components/CustomDrawer";
import CustomRadioButton from "components/CustomRadioButton";
import { SyntheticEvent, useState } from "react";

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

      <CustomDrawer
        anchor="right"
        open={true}
        // children={undefined}
        onClose={function (event: SyntheticEvent<{}, Event>): void {
          throw new Error("Function not implemented.");
        }}
      >
        <h1>Dashboard Customer Component</h1>
      </CustomDrawer>
    </Stack>
  );
};

export default DashboardOrders;
