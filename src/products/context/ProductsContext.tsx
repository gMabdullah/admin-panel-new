import React, { useState, createContext, useReducer } from "react";

interface State {
  name: string;
  age: number;
}

// interface Action {
//   type: string;
//   payload: any;
// }

const initialState: State = {
  name: "",
  age: 0,
};

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

export const ProductsContext =
  createContext<ProductsContextInterface>(initialState);

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "UPDATE_NAME":
      return { ...state, name: action.payload };
    case "UPDATE_AGE":
      return { ...state, age: action.payload };
    default:
      return state;
  }
};

export const ProductsProvider = ({
  children,
}: {
  children: React.ReactElement;
}) => {
  const [options, setOptions] = useState<any>([]);
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <ProductsContext.Provider value={{ state, dispatch }}>
      {children}
    </ProductsContext.Provider>
  );
};
