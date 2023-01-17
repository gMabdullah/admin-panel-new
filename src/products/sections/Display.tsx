import React from "react";

import { Stack, Typography } from "@mui/material";

import CustomRadioButton from "components/CustomRadioButton";

const Display = () => {
  const [displayValue, setDisplayValue] = React.useState("All");

  const displayChangeHandler = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setDisplayValue(event.target.value);
  };

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
        value={displayValue}
        onChange={displayChangeHandler}
      />
    </Stack>
  );
};

export default Display;
