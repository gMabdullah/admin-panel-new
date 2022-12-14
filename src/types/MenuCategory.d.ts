// import SourceAdminId from "./Commons";

interface MenuCategoryRequest extends SourceAdminId {
  eatout_id: number;
}

interface MenuCategoryResponse {
  status: string;
  message: string;
  result: MenuCategoryResponseResult[];
}

interface MenuCategoryResponseResult {
  category_id: string;
  description: MenuCategoryResponseDescription;
  menu_type_id: string;
  display_source: string;
  category_name: string;
  image: string;
  image_thumbnail: string;
  products_count: string;
  slug: null | string;
}

enum MenuCategoryResponseDescription {
  DescriptionPTestP = "<p>test</p>",
  Empty = "",
  PTestP = "<p>Test</p>",
}
