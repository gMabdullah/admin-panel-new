import React, { createContext, useReducer } from "react";

interface State {
  allCategories: DropdownValue[];
  allBrands: DropdownValue[];
  allItemsForGrouping: DropdownValue[];
  allOptionSets: DropdownValue[];
  allAttributes: AllAttributesType[];
  itemCategory: DropdownValue;
  itemName: string;
  itemPrice: string;
  itemTax: string;
  itemBrand: DropdownValue;
  itemOptionSets: DropdownValue[];
  itemToGroup: DropdownValue[];
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
  itemWeightUnit: DropdownValue;
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
  editItem: EditItem;
  allowItemsGrouping: boolean;
}

const initialState: State = {
  allCategories: [],
  allBrands: [],
  allItemsForGrouping: [],
  allOptionSets: [],
  allAttributes: [],
  itemCategory: {
    value: "",
    label: "",
  },
  itemName: "",
  itemPrice: "",
  itemTax: "",
  itemBrand: {
    value: "",
    label: "",
  },
  itemOptionSets: [],

  itemToGroup: [],
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
  itemWeightUnit: {
    value: "",
    label: "",
  },

  itemPricePer: "",
  itemMinimumQuantity: "1",

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
    itemMinimumQuantityField: "",
  },
  editItem: {
    editItemFlag: false,
    editItemId: "",
  },
  allowItemsGrouping: false,
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
    case "editItem":
      return {
        ...state,
        fieldError: {
          itemCategoryField: "",
          itemNameField: "",
          itemPriceField: "",
          itemDiscountDateField: "",
          itemMaximumDistanceField: "",
          itemMinimumQuantityField: "",
        },
        [action.payload.name!]: action.payload.value,
      };
    case "populateEditItemValues":
      return { ...state, ...action.payload.value };
    case "fieldError":
      return {
        ...state,
        [action.type]: {
          ...state.fieldError,
          [action.payload.name!]: action.payload.value
            ? action.payload.value
            : "Required*",
        },
      };
    case "clearState":
      return {
        ...state,
        itemCategory: {
          value: "",
          label: "",
        },
        itemName: "",
        itemPrice: "",
        itemTax: "",
        itemBrand: {
          value: "",
          label: "",
        },
        itemOptionSets: [],
        itemToGroup: [],
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
        itemWeightUnit: {
          value: "",
          label: "",
        },

        itemPricePer: "",
        itemMinimumQuantity: "1",

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
          itemMinimumQuantityField: "",
        },
        editItem: {
          editItemFlag: false,
          editItemId: "",
        },
        allowItemsGrouping: false,
      };
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
