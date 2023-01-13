import React, { useState, createContext, useReducer } from "react";

// export const initialState: State = {
//   name: "",
//   age: 0,
// };

// export const reducer = (state: State, action: Action) => {
//   switch (action.type) {
//     case "UPDATE_NAME":
//       return { ...state, name: action.payload };
//     case "UPDATE_AGE":
//       return { ...state, age: action.payload };
//     default:
//       return state;
//   }
// };

// export const ProductsContext = createContext<[State, React.Dispatch<Action>]>([
//   initialState,
//   () => {},
// ]);

// const defaultValue = {};

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
  // itemCategory => single select dropdown
  itemName: string;
  itemPrice: number;
  itemTax: number;
  // itemBrand => single select dropdown
  // itemOptionSets => multi select dropdown
  // itemToGroup => multi select dropdown
  itemSpecialNote: string;
  itemAvailability: string;
  itemSpecialInstructions: string;
  itemDisplay: string;
}

const initialState: State = {
  allCategories: [],
  // itemCategories => single select dropdown
  itemName: "",
  itemPrice: 0,
  itemTax: 0,
  // itemBrand => single select dropdown
  // itemOptionSets => multi select dropdown
  // itemToGroup => multi select dropdown
  itemSpecialNote: "",
  itemAvailability: "0", // 1 and 0 => item not available and available respectively
  itemSpecialInstructions: "0", // 1 and 0 => allow and don't allow special instruction respectively
  itemDisplay: "0", // 0, 1, 2, and 3 => display (all , none, web, and pos) respectively
};

export const ProductsContext = createContext<ProductsContextInterface>({
  state: initialState,
  dispatch: () => null,
});

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "textField":
    case "radioButton":
      return { ...state, [action.payload.name]: action.payload.value };
    case "switchComponent":
      return { ...state, age: action.payload };
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
