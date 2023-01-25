import React, { useState } from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import CustomRadioButton from "./CustomRadioButton";
import IconButton from "@mui/material/IconButton/IconButton";
import FilterListIcon from "@mui/icons-material/FilterList";
import Divider from "@mui/material/Divider/Divider";
import Grid from "@mui/material/Grid";
import CustomizedSwitch from "./CustomSwitch";
import { keysOfItems as columns, filtersMap } from "../constants";
// import { keysOfItems } from "constants";
interface filtersProps {
  // filter: SVGSVGElement | undefined;
  // filterToggle: boolean;
  // setFitlerToggle: React.Dispatch<React.SetStateAction<boolean>>;
}
const Filters = ({}: // filter,
// filterToggle,
// setFitlerToggle,
filtersProps) => {
  const [filter, setFilter] = useState<SVGSVGElement | null>(null);
  const [selectedValue, setSelectedValue] = useState("0");

  const open = Boolean(filter);
  const id = open ? "simple-popover" : undefined;

  const handleClick = (event: React.MouseEvent<SVGSVGElement>) => {
    setFilter(event.currentTarget);
    // setFitlerToggle((prevState) => !prevState);
  };
  const onChange = (event: { target: { name: string; value: string } }) => {
    debugger;
    setSelectedValue(event.target.value);
  };
  console.log("filtersMap", filtersMap);
  return (
    <>
      <IconButton>
        <Stack>
          <FilterListIcon onClick={handleClick} />
        </Stack>
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={filter}
        onClose={() => setFilter(null)}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Stack spacing={2} padding={4}>
          {/* items */}
          {filtersMap.map((item: any, index: number) => (
            <>
              <Stack
                display="flex"
                spacing={4}
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                width="100%"
              >
                <Typography width="25%" variant="body1">
                  {item.key}
                </Typography>
                <Stack width="75%">
                  <CustomRadioButton
                    name="itemDisplay"
                    row={true}
                    options={item.value}
                    value={selectedValue}
                    onChange={onChange}
                  />
                </Stack>
              </Stack>
              <Divider />
            </>
          ))}

          <Typography variant="h3">Custom Columns</Typography>
          <Grid container>
            {columns?.map((column: any, index: number) => (
              <Grid item xs={4} sx={{ display: "flex" }}>
                <CustomizedSwitch
                  checked={column.selected}
                  name={column.key}
                  label={column.value}
                  sx={{
                    "& .MuiFormControlLabel-root": {
                      mr: "28px",
                      ml: "-6px",
                    },
                  }}
                  // onChange={handleSwitchChange}
                />
              </Grid>
            ))}
          </Grid>
        </Stack>
      </Popover>
    </>
  );
};

export default Filters;
