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
  AccountCircleTwoTone,
  SmartphoneTwoTone,
  PinDropTwoTone,
  EditTwoTone,
  AddTwoTone,
  HighlightOffTwoTone,
} from "@mui/icons-material";
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
import {
  CalculationSectionSkeleton,
  MapSectionSkeleton,
  OrderDeliveryDetailsSkeleton,
  OrderIdSectionSkeleton,
  OrderTimelineSkeleton,
  TableBoxHeaderSkeleton,
  TableSkeleton,
  UserDetailsSkeleton,
} from "components/skeleton/OrderDetailSkeleton";
import GoogleMapFrame from "components/GoogleMapFrame";
import OrderStatusAction from "orders/businessOrders/OrderStatusAction";
import { toCapitalizeFirstLetter } from "orders/HelperFunctions";
import { linearLoader, useStyles } from "orders/businessOrders/OrderDetail";

import { useSelector } from "store";
import moment from "moment";

interface cartDetailsProp {
  selectedCartOrder: AbandonedCartOrder;
  // cart: any;
  setOrderDetailModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const CartDetails = ({
  selectedCartOrder,
  setOrderDetailModal,
}: cartDetailsProp) => {
  // const [deliveryChargesModal, setDeliveryChargesModal] = useState(false);
  const { decimalPlaces, minimumSpend, currency } = useSelector(
    (state) => state.main
  );

  // const [order, setOrder] = useState(selectedCartOrder);
  // const [orderDetails, setOrderDetails] = useState(
  //   selectedCartOrder.orderDetails
  // );

  const classes = useStyles();
  const noDetailsFound = "No details Found";
  // useEffect(() => {
  //   if (details.length > 0) {
  //     setDeliveryChargesModal(true);
  //   }
  // }, [details]);
  // console.log("details", selectedCartOrder, "order", order);

  const toggleCartDetailsModal = () => {
    setOrderDetailModal((state) => !state);
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
    // abandoned cart order details modal
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
                xs={12}
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {/* {selectedCartOrder.length === 0 ? (
                  <OrderIdSectionSkeleton />
                ) : (
                  <> */}
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
                {/* </>
                 )} */}
              </Grid>

              <Grid
                item
                xs={6}
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
              {/* {(order.name || order.name || order.area || order.area) && */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  border: "1px solid #EEEEEE",
                  borderRadius: "8px",
                  p: "10px 13px 10px 18px",
                  mb: "12px",
                }}
              >
                <Grid item xs={10}>
                  {
                    // order.length === 0 ? (
                    //   <UserDetailsSkeleton />
                    // ) :
                    selectedCartOrder.name ||
                    selectedCartOrder.mobile_phone !== "0" ||
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
                            <Typography
                              variant={"subtitle1"}
                              sx={{
                                maxWidth: "107px",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                              }}
                            >
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
                      <Stack
                        direction="row"
                        sx={{
                          justifyContent: "center",
                          alignItems: "center",
                          m: "15px 0px",
                        }}
                        // spacing={1}
                      >
                        <Typography variant={"subtitle1"}>
                          No Customer Details
                        </Typography>
                      </Stack>
                    )
                  }
                </Grid>
              </Box>
              {/* // } */}
              {/* {(order.address || order.order_type || order.note) && */}
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
                  {/* {order.length === 0 ? (
                    <OrderDeliveryDetailsSkeleton />
                  ) : (
                    // (order.address || order.order_type || order.note) ?
                    <> */}
                  {/* <Stack // delivery details heading stack
                        direction="row"
                        sx={{
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      > */}
                  {selectedCartOrder.address ||
                  selectedCartOrder.order_type ||
                  selectedCartOrder.note ? (
                    <>
                      <Stack direction="row">
                        <Typography variant="h4">Delivery Details</Typography>
                      </Stack>
                      {/* </Stack> */}

                      {selectedCartOrder.address && (
                        <Stack // address stack
                          direction="row"
                          sx={{ mt: "15px" }}
                        >
                          <Typography variant="subtitle1">Address:</Typography>
                          <Typography variant="h5" sx={{ ml: "64px" }}>
                            {selectedCartOrder.address}
                          </Typography>
                        </Stack>
                      )}

                      {selectedCartOrder.order_type && (
                        <Stack // order type stack
                          direction="row"
                          sx={{ mt: "16px" }}
                        >
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

                      {selectedCartOrder.note && (
                        <Stack //Note Stack
                          direction="row"
                          sx={{ mt: "16px" }}
                        >
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
                      // spacing={1}
                    >
                      <Typography variant={"subtitle1"}>
                        No Delivery Details
                      </Typography>
                    </Stack>
                  )}
                  {/* </>
                  )} */}
                </Stack>
              </Box>
              {/* // } */}
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
                title={
                  <Stack
                    direction={"row"}
                    sx={{
                      // justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    {/* {order.length === 0 ? (
                      <TableBoxHeaderSkeleton />
                    ) : ( */}
                    <Typography variant={"h4"}>Cart Items</Typography>
                    {/* )} */}
                  </Stack>
                }
              >
                {/* {order.length === 0 ? (
                  <TableSkeleton />
                ) : ( */}
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
                      pr: "unset",
                      pl: "15px",
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
                      p: "25px 0px 25px 15px",
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
                    // rows={(() => {
                    //   if (!order) return [];
                    //   return orderDetails;
                    // })()}
                    getRowId={(row: any) => row.odetailid}
                    columns={columns}
                    autoHeight
                    disableColumnMenu
                    hideFooterSelectedRowCount
                    hideFooter
                    components={{
                      LoadingOverlay: linearLoader,
                    }}
                    // loading={orderDetailLoader}
                  />
                </Box>
                {/* )} */}

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
                  <Grid item xs={5.5}>
                    {/* {order.length === 0 ? (
                      <CalculationSectionSkeleton />
                    ) : ( */}
                    {/* <> */}
                    <Stack
                      direction={"row"}
                      sx={{ justifyContent: "space-between" }}
                    >
                      <Stack direction={"column"}>
                        <Stack // Sub Total
                          direction={"row"}
                          sx={{ justifyContent: "end" }}
                        >
                          <Typography variant="subtitle1">Sub Total</Typography>
                        </Stack>

                        {Number(selectedCartOrder.discount) > 0 && (
                          <Stack // Discount
                            direction={"row"}
                            sx={{ mt: "14px", justifyContent: "end" }}
                          >
                            <Typography variant="subtitle1">
                              Discount
                            </Typography>
                          </Stack>
                        )}

                        <Stack // Delivery Charges
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

                        {Number(selectedCartOrder.tax) > 0 && (
                          <Stack // Tax
                            direction={"row"}
                            sx={{ mt: "14px", justifyContent: "end" }}
                          >
                            <Typography variant="subtitle1">Tax</Typography>
                          </Stack>
                        )}

                        {Number(selectedCartOrder.tip) > 0 && (
                          <Stack // Tip
                            direction={"row"}
                            sx={{ mt: "14px", justifyContent: "end" }}
                          >
                            <Typography variant="subtitle1">Tip</Typography>
                          </Stack>
                        )}

                        {Number(selectedCartOrder.service_charges) > 0 && (
                          <Stack // Service Charges
                            direction={"row"}
                            sx={{ mt: "14px", justifyContent: "end" }}
                          >
                            <Typography variant="subtitle1">
                              Service Charges
                            </Typography>
                          </Stack>
                        )}
                      </Stack>

                      <Stack direction={"column"}>
                        <Stack // Sub Total
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

                        {Number(selectedCartOrder.discount) > 0 && (
                          <Stack // discount
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

                        {selectedCartOrder && (
                          <Stack // delivery charges
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

                        {Number(selectedCartOrder.tax) > 0 && (
                          <Stack // tax
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

                        {Number(selectedCartOrder.tip) > 0 && (
                          <Stack // tip
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

                        {Number(selectedCartOrder.service_charges) > 0 && (
                          <Stack // service charges
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

                    <Stack direction={"row"} justifyContent={"space-between"}>
                      <Stack direction={"column"}>
                        <Stack // total
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
                        <Stack // total
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
                    {/* </> */}
                    {/* )} */}
                  </Grid>
                </Box>
              </MainCard>
            </Grid>

            <Grid item xs={3.7} sx={{ ml: "19px" }}>
              {/* {order.length === 0 ? (
                <Box
                  sx={{
                    p: "24px 16px",
                    border: "1px solid #EEEEEE",
                  }}
                >
                  <MapSectionSkeleton />
                </Box>
              ) : ( */}
              <MainCard // google map card
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
                  noDetailsFound
                )}
              </MainCard>
              {/* )} */}
            </Grid>
          </Grid>
        </Grid>
      </MainCard>
    </Modal>
  );
};

export default CartDetails;
