import React, { useContext } from "react";

import { Stack, Typography } from "@mui/material";

import CustomRadioButton from "components/CustomRadioButton";
import { ProductsContext } from "../context/ProductsContext";

const Display = () => {
  const {
    state: { itemDisplay },
    dispatch,
  } = useContext(ProductsContext);

  const displayChangeHandler = (event: {
    target: { name: string; value: string };
  }) => {
    dispatch({
      type: "radioButton",
      payload: {
        name: event.target.name,
        value: event.target.value,
      },
    });
  };

  return (
    <Stack>
      <Typography variant="h5" sx={{ mb: "12px" }}>
        Display
      </Typography>

      <CustomRadioButton
        name="itemDisplay"
        row={true}
        options={[
          { label: "All", value: "0" },
          { label: "None", value: "1" },
          { label: "Web", value: "2" },
          { label: "POS", value: "3" },
        ]}
        value={itemDisplay}
        onChange={displayChangeHandler}
      />
    </Stack>
  );
};

export default Display;
