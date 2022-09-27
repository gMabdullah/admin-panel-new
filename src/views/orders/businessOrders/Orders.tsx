import React from "react";
import { useTheme } from "@mui/material/styles";

import MainCard from "ui-component/cards/MainCard";
import { Box, Chip, Typography, Grid } from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";
import {
  GridColumns,
  DataGrid,
  GridRenderCellParams,
  GridActionsCellItem,
  GridRowParams,
} from "@mui/x-data-grid";
import SearchField from "ui-component/SearchField";
import CustomButton from "views/forms/components/CustomButton";

import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import ReceiptTwoToneIcon from "@mui/icons-material/ReceiptTwoTone";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import MultiSelectDropDown from "ui-component/MultiSelectDropDown";

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

// table data
const StyledStatus = (params: GridRenderCellParams) => {
  let color = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: "10px",
    padding: "4px 8px",
    borderRadius: "100px",
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: 500,
    fontSize: "12px",
    lineHeight: "14px",
    height: "22px",
    background: "",
    width: "",
    color: "",
  };

  switch (params.value) {
    case "Pending": {
      color.background = "#EDE7F6";
      color.width = "61px";
      color.color = "#673AB7";
      break;
    }
    case "Confirmed": {
      color.background = "#B9F6CA";
      color.width = "73px";
      color.color = "#00C853";
      break;
    }
    case "Cancel": {
      color.background = "#FBE9E7";
      color.width = "53px";
      color.color = "#D84315";
      break;
    }
    case "Shipped": {
      color.background = "#E3F2FD";
      color.width = "60px";
      color.color = "#2196F3";
      break;
    }
    default: {
      //for now same as shipped
      color.background = "#E3F2FD";
      color.width = "60px";
      color.color = "#2196F3";
      break;
    }
  }
  return <Chip label={params.value} sx={color} />;
};

const ActionsButton = (params: GridRowParams) => {
  const actionsArray = [
    <GridActionsCellItem icon={<ReceiptTwoToneIcon />} label="" showInMenu />,
    <GridActionsCellItem icon={<EditTwoToneIcon />} label="" showInMenu />,
    <GridActionsCellItem icon={<DeleteTwoToneIcon />} label="" showInMenu />,
  ];

  return actionsArray;
};

const columns: GridColumns = [
  {
    field: "order_id",
    headerName: "Order #",
    flex: 1,
  },
  {
    field: "name",
    headerName: "Customer Name",
    flex: 1,
  },
  {
    field: "user_city",
    headerName: "City",
    flex: 1,
  },
  {
    field: "user_area",
    headerName: "Area",
    // type: "number",
    flex: 1,
  },
  {
    field: "status",
    headerName: "Status",
    // type: "number",
    flex: 1,
    renderCell: StyledStatus,
  },
  {
    field: "grand_total",
    headerName: "Grand Total",
    flex: 1,
  },
  {
    field: "action",
    headerName: "Action",
    type: "actions",
    getActions: ActionsButton,
  },
];

const rows = [
  {
    id: 1,
    order_id: "11111",
    name: "Jon",
    user_city: "Lahore",
    user_area: "Bhati",
    status: "Pending",
    grand_total: 400,
  },
  {
    id: 2,
    order_id: "22222",
    name: "Cersei",
    user_city: "Lahore",
    user_area: "Bhati",
    status: "Confirmed",
    grand_total: 400,
  },
  {
    id: 3,
    order_id: "33333",
    name: "Jaime",
    user_city: "Lahore",
    user_area: "Bhati",
    status: "Cancel",
    grand_total: 400,
  },
  {
    id: 4,
    order_id: "44444",
    name: "Arya4",
    user_city: "Lahore",
    user_area: "Bhati",
    status: "Cancel",
    grand_total: 400,
  },
  {
    id: 5,
    order_id: "55555",
    name: "Arya5",
    user_city: "Lahore",
    user_area: "Bhati",
    status: "Shipped",
    grand_total: 400,
  },
  {
    id: 6,
    order_id: "66666",
    name: "Arya6",
    user_city: "Lahore",
    user_area: "Bhati",
    status: "Pending",
    grand_total: 400,
  },
  {
    id: 7,
    order_id: "77777",
    name: "Arya7",
    user_city: "Lahore",
    user_area: "Bhati",
    status: "Cancel",
    grand_total: 400,
  },
  {
    id: 8,
    order_id: "88888",
    name: "Arya8",
    user_city: "Lahore",
    user_area: "Bhati",
    status: "Shipped",
    grand_total: 400,
  },
  {
    id: 9,
    order_id: "99999",
    name: "Arya9",
    user_city: "Lahore",
    user_area: "Bhati",
    status: "Pending",
    grand_total: 400,
  },
  {
    id: 10,
    order_id: "1010",
    name: "Arya10",
    user_city: "Lahore",
    user_area: "Bhati",
    status: "Confirmed",
    grand_total: 400,
  },
];

const Orders = () => {
  const theme = useTheme();

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

      <Grid container>
        <Grid item xs={12}>
          <Typography
            variant="h5"
            sx={{
              mt: "24px",
              mb: "7px",
              fontFamily: "Roboto",
              fontSize: "14px",
              fontWeight: 600,
              color: "#212121",
            }}
          >
            10 Order(s)
          </Typography>
        </Grid>
      </Grid>

      <Box
        sx={{
          width: "100%",
          "& .MuiDataGrid-root": {
            border: "none",
            "& .MuiDataGrid-cell": {
              fontFamily: "Roboto",
              fontWeight: 500,
              fontSize: "14px",
              borderColor:
                theme.palette.mode === "dark"
                  ? theme.palette.text.primary + 15
                  : "grey.200",
            },
            "& .MuiDataGrid-columnHeader": {
              fontFamily: "Roboto",
              fontWeight: 900,
              fontSize: "15px",
            },
            "& .MuiDataGrid-columnsContainer": {
              color: theme.palette.mode === "dark" ? "grey.600" : "grey.900",
              borderColor:
                theme.palette.mode === "dark"
                  ? theme.palette.text.primary + 15
                  : "grey.200",
            },
            "& .MuiDataGrid-columnSeparator": {
              display: "none",
              color:
                theme.palette.mode === "dark"
                  ? theme.palette.text.primary + 15
                  : "grey.200",
            },
            // "& .MuiDataGrid-rowSeparator": {
            // color: theme.palette.mode === "dark" ? "red" : "black",
            // },
            "& .MuiDataGrid-cell:focus-within, & .MuiDataGrid-cell:focus": {
              outline: "none",
            },
            "& .MuiDataGrid-columnHeader:focus-within, & .MuiDataGrid-columnHeader:focus":
              {
                outline: "none",
              },
          },
        }}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          checkboxSelection
          autoHeight
          disableColumnMenu
          hideFooterSelectedRowCount
        />
      </Box>
    </MainCard>
  );
};

export default Orders;
