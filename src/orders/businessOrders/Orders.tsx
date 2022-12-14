import React, { useEffect, useRef, useState } from "react";

import { makeStyles } from "@mui/styles";
import {
  GridColumns,
  DataGrid,
  GridRenderCellParams,
  GridRowParams,
  GridSelectionModel,
  GridRowHeightParams,
} from "@mui/x-data-grid";

import { Box, Chip, Typography, Grid, Stack } from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";

import MainCard from "components/cards/MainCard";
import CustomButton from "components/CustomButton";
import ExcelExport from "components/ExcelExport";
import TdTextField from "components/TdTextField";
import Progress from "components/Progress";
import MultiSelectDropDown, {
  DropDownListType,
} from "components/MultiSelectDropDown";
import { OrderListingSkeleton } from "components/skeleton/OrderListingSkeleton";
import { OrderListingNoRowsOverlay } from "components/skeleton/OrderListingNoRowsOverlay";

import { OptionSetProvider } from "orders/context/OptionSetContext";
import { IQBAL_BUSINESS_ID } from "constants/BusinessIds";
import { setDate, setGlobalSettings } from "store/slices/Main";

import OrderDetail from "./OrderDetail";
import { useDispatch, useSelector } from "store";
import moment from "moment";

import useAxios, { configure } from "axios-hooks";
import { axios } from "config";

configure({ axios });

const useStyles = makeStyles(() => ({
  colStyle1: {
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: "14px",
    lineHeight: "16px",
    color: "#212121",
  },
  colStyle2: {
    fontWeight: "400",
    color: "#212121",
  },
}));

export const applyDates = (refetch: any) => {
  return refetch;
};

const ordersType = [
  { value: "", label: "All Order Type" },
  { value: "1", label: "Pick Up" },
  { value: "0", label: "Delivery" },
  { value: "1", label: "Canada Post" },
];

export const tableData = [
  { header: "Order ID", key: "order_id" },
  { header: "Date", key: "date" },
  { header: "Name", key: "name" },
  { header: "Note", key: "note" },
  { header: "Tip", key: "tip" },
  { header: "Payment Method", key: "payment_type" },
  { header: "Grand Total", key: "grand_total" },
  { header: "Status", key: "status" },
  { header: "Source", key: "source" },
  { header: "Area", key: "user_area" },
  { header: "Address", key: "address" },
  { header: "City", key: "user_city" },
  { header: "Tel #", key: "landline_number" },
  { header: "Mobile No", key: "mobile_number" },
  { header: "CNIC", key: "cnic" },
  { header: "Email", key: "user_email" },
  { header: "Status Comment", key: "statuscomment" },
];

export let last48Hours = true;

const { eatout_id, user_id } = JSON.parse(
  localStorage.getItem("businessInfo")!
);

const Orders = () => {
  let timeOut: NodeJS.Timeout;
  const classes = useStyles();
  const dispatch = useDispatch();

  const { startDate, endDate, decimalPlaces } = useSelector(
    (state) => state.main
  );
  const [orders, setOrders] = useState<OrderListingResponse["result"] | []>([]);
  const [statusDropdown, setStatusDropdown] = React.useState<
    DropDownListType[]
  >([{ label: "All Status", value: "" }]);
  const [statuses, setStatus] = useState<string[]>([statusDropdown[0].label]);
  const [selectedOrder, setSelectedOrder] = useState<SelectedOrderDetailTypes>({
    order_id: 0,
    user_email: "",
  });

  const [branch, setBranch] = useState<DropDownListType[]>([]);
  const [orderDetailModal, setOrderDetailModal] = useState<boolean>(false);
  const [selectionModel, setSelectionModel] = useState<GridSelectionModel>([]);
  const [branchName, setBranchName] = useState<string[]>(["All Branches"]);
  const [orderType, setOrderType] = React.useState<string[]>([
    ordersType[0].label,
  ]);
  const [canadaPost, setCanadaPost] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState<string>("");
  const [selectedOrderType, setSelectedOrderType] = useState<string>("");

  const [dropdownCityFilter, setDropDownCityFilter] = useState<
    DropDownListType[]
  >([{ label: "All Cities", value: "" }]);
  const [city, setCity] = React.useState<string[]>([
    dropdownCityFilter[0].label,
  ]);
  const [totalOrders, setTotalOrders] = React.useState<number>();
  const [page, setPage] = React.useState(0);
  const [pageSize, setPageSize] = React.useState(50);
  const [applyFilters, setApplyFilters] = React.useState(false);
  const [apiCallFlag, setApiCallFlag] = React.useState("");

  const prevOrderDetailModalState = useRef<boolean | undefined>(true);
  const prevPageState = useRef<number | undefined>();
  const prevPageSizeState = useRef<number | undefined>();

  //======================================= API Call Payloads =======================================//

  const citiesPayload = (cityData: OrdersCityFilterRequest) => {
    const formData = new FormData();

    formData.append("eatout_id", eatout_id);
    formData.append("admin_id", `${cityData["admin_id"]}`);
    formData.append("source", `${cityData["source"]}`);
    return formData;
  };

  const statusPayload = (item: OrderStatusRequest) => {
    const formData = new FormData();

    formData.append("eatout_id", eatout_id);
    formData.append("admin_id", `${item["admin_id"]}`);
    formData.append("source", "biz");
    return formData;
  };

  const ordersAPIPayload = (item: OrderListingRequest) => {
    const formData = new FormData();

    formData.append("eatout_id", eatout_id);
    formData.append("type", "Live");
    formData.append("from_date", `${last48Hours ? "" : startDate}`);
    formData.append("to_date", `${last48Hours ? "" : endDate}`);
    formData.append("offset", `${page * pageSize}`);
    formData.append("limit", `${pageSize}`);
    formData.append("pre_auth", `${statuses}` === "Pre-Authorized" ? "1" : "0");

    formData.append("check", `${1}`);
    formData.append("return_statuses", `${item["return_statuses"]}`);
    formData.append("attributes", `${1}`);
    formData.append("admin_id", `${item["admin_id"]}`);
    formData.append("source", "biz");
    formData.append("key", item["key"] ? `${item["key"]}` : "");
    // values from filters
    formData.append("bid", selectedBranch ? selectedBranch : "");
    formData.append("order_type", canadaPost ? "0" : selectedOrderType);
    formData.append(
      "canada_post",
      canadaPost ? selectedOrderType : selectedOrderType === "" ? "" : "0"
    );
    formData.append(
      "city",
      `${city}` ? (`${city}` === "All Cities" ? "" : `${city}`) : ""
    );
    formData.append(
      "status",
      `${statuses}`
        ? `${statuses}` === "Pre-Authorized"
          ? "Pending"
          : `${statuses}` === "All Status"
          ? ""
          : `${statuses}`
        : ""
    );
    return formData;
  };

  //======================================= API Calls =======================================//

  const [{ data: globalSetting }] = useAxios({
    url: `/eatout_global_settings?restaurant_id=${eatout_id}&source=biz&admin_id=${user_id}`,
  });

  const [{ data: allBranches }] = useAxios({
    url: `/get_eatout_branches?restaurant_id=${eatout_id}&source=biz&admin_id=${user_id}`,
    method: "post",
  });

  const [{ data: allStatuses }] = useAxios({
    url: `/get_eatout_order_status`,
    method: "post",
    data: statusPayload({
      eatout_id,
      admin_id: user_id,
      source: "biz",
    }),
  });

  const [{ data: allOrders, loading: getOrderLoader }, ordersAPICall] =
    useAxios({
      url: `/order_get`,
      method: "post",
      data: ordersAPIPayload({
        eatout_id,
        type: "Live",
        return_statuses: 1,
        attributes: 1,
        admin_id: user_id,
        source: "biz",
        check: 1,
      }),
    });

  const [{ data: allCities }] = useAxios({
    url: "/order_city_filter",
    method: "post",
    data: citiesPayload({
      eatout_id,
      source: "biz",
      admin_id: user_id,
    }),
  });

  //======================================= useEffect Hooks =======================================//

  useEffect(() => {
    dispatch(
      setDate({
        startDate: moment().subtract(48, "hours"),
        endDate: moment(),
      })
    );
  }, []);

  useEffect(() => {
    if (allOrders) {
      switch (apiCallFlag) {
        //case on order update in order detail
        case "OrderUpdate": {
          // if/else in case we have a single order on a page and we updated the status then that order will not come again on the same page with that filter
          if (allOrders.result.length > 0) {
            let ordersArray = orders.slice();

            ordersArray.splice(page * pageSize, pageSize, ...allOrders.result);

            setOrders(ordersArray);
            setTotalOrders(allOrders.count);
          } else {
            prevPageState.current = undefined;

            setSelectionModel([]);
            setPage(0);
          }

          break;
        }
        // case to append new orders on moving to the next page
        case "PageChange": {
          setOrders([...orders, ...allOrders.result]);
          break;
        }
        //for the first time we call the api to get orders & on applying filters & on page size change
        default: {
          setOrders(allOrders.result);
          setTotalOrders(allOrders.count ? allOrders.count : 0);
          break;
        }
      }

      if (applyFilters) {
        setApplyFilters(false);
      }
    }
  }, [allOrders]);

  useEffect(() => {
    // api call to update the orders list on closing the order detail modal to sync order updates
    if (prevOrderDetailModalState.current) return; // return for the very first time when useEffect works as componentDidMount

    if (!orderDetailModal) {
      ordersAPICall({
        data: ordersAPIPayload({
          eatout_id,
          type: "Live",
          return_statuses: 1,
          attributes: 1,
          admin_id: user_id,
          source: "biz",
          check: 1,
        }),
      });
    }
  }, [orderDetailModal]);

  useEffect(() => {
    if (
      page > Number(prevPageState.current) &&
      page * pageSize === orders.length
    ) {
      // to stop the api call if the next page orders already exists in orders array (when moving back & forth on pages)
      ordersAPICall({
        data: ordersAPIPayload({
          eatout_id,
          type: "Live",
          return_statuses: 1,
          attributes: 1,
          admin_id: user_id,
          source: "biz",
          check: 1,
        }),
      });
    }
  }, [page]);

  useEffect(() => {
    if (prevPageSizeState.current !== undefined) {
      ordersAPICall({
        data: ordersAPIPayload({
          eatout_id,
          type: "Live",
          return_statuses: 1,
          attributes: 1,
          admin_id: user_id,
          source: "biz",
          check: 1,
        }),
      });
    }
  }, [pageSize]);

  // component Did Mount
  useEffect(() => {
    // Global Setting
    let pre_auth = { pre_auth: false, status: 404 };
    if (globalSetting) {
      const { payment_settings } = globalSetting.result;

      dispatch(setGlobalSettings(globalSetting));
      pre_auth["pre_auth"] = payment_settings.stripe_settings.pre_auth;
      pre_auth["status"] = payment_settings.stripe_settings.status;
    }
    // load status dropdown
    if (allStatuses) {
      const remainingStatuses = allStatuses.result.map((status: string) => ({
        label: status,
        value: status,
      }));
      remainingStatuses.unshift({ label: "All Status", value: "" });
      //  Also will append with global api settings
      if (eatout_id == IQBAL_BUSINESS_ID) {
        remainingStatuses.push({
          label: "Pre-Authorized",
          value: "Pre-Authorized",
        });
      } else if (pre_auth["pre_auth"] && pre_auth["status"] === 200) {
        remainingStatuses.push({
          label: "Pre-Authorized",
          value: "Pre-Authorized",
        });
      }

      setStatusDropdown(remainingStatuses);
    }
    // load cities dropdown
    if (allCities) {
      const remaingCities = allCities.result.map((status: string) => ({
        label: status,
        value: status,
      }));
      remaingCities.unshift({ label: "All Cities", value: "" });
      setDropDownCityFilter(remaingCities);
    }
    if (allBranches) {
      const branches = allBranches.map((item: GetBranchesResponse) => ({
        value: item.branch_id,
        label: item.location_address,
      }));
      branches.unshift({ label: "All Branches", value: "" });
      setBranch(branches);
    }
  }, [globalSetting, allStatuses, allCities, allBranches]);

  useEffect(() => {
    // api call to update the orders list according to filters
    if (applyFilters) {
      ordersAPICall({
        data: ordersAPIPayload({
          eatout_id,
          type: "Live",
          return_statuses: 1,
          attributes: 1,
          admin_id: user_id,
          source: "biz",
          check: 1,
        }),
      });
    }
  }, [applyFilters]);

  useEffect(() => {
    last48Hours = false;

    applyDates(
      ordersAPICall({
        data: ordersAPIPayload({
          eatout_id,
          type: "Live",
          return_statuses: 1,
          attributes: 1,
          admin_id: user_id,
          source: "biz",
          check: 1,
          from_date: startDate,
          to_date: endDate,
        }),
      })
    );
  }, [startDate, endDate]);

  //======================================= Handlers Functions =======================================//

  const handleSearchChange = async (e: { target: { value: string } }) => {
    clearTimeout(timeOut);

    let query = e.target.value;

    timeOut = setTimeout(async () => {
      ordersAPICall({
        data: ordersAPIPayload({
          eatout_id,
          type: "Live",
          return_statuses: 1,
          attributes: 1,
          admin_id: user_id,
          source: "biz",
          check: 1,
          key: query,
        }),
      });
    }, 1000);
  };

  const handleBranchChange = (event: SelectChangeEvent<typeof branchName>) => {
    const {
      target: { value },
    } = event;
    let branchValueForApiFilter: string[] = [];
    branch &&
      branch.map((branchData) => {
        (typeof value === "string" ? [value] : value).map((label: string) => {
          if (label == branchData.label) {
            branchValueForApiFilter.push(branchData.value);
          }
        });
      });

    let selectedLabels = typeof value === "string" ? value.split(",") : value;
    if (selectedLabels.length > 1) {
      if (selectedLabels.includes("All Branches")) {
        selectedLabels = selectedLabels.filter(
          (label) => label !== "All Branches" && label
        );
        branchValueForApiFilter = branchValueForApiFilter.filter(
          (value) => value !== "" && value
        );
      }
    }
    setSelectedBranch(branchValueForApiFilter[0]);
    setBranchName(selectedLabels);
  };

  const handleOrderTypeChange = (
    event: SelectChangeEvent<typeof orderType>
  ) => {
    const {
      target: { value },
    } = event;

    // select values
    let selectedValues: string[] = [];
    ordersType.map((type) => {
      (typeof value === "string" ? [value] : value).map((label: string) => {
        if (label === type.label) {
          selectedValues.push(type.value);
        }
      });
    });
    // select labels
    let selectedLabels = typeof value === "string" ? value.split(",") : value;

    if (selectedLabels.length > 1) {
      if (selectedLabels.includes("All Order Type")) {
        selectedLabels = selectedLabels.filter(
          (label) => label !== "All Order Type" && label
        );
        selectedValues = selectedValues.filter(
          (value) => value !== "" && value
        );
      }
    }
    // handle canada post
    if (selectedLabels[0] === "Canada Post") {
      setCanadaPost(true);
    } else if (!selectedLabels.includes("Canada Post") && canadaPost) {
      setCanadaPost(false);
    }

    setOrderType(selectedLabels);
    setSelectedOrderType(selectedValues[0]);
  };

  const handleCityChange = (event: SelectChangeEvent<typeof city>) => {
    const {
      target: { value },
    } = event;
    let selectedLabels = typeof value === "string" ? value.split(",") : value;
    if (selectedLabels.length > 1) {
      if (selectedLabels.includes("All Cities")) {
        selectedLabels = selectedLabels.filter(
          (label) => label !== "All Cities" && label
        );
      }
    }
    setCity(selectedLabels);
  };

  const handleStatusChange = (event: SelectChangeEvent<typeof statuses>) => {
    const {
      target: { value },
    } = event;
    let selectedLabels = typeof value === "string" ? value.split(",") : value;
    if (selectedLabels.length > 1) {
      if (selectedLabels.includes("All Status")) {
        selectedLabels = selectedLabels.filter(
          (label) => label !== "All Status" && label
        );
      }
    }
    setStatus(selectedLabels);
  };

  const applyFilter = () => {
    setApiCallFlag("");

    prevPageState.current = undefined;

    setSelectionModel([]);
    setPage(0);

    setApplyFilters(true);
  };

  const AddCurrency = (params: GridRenderCellParams) => {
    return (
      <Stack direction="row" spacing={0.25} sx={{ alignItems: "center" }}>
        <Typography
          sx={{
            fontFamily: "Roboto",
            fontStyle: "normal",
            fontWeight: "400",
            fontSize: "10px",
            lineHeight: "12px",
            color: "#757575",
          }}
        >
          {params.row.currency}
        </Typography>
        <Typography variant="subtitle1" sx={{ color: "#212121" }}>
          {parseFloat(params.value).toFixed(decimalPlaces)}
        </Typography>
      </Stack>
    );
  };

  // table data
  const StyledStatus = (params: GridRenderCellParams) => {
    let color = {
      borderRadius: "100px",
      fontFamily: "Roboto",
      fontStyle: "normal",
      fontWeight: 400,
      fontSize: "13px",
      background: "",
      color: "",
      padding: "",
    };

    switch (params.value) {
      case "Pending": {
        color.background = "#EDE7F6";
        color.color = "#673AB7";
        color.padding = "8px 16px";
        break;
      }
      case "Confirmed": {
        color.background = "#C7FFD6";
        color.color = "#00C853";
        color.padding = "8px 9.5px";
        break;
      }
      case "Cancelled": {
        color.background = "#FBE9E7";
        color.color = "#D84315";
        color.padding = "8px 11px";
        break;
      }
      case "Shipped": {
        color.background = "#E3F2FD";
        color.color = "#2196F3";
        color.padding = "8px 16px";
        break;
      }
      default: {
        //for inprocess
        color.background = "#FFF4D0";
        color.color = "#EEB304";
        color.padding = "8px 11px";
        break;
      }
    }
    return params.row.pre_auth == "1" && params.value == "Pending" ? (
      <>
        <Stack direction={"column"} spacing={1}>
          <Chip
            label={params.value}
            sx={{
              "& .MuiChip-label": {
                p: "unset",
              },
              ...color,
            }}
          />
          <Chip
            label={"Authorized"}
            sx={{
              "& .MuiChip-label": {
                p: "unset",
              },
              background: "#e6fffb",
              color: "#08979c",
              padding: "8px 11px",
              borderColor: "#87e8de",
              display: "block",
            }}
          />
        </Stack>
      </>
    ) : (
      <Chip
        label={params.value}
        sx={{
          "& .MuiChip-label": {
            p: "unset",
          },
          ...color,
        }}
      />
    );
  };

  const linearLoader = () => {
    if (orders.length === 0) {
      // loader for the first time when we have no orders
      return <OrderListingSkeleton />;
    }

    // loader on updating the order
    return <Progress type="linear" />;
  };

  const customNoRowsOverlay = () => {
    return <OrderListingNoRowsOverlay />;
  };

  const columns: GridColumns = [
    {
      field: "order_id",
      headerName: "Order #",
      flex: 0.5,
      headerClassName: classes.colStyle1,
      cellClassName: classes.colStyle1,
      headerAlign: "right",
      align: "right",
      sortable: false,
    },
    {
      field: "name",
      headerName: "Customer Name",
      headerClassName: classes.colStyle1,
      cellClassName: classes.colStyle1,
      flex: 1,
      sortable: false,
    },
    {
      field: "user_city",
      headerName: "City",
      headerClassName: classes.colStyle1,
      cellClassName: classes.colStyle2,
      flex: 0.7,
      sortable: false,
    },
    {
      field: "user_area",
      headerName: "Area",
      headerClassName: classes.colStyle1,
      cellClassName: classes.colStyle2,
      flex: 1.5,
      sortable: false,
    },
    {
      field: "status",
      headerName: "Status",
      headerClassName: classes.colStyle1,
      flex: 0.7,
      sortable: false,
      renderCell: StyledStatus,
    },
    {
      field: "grand_total",
      headerName: "Grand Total",
      headerClassName: classes.colStyle1,
      flex: 0.5,
      headerAlign: "right",
      align: "right",
      sortable: false,
      renderCell: AddCurrency,
    },
  ];

  const handlePageChange = (pageNo: number) => {
    setApiCallFlag("PageChange");

    prevPageState.current = page;

    setSelectionModel([]);
    setPage(pageNo);
  };

  const handlePageSizeChange = (pageSizeNo: number) => {
    setApiCallFlag("");

    prevPageSizeState.current = pageSize;
    prevPageState.current = undefined; // setting this to undefined so that we can get api call for next page

    setPage(0);
    setSelectionModel([]);
    setPageSize(pageSizeNo);
  };

  return (
    <>
      <OptionSetProvider>
        <MainCard
          title={
            <Grid container spacing={2}>
              <Grid
                item
                xs={7}
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Box
                  sx={{
                    width: "100%",
                    maxWidth: "108px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography variant="h3">Orders</Typography>
                  <Box>{getOrderLoader && <Progress type="circle" />}</Box>
                </Box>

                <TdTextField
                  type="search"
                  placeholder="Search Order"
                  onChange={handleSearchChange}
                  sx={{
                    width: "260px",
                    height: "40px",
                    marginLeft: "12px",

                    "& .MuiOutlinedInput-input": {
                      background: "#F5F5F5",
                      padding: "10px 3px !important",
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                      border: "unset",
                    },
                    "& .MuiOutlinedInput-root": {
                      backgroundColor: "#F5F5F5",
                    },
                  }}
                />
              </Grid>
              <Grid
                item
                xs={5}
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
                <ExcelExport
                  tableData={tableData}
                  orderListData={orders}
                  exportType={"OrdersList"}
                />
              </Grid>
            </Grid>
          } // MainCard opening tag closed here
        >
          <Grid container>
            <Grid item xs={12} sx={{ mb: "16px" }}>
              <MultiSelectDropDown
                value={branchName}
                onChange={handleBranchChange}
                dropDownList={branch}
                sx={{ width: "160px", height: "40px" }}
                onChangeButton={applyFilter}
              />
              <MultiSelectDropDown
                value={orderType}
                onChange={handleOrderTypeChange}
                dropDownList={ordersType}
                sx={{ width: "160px", height: "40px", ml: "8px" }}
                onChangeButton={applyFilter}
              />
              <MultiSelectDropDown
                value={city}
                onChange={handleCityChange}
                dropDownList={dropdownCityFilter}
                sx={{ width: "160px", height: "40px", ml: "8px" }}
                onChangeButton={applyFilter}
              />
              <MultiSelectDropDown
                value={statuses}
                onChange={handleStatusChange}
                dropDownList={statusDropdown}
                sx={{ width: "130px", height: "40px", ml: "8px" }}
                onChangeButton={applyFilter}
              />
            </Grid>
          </Grid>

          {selectionModel.length > 0 && (
            <Grid container>
              <Grid item xs={12}>
                <Typography
                  variant="h5"
                  sx={{
                    mb: "20px",
                    color: "#212121",
                  }}
                >
                  {`${selectionModel.length} Order(s)`}
                </Typography>
              </Grid>
            </Grid>
          )}

          <Box
            sx={{
              width: "100%",
              "& .MuiDataGrid-root": {
                border: "none",

                "& .MuiDataGrid-footerContainer": {
                  borderTop: "1px solid #EEEEEE",
                },
                "& .MuiDataGrid-columnHeaders": {
                  borderBottom: "1px solid #EEEEEE",
                },
                "& .MuiDataGrid-cell": {
                  borderBottom: "1px solid #EEEEEE",
                },
                "& .MuiDataGrid-columnSeparator": {
                  display: "none",
                },
                "& .MuiDataGrid-cell:focus-within, & .MuiDataGrid-cell:focus, & .MuiDataGrid-columnHeader:focus, & .MuiDataGrid-columnHeader:focus-within":
                  {
                    outline: "none",
                  },
              },
            }}
          >
            {/* Listing orders  */}
            <DataGrid
              rows={orders}
              columns={columns}
              rowCount={totalOrders}
              getRowId={(r) => r.order_id}
              rowsPerPageOptions={[50, 100]}
              page={page}
              onPageChange={handlePageChange}
              pageSize={pageSize}
              onPageSizeChange={handlePageSizeChange}
              checkboxSelection
              autoHeight
              disableColumnMenu
              hideFooterSelectedRowCount
              onRowClick={(params: GridRowParams) => {
                setSelectedOrder({
                  order_id: params.row.order_id,
                  user_email: params.row.user_email,
                });
                prevOrderDetailModalState.current = orderDetailModal;
                setApiCallFlag("OrderUpdate");
                setOrderDetailModal(true);
              }}
              onSelectionModelChange={(newSelectionModel) => {
                setSelectionModel(newSelectionModel);
              }}
              selectionModel={selectionModel}
              components={{
                NoRowsOverlay: customNoRowsOverlay,
                LoadingOverlay: linearLoader,
              }}
              loading={getOrderLoader}
              getRowHeight={({ model }: GridRowHeightParams) => {
                if (model.pre_auth === "1" && model.status === "Pending") {
                  return 90;
                } else {
                  return null;
                }
              }}
            />
          </Box>

          {/* Order Detail modal */}
          {orderDetailModal && (
            <OrderDetail
              selectedOrder={selectedOrder}
              orderDetailModal={orderDetailModal}
              setOrderDetailModal={setOrderDetailModal}
              setSelectionModel={setSelectionModel}
            />
          )}
        </MainCard>
      </OptionSetProvider>
    </>
  );
};

export default Orders;
