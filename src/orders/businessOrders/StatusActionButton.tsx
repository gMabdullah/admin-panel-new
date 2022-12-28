import useAxios from 'axios-hooks';
import MainCard from 'components/cards/MainCard';
import CustomButton from 'components/CustomButton';
import Notify from 'components/Notify';
import TdTextField from 'components/TdTextField';
import { PRE_AUTH_CONFIRM_PAYMENT, TOSSDOWN_SITE } from 'config';
import { IQBAL_BUSINESS_ID } from 'constants/BusinessIds';
import { OptionSetContext } from 'orders/context/OptionSetContext';
import React, { useContext, useState } from 'react';
import { useSelector } from 'store';

import { Modal, Stack } from '@mui/material';
import Typography from '@mui/material/Typography';

import { OrderTimelineProp } from './OrderStatusAction';

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
  const [commentError, setCommentError] = useState("");
  const [notify, setNotify] = useState<boolean>(false);
  const [notifyMessage, setNotifyMessage] = useState("");
  const [notifyType, setNotifyType] = useState<
    "success" | "info" | "warning" | "error"
  >("info");

  // Global States
  const { selectedOrderContext, setSelectedOrderContext } =
    useContext(OptionSetContext);
  const { paymentSettings } = useSelector((state) => state.main);

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
  const orderStatusUpdateAPIPayload = () => {
    const { order_id } = selectedOrderContext;

    const formData = new FormData();

    formData.append("eatout_id", eatout_id);
    formData.append("order_id", order_id);
    formData.append("status", currentStatus);
    formData.append("eatout_uid", user_id);
    formData.append("comment", comment);
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

  const updateOrderStatus = async () => {
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
          data: orderStatusUpdateAPIPayload(),
        });
      }
      const getResultsFirst = async () => {
        // if no result found
        if(!result || !result.data) return

        const {
          data: { status, message },
        } = result;

        if (status === 400 || status == 0) {
          setNotifyMessage(
            "Order cannot be updated because the grand total of the order is greater than the pre-authorized charge."
          );
          setNotifyType("error");
          setNotify(true);
        } else if (
          status &&
          (status === 200 || status == 1)
        ) {
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
    setCommentError("");
  };

  const toggleOrderStatusModal = () => {
    setToggleStatusModal((prevModalState) => !prevModalState);
    setCommentError("");
  };

  const changeOrderStatus = () => {
    if (currentStatus === "Cancel" && !comment) {
      setCommentError("Required*");
      return;
    }

    updateOrderStatus();
    toggleOrderStatusModal();
  };

  const closeNotify = () => setNotify(false);

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
                    error={commentError === "" ? false : true}
                    helperText={commentError}
                  />
                </Stack>
              </Stack>
            ) : (
              <Stack mt="24px" mb="48px">
                <TdTextField
                  label="Reason/comment"
                  placeholder="Your Comment Here"
                  value={comment}
                  onChange={handleComment}
                />
              </Stack>
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
