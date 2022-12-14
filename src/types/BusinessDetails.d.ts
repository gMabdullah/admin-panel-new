// import SourceAdminId from "./Commons";

interface BusinessDetailsRequest extends SourceAdminId {
  restaurant_id: number;
}

interface BusinessDetailsResponse {
  message: string;
  result: BusinessDetailsResponseResult;
  status: string;
}

interface BusinessDetailsResponseResult {
  about: string;
  address: BusinessDetailsResponseResultAddress[];
  already_follow: string;
  budget: string;
  currency: string;
  deals: string;
  deals_content: string;
  deals_max: string;
  deals_min: string;
  decimal_places: string;
  discounts: string;
  dishes: string;
  distance: string;
  eatout_area: string;
  email: string;
  facilities: string[];
  feed_content: string;
  food: string[];
  home_content: string;
  inventory: string;
  khaba: string;
  location_content: string;
  logo: string;
  menu_content: string;
  menu_count: string;
  name: string;
  orders: string;
  phone: string;
  photos_count: string;
  r_id: string;
  rating: string;
  res: string;
  score_sort: string;
  subscribe_list: string;
  subscribers: string;
  timezone: string;
  timing: string;
  type: string;
  username: string;
  votes: string;
}

interface BusinessDetailsResponseResultAddress {
  admin_area_1: string;
  admin_area_2: string;
  area: string;
  branch_id: string;
  country: string;
  email: string;
  formatted_address: string;
  locality: string;
  location: BusinessDetailsResponseResultAddressLocation;
  phone: string;
  post_code: string;
  street_address: string;
}

interface BusinessDetailsResponseResultAddressLocation {
  lon: string;
  lat: string;
}
