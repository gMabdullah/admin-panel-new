// import SourceAdminId from "./Commons";

interface MenuCategoryRequest extends SourceAdminId {
  eatout_id: number;
}

interface MenuCategoryResponse {
  status: string;
  message: string;
  result: MenuCategoryResponse_Result[];
}

interface MenuCategoryResponse_Result {
  category_id: string;
  description: MenuCategoryResponse_Description;
  menu_type_id: string;
  display_source: string;
  category_name: string;
  image: string;
  image_thumbnail: string;
  products_count: string;
  slug: null | string;
}

enum MenuCategoryResponse_Description {
  DescriptionPTestP = "<p>test</p>",
  Empty = "",
  PTestP = "<p>Test</p>",
}
