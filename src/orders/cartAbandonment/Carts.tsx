import { useEffect, useState } from "react";

import { makeStyles } from "@mui/styles";
import {
  GridColumns,
  DataGrid,
  GridRenderCellParams,
  GridRowParams,
} from "@mui/x-data-grid";
import { Box, Typography, Grid, Stack } from "@mui/material";

import moment from "moment";
import useAxios from "axios-hooks";

import { OrderListingSkeleton } from "components/skeleton/OrderListingSkeleton";
import { TableNoRowsOverlay } from "components/skeleton/TableNoRowsOverlay";
import MainCard from "components/cards/MainCard";
import Progress from "components/Progress";

import { toCapitalizeFirstLetter } from "orders/HelperFunctions";
import CartDetails from "./CartDetails";
import {
  currencyStyle,
  cartListingHeaderStyle,
  cartListingTableStyle,
} from "./Styles";
import { setDate } from "store/slices/Main";
import { useDispatch, useSelector } from "store";
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
  orderIdColumnStyle: {
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: "14px",
    paddingLeft: "unset !important",
    color: "#212121",
  },
  headerStyles: {
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: "14px",
    color: "#212121",
  },
}));

const Carts = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { eatout_id } = JSON.parse(localStorage.getItem("businessInfo")!);
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
    const duplicateCartOrders = [
      ...abandonedOrders.result.filter_orders_by_date,
    ];

    const updatedCartOrders = duplicateCartOrders.map(
      (cart: CartAbandonmentResponse) => {
        cart.order["orderDetails"] = cart.order_details;
        return cart.order;
      }
    );

    setCartOrders(updatedCartOrders);
  };

  const fetchOrderDetail = (orderId: number) => {
    const selectedOrder = cartOrders.filter(
      (cart: AbandonedCartOrder) => cart.orderid === orderId.toString()
    );

    setSelectedCartOrder(selectedOrder);
    setOrderDetailModal(true);
  };

  const linearLoader = () => {
    // table loader on changing the date
    return <Progress type="linear" />;
  };

  const customNoRowsOverlay = () => {
    return <TableNoRowsOverlay />;
  };

  const formatDate = (params: GridRenderCellParams) => {
    return (
      <Typography variant="subtitle1" sx={{ color: "#212121" }}>
        {moment(params.value).format("MMM Do, YYYY hh:mm a")}
      </Typography>
    );
  };

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
  };

  const formatString = (params: GridRenderCellParams) => {
    return (
      <Typography variant="body1" sx={{ color: "#212121" }}>
        {params.value ? toCapitalizeFirstLetter(params.value) : "-"}
      </Typography>
    );
  };

  const addCurrency = (params: GridRenderCellParams) => {
    return (
      <Stack direction="row" spacing={0.25} sx={{ alignItems: "center" }}>
        <Typography sx={currencyStyle}>{currency}</Typography>
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
      headerClassName: classes.orderIdColumnStyle,
      cellClassName: classes.orderIdColumnStyle,
      sortable: false,
    },
    {
      field: "delivery",
      headerName: "Date & Time",
      headerClassName: classes.headerStyles,
      flex: 1,
      sortable: false,
      renderCell: formatDate,
    },
    {
      field: "email",
      headerName: "Email",
      headerClassName: classes.headerStyles,
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
      headerClassName: classes.headerStyles,
      flex: 0.7,
      sortable: false,
      renderCell: formatString,
    },
    {
      field: "source",
      headerName: "Source",
      headerClassName: classes.headerStyles,
      flex: 0.5,
      sortable: false,
      renderCell: formatString,
    },
    {
      field: "total",
      headerName: "Total",
      headerClassName: classes.headerStyles,
      flex: 0.6,
      headerAlign: "right",
      align: "right",
      sortable: false,
      renderCell: addCurrency,
    },
  ];

  return (
    <>
      <MainCard
        title={
          <Grid container>
            <Grid item xs={12} sx={cartListingHeaderStyle}>
              <Typography variant="h3">Abandoned Carts</Typography>
            </Grid>
          </Grid>
        } // MainCard opening tag closed here
      >
        <Box sx={cartListingTableStyle}>
          {!abandonedOrders ? (
            <OrderListingSkeleton />
          ) : (
            // cart orders listing
            <DataGrid
              rows={cartOrders}
              columns={columns}
              getRowId={(r) => r.orderid}
              rowsPerPageOptions={[50, 100]}
              autoHeight
              disableColumnMenu
              hideFooterSelectedRowCount
              onRowClick={(params: GridRowParams) => {
                fetchOrderDetail(params.row.orderid);
              }}
              components={{
                NoRowsOverlay: customNoRowsOverlay,
                LoadingOverlay: linearLoader,
              }}
              loading={abandonedOrdersLoader}
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
