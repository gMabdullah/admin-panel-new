import SourceAdminId from "./commons";

export interface OrderStatusReq extends SourceAdminId {
  eatout_id: number;
}

export interface OrderStatusResp {
  message: string;
  result: string[];
  status: string;
}
