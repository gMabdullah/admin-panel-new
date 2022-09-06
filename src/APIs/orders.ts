import axios from "axios";
// import useAxios from 'axios-hooks';
import { APIsRequest, APIsResponse } from "../types";

// Eatout Details
export const getBusinessDetails = async () => {
  try {
    const data = await axios.get<APIsRequest["getBusinessDetails"]>(
      "https://tossdown.com/api/get_eatout_details_new?restaurant_id=12092&source=biz&admin_id=292968"
    );
  } catch (error) {
    console.log("Branches Error", error);
  }
};

export const getStatses = async () => {
  try {
    const formData = new FormData();
    formData.append("eatout_id", JSON.stringify(12277));
    formData.append("source", "biz");
    formData.append("admin_id", JSON.stringify(292968));
    const data = await axios.post<APIsRequest["getOrderStatues"]>(
      "https://tossdown.com/api/get_eatout_order_status",
      formData
    );
  } catch (error) {
    console.log("Branches Error", error);
  }
};
// Global Settings
export const getGlobalSettings = async () => {
  try {
    const data = await axios.get<APIsRequest["getGlobalSettings"]>(
      "https://tossdown.com/api/eatout_global_settings?restaurant_id=12092"
    );
    console.log("data", data);
  } catch (error) {
    console.log("Branches Error", error);
  }
};

// Get Branches
export const getBranches = async () => {
  try {
    const data = await axios.get<APIsRequest["getBranches"]>(
      "https://tossdown.com/api/get_eatout_branches?restaurant_id=12092&uid=292968&source=biz&admin_id=292968"
    );
    console.log("data", data);
  } catch (error) {
    console.log("Branches Error", error);
  }
};

// get Orders
export const getOrdersList = async () => {
  try {
    const formData = new FormData();

    formData.append("eatout_id", JSON.stringify(12277));
    formData.append("type", "Live");
    formData.append("offset", JSON.stringify(0));
    formData.append("return_statuses", JSON.stringify(1));
    formData.append("limit", JSON.stringify(100));
    formData.append("attributes", JSON.stringify(1));
    formData.append("source", "biz");
    formData.append("admin_id", JSON.stringify(292968));

    await axios.post<APIsRequest["getOrders"]>(
      "https://tossdown.com/api/order_get",
      formData
    );
  } catch (err) {
    console.log("Error", err);
  }
};
