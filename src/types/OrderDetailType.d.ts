interface SelectedOrderDetailTypes {
  order_id: number;
  user_email: string;
  selectedOrder?: OrderUsernameEmail;
}

interface OrderDetailTypes extends SelectedOrderDetailTypes {
  eatout_id?: number;
  business_id?: number;
  source: string;
  admin_id: number;
  amount?: string;
  transaction_id?: string;
  attributes?: number;
}

interface OrderUsernameEmail {
  order_id: number;
  user_email: string;
}

type BizDeliveryPayloadType = {
  session: any;
  user_email: string;
  order_type: string;
  coupon_type: string;
  coupon_discount: string;
  coupon_id: string;
  res_id: string;
  tip: string;
  delivery_charges: string;
  service_charges: string;
  usr_lat: string;
  usr_lng: string;
  delivery_bit: string;
  branch_id: string;
  custom_delivery_charges: string;
  postal_code: string;
  canada_post: string;
};
