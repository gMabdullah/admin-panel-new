// import SourceAdminId from "./Commons";

interface OrderTimelineRequest extends SourceAdminId {
  eatout_id: number;
  type: string;
  order_id: number;
}

interface OrderTimelineResponse {
  status: string;
  message: string;
  current_status_index: number[];
  result: OrderTimelineResponse_Result;
}

interface OrderTimelineResponse_Result {
  timeline: OrderTimelineResponse_Result_Timeline[];
  total_minutes: string;
}

interface OrderTimelineResponse_Result_Timeline {
  time: string;
  date: string;
  color: string;
  status: string;
  comment: null | string;
  click: string;
  username: string;
  minutes_passed: number;
}
