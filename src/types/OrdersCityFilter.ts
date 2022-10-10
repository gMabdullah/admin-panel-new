import SourceAdminId from "./commons";

export interface OrdersCityFilterReq extends SourceAdminId {
  eatout_id: number;
}

export interface OrdersCityFilterResp {
  status: string;
  message: string;
  result: string[];
}
