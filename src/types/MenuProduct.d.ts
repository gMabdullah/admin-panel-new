interface ProductRequest {
  business_id: number;
  types: number;
  menu_type_id: number;
  offset: number;
  num: number;
  categories: number;
  brands: number;
  menu_item: number;
  query: string;
}

interface ProductResponse {
  status: string;
  message: string;
  info: ProductResponse_Info;
  filters: any[];
  tax: string;
  discount: string;
  inventory: string;
  items: ProductResponse_Item[];
  items_count: string;
  items_count_all: number;
  credentials: any[];
  categories: any[];
  discounted_items_count: string;
  menu_types: ProductResponse_MenuType[];
  brands: any[];
  menu_items: any[];
}

interface ProductResponse_Info {
  tax: string;
  discount: string;
  minimum_spend: string;
  delivery_charges: string;
  delivery_charges_tax: string;
  delivery_charges_range: any[];
  last_updated: string;
  tax_type: string;
  payment_type: any[];
  mods: any[];
  payment_options: any[];
  timezone: string;
  logo: string;
  currency: string;
  decimal_places: string;
  tax_before_discount: string;
  inventory: string;
}

interface ProductResponse_Item {
  comment: string;
  quantity: string;
  slots: null;
  time_bound_availability: number;
  discount_expired: string;
  category_slug: null;
  brand_slug: null;
  max_distance: number;
  disount_expired: string;
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
  nutritions: string;
  price: string;
  currency: string;
  desc: string;
  category: string;
  image: string;
  large_image: string;
  options: any;
  discount_display: string;
  discount_value: string;
  discount: string;
  discount_expiry: string;
  discount_start_at: string;
  tax: string;
  weight: number;
  calculated_weight: number;
  sku: string;
  status: string;
  status_note: string;
  brand: any[];
  item_brand: ProductResponse_ItemBrand[];
  carton: string;
  pallet: string;
  carton_price: string;
  pallet_price: string;
  product_code: string;
  upc: string;
  suggestions: any[];
  images: ProductResponse_Image[];
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
  display_source: string;
  total?: number | number;
  item_level_grand_total?: number | string;
  category_id?: string;
  item_level_discount_value?: number | string;
  coupon_discount?: number | string;
  coupon_discount_value?: number | string;
  item_level_tax_value?: number | string;
  label?: string;
}

interface ProductResponse_Image {
  image_thumbnail: string;
  image: string;
  image_id: null | string;
  image_position: null | string;
}

interface ProductResponse_ItemBrand {
  brand_id: string;
  brand_name: string;
}

interface ProductResponse_MenuType {
  id: string;
  name: string;
}
