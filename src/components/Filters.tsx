import React, { useEffect, useState } from "react";
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
import { useDispatch, useSelector } from "store";
import { setProductColumn, toggleColumn } from "store/slices/Main";
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
  const dispatch = useDispatch();
  const { productColumns } = useSelector((state) => state.main);
  const open = Boolean(filter);
  const id = open ? "simple-popover" : undefined;

  // useEffect(() => {
  //   // send object to reducer
  //   dispatch(setProductColumn(columns));
  // }, []);

  const handleClick = (event: React.MouseEvent<SVGSVGElement>) =>
    setFilter(event.currentTarget);

  const onChange = (event: { target: { name: string; value: string } }) =>
    setSelectedValue(event.target.value);

  const handleSwitchChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    { key }: FiltersProps
  ) => {
    const value = event.target.checked;

    dispatch(toggleColumn({ key, value }));
  };
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
        // sx={{
        //   width: "70%",
        // }}
      >
        <Stack
          spacing={2}
          padding={4}
          // sx={{
          //   width: "50%",
          // }}
        >
          {filtersMap.map((item: any) => (
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
                  {item.name}
                </Typography>
                <Stack width="75%">
                  <CustomRadioButton
                    name={item.key}
                    row={true}
                    options={item.options}
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
            <Grid item xs={12}>
              {productColumns?.map((column: any) => (
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
                  onChange={(event) => handleSwitchChange(event, column)}
                />
              ))}
            </Grid>
            {/* <Grid item xs={4}></Grid>
            <Grid item xs={4}></Grid> */}
          </Grid>
        </Stack>
      </Popover>
    </>
  );
};

export default Filters;
