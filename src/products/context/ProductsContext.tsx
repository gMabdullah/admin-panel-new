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

interface State {
  allCategories: DropdownValue[];
  allBrands: DropdownValue[];
  allItemsForGrouping: DropdownValue[];
  allOptionSets: DropdownValue[];
  itemCategoryId: string;
  itemName: string;
  itemPrice: string;
  itemTax: string;
  itemBrandId: string;
  itemOptionSets: any;
  itemToGroup: string;
  itemSpecialNote: string;
  itemAvailability: string;
  itemSpecialInstructions: string;
  itemDisplay: string;

  itemDiscount: string;
  itemDiscountStart: string;
  itemDiscountExpiry: string;

  itemDescription: string;
  itemShortDescription: string;
  itemLongDescription: string;
  itemWeight: string;
  itemWeightUnit: string;
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
  itemBrandId: "",
  itemOptionSets: "",
  itemToGroup: "",
  itemSpecialNote: "",
  itemAvailability: "0", // 1 and 0 => item not available and available respectively
  itemSpecialInstructions: "0", // 1 and 0 => allow and don't allow special instruction respectively
  itemDisplay: "0", // 0, 1, 2, and 3 => display (all , none, web, and pos) respectively

  itemDiscount: "",
  itemDiscountStart: "",
  itemDiscountExpiry: "",

  itemDescription: "",
  itemShortDescription: "",
  itemLongDescription: "",

  itemWeight: "",
  itemWeightUnit: "",

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
    case "dropDown":
    case "editor":
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
