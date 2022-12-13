// import SourceAdminId from "./Commons";

interface UpdateUserInfoRequest extends SourceAdminId {
  order_id: string;
  mobile_number: string;
  address: string;
  landline_number: string;
  eatout_id: string;
}

interface UpdateUserInfoResponse {
  status: string;
  message: string;
  result: [];
}
