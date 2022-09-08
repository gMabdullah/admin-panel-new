import SourceAdminId from "./commons";

export interface MenuCategoryReq extends SourceAdminId {
  eatout_id: number;
}

export interface MenuCategoryResp {
  status: string;
  message: string;
  result: Result[];
}

export interface Result {
  category_id: string;
  description: Description;
  menu_type_id: string;
  display_source: string;
  category_name: string;
  image: string;
  image_thumbnail: string;
  products_count: string;
  slug: null | string;
}

export enum Description {
  DescriptionPTestP = "<p>test</p>",
  Empty = "",
  PTestP = "<p>Test</p>",
}
