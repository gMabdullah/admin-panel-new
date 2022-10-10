import SourceAdminId from "./commons";

export interface OrderListingReq extends SourceAdminId {
  attributes?: number;
  bid?: number;
  canada_post?: number | string;
  check: number | string;
  city?: string;
  eatout_id: number;
  from_date?: Date | string;
  key?: string;
  limit: number | string;
  offset: number;
  order_type?: number | string;
  pre_auth?: number | string;
  return_statuses: number | string;
  status?: string;
  to_date?: Date | string;
  type: string;
}

export interface OrderListingResp {
  menu_type_categories: Array<MenuTypeCategory[]>;
  status: string;
  message: string;
  result: Result[];
  apply: string;
  url: string;
  count: number;
}

export interface MenuTypeCategory {
  category_id: string;
  category_name: string;
}

export interface Result {
  address: string;
  canada_post: string;
  cash_received: string;
  change: string;
  cnic: string;
  color: string;
  currency: string;
  custom_code: string;
  custom_code_discount: string;
  custom_code_discount_value: string;
  custom_code_id: string;
  custom_code_type: string;
  date: Date;
  deciaml_places: string;
  delivery_charges: string;
  delivery_date: string;
  delivery_tax: string;
  delivery_tax_value: string;
  discount: string;
  discount_value: string;
  eatout_address: string;
  eatout_bid: string;
  eatout_location: string;
  eatout_manager: string;
  email: string;
  grand_total: string;
  is_paid: string;
  is_partial_refund: string;
  landline_number: string;
  loyalty_points: string;
  menu_type_id: string;
  mobile_number: string;
  name: string;
  note: string;
  order_detail: OrderDetail[];
  order_id: string;
  order_type: string;
  order_type_flag: string;
  pay_owner: string;
  pay_type: string;
  payment_type: string;
  penny_rounding: string;
  pickup_time: string;
  pos_id: string;
  postal_code: string;
  pre_auth: string;
  pre_auth_trans: PreAuthTran[];
  receipt_no: string;
  sales_date: Date;
  service_charges: string;
  source: string;
  status: string;
  statuscomment: string;
  table_no: string;
  tax: string;
  tax_type: string;
  tax_value: string;
  testingdate: Date;
  tip: string;
  total: string;
  total_time: string;
  user_area: string;
  user_city: string;
  user_country: string;
  user_email: string;
  user_latitude: string;
  user_longitude: string;
}

export interface OrderDetail {
  attributes?: any[];
  brand_id: string;
  brand_name?: string;
  category_id: string;
  comment: string;
  coupon_discount: string;
  coupon_discount_value: string;
  discount: string;
  item_cat_id: string;
  item_id: string;
  item_level_discount_value: string;
  item_level_grand_total: string;
  item_level_tax_value: string;
  item_name: string;
  options: string;
  order_detail_id: string;
  price: string;
  product_code: string;
  quantity: string;
  status: string;
  status_comment: string;
  tax: string;
  total: string;
  type: string;
  weight_unit: WeightUnit;
  weight_value: string;
}

export enum WeightUnit {
  Kg = "Kg",
}

export interface PreAuthTran {
  orderid: string;
  pre_auth_id: string;
  trans_amount: string;
  trans_id: string;
  type: string;
}
