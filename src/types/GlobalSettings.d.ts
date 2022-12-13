// import SourceAdminId from "./Commons";

interface GlobalSettingsRequest extends SourceAdminId {
  restaurant_id: number;
}

interface GlobalSettingsResponse {
  message: string;
  result: GlobalSettingsResponse_Result;
  status: string;
}

interface GlobalSettingsResponse_Result {
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

interface DeliveryServices {
  service_action: string;
  service_name: string;
  status: string;
}

interface ExtraSettings {
  cat_min_max: any[];
}

interface LoyaltyModule {
  campaign: boolean;
  points_difference: number;
  status: number;
  voucher: boolean;
}

interface LoyaltyProgram {
  campaigns: string;
  status: string;
}

interface MarketingModule {
  message: string;
  status: string;
}

interface PaymentSettings {
  stripe_settings: StripeSettings;
}

interface StripeSettings {
  account_id: string;
  active: boolean;
  message: string;
  preauth: boolean;
  status: number;
}

interface Settings {
  coupon: Coupon;
  editor: Editor;
  gratuity: Gratuity;
  product: Product;
}

interface Coupon {
  override: boolean;
}

interface Editor {
  enabled: boolean;
}

interface Gratuity {
  delivery: boolean;
  enabled: boolean;
  label: string;
  pickup: boolean;
  type: number;
  value: number;
}

interface Product {
  show_out_of_stock_price: boolean;
}
