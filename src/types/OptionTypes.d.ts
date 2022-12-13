interface AppContextInterface {
  options: any;
  setOptions: any;
  indexOptionSet: number;
  setIndexOptionSet: any;
  optionSetEdit: boolean;
  setOptionSetEdit: any;
  selectedOrderContext: any;
  setSelectedOrderContext: any;
  editAbleItem: any;
  setEditAbleItem: any;
}

interface OptionSetType {
  menu_item_id: string;
  id: string;
  name: string;
  quantity: string;
  min_quantity: string;
  items: OptionItem[];
  max: string;
  min: string;
  required: boolean;
  totalSelected: number;
}

interface PurpleItem {
  menu_item_id: string;
  id: string;
  name: string;
  quantity: string;
  min_quantity: string;
  items: OptionItem[];
}

interface OptionItem {
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
  items: PurpleItem[];
  isSelected?: boolean;
  quantity?: number;
  hasInnerOptions?: boolean;
}
