import React, { createContext, useReducer } from "react";

interface ProductsContextInterface {
  state: State;
  dispatch: React.Dispatch<Action>;
}

interface Action {
  type: string;
  payload: {
    name: string;
    value?: any;
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

  itemCost: string;
  itemSku: string;
  itemUnitPrice: string;
  itemProductCode: string;
  itemUniversalProductCode: string;
  itemPallets: string;
  itemPalletPrice: string;
  itemCartons: string;
  itemMaximumDistance: string;
  itemNutritions: string | ItemDetailsResponseItemNutritions[];
  fieldError: FieldErrors;
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
  itemOptionSets: [
    {
      value: "2123",
      label: "Cutting Instructions B",
    },
  ],

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

  itemCost: "0",

  itemSku: "",
  itemUnitPrice: "",
  itemProductCode: "",
  itemUniversalProductCode: "",
  itemPallets: "",
  itemPalletPrice: "",
  itemCartons: "",
  itemMaximumDistance: "0",
  itemNutritions: "",
  fieldError: {
    itemCategoryField: "",
    itemNameField: "",
    itemPriceField: "",
    itemDiscountDateField: "",
    itemMaximumDistanceField: "",
  },
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
    case "fieldError":
      // const { fieldError } = state;
      // fieldError = {
      //   ...fieldError,
      //   [action.payload.name]: action.payload.value,
      // };
      return {
        ...state,
        [action.type]: {
          ...state.fieldError,
          [action.payload.name]: "Required*",
        },
      };
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
