import React, { useContext, useEffect, useState } from "react";

import {
  Typography,
  Stack,
  Box,
  Grid,
  Divider,
  Modal,
  IconButton,
  CardContent,
  Skeleton,
} from "@mui/material";
import {
  GridColumns,
  DataGrid,
  GridRenderCellParams,
  GridRowParams,
  GridSelectionModel,
  GridRowHeightParams,
} from "@mui/x-data-grid";

import CustomButton from "components/CustomButton";
import MainCard from "components/cards/MainCard";

const OrderDetails = (details: any, setOrderDetailModal: boolean) => {
  const [deliveryChargesModal, setDeliveryChargesModal] = useState(false);

  useEffect(() => {
    if (details.length > 0) {
      setDeliveryChargesModal(true);
    }
  }, [details]);

  const toggleDeliveryChargesModal = () => {
    // if (!customerDetailModal) {
    //   setCustomerAddress(orderFromAPI[0].address);
    //   setCustomerMobileNo(orderFromAPI[0].mobile_number);
    // }

    setDeliveryChargesModal((state) => !state);
  };

  const columns: GridColumns = [
    {
      field: "menu_item_id",
      headerName: "Item#",
      flex: 0.5,
      // headerClassName: classes.colStyle1,
      // cellClassName: classes.colStyle1,
      headerAlign: "right",
      align: "right",
      sortable: false,
    },
    {
      field: "dname",
      headerName: "Item Name",
      // headerClassName: classes.colStyle1,
      // cellClassName: classes.colStyle1,
      flex: 1,
      sortable: false,
    },
    {
      field: "dqty",
      headerName: "Quantity",
      // headerClassName: classes.colStyle1,
      // cellClassName: classes.colStyle2,
      flex: 0.7,
      sortable: false,
    },
    {
      field: "dprice",
      headerName: "Price",
      // headerClassName: classes.colStyle1,
      // cellClassName: classes.colStyle2,
      flex: 1.5,
      sortable: false,
    },
    {
      field: "discount",
      headerName: "Discount",
      // headerClassName: classes.colStyle1,
      flex: 0.7,
      sortable: false,
      // renderCell: StyledStatus,
    },
    {
      field: "tax",
      headerName: "Tax",
      // headerClassName: classes.colStyle1,
      flex: 0.5,
      headerAlign: "right",
      align: "right",
      sortable: false,
      // renderCell: AddCurrency,
    },
    {
      field: "dtotal",
      headerName: "Total",
      // headerClassName: classes.colStyle1,
      flex: 0.5,
      headerAlign: "right",
      align: "right",
      sortable: false,
      // renderCell: AddCurrency,
    },
  ];

  return (
    <Modal // Delivery charges modal
      open={deliveryChargesModal}
      onClose={toggleDeliveryChargesModal}
    >
      <MainCard
        dividerSX={{ m: "0px 0px 33px 0px !important" }}
        headerSX={{
          p: "unset !important",
          mb: "16px",
        }}
        contentSX={{
          "& .MuiCardContent-root": {
            p: "unset !important",
          },
          m: "unset",
          p: "unset !important",
        }}
        sx={{
          m: "unset",
          p: "40px",
          width: "40vw",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
        title={
          <Stack
            direction="row"
            sx={{ justifyContent: "space-between", alignItems: "center" }}
          >
            <Box
              sx={{
                width: "100%",
                maxWidth: "290px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography variant={"h3"}>Edit Delivery Charges</Typography>
              {/* <Box>{customerDetailLoader && <Progress type="circle" />}</Box> */}
            </Box>

            {/* <IconButton
                    sx={{ p: "unset" }}
                    onClick={() => {
                      setCanadaPostDeliveryCharges("");
                      setDeliveryChargesField("");
                      toggleDeliveryChargesModal();
                    }}
                  >
                    <HighlightOffTwoTone
                      sx={{ color: "#D84315" }}
                      fontSize="large"
                    />
                  </IconButton> */}
          </Stack>
        }
      >
        {/* <CardContent>
                <Stack
                  sx={{
                    mb: "33px",
                    alignItem: "center",
                  }}
                >
                  {selectedOrderContext.canada_post === "1" ? (
                    <>
                      <Typography variant="h5">Select Canada Post</Typography>
                      <CustomRadioButton
                        sx={{
                          display: "inline !important",
                        }}
                        options={deliveryChargesList}
                        onChange={canadaPostHandler}
                        value={canadaPostDeliveryCharges}
                      />
                    </>
                  ) : (
                    <TdTextField
                      type="text"
                      label="Delivery Charges"
                      value={deliveryChargeField}
                      onChange={handleDeliveryChargesField}
                      error={fieldError.deliveryCharges === "" ? false : true}
                      helperText={fieldError.deliveryCharges}
                    />
                  )}
                </Stack>
                <Stack direction="row" sx={{ justifyContent: "end" }}>
                  <CustomButton
                    color={"secondary"}
                    variant={"contained"}
                    onClick={handleDeliveryChargesUpdate}
                    sx={{
                      p: "13px 44px",
                      fontFamily: "Roboto",
                      fontStyle: "normal",
                      fontWeight: 500,
                      fontSize: "14px",
                    }}
                  >
                    Update
                  </CustomButton>
                </Stack>
              </CardContent> */}

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
          <DataGrid // listing orders
            rows={details}
            columns={columns}
            // rowCount={totalOrders}
            //   getRowId={(r) => r.orderid}
            //   rowsPerPageOptions={[50, 100]}
            // page={page}
            // onPageChange={handlePageChange}
            // pageSize={pageSize}
            // onPageSizeChange={handlePageSizeChange}
            // checkboxSelection
            autoHeight
            disableColumnMenu
            hideFooterSelectedRowCount
            //   onRowClick={(params: GridRowParams) => {
            // fetchOrderDetail(params.row.orderid);
            //   }}
            // onSelectionModelChange={(newSelectionModel) => {
            // setSelectionModel(newSelectionModel);
            // }}
            // selectionModel={selectionModel}
            //   components={{
            // NoRowsOverlay: customNoRowsOverlay,
            // LoadingOverlay: linearLoader,
            //   }}
            // loading={getOrderLoader}
            // getRowHeight={({ model }: GridRowHeightParams) => {
            //   if (model.pre_auth === "1" && model.status === "Pending") {
            //     return 90;
            //   } else {
            //     return null;
            //   }
            // }}
          />
        </Box>
      </MainCard>
    </Modal>
  );
};

export default OrderDetails;
