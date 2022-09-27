import React from "react";

import MainCard from "ui-component/cards/MainCard";
import { Typography, Grid } from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";

import SearchField from "ui-component/SearchField";
import CustomButton from "views/forms/components/CustomButton";
import MultiSelectDropDown from "ui-component/MultiSelectDropDown";

import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

// dropdown data
const branches = [
  { label: "All Branches", id: 1 },
  { label: "Model Town Branch", id: 2 },
  { label: "Johar Town Branch", id: 3 },
  { label: "Iqbal Town Branch", id: 4 },
];

const ordersType = [
  { label: "Orders Type", id: 1 },
  { label: "Pickup", id: 2 },
  { label: "Delivery", id: 3 },
  { label: "COD", id: 4 },
];

const cityList = [
  { label: "City", id: 1 },
  { label: "Lahore", id: 2 },
  { label: "Islamabad", id: 3 },
  { label: "Karachi", id: 4 },
];

const status = [
  { label: "Statuses", id: 1 },
  { label: "Pending", id: 2 },
  { label: "Confirmed", id: 3 },
  { label: "Confirmed", id: 4 },
];

const Orders = () => {
  const [branchName, setBranchName] = React.useState<string[]>([
    branches[0].label,
  ]);
  const [orderType, setOrderType] = React.useState<string[]>([
    ordersType[0].label,
  ]);
  const [city, setCity] = React.useState<string[]>([cityList[0].label]);
  const [orderStatus, setOrderStatus] = React.useState<string[]>([
    status[0].label,
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

  const handleOrderTypeChange = (
    event: SelectChangeEvent<typeof orderType>
  ) => {
    const {
      target: { value },
    } = event;

    setOrderType(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const handleCityChange = (event: SelectChangeEvent<typeof city>) => {
    const {
      target: { value },
    } = event;

    setCity(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const handleStatusChange = (event: SelectChangeEvent<typeof orderStatus>) => {
    const {
      target: { value },
    } = event;

    setOrderStatus(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  return (
    <MainCard
      title={
        <Grid container spacing={2}>
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
              Orders
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
              sx={{
                p: "12px 32px",
                height: "44px",
                width: "151px",
                color: "black",
                background: "#FFFFFF",
                border: "1px solid #CCD1DB",

                "&:hover": {
                  backgroundColor: "#FFFFFF",
                },
              }}
            >
              Packing Slip
            </CustomButton>
            <CustomButton
              variant={"contained"}
              color={"secondary"}
              sx={{
                p: "12px 32px",
                ml: "13px",
                height: "44px",
                width: "151px",
              }}
            >
              Export Orders
            </CustomButton>
          </Grid>
        </Grid>
      } // MainCard opening tag closed here
    >
      <Grid container>
        <Grid item xs={12}>
          <MultiSelectDropDown
            value={branchName}
            onChange={handleBranchChange}
            dropDownList={branches}
            sx={{ width: "160px", height: "40px" }}
          />
          <MultiSelectDropDown
            value={orderType}
            onChange={handleOrderTypeChange}
            dropDownList={ordersType}
            sx={{ width: "160px", height: "40px", ml: "8px" }}
          />
          <MultiSelectDropDown
            value={city}
            onChange={handleCityChange}
            dropDownList={cityList}
            sx={{ width: "160px", height: "40px", ml: "8px" }}
          />
          <MultiSelectDropDown
            value={orderStatus}
            onChange={handleStatusChange}
            dropDownList={status}
            sx={{ width: "130px", height: "40px", ml: "8px" }}
          />
        </Grid>
      </Grid>
    </MainCard>
  );
};

export default Orders;
