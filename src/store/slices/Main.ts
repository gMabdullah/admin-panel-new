import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";

interface dateProps {
  startDate: string | null;
  endDate: string | null;
  globalSettings: null;
  decimalPlaces: number;
  minimumSpend: number;
  showDatePicker: boolean;

  currency: string;
  label: string;
  richEditor: string;
  paymentSettings: StripeSettings;
  delivery_services: DeliveryServices;
}

// initial state
const initialState: dateProps = {
  startDate: null,
  endDate: null,
  globalSettings: null,
  decimalPlaces: 0,
  minimumSpend: 0,
  currency: "",
  label: "",
  showDatePicker: true,
  richEditor: "",
  paymentSettings: {
    account_id: "",
    active: false,
    message: "",
    preauth: false,
    status: 404,
  },
  delivery_services: {
    status: "0",
    service_name: "",
    service_action: "",
    order_status: "",
  },
};

// ==============================|| SLICE - Date Picker ||============================== //

const main = createSlice({
  name: "main",
  initialState,
  reducers: {
    setDate(state, action) {
      state.startDate = moment(action.payload.startDate).format("YYYY-MM-DD");
      state.endDate = moment(action.payload.endDate).format("YYYY-MM-DD");
    },
    resetDates(state) {
      state.startDate = null;
      state.endDate = null;
    },
    toggleDatePicker(state, action) {
      state.showDatePicker = action.payload;
    },
    setGlobalSettings(state, action) {
      const payload = action.payload;
      state.globalSettings = payload;
      state.richEditor = payload.settings.editor;
      state.decimalPlaces = payload.decimal_places;
      state.minimumSpend = payload.minimum_spend;
      state.currency = payload.currency;
      state.label = payload.label;
      state.paymentSettings = payload.payment_settings.stripe_settings;
      state.delivery_services = payload.delivery_services;
    },
  },
});

export default main.reducer;

export const { setDate, resetDates, setGlobalSettings, toggleDatePicker } =
  main.actions;
