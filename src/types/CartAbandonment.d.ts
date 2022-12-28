interface CartAbandonmentResponse {
  order: AbandonedCartOrder;
  order_details: AbandonedCartOrderDetail[];
}

interface AbandonedCartOrder {
  orderid: string;
  td_order_id: string;
  temp_order_id: string;
  r_id: string;
  uid: string;
  name: string;
  mobile_phone: string;
  city: string;
  area: string;
  source: string;
  address: string;
  total: string;
  tax: string;
  tax_value: string;
  discount: string;
  discount_value: string;
  gtotal: string;
  ordertype: string;
  note: string;
  email: string;
  delivery_charges: string;
  delivery_tax: string;
  delivery_tax_value: string;
  bid: string;
  delivery: string;
  postal_code: string;
  custom_code: string;
  custom_code_id: string;
  custom_code_type: string;
  custom_code_discount: string;
  custom_code_discount_value: string;
  user_latitude: string;
  user_longitude: string;
  order_type: string;
  order_type_flag: string;
  tip: string;
  service_charges: string;
  orderDetails: AbandonedCartOrderDetail[];

  // making this key optional because we are not getting this from API but adding this in order object for making input required for tables
}

interface AbandonedCartOrderDetail {
  odetailid: string;
  orderid: string;
  id: string | null;
  type: string | null;
  dname: string;
  dqty: string;
  dprice: string;
  dtotal: string;
  item_level_grand_total: string;
  comment: string | null;
  option_set: any;
  menu_item_id: string;
  category_id: string;
  brand_id: string;
  eatout_user_id: string;
  delete_time: string;
  discount: string;
  item_level_discount_value: string;
  coupon_discount: string;
  coupon_discount_value: string;
  adjustment_amount: string;
  tax: string;
  item_level_tax_value: string;
  status: string | null;
  status_comment: string | null;
  weight_value: string;
  weight_unit: string;
  orderstatus: string;
  product_code: string | null;
  category_name: string | null;
}
