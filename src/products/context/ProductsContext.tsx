import { createContext } from "react";

interface State {
  name: string;
  age: number;
}

interface Action {
  type: string;
  payload: any;
}

const initialState: State = {
  name: "",
  age: 0,
};

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

export const MyContext = createContext<[State, React.Dispatch<Action>]>([
  initialState,
  () => {},
]);
