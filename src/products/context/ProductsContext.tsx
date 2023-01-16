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
