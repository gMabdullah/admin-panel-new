import { createSlice } from "@reduxjs/toolkit";

interface dropdownTypes {
  selectedBranch: string;
  selectedCity: string;
  selectedCategory: string;
  selectedBrand: string;
  selectedMenu: string;
}

// initial state
const initialState: dropdownTypes = {
  selectedBranch: "",
  selectedCity: "",
  selectedCategory: "",
  selectedBrand: "",
  selectedMenu: "",
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
    setSelectedBrand(state, action) {
      state.selectedBrand = action.payload;
    },
    setSelectedMenu(state, action) {
      state.selectedMenu = action.payload;
    },
  },
});

export default dropdown.reducer;

export const {
  setSelectedBranch,
  setSelectedCity,
  setSelectedCategory,
  setSelectedBrand,
  setSelectedMenu,
} = dropdown.actions;
