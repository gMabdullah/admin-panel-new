interface OrderDeliveryAreasRequest {
  eatout_id: number;
  lat: number;
  lng: number;
  bid: number;
  weight: number;
  postal_code: string;
  source: string;
  admin_id: number;
}

interface OrderDeliveryAreasResponce {
  status: string;
  message: string;
  result: OrderDeliveryAreasResponce_BranchDetails[];
  radius: Radius[];
  user_distance: number;
  delivery_charges_tax: string;
  delivery_charges_range: string;
  menu_option_id: string;
  canada_post: string;
  canada_post_settings: CanadaPostSettings;
}

interface CanadaPostSettings {
  status: string;
  message: string;
  title: string;
  note: string;
  result: CanadaPostSettings_Result[];
}

interface CanadaPostSettings_Result {
  name: string;
  currency: string;
  price: string;
  message: string;
}

interface Radius {
  min: string;
  max: string;
  charges: string;
  discount_charges: string;
  minimum_spend: string;
}

interface OrderDeliveryAreasResponce_BranchDetails {
  area: string;
  country: string;
  city: string;
  branch: string;
  charges: string;
}
