import React, { lazy, useEffect, useRef, useState } from "react";

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

import { OrderListingSkeleton } from "components/skeleton/OrderListingSkeleton";
import { TableNoRowsOverlay } from "components/skeleton/TableNoRowsOverlay";
import MainCard from "components/cards/MainCard";
import CustomButton from "components/CustomButton";
import Progress from "components/Progress";
import CartDetails from "./CartDetails";

import { setDate, setGlobalSettings } from "store/slices/Main";
import { useDispatch, useSelector } from "store";
import moment from "moment";
import useAxios from "axios-hooks";
import { GATEWAY_API_URL } from "config";

const useStyles = makeStyles(() => ({
  phoneNoColumnHeaderStyle: {
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: "14px",
    paddingLeft: "unset !important",
    paddingRight: "50px !important",
    color: "#212121",
  },
  phoneNoColumnCellsStyle: {
    fontWeight: "400",
    color: "#212121",
    paddingLeft: "unset !important",
    paddingRight: "50px !important",
  },
  orderIdColumnHeaderStyle: {
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: "14px",
    paddingLeft: "unset !important",
    color: "#212121",
  },
  orderIdColumnCellsStyle: {
    fontWeight: "400",
    color: "#212121",
    paddingLeft: "unset !important",
  },
  colStyle1: {
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: "14px",
    // lineHeight: "16px",
    color: "#212121",
  },
  colStyle2: {
    fontWeight: "400",
    color: "#212121",
  },
}));

const Carts = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { eatout_id, user_id } = JSON.parse(
    localStorage.getItem("businessInfo")!
  );

  const { startDate, endDate, decimalPlaces, currency } = useSelector(
    (state) => state.main
  );

  const [cartOrders, setCartOrders] = useState<AbandonedCartOrder[] | []>([]);
  const [selectedCartOrder, setSelectedCartOrder] = useState<
    AbandonedCartOrder[] | []
  >([]);
  const [orderDetailModal, setOrderDetailModal] = useState(false);

  //======================================= API Calls =======================================//
  const cartAbandonmentUrl = `${GATEWAY_API_URL}/businesses/${eatout_id}/cart-abandonment?date_from=${startDate}&date_to=${endDate}`;

  const [
    { data: abandonedOrders, loading: abandonedOrdersLoader },
    abandonedCartsAPICall,
  ] = useAxios(
    {
      url: cartAbandonmentUrl,
      method: "GET",
    },
    { manual: true }
  );

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
    if (abandonedOrders && !Array.isArray(abandonedOrders.result)) {
      makeOrdersArrayForTable();
    }
  }, [abandonedOrders]);

  useEffect(() => {
    (async () => {
      if (startDate && endDate) {
        abandonedCartsAPICall({
          url: cartAbandonmentUrl,
          method: "GET",
        });
      }
    })();
  }, [startDate, endDate]);

  //======================================= Handlers Functions =======================================//

  const makeOrdersArrayForTable = () => {
    // alert("func");
    // debugger;
    // if (abandonedOrders.result.filter_orders_by_date) {
    const duplicateCartOrders = [
      ...abandonedOrders.result.filter_orders_by_date,
    ];

    // console.log(
    //   "api response 0 = ",
    //   abandonedOrders.result.filter_orders_by_date
    // );

    // console.log("duplicateCartOrders = ", duplicateCartOrders);

    const updatedCartOrders = duplicateCartOrders.map(
      (cart: CartAbandonmentResponse) => {
        cart.order["orderDetails"] = cart.order_details;
        return cart.order;
      }
    );

    // console.log("updatedCartOrders = ", updatedCartOrders);
    // console.log(
    //   "api response = ",
    //   abandonedOrders.result.filter_orders_by_date
    // );

    setCartOrders(updatedCartOrders);
    // }
  };

  const fetchOrderDetail = (orderId: number) => {
    const selectedOrder = cartOrders.filter(
      (cart: AbandonedCartOrder) => cart.orderid === orderId.toString()
      // (cart: AbandonedCartOrders) => {
      //   if (cart && cart.order && cart.order.orderid === orderId.toString()) {
      //     console.log("cart = ", cart);
      //     setSelectedCartOrder(cart);
      //     setOrderDetailModal(true);
      //   }
      // }
    );
    // abandonedOrders &&
    //   abandonedOrders.result.filter_orders_by_date.forEach(
    //     (cart: CartAbandonmentResponse) => {
    //       if (cart && cart.order && cart.order.orderid === orderId.toString()) {
    //         console.log("cart = ", cart);
    //         setSelectedCartOrder(cart);
    //         setOrderDetailModal(true);
    //       }
    //     }
    //   );

    setSelectedCartOrder(selectedOrder);
    setOrderDetailModal(true);

    // console.log("selectedOrder = ", selectedOrder);
  };

  const linearLoader = () => {
    // loader on changing the date
    return <Progress type="linear" />;
  };

  const customNoRowsOverlay = () => {
    return <TableNoRowsOverlay />;
  };
  //====================================================================================
  const formatDate = (params: GridRenderCellParams) => {
    return (
      <Typography variant="body1" sx={{ color: "#212121" }}>
        {moment(params.value).format("MMM Do, YYYY hh:mm a")}
      </Typography>
    );
  };

  // const emailValidation = (params: GridRenderCellParams) => {
  //   return params.value && params.value === "0" ? "-" : params.value;
  // };

  const emailAndPhoneValidation = (params: GridRenderCellParams) => {
    if (params.value === "" || params.value === "0") {
      return (
        <Typography variant="body1" sx={{ color: "#212121" }}>
          -
        </Typography>
      );
    } else {
      return (
        <Typography variant="body1" sx={{ color: "#212121" }}>
          {params.value}
        </Typography>
      );
    }

    // return params.value && params.value === "0" ? "-" : params.value;
  };

  const formatString = (params: GridRenderCellParams) => {
    return (
      <Typography variant="body1" sx={{ color: "#212121" }}>
        {params.value
          ? params.value.charAt(0).toUpperCase() + params.value.slice(1)
          : "-"}
      </Typography>
    );
  };

  const addCurrency = (params: GridRenderCellParams) => {
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
          {currency}
        </Typography>
        <Typography variant="subtitle1" sx={{ color: "#212121" }}>
          {parseFloat(params.value).toFixed(decimalPlaces)}
        </Typography>
      </Stack>
    );
  };

  const columns: GridColumns = [
    {
      field: "orderid",
      headerName: "Order#",
      flex: 0.5,
      headerClassName: classes.orderIdColumnHeaderStyle,
      cellClassName: classes.orderIdColumnCellsStyle,
      sortable: false,
    },
    {
      field: "delivery",
      headerName: "Date & Time",
      headerClassName: classes.colStyle1,
      // cellClassName: classes.colStyle2,
      flex: 1,
      sortable: false,
      renderCell: formatDate,
    },
    {
      field: "email",
      headerName: "Email",
      headerClassName: classes.colStyle1,
      // cellClassName: classes.colStyle2,
      flex: 1.2,
      sortable: false,
      renderCell: emailAndPhoneValidation,
    },
    {
      field: "mobile_phone",
      headerName: "Phone #",
      headerClassName: classes.phoneNoColumnHeaderStyle,
      cellClassName: classes.phoneNoColumnCellsStyle,
      headerAlign: "right",
      align: "right",
      flex: 0.9,
      sortable: false,
      renderCell: emailAndPhoneValidation,
    },
    {
      field: "order_type",
      headerName: "Order type",
      headerClassName: classes.colStyle1,
      flex: 0.7,
      sortable: false,
      renderCell: formatString,
    },
    {
      field: "source",
      headerName: "Source",
      headerClassName: classes.colStyle1,
      flex: 0.5,
      // headerAlign: "right",
      // align: "right",
      sortable: false,
      renderCell: formatString,
    },
    {
      field: "total",
      headerName: "Total",
      headerClassName: classes.colStyle1,
      flex: 0.6,
      headerAlign: "right",
      align: "right",
      sortable: false,
      renderCell: addCurrency,
    },
  ];

  // const CartDetails = lazy(() =>
  //   import("./CartDetails").then((CartDetails) => CartDetails)
  // );

  return (
    <>
      <MainCard
        title={
          <Grid container>
            <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography variant="h3">Abandoned Carts</Typography>

              {/* <CustomButton
                variant={"contained"}
                color={"secondary"}
                sx={{
                  p: "12px 32px",
                  ml: "13px",
                  height: "44px",
                  width: "151px",
                }}
                // onClick={fileExport}
              >
                Export Carts
              </CustomButton> */}
            </Grid>
          </Grid>
        } // MainCard opening tag closed here
      >
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
          {!abandonedOrders ? (
            <OrderListingSkeleton />
          ) : (
            // listing cart orders
            <DataGrid
              rows={cartOrders}
              columns={columns}
              // rowCount={totalOrders}
              getRowId={(r) => r.orderid}
              rowsPerPageOptions={[50, 100]}
              // page={page}
              // onPageChange={handlePageChange}
              // pageSize={pageSize}
              // onPageSizeChange={handlePageSizeChange}
              // checkboxSelection
              autoHeight
              disableColumnMenu
              hideFooterSelectedRowCount
              onRowClick={(params: GridRowParams) => {
                fetchOrderDetail(params.row.orderid);
              }}
              // onSelectionModelChange={(newSelectionModel) => {
              // setSelectionModel(newSelectionModel);
              // }}
              // selectionModel={selectionModel}
              components={{
                NoRowsOverlay: customNoRowsOverlay,
                LoadingOverlay: linearLoader,
              }}
              loading={abandonedOrdersLoader}
              // getRowHeight={({ model }: GridRowHeightParams) => {
              //   if (model.pre_auth === "1" && model.status === "Pending") {
              //     return 90;
              //   } else {
              //     return null;
              //   }
              // }}
            />
          )}
        </Box>
      </MainCard>

      {/* order details of cart orders */}
      {orderDetailModal && (
        <CartDetails
          selectedCartOrder={selectedCartOrder[0]}
          setOrderDetailModal={setOrderDetailModal}
        />
      )}
    </>
  );
};

export default Carts;
