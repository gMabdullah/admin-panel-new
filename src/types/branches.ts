import SourceAdminId from "./commons";

export interface getBranchesReq extends SourceAdminId {
  restaurant_id: number;
  uid: number;
}

export interface GetBranchesResp {
  address: string;
  area: string;
  branch_id: string;
  city: string;
  country: string;
  delivery: string;
  email: string;
  lat: string;
  lng: string;
  location_address: string;
  note: string;
  phone: string;
  pickup: string;
  postcode: string;
  reservation: string;
  rname: string;
  service_charges: string;
  service_charges_type: string;
  settings: Settings;
  tax_type: string;
  tax_value: string;
  website: string;
}

export interface Settings {
  cart: Cart;
}

export interface Cart {
  discount: number | string;
  minimum_spent: number | string;
  online_payment_tax: number | string;
  tax: number | string;
  tax_type: string;
}
