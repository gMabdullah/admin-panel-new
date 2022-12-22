// import SourceAdminId from "./Commons";

interface OrderStatusRequest extends SourceAdminId {
  eatout_id: number;
}

interface OrderStatusResponse {
  message: string;
  result: string[];
  status: string;
}
