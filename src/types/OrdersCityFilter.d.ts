// import SourceAdminId from "./Commons";

interface OrdersCityFilterRequest extends SourceAdminId {
  eatout_id: number;
}

interface OrdersCityFilterResponse {
  status: string;
  message: string;
  result: string[];
}
