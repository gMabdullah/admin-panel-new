import axios from "axios";
// import useAxios from 'axios-hooks';
import { APIsRequest, APIsResponse } from "../types";

const instance = axios.create({
	baseURL: 'https://beta1.tossdown.com/api/',
});

export const getOrderCitiesFilter = async () => {
  try {
    const formData = new FormData();
    formData.append("eatout_id", JSON.stringify(12277));
    formData.append("source", "biz");
    formData.append("admin_id", JSON.stringify(292968));
    const data = instance.post<APIsResponse["getOrderCitiesFilter"]>(
      "order_city_filter",
      formData
    );
  } catch (error) {
    console.log("order cities failed");
  }
};

// Eatout Details
export const getBusinessDetails = async () => {
  try {
    const data = await instance.get<APIsResponse["getBusinessDetails"]>(
      "get_eatout_details_new?restaurant_id=12092&source=biz&admin_id=292968"
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
    const data = await instance.post<APIsRequest["getOrderStatues"]>(
      "get_eatout_order_status",
      formData
    );
  } catch (error) {
    console.log("Branches Error", error);
  }
};
// Global Settings
export const getGlobalSettings = async () => {
  try {
    const data = await instance.get<APIsRequest["getGlobalSettings"]>(
      "eatout_global_settings?restaurant_id=12092"
    );
    console.log("data", data);
  } catch (error) {
    console.log("Branches Error", error);
  }
};

// Get Branches
export const getBranches = async () => {
  try {
    const data = await instance.get<APIsRequest["getBranches"]>(
      "get_eatout_branches?restaurant_id=12092&uid=292968&source=biz&admin_id=292968"
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

    formData.append("type", "Live");
    formData.append("offset", JSON.stringify(0));
    formData.append("return_statuses", JSON.stringify(1));
    formData.append("limit", JSON.stringify(100));
    formData.append("attributes", JSON.stringify(1));
    formData.append("eatout_id", JSON.stringify(12277));
    formData.append("source", "biz");
    formData.append("admin_id", JSON.stringify(292968));

    await instance.post<APIsRequest["getOrders"]>(
      "order_get",
      formData
    );
  } catch (err) {
    console.log("Error", err);
  }
};
// Menu Item Category
export const getMenuItemCategory = async () => {
  try{
    const formData = new FormData();
    formData.append("eatout_id", JSON.stringify(12277));
    formData.append("source", "biz");
    formData.append("admin_id", JSON.stringify(292968));

    await instance.post<APIsRequest["getMenuCategory"]>(
      "get_menu_item_category",
      formData
    )
  }catch(err){
    console.log("Menu Category", err)
  }
}
// Order Timeline
export const getOrderTimeline = async () => {
  try{
    const formData = new FormData();
    formData.append("eatout_id", JSON.stringify(12277));
    formData.append("type", "order");
    formData.append("order_id", JSON.stringify(3268355))
    formData.append("source", "biz");
    formData.append("admin_id", JSON.stringify(292968));

    await instance.post<APIsRequest["getOrderTimeline"]>(
      "get_order_timeline",
      formData
    )
  }catch(err){
    console.log("Menu Category", err)
  }
}