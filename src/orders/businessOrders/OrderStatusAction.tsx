import React, { useState, useEffect, useContext, useRef } from "react";

import { makeStyles } from "@mui/styles";
import {
  Typography,
  Stack,
  Divider,
  Modal,
  Box,
  IconButton,
} from "@mui/material";
import { HighlightOffTwoTone } from "@mui/icons-material";
import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineSeparator,
  TimelineItem,
} from "@mui/lab";

import useAxios from "axios-hooks";

import CustomButton from "components/CustomButton";
import MainCard from "components/cards/MainCard";
import TdTextField from "components/TdTextField";
import Notify from "components/Notify";

import { convertMinutesInToHours } from "orders/HelperFunctions";
import { OptionSetContext } from "orders/context/OptionSetContext";
import StatusActionButton from "./StatusActionButton";

const useStyles = makeStyles(() => ({
  TimeLineRoot: {
    marginTop: "30px !important",
    marginBottom: "unset",
    padding: "unset !important",
    marginLeft: "2px !important",

    "& li:nth-last-child(1) span": {
      backgroundColor: "unset !important",
    },
    "& li:nth-last-child(2) span": {
      marginBottom: "3px !important",
    },
  },

  TimelineItem: {
    "&::before": {
      padding: "0px",
      postion: "unset",
      flex: "unset", // "''" will also work.
    },
  },

  TimelineDot: {
    background: " #fff",
    display: "block",
    width: "14px",
    height: "14px",
    position: "absolute",
    margin: "unset !important",
    padding: "unset !important",
    transform: "translate(-50%, -50%)",
    border: "4px solid #DB154D",
  },

  TimelineDotInActive: {
    background: " #fff",
    display: "block",
    width: "14px",
    height: "14px",
    position: "absolute",
    margin: "unset !important",
    padding: "unset !important",
    transform: "translate(-50%, -50%)",
    border: "4px solid #757575",
  },

  TimeLineConnector: {},
  TimeLineContent: {
    paddingLeft: "12px !important",
    marginTop: "-11px",
    marginBottom: "16px",
    paddingRight: "unset !important",
  },
}));

export interface OrderTimelineProp {
  time?: string;
  date?: string;
  color: string;
  status: string;
  comment?: null | string;
  click?: string;
  username?: string;
  minutes_passed?: number;
  selectedOrder?: SelectedOrderDetailTypes | undefined;
  order_id?: number;
  user_email: string;
  refetchTimelineCallback: () => void;
}

const OrderStatusAction = ({
  selectedOrder,
  order_id,
  user_email,
}: SelectedOrderDetailTypes) => {
  const { eatout_id, user_id } = JSON.parse(
    localStorage.getItem("businessInfo")!
  );
  // local States
  const [orderTimeline, setOrderTimeline] =
    useState<OrderTimelineResponse["result"]>();
  const [emailNotificationModal, setEmailNotificationModal] =
    useState<boolean>(false);
  const [comment, setComment] = useState("");
  const [notify, setNotify] = useState<boolean>(false);
  const [notifyMessage, setNotifyMessage] = useState("");
  const [notifyType, setNotifyType] = useState<
    "success" | "info" | "warning" | "error"
  >("info");
  const firstRenderRef = useRef(true);
  const [cancelReason, setCancelReason] = useState("");
  // Global States
  const { selectedOrderContext } = useContext(OptionSetContext);

  //======================================= API Calls & Handlers =======================================//

  const timelinePayload = (item: OrderTimelineRequest) => {
    const formData = new FormData();

    formData.append("eatout_id", `${item["eatout_id"]}`);
    formData.append("admin_id", `${item["admin_id"]}`);
    formData.append("type", `${item["type"]}`);
    formData.append("order_id", `${item["order_id"]}`);
    formData.append("source", "biz");
    return formData;
  };

  const [
    { data: notifyResponse, loading: getNotifyLoader, error: getNotifyError },
    orderStatusNotificationAPICall,
  ] = useAxios(
    {
      url: `/send_in_process_email`,
      method: "post",
    },
    { manual: true }
  );

  useEffect(() => {
    if (firstRenderRef.current) {
      firstRenderRef.current = false;
    } else {
      if (!notifyResponse) return;

      if (notifyResponse.status === "1") {
        setEmailNotificationModal(false);
        setNotifyMessage("Notify Successfully");
        setNotifyType("success");
        setNotify(true);
        setComment("");
      } else if (notifyResponse.status === "0") {
        setEmailNotificationModal(false);
        setNotifyMessage("Notify Failed");
        setNotifyType("error");
        setNotify(true);
      }
    }
  }, [notifyResponse]);

  // Get Order Timeline
  const [
    { data: getOrderTimeline, loading: loadingTimeline, error: timelineError },
    timelineAPICall,
  ] = useAxios({
    url: `/get_order_timeline`,
    method: "post",
    data: timelinePayload({
      eatout_id,
      type: "order",
      order_id: order_id,
      admin_id: user_id,
      source: "biz",
    }),
  });

  const orderStatusNotificationPayload = (item: OrderStatusNotifyRequest) => {
    const formData = new FormData();

    formData.append("eatout_id", `${item["eatout_id"]}`);
    formData.append("order_id", `${item["order_id"]}`);
    formData.append("comment", `${comment}`);
    formData.append("bid", `${item["bid"]}`);
    formData.append("admin_id", `${item["admin_id"]}`);
    formData.append("source", "biz");

    return formData;
  };

  const sendEmailNotification = () => {
    orderStatusNotificationAPICall({
      data: orderStatusNotificationPayload({
        eatout_id,
        order_id,
        admin_id: user_id,
        bid: 0,
        comment: comment,
        source: "biz",
      }),
    });
  };

  const refetchTimelineCallback = () => {
    timelineAPICall({
      data: timelinePayload({
        eatout_id,
        type: "order",
        order_id,
        admin_id: user_id,
        source: "biz",
      }),
    });
  };

  useEffect(() => {
    timelineAPICall({
      data: timelinePayload({
        eatout_id,
        type: "order",
        order_id,
        admin_id: user_id,
        source: "biz",
      }),
    });
  }, [order_id]);

  useEffect(() => {
    if (getOrderTimeline && getOrderTimeline.status) {
      setOrderTimeline(getOrderTimeline.result);
      const timeline = getOrderTimeline.result.timeline;

      const cancelComment =
        timeline &&
        timeline.filter(
          (status: OrderTimelineResponseResultTimeline) =>
            status.click === "0" && status.status === "Cancel" && status
        );
      setCancelReason(cancelComment[0]?.comment);
    }
  }, [orderTimeline, getOrderTimeline]);

  const classes = useStyles();

  const toggleEmailNotificationModal = () => {
    setEmailNotificationModal((prevModalState) => !prevModalState);
    setComment("");
  };

  const handleComment = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setComment(e.target.value);
  };

  const statusAction = (timeline: OrderTimelineProp) => {
    const color = timeline.color;
    const status = timeline.status;

    return (
      <StatusActionButton
        color={color}
        status={status}
        user_email={user_email}
        refetchTimelineCallback={refetchTimelineCallback}
      />
    );
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

      {/* order status timeline card */}
      <MainCard
        dividerSX={{ m: "0px 0px 0px 0px !important" }}
        headerSX={{ p: "unset !important", mb: "24px" }}
        contentSX={{
          "& .MuiCardContent-root": {
            p: "unset !important",
          },
          m: "unset",
          p: "unset !important",
        }}
        sx={{
          m: "0px 0px 16px",
          p: "24px 16px 0px 16px",
          borderColor: "#EEEEEE",
        }}
        title={
          <Stack
            direction="row"
            sx={{ justifyContent: "space-between", alignItems: "center" }}
          >
            <Typography variant="h4">Order Status</Typography>

            {selectedOrderContext.pre_auth === "1" && (
              <Stack>
                <CustomButton
                  variant="contained"
                  color={"secondary"}
                  sx={{ p: "7px 21px" }}
                  onClick={toggleEmailNotificationModal}
                >
                  Notify
                </CustomButton>
              </Stack>
            )}
          </Stack>
        }
      >
        <Timeline
          sx={{
            "& .ul.MuiTimeline-root.MuiTimeline-positionRight.css-dkyxik-MuiTimeline-root li:last-child span":
              {
                backgroundColor: "unset !important",
              },
          }}
          className={classes.TimeLineRoot}
        >
          {orderTimeline &&
            orderTimeline.timeline?.map(
              (timeline: any, timelineIndex: number) => (
                <TimelineItem
                  className={classes.TimelineItem}
                  key={timelineIndex}
                >
                  <TimelineSeparator sx={{ display: "flex", direction: "row" }}>
                    <TimelineDot
                      color="secondary"
                      className={
                        timeline.date
                          ? classes.TimelineDot
                          : classes.TimelineDotInActive
                      }
                    />
                    <TimelineConnector className={classes.TimeLineConnector} />
                  </TimelineSeparator>
                  <TimelineContent className={classes.TimeLineContent}>
                    <Stack
                      direction={"row"}
                      justifyContent="space-between"
                      display={"flex"}
                    >
                      <Stack spacing={1}>
                        <Stack
                          direction="row"
                          spacing={0.5}
                          sx={{ alignItems: "center" }}
                        >
                          <Typography variant="subtitle1">
                            {timeline.date}
                          </Typography>
                          <Typography variant="h5">{timeline.time}</Typography>
                        </Stack>

                        <Typography variant="body2">
                          {timeline.username !== "" ? timeline.username : ""}
                        </Typography>
                        <Typography variant="body2">
                          {convertMinutesInToHours(timeline.minutes_passed)}
                        </Typography>
                      </Stack>
                      <Stack>
                        {timeline.click === "1" ? (
                          statusAction(timeline)
                        ) : (
                          <CustomButton
                            sx={{
                              backgroundColor: "#aaaeb1",
                              width: "80px",
                              height: " 30px",
                              borderRadius: "8px",
                            }}
                            disabled={true}
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
                              {timeline.status === "Cancel"
                                ? "Cancelled"
                                : timeline.status}
                            </Typography>
                          </CustomButton>
                        )}
                      </Stack>
                    </Stack>
                  </TimelineContent>
                </TimelineItem>
              )
            )}
        </Timeline>

        {cancelReason && (
          <>
            <Divider sx={{ border: "1px solid #EEEEEE", mb: "16px" }} />
            <Box
              sx={{
                ml: "26px",
                mr: "26px",
                mb: "24px",
              }}
            >
              <Typography variant={"h5"} sx={{ mb: "6px" }}>
                Reason/Comment:
              </Typography>
              <Typography variant={"body1"}>{cancelReason}</Typography>
            </Box>
          </>
        )}
      </MainCard>

      {/* email notification modal */}
      <Modal
        open={emailNotificationModal}
        onClose={toggleEmailNotificationModal}
      >
        <MainCard
          dividerSX={{ m: "0px 0px 33px 0px !important" }}
          headerSX={{ p: "unset !important", mb: "18px" }}
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
            width: "50vw",
            p: "40px",
            border: "none",
          }}
          title={
            <Stack
              direction="row"
              sx={{ justifyContent: "space-between", alignItems: "center" }}
            >
              <Typography variant="h3">Notify the customer</Typography>

              <IconButton
                sx={{ p: "unset", ml: "5px" }}
                onClick={toggleEmailNotificationModal}
              >
                <HighlightOffTwoTone
                  sx={{ color: "#D84315" }}
                  fontSize="large"
                />
              </IconButton>
            </Stack>
          }
        >
          <Stack>
            <Stack mb="32px">
              <TdTextField
                label="Your comment"
                placeholder="Your comment here..."
                value={comment}
                onChange={handleComment}
              />
            </Stack>

            <Stack direction="row" sx={{ justifyContent: "end" }}>
              <CustomButton
                color={"secondary"}
                variant={"contained"}
                sx={{ p: "13px 47px" }}
                onClick={sendEmailNotification}
              >
                Notify
              </CustomButton>
            </Stack>
          </Stack>
        </MainCard>
      </Modal>
    </>
  );
};

export default OrderStatusAction;
