// import SourceAdminId from "./Commons";

interface OrderListingRequest extends SourceAdminId {
  attributes?: number | string;
  bid?: number | string[] | string;
  canada_post?: number | string;
  check: number;
  city?: string | string[];
  eatout_id: number;
  from_date?: Date | string | null;
  key?: string;
  limit?: number | string;
  offset?: number;
  order_type?: number | string | string[];
  pre_auth?: string | number;
  return_statuses?: number;
  status?: string | string[];
  to_date?: Date | string | null;
  type?: string;
}

interface OrderListingResponse {
  menu_type_categories: Array<OrderListingResponseMenuTypeCategory[]>;
  status: string;
  message: string;
  result: OrderListingResponseResult[] | [];
  apply: string;
  url: string;
  count: number;
}

interface OrderListingResponseMenuTypeCategory {
  category_id: string;
  category_name: string;
}

interface OrderListingResponseResult {
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
  order_detail: OrderListingResponseOrderDetail[];
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
  pre_auth_trans: OrderListingResponsePreAuthTran[];
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
  total_qty: number;
  user_area: string;
  user_city: string;
  user_country: string;
  user_email: string;
  user_latitude: string;
  user_longitude: string;
}

// writing string | number because getting string order object and getting number from product item object
interface OrderListingResponseOrderDetail {
  attributes?: any[];
  brand_id: string;
  brand_name?: string;
  category_id: string;
  comment: string;
  coupon_discount: string | number;
  coupon_discount_value: string | number;
  discount: string;
  item_cat_id: string;
  item_cat_name: string;
  item_category_name: string;
  item_id: string;
  item_level_discount_value: string | number;
  item_level_grand_total: string | number;
  item_level_tax_value: string | number;
  item_name: string;
  options: any;
  order_detail_id: string;
  price: string;
  product_code: string;
  quantity: string;
  status: string;
  status_comment: string;
  tax: string;
  total: string | number;
  type: string | number;
  weight_unit: string;
  weight_value: string;
  weight?: number;
  label?: string;
  item_brand?: OrderListingResponseItemBrand[];
}

interface OrderListingResponseItemBrand {
  brand_id: string;
  brand_name: string;
}

interface OrderListingResponsePreAuthTran {
  orderid: string;
  pre_auth_id: string;
  trans_amount: string;
  trans_id: string;
  type: string;
}
//**********************  PAcking Slip Types ****************** */
interface PackingSlip {
  postal_code: string;
  canada_post: string;
  cnic: string;
  menu_type_id: string;
  order_id: string;
  pre_auth: string;
  pre_auth_trans: OrderListingResponsePreAuthTran[];
  sales_date: date;
  deciaml_places: string;
  tax: string;
  discount: string;
  delivery_charges: string;
  pickup_time: string;
  total: string;
  currency: string;
  email: string;
  user_email: string;
  grand_total: string;
  status: string;
  loyalty_points: string;
  statuscomment: string;
  address: string;
  mobile_number: string;
  landline_number: string;
  note: string;
  testingdate: Date;
  date: string;
  order_type: string;
  delivery_date: string;
  name: string;
  eatout_bid: string;
  eatout_location: string;
  eatout_address: string;
  color: string;
  user_area: string;
  user_city: string;
  user_latitude: string;
  user_longitude: string;
  user_country: string;
  total_time: string;
  order_detail?: PackingSlipOrderDetail[];
  source: string;
  pos_id: string;
  eatout_manager: string;
  table_no: string;
  receipt_no: string;
  is_paid: string;
  tip: string;
  cash_received: string;
  is_partial_refund: string;
  change: string;
  pay_type: string;
  tax_type: string;
  pay_owner: string;
  penny_rounding: string;
  custom_code: string;
  service_charges: string;
  tax_value: string;
  discount_value: string;
  delivery_tax: string;
  delivery_tax_value: string;
  custom_code_id: string;
  custom_code_type: string;
  custom_code_discount: string;
  custom_code_discount_value: string;
  order_type_flag: string;
  payment_type: string;
}
interface PackingSlipOrderDetail {
  order_detail_id: string;
  type: string;
  attributes?: any[];
  item_name: string;
  brand_name: string;
  item_id: string;
  product_code: string;
  item_cat_id: string;
  quantity: string;
  price: string;
  status: string;
  weight_value: string;
  weight_unit: string;
  comment: string;
  status_comment: string;
  discount: string;
  tax: string;
  options: any;
  total: string;
  item_level_grand_total: string;
  category_id: string;
  brand_id: string;
  item_level_discount_value: string;
  coupon_discount: string;
  coupon_discount_value: string;
  item_level_tax_value: string;
}
