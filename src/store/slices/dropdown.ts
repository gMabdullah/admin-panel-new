import { createSlice } from "@reduxjs/toolkit";

interface dropdownTypes {
  selectedBranch: string;
  selectedCity: string;
  selectedCategory: string;
}

// initial state
const initialState: dropdownTypes = {
  selectedBranch: "",
  selectedCity: "",
  selectedCategory: "",
};

// ==============================|| SLICE - Date Picker ||============================== //

const dropdown = createSlice({
  name: "dropdown",
  initialState,
  reducers: {
    setSelectedBranch(state, action) {
      state.selectedBranch = action.payload;
    },
    setSelectedCity(state, action) {
      state.selectedCity = action.payload;
    },
    setSelectedCategory(state, action) {
      state.selectedCategory = action.payload;
    },
  },
});

export default dropdown.reducer;

export const { setSelectedBranch, setSelectedCity, setSelectedCategory } =
  dropdown.actions;
