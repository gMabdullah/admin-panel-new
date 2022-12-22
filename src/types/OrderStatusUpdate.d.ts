// import SourceAdminId from "./Commons";

interface OrdersStatusUpdateRequest extends SourceAdminId {
  eatout_id: number;
  order_id: number;
  status: string;
  eatout_uid: number;
  comment: string;
}

interface OrderStatusNotifyRequest extends SourceAdminId {
  eatout_id: number;
  order_id: number;
  bid: number;
  comment?: string;
}

interface OrdersStatusUpdateResponse {
  status: string;
  message: string;
  result: string[];
}
