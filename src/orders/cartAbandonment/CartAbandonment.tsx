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

import { OrderListingSkeleton } from "components/skeleton/OrderListingSkeleton";
import { OrderListingNoRowsOverlay } from "components/skeleton/OrderListingNoRowsOverlay";
import MainCard from "components/cards/MainCard";
import CustomButton from "components/CustomButton";

import { setDate, setGlobalSettings } from "store/slices/Main";
import { useDispatch, useSelector } from "store";
import moment from "moment";

import useAxios, { configure } from "axios-hooks";
import { axios } from "config";

configure({ axios });

const CartAbandonment = () => {
  const dispatch = useDispatch();
  const { eatout_id, user_id } = JSON.parse(
    localStorage.getItem("businessInfo")!
  );

  const { startDate, endDate, decimalPlaces } = useSelector(
    (state) => state.main
  );

  //======================================= API Calls =======================================//

  const [{ data: abandonedOrders }, abandonedCartsAPICall] = useAxios(
    {
      url: `https://apidev.tossdown.com/businesses/${eatout_id}/cart-abandonment?date_from=${startDate}&date_to=${endDate}`,
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
    // last48Hours = false;

    (async () => {
      if (startDate && endDate) {
        // API call on searching items (add item)

        alert("api call");

        const { data } = await abandonedCartsAPICall({
          url: `https://apidev.tossdown.com/businesses/${eatout_id}/cart-abandonment?date_from=${startDate}&date_to=${endDate}`,
        });

        console.log("carts data = ", data);
      }
    })();
  }, [startDate, endDate]);

  return (
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

            <CustomButton
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
            </CustomButton>
          </Grid>
        </Grid>
      } // MainCard opening tag closed here
    >
      {/* <Box
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
        {!allOrders ? (
          <OrderListingSkeleton />
        ) : (
          <DataGrid // listing orders
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
            // getRowHeight={({ model }: GridRowHeightParams) => {
            //   if (model.pre_auth === "1" && model.status === "Pending") {
            //     return 90;
            //   } else {
            //     return null;
            //   }
            // }}
          />
        )}
      </Box> */}
    </MainCard>
  );
};

export default CartAbandonment;
