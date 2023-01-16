import React, { createContext, useReducer } from "react";

interface ProductsContextInterface {
  state: State;
  dispatch: React.Dispatch<Action>;
}

interface Action {
  type: string;
  payload: {
    name: string;
    value: any;
  };
}

interface DropdownValue {
  value: string;
  label: string;
}

interface State {
  allCategories: DropdownValue[];
  allBrands: DropdownValue[];
  allItemsForGrouping: DropdownValue[];
  allOptionSets: DropdownValue[];
  itemCategoryId: string;
  itemName: string;
  itemPrice: string;
  itemTax: string;
  itemBrand: string;
  // itemOptionSets => multi select dropdown
  itemToGroup: string;
  itemSpecialNote: string;
  itemAvailability: string;
  itemSpecialInstructions: string;
  itemDisplay: string;
  // discountstate 1
  // discountstate 2
  // discountstate 3
  itemDescription: string;
  // itemShortDescription:string
  // itemLongDescription:string
  itemWeight: string;
  // itemWeightUnit: { value: "", label: "" },  => single select dropdown
  itemPricePer: string;
  itemMinimumQuantity: string;
  itemCartons: string;
  itemSku: string;
  itemUnitPrice: string;
  itemProductCode: string;
  itemUniversalProductCode: string;
  itemPallets: string;
  itemPalletPrice: string;
  itemNutritions: string | ItemDetailsResponseItemNutritions[];

  // addItemPayloadKeys: {
  //   item_id: string;
  //   eatout_id: string;
  //   category_id: string;
  //   name: string;
  //   description: string;
  //   allow_note: string;
  //   special_note: string;
  //   price: string;
  //   tax: string;
  //   tags_ids: string;
  //   discount: string; // required in api
  //   weight: string;
  //   sku: string;
  //   product_code: string;
  //   universal_product_code: string;
  //   unit_price: string;
  //   carton_size: string; // required in api
  //   carton_price: string;
  //   pallet_size: string; // required in api
  //   pallet_price: string;
  //   brand_id: string;
  //   option_sets: string;
  //   nutritions: string;
  //   suggestions: string; // required in api
  //   branches: string; // required in api
  //   status: string;
  //   display_source: string;
  //   order_limit: string;
  //   inv_limit: string;
  //   price_per: string;
  //   min_qty: string;
  //   images: string; // required in api
  //   item_weight_with_unit: string;
  //   // item_weight_with_unit: `${itemWeight} ${
  //   //   Object.keys(WeightUnit).length > 0 ? WeightUnit.value : ""
  //   // }`.trim(),
  //   discount_expiry: string;
  //   discount_start_at: string;
  //   attribute_ids: string;
  //   product_group_ids: string;
  //   max_distance: string;
  //   // max_distance: maxDistance ? maxDistance : "0",
  // };
}

const initialState: State = {
  allCategories: [],
  allBrands: [],
  allItemsForGrouping: [],
  allOptionSets: [],
  itemCategoryId: "",
  itemName: "",
  itemPrice: "",
  itemTax: "",
  itemBrand: "",
  // itemOptionSets => multi select dropdown
  itemToGroup: "",
  itemSpecialNote: "",
  itemAvailability: "0", // 1 and 0 => item not available and available respectively
  itemSpecialInstructions: "0", // 1 and 0 => allow and don't allow special instruction respectively
  itemDisplay: "0", // 0, 1, 2, and 3 => display (all , none, web, and pos) respectively
  // discountstate 1
  // discountstate 2
  // discountstate 3
  itemDescription: "",
  // itemShortDescription:'',
  // itemLongDescription:'',
  itemWeight: "",
  // itemWeightUnit: { value: "", label: "" }, => single select dropdown
  itemPricePer: "",
  itemMinimumQuantity: "",
  itemCartons: "",
  itemSku: "",
  itemUnitPrice: "",
  itemProductCode: "",
  itemUniversalProductCode: "",
  itemPallets: "",
  itemPalletPrice: "",
  itemNutritions: "",

  // addItemPayloadKeys: {
  //   item_id: "",
  //   eatout_id: "",
  //   category_id: "",
  //   name: "",
  //   description: "",
  //   allow_note: "",
  //   special_note: "",
  //   price: "",
  //   tax: "",
  //   tags_ids: "",
  //   discount: "", // required in api
  //   weight: "",
  //   sku: "",
  //   product_code: "",
  //   universal_product_code: "",
  //   unit_price: "",
  //   carton_size: "", // required in api
  //   carton_price: "",
  //   pallet_size: "", // required in api
  //   pallet_price: "",
  //   brand_id: "",
  //   option_sets: "",
  //   nutritions: "",
  //   suggestions: "", // required in api
  //   branches: "", // required in api
  //   status: "",
  //   display_source: "",
  //   order_limit: "",
  //   inv_limit: "",
  //   price_per: "",
  //   min_qty: "",
  //   images: "", // required in api
  //   item_weight_with_unit: "",
  //   // item_weight_with_unit: `${itemWeight} ${
  //   //   Object.keys(WeightUnit).length > 0 ? WeightUnit.value : ""
  //   // }`.trim(),
  //   discount_expiry: "",
  //   discount_start_at: "",
  //   attribute_ids: "",
  //   product_group_ids: "",
  //   max_distance: "0",
  //   // max_distance: maxDistance ? maxDistance : "0",
  // },
};

export const ProductsContext = createContext<ProductsContextInterface>({
  state: initialState,
  dispatch: () => null,
});

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "textField":
    case "radioButton":
    case "switchComponent":
    case "dropDown":
      return { ...state, [action.payload.name]: action.payload.value };
    case "clearState":
      return { ...state, age: action.payload };
    default:
      return state;
  }
};

export const ProductsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <ProductsContext.Provider value={{ state, dispatch }}>
      {children}
    </ProductsContext.Provider>
  );
};
