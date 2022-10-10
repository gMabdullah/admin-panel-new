import SourceAdminId from "./commons";

export interface GlobalSettingsReq extends SourceAdminId {
  restaurant_id: number;
}
export interface GlobalSettingsResp {
  message: string;
  result: Result;
  status: string;
}

export interface Result {
  currency: string;
  decimal_places: string;
  delivery_charges: string;
  delivery_charges_range: string;
  delivery_charges_tax: string;
  delivery_services: DeliveryServices;
  discount: string;
  extra_settings: ExtraSettings;
  inventory: string;
  last_updated: string;
  logo: string;
  loyalty_module: LoyaltyModule;
  loyalty_program: LoyaltyProgram;
  marketing_module: MarketingModule;
  minimum_spend: string;
  mods: any[];
  payment_options: any[];
  payment_settings: PaymentSettings;
  payment_type: any[];
  settings: Settings;
  tax: string;
  tax_before_discount: string;
  tax_type: string;
  timezone: string;
}

export interface DeliveryServices {
  service_action: string;
  service_name: string;
  status: string;
}

export interface ExtraSettings {
  cat_min_max: any[];
}

export interface LoyaltyModule {
  campaign: boolean;
  points_difference: number;
  status: number;
  voucher: boolean;
}

export interface LoyaltyProgram {
  campaigns: string;
  status: string;
}

export interface MarketingModule {
  message: string;
  status: string;
}

export interface PaymentSettings {
  stripe_settings: StripeSettings;
}

export interface StripeSettings {
  account_id: string;
  active: boolean;
  message: string;
  preauth: boolean;
  status: number;
}

export interface Settings {
  coupon: Coupon;
  editor: Editor;
  gratuity: Gratuity;
  product: Product;
}

export interface Coupon {
  override: boolean;
}

export interface Editor {
  enabled: boolean;
}

export interface Gratuity {
  delivery: boolean;
  enabled: boolean;
  label: string;
  pickup: boolean;
  type: number;
  value: number;
}

export interface Product {
  show_out_of_stock_price: boolean;
}
