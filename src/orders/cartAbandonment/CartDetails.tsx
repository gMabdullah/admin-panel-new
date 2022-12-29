import React from "react";

import {
  Typography,
  Stack,
  Box,
  Grid,
  Divider,
  Modal,
  IconButton,
} from "@mui/material";
import {
  AccountCircleTwoTone,
  SmartphoneTwoTone,
  PinDropTwoTone,
  HighlightOffTwoTone,
} from "@mui/icons-material";
import { GridColumns, DataGrid, GridRenderCellParams } from "@mui/x-data-grid";
import { makeStyles } from "@mui/styles";

import MainCard from "components/cards/MainCard";
import GoogleMapFrame from "components/GoogleMapFrame";

import { toCapitalizeFirstLetter } from "orders/HelperFunctions";

import { useSelector } from "store";
import moment from "moment";

interface cartDetailsProp {
  selectedCartOrder: AbandonedCartOrder;
  setOrderDetailModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const useStyles = makeStyles(() => ({
  backDrop: {
    backdropFilter: "blur(0px)",
    backgroundColor: "transparent",
  },
  modalStyle1: {
    overflow: "scroll",
  },
  excelExportFile: {
    width: "104px",
    height: " 20px",
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: 500,
    fontSize: "14px",
    lineHeight: "20px",
  },
  downloadPdf: {
    width: "92px",
    height: "20px",
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: 500,
    fontSize: "14px",
    lineHeight: "20px",
  },
  pdf_print_user_phone_location_IconColor: {
    color: "#616161",
  },
  printHeading: {
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: 500,
    fontSize: "14px",
    lineHeight: "20px",
  },
  tableTotalColumn: {
    paddingRight: "30px !important",
    fontWeight: 500,
    color: "#212121",
  },
  tableItemQuantityDiscountColumn: {
    fontWeight: 400,
    color: "#212121",
  },
  tableItemNamePriceColumn: {
    fontWeight: 500,
    color: "#212121",
  },
}));

const CartDetails = ({
  selectedCartOrder,
  setOrderDetailModal,
}: cartDetailsProp) => {
  const { decimalPlaces } = useSelector((state) => state.main);
  const classes = useStyles();

  const toggleCartDetailsModal = () => {
    setOrderDetailModal((state) => !state);
  };

  const taxValidation = (params: GridRenderCellParams) => {
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

  const columns: GridColumns = [
    {
      field: "menu_item_id",
      headerName: "Item#",
      flex: 0.6,
      cellClassName: classes.tableItemQuantityDiscountColumn,
      sortable: false,
    },
    {
      field: "dname",
      headerName: "Item Name",
      headerClassName: classes.tableItemNamePriceColumn,
      cellClassName: classes.tableItemQuantityDiscountColumn,
      flex: 1.5,
      sortable: false,
    },
    {
      field: "dqty",
      headerName: "Quantity",
      cellClassName: classes.tableItemQuantityDiscountColumn,
      flex: 0.5,
      sortable: false,
    },
    {
      field: "dprice",
      headerName: "Price",
      cellClassName: classes.tableItemNamePriceColumn,
      flex: 0.7,
      sortable: false,
    },
    {
      field: "discount",
      headerName: "Discount",
      cellClassName: classes.tableItemQuantityDiscountColumn,
      flex: 0.6,
      sortable: false,
    },
    {
      field: "tax",
      headerName: "Tax",
      flex: 0.4,
      headerAlign: "right",
      align: "right",
      sortable: false,
      renderCell: taxValidation,
    },
    {
      field: "dtotal",
      headerName: "Total",
      headerClassName: classes.tableTotalColumn,
      cellClassName: classes.tableTotalColumn,
      flex: 0.6,
      headerAlign: "right",
      align: "right",
      sortable: false,
    },
  ];

  return (
    <Modal
      open={true}
      // open={cart ? true : false}
      className={classes.modalStyle1}
      BackdropProps={{
        classes: {
          root: classes.backDrop,
        },
      }}
    >
      <MainCard
        dividerSX={{ m: "unset", display: "none" }}
        headerSX={{ p: "unset !important", mb: "32px" }}
        contentSX={{
          "& .MuiCardContent-root": {
            p: "unset !important",
          },
          m: "unset",
          p: "unset !important",
        }}
        sx={{
          m: "unset",
          borderRadius: "unset",
          p: "48px 55px",
          border: "none",
        }}
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
              <Grid
                item
                xs={11}
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Typography variant="h1">
                  Cart
                  {` ${selectedCartOrder.orderid}`}
                </Typography>

                <Typography
                  variant={"subtitle1"}
                  sx={{ fontWeight: "400", ml: "16px" }}
                >
                  {moment(selectedCartOrder.delivery).format(
                    "MMM Do, YYYY hh:mm a"
                  )}
                </Typography>
              </Grid>

              <Grid
                item
                xs={1}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "end",
                }}
              >
                <Stack
                  sx={{
                    cursor: "pointer",
                    alignItems: "center",
                    ml: "48px",
                  }}
                >
                  <IconButton
                    sx={{ p: "unset" }}
                    onClick={toggleCartDetailsModal}
                  >
                    <HighlightOffTwoTone
                      sx={{ color: "#D84315" }}
                      fontSize="large"
                    />
                  </IconButton>
                </Stack>
              </Grid>
            </Grid>
          </Grid>
        }
      >
        <Grid container>
          <Grid item xs={12} sx={{ display: "flex" }}>
            <Grid item xs={8.3}>
              {/* customer section boz */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  border: "1px solid #EEEEEE",
                  borderRadius: "8px",
                  p: "10px 12px 10px 16px",
                  mb: "12px",
                }}
              >
                {selectedCartOrder.name ||
                (selectedCartOrder.mobile_phone &&
                  selectedCartOrder.mobile_phone !== "0") ||
                selectedCartOrder.city ||
                selectedCartOrder.area ? (
                  <Stack
                    spacing={3}
                    direction="row"
                    divider={
                      <Divider
                        orientation="vertical"
                        sx={{ border: "1px solid #EEEEEE" }}
                        flexItem
                      />
                    }
                  >
                    {selectedCartOrder.name && (
                      <Stack
                        direction="row"
                        sx={{
                          alignItems: "center",
                        }}
                        spacing={1}
                      >
                        <AccountCircleTwoTone
                          className={
                            classes.pdf_print_user_phone_location_IconColor
                          }
                        />
                        <Typography variant={"subtitle1"}>
                          {selectedCartOrder.name}
                        </Typography>
                      </Stack>
                    )}

                    {selectedCartOrder.mobile_phone && (
                      <Stack
                        direction="row"
                        sx={{
                          alignItems: "center",
                        }}
                        spacing={1}
                      >
                        <SmartphoneTwoTone
                          className={
                            classes.pdf_print_user_phone_location_IconColor
                          }
                          fontSize="small"
                        />
                        <Typography variant={"subtitle1"}>
                          {selectedCartOrder.mobile_phone}
                        </Typography>
                      </Stack>
                    )}

                    {selectedCartOrder.area && selectedCartOrder.city && (
                      <Stack
                        direction="row"
                        sx={{
                          alignItems: "center",
                        }}
                        spacing={1}
                      >
                        <PinDropTwoTone
                          className={
                            classes.pdf_print_user_phone_location_IconColor
                          }
                        />
                        <Typography variant={"subtitle1"}>
                          {`${selectedCartOrder.area}, ${selectedCartOrder.city}`}
                        </Typography>
                      </Stack>
                    )}
                  </Stack>
                ) : (
                  <Grid
                    xs={12}
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      m: "15px 0px",
                    }}
                  >
                    <Typography variant={"subtitle1"}>
                      No Customer Details
                    </Typography>
                  </Grid>
                )}
              </Box>

              {/* delivery details section box */}
              <Box
                sx={{
                  border: "1px solid #EEEEEE",
                  borderRadius: "8px",
                  p: "17px 12px 24px 16px",
                  mb: "16px",
                  boxSizing: "border-box",
                }}
              >
                <Stack direction="column">
                  {selectedCartOrder.address ||
                  selectedCartOrder.order_type ||
                  selectedCartOrder.note ? (
                    <>
                      <Stack direction="row">
                        <Typography variant="h4">Delivery Details</Typography>
                      </Stack>

                      {/* address stack */}
                      {selectedCartOrder.address && (
                        <Stack direction="row" sx={{ mt: "15px" }}>
                          <Typography variant="subtitle1">Address:</Typography>
                          <Typography variant="h5" sx={{ ml: "64px" }}>
                            {selectedCartOrder.address}
                          </Typography>
                        </Stack>
                      )}

                      {/* order type stack */}
                      {selectedCartOrder.order_type && (
                        <Stack direction="row" sx={{ mt: "16px" }}>
                          <Typography variant="subtitle1">
                            Order type:
                          </Typography>
                          <Typography variant="h5" sx={{ ml: "52px" }}>
                            {toCapitalizeFirstLetter(
                              selectedCartOrder.order_type
                            )}
                          </Typography>
                        </Stack>
                      )}

                      {/* Note Stack */}
                      {selectedCartOrder.note && (
                        <Stack direction="row" sx={{ mt: "16px" }}>
                          <Typography variant="subtitle1">Note:</Typography>
                          <Typography variant="h5" sx={{ ml: "86px" }}>
                            {selectedCartOrder.note}
                          </Typography>
                        </Stack>
                      )}
                    </>
                  ) : (
                    <Stack
                      direction="row"
                      sx={{
                        justifyContent: "center",
                        alignItems: "center",
                        m: "15px 0px",
                      }}
                    >
                      <Typography variant={"subtitle1"}>
                        No Delivery Details
                      </Typography>
                    </Stack>
                  )}
                </Stack>
              </Box>

              {/* table & calculation section card */}
              <MainCard
                dividerSX={{ m: "0px 0px 0px 0px !important" }}
                headerSX={{ p: "unset !important", mb: "20px" }}
                contentSX={{
                  "& .MuiCardContent-root": {
                    p: "unset !important",
                  },
                  m: "unset",
                  p: "unset !important",
                }}
                sx={{
                  m: "unset",
                  p: "20px 16px 16px",
                  borderColor: "#EEEEEE",
                }}
                title={<Typography variant={"h4"}>Cart Items</Typography>}
              >
                <Box
                  sx={{
                    width: "100%",

                    "& .MuiDataGrid-root": {
                      border: "none",
                    },
                    "& .MuiDataGrid-columnHeaderTitle": {
                      color: "#212121",
                    },
                    "& .MuiDataGrid-columnHeader": {
                      pl: "unset",
                      pr: "15px",
                    },
                    "& .MuiDataGrid-columnHeaders": {
                      borderBottom: "1px solid #EEEEEE",
                    },
                    "& .MuiIconButton-root": {
                      p: "unset",
                    },
                    "& .MuiDataGrid-columnSeparator": {
                      display: "none",
                    },
                    "& .MuiDataGrid-cell:focus-within, & .MuiDataGrid-cell:focus, & .MuiDataGrid-columnHeader:focus, & .MuiDataGrid-columnHeader:focus-within":
                      {
                        outline: "none",
                      },
                    "& .MuiDataGrid-row": {
                      maxHeight: "fit-content !important",
                    },
                    "& .MuiDataGrid-cell": {
                      maxHeight: "fit-content !important",
                      overflow: "auto",
                      whiteSpace: "initial !important",
                      lineHeight: "16px !important",
                      display: "flex !important",
                      alignItems: "start",
                      p: "25px 15px 25px 0px",
                      borderBottom: "1px solid #EEEEEE",
                    },
                    "& .MuiDataGrid-virtualScrollerContent": {
                      height: "100% !important",
                    },
                    "& .MuiDataGrid-virtualScrollerRenderZone": {
                      position: "unset",
                    },
                  }}
                >
                  <DataGrid
                    rows={selectedCartOrder.orderDetails}
                    getRowId={(row) => row.odetailid}
                    columns={columns}
                    autoHeight
                    disableColumnMenu
                    hideFooterSelectedRowCount
                    hideFooter
                  />
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "end",
                    background: "#F5F5F5",
                    borderRadius: "8px",
                    p: "24px 31px",
                    mt: "2px",
                  }}
                >
                  <Grid item xs={4.8}>
                    <Stack
                      direction={"row"}
                      sx={{ justifyContent: "space-between" }}
                    >
                      <Stack direction={"column"}>
                        {/* Sub Total */}
                        <Stack direction={"row"} sx={{ justifyContent: "end" }}>
                          <Typography variant="subtitle1">Sub Total</Typography>
                        </Stack>

                        {/* Discount */}
                        {Number(selectedCartOrder.discount) > 0 && (
                          <Stack
                            direction={"row"}
                            sx={{ mt: "14px", justifyContent: "end" }}
                          >
                            <Typography variant="subtitle1">
                              Discount
                            </Typography>
                          </Stack>
                        )}

                        {/* Delivery Charges */}
                        <Stack
                          direction={"row"}
                          sx={{ mt: "14px", justifyContent: "end" }}
                        >
                          <Typography
                            variant="subtitle1"
                            sx={{ display: "flex", alignItems: "end" }}
                          >
                            Delivery Charges
                          </Typography>
                        </Stack>

                        {/* Tax */}
                        {Number(selectedCartOrder.tax) > 0 && (
                          <Stack
                            direction={"row"}
                            sx={{ mt: "14px", justifyContent: "end" }}
                          >
                            <Typography variant="subtitle1">Tax</Typography>
                          </Stack>
                        )}

                        {/* Tip */}
                        {Number(selectedCartOrder.tip) > 0 && (
                          <Stack
                            direction={"row"}
                            sx={{ mt: "14px", justifyContent: "end" }}
                          >
                            <Typography variant="subtitle1">Tip</Typography>
                          </Stack>
                        )}

                        {/* Service Charges */}
                        {Number(selectedCartOrder.service_charges) > 0 && (
                          <Stack
                            direction={"row"}
                            sx={{ mt: "14px", justifyContent: "end" }}
                          >
                            <Typography variant="subtitle1">
                              Service Charges
                            </Typography>
                          </Stack>
                        )}
                      </Stack>

                      {/* Sub Total */}
                      <Stack direction={"column"}>
                        <Stack
                          direction="row"
                          spacing={0.25}
                          sx={{
                            justifyContent: "end",
                            alignItems: "end",
                          }}
                        >
                          <Typography variant="h4">
                            {selectedCartOrder.total &&
                              parseFloat(selectedCartOrder.total).toFixed(
                                decimalPlaces
                              )}
                          </Typography>
                        </Stack>

                        {/* discount */}
                        {Number(selectedCartOrder.discount) > 0 && (
                          <Stack
                            direction={"row"}
                            spacing={0.25}
                            sx={{
                              mt: "14px",
                              justifyContent: "end",
                              alignItems: "end",
                            }}
                          >
                            <Typography variant="h4">
                              {parseFloat(selectedCartOrder.discount).toFixed(
                                decimalPlaces
                              )}
                            </Typography>
                          </Stack>
                        )}

                        {/* delivery charges */}
                        {selectedCartOrder && (
                          <Stack
                            direction={"row"}
                            spacing={0.25}
                            sx={{
                              mt: "14px",
                              justifyContent: "end",
                              alignItems: "end",
                            }}
                          >
                            <Typography variant="h4">
                              {parseFloat(
                                selectedCartOrder.delivery_charges
                              ).toFixed(decimalPlaces)}
                            </Typography>
                          </Stack>
                        )}

                        {/* tax */}
                        {Number(selectedCartOrder.tax) > 0 && (
                          <Stack
                            direction={"row"}
                            spacing={0.25}
                            sx={{
                              mt: "14px",
                              justifyContent: "end",
                              alignItems: "end",
                            }}
                          >
                            <Typography variant="h4">
                              {parseFloat(selectedCartOrder.tax).toFixed(
                                decimalPlaces
                              )}
                            </Typography>
                          </Stack>
                        )}

                        {/* tip */}
                        {Number(selectedCartOrder.tip) > 0 && (
                          <Stack
                            direction={"row"}
                            spacing={0.25}
                            sx={{
                              mt: "14px",
                              justifyContent: "end",
                              alignItems: "end",
                            }}
                          >
                            <Typography variant="h4">
                              {parseFloat(selectedCartOrder.tip).toFixed(
                                decimalPlaces
                              )}
                            </Typography>
                          </Stack>
                        )}

                        {/* service charges */}
                        {Number(selectedCartOrder.service_charges) > 0 && (
                          <Stack
                            direction={"row"}
                            spacing={0.25}
                            sx={{
                              justifyContent: "end",
                              alignItems: "end",
                            }}
                          >
                            <Typography variant="h4">
                              {parseFloat(
                                selectedCartOrder.service_charges
                              ).toFixed(decimalPlaces)}
                            </Typography>
                          </Stack>
                        )}
                      </Stack>
                    </Stack>

                    <Divider
                      sx={{
                        m: "24px 0px",
                        border: " 1px solid rgba(0, 0, 0, 0.06)",
                      }}
                    />

                    {/* total */}
                    <Stack direction={"row"} justifyContent={"space-between"}>
                      <Stack direction={"column"}>
                        <Stack
                          direction={"row"}
                          sx={{
                            justifyContent: "end",
                            ml: "71px",
                          }}
                        >
                          <Typography variant="h4">Total</Typography>
                        </Stack>
                      </Stack>
                      <Stack direction={"column"}>
                        <Stack
                          direction="row"
                          spacing={0.25}
                          sx={{
                            justifyContent: "end",
                            alignItems: "end",
                          }}
                        >
                          <Typography variant="h4">
                            {parseFloat(selectedCartOrder.gtotal).toFixed(
                              decimalPlaces
                            )}
                          </Typography>
                        </Stack>
                      </Stack>
                    </Stack>
                  </Grid>
                </Box>
              </MainCard>
            </Grid>

            <Grid item xs={3.7} sx={{ ml: "19px" }}>
              {/* google map card */}
              <MainCard
                dividerSX={{ m: "0px 0px 18px 0px !important" }}
                headerSX={{ p: "unset !important", mb: "24px" }}
                contentSX={{
                  "& .MuiCardContent-root": {
                    p: "unset !important",
                  },
                  m: "unset",
                  p: "unset !important",
                }}
                sx={{
                  m: "unset",
                  p: "24px 16px",
                  borderColor: "#EEEEEE",
                }}
                title={<Typography variant="h4">Geo Location</Typography>}
              >
                {selectedCartOrder.user_latitude &&
                selectedCartOrder.user_longitude ? (
                  <GoogleMapFrame
                    longitude={selectedCartOrder.user_longitude}
                    latitude={selectedCartOrder.user_latitude}
                    title={""}
                    width={"100%"}
                    height={"279px"}
                    style={{ border: "none", borderRadius: "8px" }}
                  />
                ) : (
                  <Stack
                    direction="row"
                    height={"279px"}
                    sx={{
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Typography variant={"subtitle1"}>
                      No Location Available
                    </Typography>
                  </Stack>
                )}
              </MainCard>
            </Grid>
          </Grid>
        </Grid>
      </MainCard>
    </Modal>
  );
};

export default CartDetails;
