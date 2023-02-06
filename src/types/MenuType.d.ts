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
  itemDiscountField: string;
  itemMaximumDistanceField: string;
  itemMinimumQuantityField: string;
}

interface EditItem {
  editItemFlag: boolean;
  editItemId: string;
}

interface AllAttributesType {
  attributeId: string;
  attributeName: string;
  attributeValue: DropdownValue;
  attributeOptions: DropdownValue[];
}

//Aws Data Type
interface AwsDataType {
  dealId: string | Blob;
  menuId: string | Blob;
  categoryId: string | Blob;
  reviewId: string | Blob;
  optionCatId: string | Blob;
  optionItemId: string | Blob;
  Brandid: string | Blob;
  imagePostion: string | Blob;
  imageTableType: string | Blob;
  imageType: string | Blob;
  resize: string | Blob;
  height: string | Blob;
  width: string | Blob;
  files: any;
}
