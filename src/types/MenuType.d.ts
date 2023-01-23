interface MenuTypeResponse {
  status: string;
  message: string;
  result: MenuTypeResult[];
}

interface MenuTypeResult {
  id: string;
  name: string;
  r_id: string;
  status: string;
  item_cat_id: string;
  description: string;
  start_time: string;
  end_time: string;
  serial: string;
  discount: string;
  image: string;
  image_thumbnail: string;
}

interface DropdownValue {
  value: string;
  label: string;
}

interface FieldErrors {
  itemCategoryField: string;
  itemNameField: string;
  itemPriceField: string;
  itemDiscountDateField: string;
  itemMaximumDistanceField: string;
  itemMinimumQuantityField: string;
}

interface EditItem {
  editItemFlag: boolean;
  editItemId: string;
}
