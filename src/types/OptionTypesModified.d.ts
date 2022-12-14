interface OptionSetProps {
  menu_item_id?: string;
  id?: string;
  name?: string;
  quantity?: string;
  min_quantity?: string;
  items?: OptionItem[];
  min: string | number | undefined;
  max: string | number | undefined;
  required: boolean | string;
  optional?: string;
  totalSelected?: number;
}

// return object props
interface ReturnObjProp {
  min: string | number | undefined;
  max: string | number | undefined;
  required: boolean | string;
  optional?: string;
}
