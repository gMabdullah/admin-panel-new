import { createSlice } from "@reduxjs/toolkit";

interface dropdownTypes {
  selectedBranch: string;
}

// initial state
const initialState: dropdownTypes = {
  selectedBranch: "",
};

// ==============================|| SLICE - Date Picker ||============================== //

const dropdown = createSlice({
  name: "dropdown",
  initialState,
  reducers: {
    setSelectedBranch(state, action) {
      state.selectedBranch = action.payload;
    },
  },
});

export default dropdown.reducer;

export const { setSelectedBranch } = dropdown.actions;
