import useAxios from "axios-hooks";
import MainCard from "components/cards/MainCard";
import CustomButton from "components/CustomButton";
import Notify from "components/Notify";
import TdTextField from "components/TdTextField";
import { PRE_AUTH_CONFIRM_PAYMENT, TOSSDOWN_SITE } from "config";
import { IQBAL_BUSINESS_ID } from "constants/BusinessIds";
import { OptionSetContext } from "orders/context/OptionSetContext";
import React, { useContext, useState } from "react";
import { useSelector } from "store";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Modal, Stack } from "@mui/material";
import Typography from "@mui/material/Typography";

import { OrderTimelineProp } from "./OrderStatusAction";
import DropDown from "components/DropDown";

interface errorProps {
  commentError: string;
  shippingError: string;
}
// Local Storage
const { eatout_id, user_id } = JSON.parse(
  localStorage.getItem("businessInfo")!
);

const StatusActionButton = ({
  color,
  status,
  user_email,
  refetchTimelineCallback,
}: OrderTimelineProp) => {
  // Local States
  const [currentStatus, setCurrentStatus] = useState(status);

  const [toggleStatusModal, setToggleStatusModal] = useState<boolean>(false);
  const [comment, setComment] = useState("");
  const [error, setError] = useState<errorProps>({
    commentError: "",
    shippingError: "",
  });
  const [notify, setNotify] = useState<boolean>(false);
  const [notifyMessage, setNotifyMessage] = useState("");
  const [notifyType, setNotifyType] = useState<
    "success" | "info" | "warning" | "error"
  >("info");

  // Global States
  const { selectedOrderContext, setSelectedOrderContext } =
    useContext(OptionSetContext);
  const { paymentSettings, delivery_services: deliveryServices } = useSelector(
    (state) => state.main
  );
  const [selectDeliveryService, setSelectDeliveryService] = useState<string>(
    "select_delivery_service"
  );
  const [shipping, setShipping] = useState<string>("select_shipping");
  //======================================= API Calls & Handlers =======================================//

  const preAuthPaymentAPIPayload = (item: OrderDetailTypes) => {
    const formData = new FormData();
    formData.append("business_id", `${item["business_id"]}`);
    IQBAL_BUSINESS_ID == eatout_id &&
      formData.append("transaction_id", `${item["transaction_id"]}`);
    formData.append("amount", `${item["amount"]}`);
    formData.append("order_id", `${item["order_id"]}`);
    formData.append("admin_id", `${item["admin_id"]}`);
    formData.append("source", "biz");
    return formData;
  };

  const iqbalsUrl = `${TOSSDOWN_SITE}/td_pre_auth_confirm_payment`;
  const status200Url = `${PRE_AUTH_CONFIRM_PAYMENT}/stripe_subaccount/capture_payment`;

  // Pre-auth - Global Settings payment status 200
  const [{}, preAuthPaymentAPICall] = useAxios(
    {
      url: IQBAL_BUSINESS_ID == eatout_id ? iqbalsUrl : status200Url,
      method: "post",
      headers: { "Content-Type": "multipart/form-data" },
    },
    { manual: true }
  );

  // order status update API call payload
  const orderStatusUpdateAPIPayload = (tracking_id?: string) => {
    const { order_id } = selectedOrderContext;

    const formData = new FormData();

    formData.append("eatout_id", eatout_id);
    formData.append("order_id", order_id);
    formData.append("status", currentStatus);
    formData.append("eatout_uid", user_id);
    formData.append(
      "comment",
      selectDeliveryService !== "select_delivery_service" &&
        selectDeliveryService !== "self_deliver"
        ? tracking_id
          ? tracking_id
          : ""
        : comment
        ? comment
        : ""
    );
    formData.append("admin_id", user_id);
    formData.append("source", "biz");
    return formData;
  };

  // order status update API call
  const [{}, orderStatusUpdateAPICall] = useAxios(
    {
      url: "/order_status_update",
      method: "post",
    },
    { manual: true }
  );

  // Delivery Service API
  const deliveryServiceAPIPayload = () => {
    const formData = new FormData();

    formData.append("business_id", eatout_id);
    formData.append("order_data", JSON.stringify(selectedOrderContext));
    formData.append("comment", comment);
    formData.append("action", selectDeliveryService);
    formData.append("delivery_type", `${1}`);
    formData.append("admin_id", user_id);
    formData.append("source", "biz");
    return formData;
  };
  const [{}, deliveryServiceAPI] = useAxios(
    {
      url: "/thirdparty_delivery_service",
      method: "POST",
    },
    { manual: true }
  );

  const deliveryService = async () => {
    const result = await deliveryServiceAPI({
      data: deliveryServiceAPIPayload(),
    });

    if (result.data.status == "200" || result.data.status === "201") {
      await updateOrderStatus(result.data.tracking_id);
    } else if (result.data.status === "400" || result.data.status === "404") {
      setNotifyMessage(result.data.message);
      setNotifyType("error");
      setNotify(true);
    }
  };

  const updateOrderStatus = async (tracking_id?: string) => {
    const { pre_auth, grand_total } = selectedOrderContext;

    let result: any = "";
    try {
      if (currentStatus === "Confirmed" && Number(pre_auth)) {
        if (
          parseFloat(grand_total) >
          parseFloat(selectedOrderContext.pre_auth_trans[0]?.trans_amount)
        ) {
          setNotifyMessage("Pre-authorized amount is less than grand total.");
          setNotifyType("error");
          return;
        }

        // tezmart
        if (paymentSettings.preauth && paymentSettings.status === 200) {
          result = await preAuthPaymentAPICall({
            data: preAuthPaymentAPIPayload({
              business_id: eatout_id,
              amount: grand_total,
              order_id: selectedOrderContext.pre_auth_trans[0]?.orderid,
              user_email: user_email, // TODO: Remove email and other extra things
              admin_id: user_id,
              source: "biz",
            }),
          });
        } else if (IQBAL_BUSINESS_ID == eatout_id) {
          // iqbal
          result = await preAuthPaymentAPICall({
            data: preAuthPaymentAPIPayload({
              business_id: eatout_id,
              transaction_id: selectedOrderContext.pre_auth_trans[0]?.trans_id,
              amount: grand_total,
              order_id: selectedOrderContext.pre_auth_trans[0]?.orderid,
              user_email: user_email, // TODO: Remove email and other extra things
              admin_id: user_id,
              source: "biz",
            }),
          });
        }
      } else {
        // Update Order Status API call
        result = await orderStatusUpdateAPICall({
          data: orderStatusUpdateAPIPayload(tracking_id),
        });
      }
      const getResultsFirst = async () => {
        const {
          data: { status, message },
        } = result;

        if (status === 400 || status == 0) {
          setNotifyMessage(
            "Order cannot be updated because the grand total of the order is greater than the pre-authorized charge."
          );
          setNotifyType("error");
          setNotify(true);
        } else if (status && (status === 200 || status == 1)) {
          setNotifyMessage(message);
          setNotifyType("success");
          setNotify(true);
          refetchTimelineCallback();
        }
      };
      await getResultsFirst();
    } catch (err) {}
  };

  const handleComment = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setComment(e.target.value);
    setError({ commentError: "", shippingError: "" });
  };

  const toggleOrderStatusModal = () => {
    // Reset states
    // if(toggleStatusModal){
    //   setSelectDeliveryService("")
    //   setShipping("")
    // }
    setToggleStatusModal((prevModalState) => !prevModalState);
    setError({ commentError: "", shippingError: "" });
  };

  const changeOrderStatus = () => {
    if (currentStatus === "Cancel" && !comment) {
      setError({ commentError: "Required*", shippingError: "" });
      return;
    } else if (
      selectShipping() &&
      selectDeliveryService &&
      selectDeliveryService !== "select_delivery_service"
    ) {
      setError({ commentError: "", shippingError: "" });
      // handle tcs shipping case
      deliveryService();
    } else if (
      selectDeliveryService !== "tcs_logistics" &&
      selectDeliveryService !== "self_deliver" &&
      selectDeliveryService !== "select_delivery_service"
    ) {
      deliveryService();
    } else {
      updateOrderStatus();
    }

    toggleOrderStatusModal();
  };

  const closeNotify = () => setNotify(false);
  const selectShipping = () => {
    if (shipping == "select_shipping" || !shipping) {
      setError({
        commentError: "",
        shippingError: "Please Select Shipping Type",
      });
      return false;
    }
    return true;
  };

  const handleDeliverService = (
    event: SelectChangeEvent<typeof selectDeliveryService>
  ) => {
    const {
      target: { value, name },
    } = event;

    if (
      name == "shipping"
      // && value !== "select_shipping"
    ) {
      setShipping(value);
    } else if (
      name == "selectDeliveryService"
      // && value !== "select_delivery_service"
    ) {
      setSelectDeliveryService(value);
    }

    setError({ commentError: "", shippingError: "" });
  };

  return (
    <>
      {notify && (
        <Notify
          message={notifyMessage}
          type={notifyType}
          notify={notify}
          closeNotify={closeNotify}
        />
      )}
      <CustomButton
        sx={{
          backgroundColor: `${color}`,
          width: "80px",
          height: " 30px",
          borderRadius: "8px",
        }}
        onClick={toggleOrderStatusModal}
      >
        <Typography
          sx={{
            fontFamily: "Roboto",
            fontStyle: "normal",
            fontWeight: "500",
            fontSize: "13px",
            lineHeight: "15px",
            color: "#673AB7",
          }}
        >
          {currentStatus === "Confirmed" ? "Confirm" : currentStatus}
        </Typography>
      </CustomButton>

      <Modal // order status change modal
        open={toggleStatusModal}
        onClose={toggleOrderStatusModal}
      >
        <MainCard
          contentSX={{
            "& .MuiCardContent-root": {
              p: "unset !important",
            },
            m: "unset",
            p: "unset !important",
          }}
          sx={{
            position: "absolute",
            m: "unset",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "35vw",
            p: "40px",
            border: "none",
          }}
        >
          <Stack>
            <Stack>
              <Typography
                sx={{
                  fontFamily: "Roboto",
                  fontStyle: "normal",
                  fontWeight: 700,
                  fontSize: "20px",
                  color: "#212121",
                }}
              >
                {currentStatus && currentStatus === "Cancel"
                  ? "Are you sure you want to cancel the order?"
                  : `Are you sure you want to change the status to ${
                      currentStatus === "Confirmed" ? "Confirm" : currentStatus
                    }?`}
              </Typography>
            </Stack>

            {currentStatus && currentStatus === "Cancel" ? (
              <Stack mt="10px">
                <Stack>
                  <Typography
                    sx={{
                      fontFamily: "Roboto",
                      fontStyle: "normal",
                      fontWeight: 400,
                      fontSize: "14px",
                      color: "#616161",
                    }}
                  >
                    Order placed by the customer will be permanently deleted,
                    you cannot undo the action.
                  </Typography>
                </Stack>

                <Stack mt="24px" mb="48px">
                  <TdTextField
                    label="Reason/comment"
                    placeholder="Your Comment Here"
                    value={comment}
                    onChange={handleComment}
                    error={error.commentError === "" ? false : true}
                    helperText={error.commentError}
                  />
                </Stack>
              </Stack>
            ) : (
              <>
                {currentStatus == deliveryServices.order_status &&
                  deliveryServices.status === "1" && (
                    <Stack>
                      <DropDown
                        name="selectDeliveryService"
                        label="Select Delivery Service"
                        handleChange={handleDeliverService}
                        value={selectDeliveryService}
                        defaultValue="select_delivery_service"
                        options={[
                          {
                            label: "Select Delivery Service",
                            value: "select_delivery_service",
                          },
                          { label: "Self Deliver", value: "self_deliver" },
                          {
                            label: deliveryServices.service_name,
                            value: deliveryServices.service_action,
                          },
                        ]}
                      />
                    </Stack>
                  )}
                {selectDeliveryService == "tcs_logistics" && (
                  <>
                    <Stack>
                      <DropDown
                        name="shipping"
                        label="Select Shipping"
                        handleChange={handleDeliverService}
                        value={shipping}
                        defaultValue="select_shipping"
                        options={[
                          {
                            label: "Select Shipping",
                            value: "select_shipping",
                          },
                          { label: "One Day Delivery", value: "0" },
                          { label: "Two Days Delivery", value: "1" },
                        ]}
                        error={error.shippingError !== "" ? true : false}
                        // helperText={error.shippingError}
                      />
                      <div>{error.shippingError}</div>
                    </Stack>
                  </>
                )}
                <Stack mt="24px" mb="48px">
                  <TdTextField
                    label="Reason/comment"
                    placeholder="Your Comment Here"
                    value={comment}
                    onChange={handleComment}
                  />
                </Stack>
              </>
            )}

            <Stack direction="row" sx={{ justifyContent: "end" }} spacing={1.5}>
              <CustomButton
                color={"secondary"}
                variant={"contained"}
                sx={{
                  background: "#F5F5F5 ",
                  color: "#212121",
                  p: "12px 57px",

                  "&:hover": {
                    backgroundColor: "#F5F5F5",
                  },
                }}
                onClick={toggleOrderStatusModal}
              >
                No
              </CustomButton>

              <CustomButton
                color={"secondary"}
                variant={"contained"}
                sx={{ p: "12px 30px" }}
                onClick={changeOrderStatus}
              >
                Yes, {currentStatus === "Confirmed" ? "Confirm" : currentStatus}
              </CustomButton>
            </Stack>
          </Stack>
        </MainCard>
      </Modal>
    </>
  );
};

export default StatusActionButton;
