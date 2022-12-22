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
  result: OrderTimelineResponseResult;
}

interface OrderTimelineResponseResult {
  timeline: OrderTimelineResponseResultTimeline[];
  total_minutes: string;
}

interface OrderTimelineResponseResultTimeline {
  time: string;
  date: string;
  color: string;
  status: string;
  comment: null | string;
  click: string;
  username: string;
  minutes_passed: number;
}
