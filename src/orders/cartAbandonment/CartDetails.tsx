import React from "react";

import {
  Typography,
  Stack,
  Box,
  Grid,
  Divider,
  Modal,
  IconButton,
  Paper,
} from "@mui/material";
import {
  AccountCircleTwoTone,
  SmartphoneTwoTone,
  PinDropTwoTone,
  HighlightOffTwoTone,
} from "@mui/icons-material";
import { GridColumns, DataGrid, GridRenderCellParams } from "@mui/x-data-grid";
import { makeStyles } from "@mui/styles";

import moment from "moment";
import PerfectScrollbar from "react-perfect-scrollbar";

import MainCard from "components/cards/MainCard";
import GoogleMapFrame from "components/GoogleMapFrame";

import { toCapitalizeFirstLetter } from "orders/HelperFunctions";
import { useSelector } from "store";
import {
  cartDetailMainCardStyle,
  cartDetailMainCardContentStyle,
  cartDetailGrid12Style,
  cartDetailIdStyle,
  customerSectionBoxStyle,
  noCustomerBoxStyle,
  deliverySectionBoxStyle,
  noDeliveryBoxStyle,
  tableCardContentStyle,
  tableCardStyle,
  cartDetailTableBoxStyle,
  calculationSectionStyle,
  mapCardContentStyle,
  mapCardStyle,
} from "./Styles";

interface cartDetailsProp {
  selectedCartOrder: AbandonedCartOrder;
  setOrderDetailModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const useStyles = makeStyles(() => ({
  backDrop: {
    backdropFilter: "blur(0px)",
    backgroundColor: "transparent",
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
  tableItemQuantityColumn: {
    fontWeight: 400,
    color: "#212121",
  },
  tableItemNamePriceDiscountColumn: {
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

  const taxDiscountValidation = (params: GridRenderCellParams) => {
    if (params.value && Number(params.value) > 0) {
      return (
        <Typography variant="subtitle1" sx={{ color: "#212121" }}>
          {params.value}
        </Typography>
      );
    } else {
      return (
        <Typography variant="subtitle1" sx={{ color: "#212121" }}>
          -
        </Typography>
      );
    }
  };
  const weightFormatting = (params: GridRenderCellParams) => {
    return params.row.weight_value && Number(params.row.weight_value) > 0 ? (
      <Typography variant="body1" sx={{ color: "#212121" }}>{`${parseFloat(
        params.row.weight_value
      ).toFixed(decimalPlaces)} ${params.row.weight_unit}`}</Typography>
    ) : (
      <Typography variant="body1" sx={{ color: "#212121" }}>
        -
      </Typography>
    );
  };
  const columns: GridColumns = [
    {
      field: "menu_item_id",
      headerName: "Item#",
      flex: 0.6,
      cellClassName: classes.tableItemQuantityColumn,
      sortable: false,
    },
    {
      field: "dname",
      headerName: "Item Name",
      cellClassName: classes.tableItemNamePriceDiscountColumn,
      flex: 1.5,
      sortable: false,
    },
    {
      field: "weight_value",
      headerName: "Weight",
      headerAlign: "right",
      align: "right",
      flex: 0.6,
      sortable: false,
      renderCell: weightFormatting,
    },
    {
      field: "dqty",
      headerName: "Quantity",
      cellClassName: classes.tableItemQuantityColumn,
      flex: 0.5,
      headerAlign: "right",
      align: "right",
      sortable: false,
    },
    {
      field: "dprice",
      headerName: "Price",
      cellClassName: classes.tableItemNamePriceDiscountColumn,
      flex: 0.7,
      headerAlign: "right",
      align: "right",
      sortable: false,
    },
    {
      field: "item_level_grand_total",
      headerName: "Amount",
      flex: 0.6,
      headerAlign: "right",
      align: "right",
      sortable: false,
      renderCell: taxDiscountValidation,
    },
    // {
    //   field: "tax",
    //   headerName: "Tax",
    //   flex: 0.4,
    //   headerAlign: "right",
    //   align: "right",
    //   sortable: false,
    //   renderCell: taxDiscountValidation,
    // },
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
      onClose={toggleCartDetailsModal}
      BackdropProps={{
        classes: {
          root: classes.backDrop,
        },
      }}
    >
      <Paper>
        <PerfectScrollbar
          style={{
            height: "100vh",
            overflowX: "hidden",
          }}
        >
          <MainCard
            dividerSX={{ m: "unset", display: "none" }}
            headerSX={{ p: "unset !important", mb: "32px" }}
            contentSX={cartDetailMainCardContentStyle}
            sx={cartDetailMainCardStyle}
            title={
              <Grid container>
                <Grid item xs={12} sx={cartDetailGrid12Style}>
                  <Grid item xs={11} sx={cartDetailIdStyle}>
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
                      justifyContent: "end",
                    }}
                  >
                    <IconButton
                      sx={{ p: "unset", cursor: "pointer" }}
                      onClick={toggleCartDetailsModal}
                    >
                      <HighlightOffTwoTone
                        sx={{ color: "#D84315" }}
                        fontSize="large"
                      />
                    </IconButton>
                  </Grid>
                </Grid>
              </Grid>
            }
          >
            <Grid container>
              <Grid item xs={12} sx={{ display: "flex" }}>
                <Grid item xs={8.3}>
                  {/* customer section box */}
                  <Box sx={customerSectionBoxStyle}>
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
                      <Grid item xs={12} sx={noCustomerBoxStyle}>
                        <Typography variant={"subtitle1"}>
                          No Customer Details
                        </Typography>
                      </Grid>
                    )}
                  </Box>

                  {/* delivery details section box */}
                  <Box sx={deliverySectionBoxStyle}>
                    <Stack direction="column">
                      {selectedCartOrder.address ||
                      selectedCartOrder.order_type ||
                      selectedCartOrder.note ? (
                        <>
                          <Stack direction="row">
                            <Typography variant="h4">
                              Delivery Details
                            </Typography>
                          </Stack>

                          {/* address stack */}
                          {selectedCartOrder.address && (
                            <Stack direction="row" sx={{ mt: "15px" }}>
                              <Typography variant="subtitle1">
                                Address:
                              </Typography>
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
                        <Stack direction="row" sx={noDeliveryBoxStyle}>
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
                    contentSX={tableCardContentStyle}
                    sx={tableCardStyle}
                    title={<Typography variant={"h4"}>Cart Items</Typography>}
                  >
                    <Box sx={cartDetailTableBoxStyle}>
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

                    <Box sx={calculationSectionStyle}>
                      <Grid item xs={4.8}>
                        <Stack
                          direction={"row"}
                          sx={{ justifyContent: "space-between" }}
                        >
                          <Stack direction={"column"}>
                            {/* Sub Total */}
                            <Stack
                              direction={"row"}
                              sx={{ justifyContent: "end" }}
                            >
                              <Typography variant="subtitle1">
                                Sub Total
                              </Typography>
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
                                  {parseFloat(
                                    selectedCartOrder.discount
                                  ).toFixed(decimalPlaces)}
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
                        <Stack
                          direction={"row"}
                          justifyContent={"space-between"}
                        >
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
                    contentSX={mapCardContentStyle}
                    sx={mapCardStyle}
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
        </PerfectScrollbar>
      </Paper>
    </Modal>
  );
};

export default CartDetails;
