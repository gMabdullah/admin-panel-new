import SourceAdminId from "./commons";

export interface orderTimelinenReq extends SourceAdminId {
  eatout_id: number;
  type: string;
  order_id: number;
}
export interface OrderTimelinenResp {
  status: string;
  message: string;
  current_status_index: number[];
  result: Result;
}

export interface Result {
  timeline: Timeline[];
  total_minutes: string;
}

export interface Timeline {
  time: string;
  date: string;
  color: string;
  status: string;
  comment: null | string;
  click: string;
  username: string;
  minutes_passed: number;
}
