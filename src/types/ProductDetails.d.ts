// import SourceAdminId from "./Commons";

interface ItemDetailsRequest extends SourceAdminId {
  item_id: number;
  business_id: number;
}

interface ItemDetailsResponse {
  items: ItemDetailsResponseItem[];
}

interface ItemDetailsResponseItem {
  slots: null;
  time_bound_availability: boolean;
  product_settings: ItemDetailsResponseItemProductSettings;
  max_distance: number;
  available_in_distance: string;
  canada_post_distance: number;
  is_parent: boolean;
  is_grouped: boolean;
  grouped_products: any[];
  attributes: any[];
  name: string;
  menu_item_id: string;
  menu_cat_id: string;
  menu_cat_image: string;
  menu_cat_image_thumbnail: string;
  menu_cat_sku: string;
  nutritions: string | ItemDetailsResponseItemNutritions[];
  price: string;
  currency: string;
  desc: string;
  category: string;
  image: string;
  large_image: string;
  options: ItemDetailsResponseItemOptions[];
  discount_display: string;
  discount_value: string;
  discount: string;
  discount_expiry: string;
  discount_start_at: string;
  tax: string;
  weight: string;
  calculated_weight: number;
  sku: string;
  status: string;
  display_source: string;
  brand: any[];
  item_brand: ItemDetailsResponseItemItemBrand[];
  carton: string;
  pallet: string;
  carton_price: string;
  pallet_price: string;
  product_code: string;
  upc: string;
  suggestions: any[];
  images: any[];
  calculated_price: number;
  branches: string;
  is_selected: boolean;
  unit_price: string;
  item_weight: string;
  allow_note: string;
  note: string;
  featured_section: string;
  order_limit: string;
  price_per: string;
  inv_limit: string;
  weight_value: string;
  weight_unit: string;
  branch_na: string[];
  min_qty: string;
  product_tags: any[];
}

interface ItemDetailsResponseItemItemBrand {
  brand_id: string;
  brand_name: string;
}

interface ItemDetailsResponseItemOptionsOptionItems {
  id: string;
  cat_id: string;
  name: string;
  price: string;
  flag: string;
  image: string;
  sku: string;
  discount: string;
  weight: string;
  weight_value: string;
  weight_unit: string;
  items: ItemDetailsResponseItemOptions[];
}

interface ItemDetailsResponseItemOptions {
  menu_item_id: string;
  id: string;
  name: string;
  quantity: string;
  min_quantity: string;
  items: ItemDetailsResponseItemOptionsOptionItems[];
}

interface ItemDetailsResponseItemProductSettings {
  apply_delivery_charges: boolean;
}

interface ItemDetailsResponseItemNutritions {
  name: string;
  value: string;
}

interface ItemDetailsResponseItemNutritionsTable {
  id: string;
  name: string;
  value: string;
}
