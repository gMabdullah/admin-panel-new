import React, { useContext, useEffect, useState } from "react";

import {
  GridColumns,
  DataGrid,
  GridActionsCellItem,
  GridRowParams,
  GridSelectionModel,
  GridRenderCellParams,
} from "@mui/x-data-grid";
import { makeStyles } from "@mui/styles";
import {
  Typography,
  Stack,
  Box,
  Grid,
  Divider,
  Modal,
  IconButton,
  CardContent,
  Skeleton,
} from "@mui/material";
import {
  AddTwoTone,
  PictureAsPdfTwoTone,
  PrintTwoTone,
  AccountCircleTwoTone,
  SmartphoneTwoTone,
  PinDropTwoTone,
  DeleteTwoTone,
  EditTwoTone,
  HighlightOffTwoTone,
} from "@mui/icons-material";

import { OrderListingSkeleton } from "components/skeleton/OrderListingSkeleton";
import Notify from "components/Notify";
import MainCard from "components/cards/MainCard";
import CustomButton from "components/CustomButton";
import GoogleMapFrame from "components/GoogleMapFrame";
import ExcelExport from "components/ExcelExport";
import TdTextField from "components/TdTextField";
import Progress from "components/Progress";
import CustomRadioButton from "components/CustomRadioButton";

import {
  AMANAT_BUSINESS_ID,
  DWP_BUSINESS_ID,
  DWP_STAGING_BUSINESS_ID,
  AMANAT_STAGING_BUSINESS_ID,
} from "constants/BusinessIds";
import { OptionSetContext } from "orders/context/OptionSetContext";
import { toCapitalizeFirstLetter } from "orders/HelperFunctions";

import OrderStatusAction from "./OrderStatusAction";
import AddEditItemModal from "./AddEditItemModal";
import { useSelector } from "store";
import moment from "moment";

import useAxios, { configure } from "axios-hooks";
import { axios } from "config";

configure({ axios });

const useStyles = makeStyles(() => ({
  backDrop: {
    backdropFilter: "blur(0px)",
    backgroundColor: "transparent",
  },
  modalStyle1: {
    overflow: "scroll",
  },
  excelExportFile: {
    width: "104px",
    height: " 20px",
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: 500,
    fontSize: "14px",
    lineHeight: "20px",
  },
  downloadPdf: {
    width: "92px",
    height: "20px",
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: 500,
    fontSize: "14px",
    lineHeight: "20px",
  },
  pdf_print_user_phone_location_IconColor: {
    color: "#616161",
  },
  printHeading: {
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: 500,
    fontSize: "14px",
    lineHeight: "20px",
  },
}));

const tableData = [
  { header: "Item #", key: "item_no" },
  { header: "Category", key: "category" },
  { header: "Item ID", key: "item_id" },
  { header: "Item Name", key: "item_name" },
  { header: "Brand", key: "brand" },
  { header: "Quantity", key: "quantity" },
  { header: "Weight", key: "weight" },
  { header: "Price", key: "price" },
  { header: "Amount", key: "amount" },
  { header: "Total", key: "total" },
  { header: "Options", key: "options" },
  { header: "Note", key: "note" },
  { header: "Instructions", key: "instructions" },
];

interface orderDetailsProps {
  selectedOrder: SelectedOrderDetailTypes;
  setOrderDetailModal: React.Dispatch<React.SetStateAction<boolean>>;
  orderDetailModal: boolean;
  setSelectionModel: React.Dispatch<React.SetStateAction<GridSelectionModel>>;
}

let errorMessage = { address: "", mobileNo: "", deliveryCharges: "" };

const { eatout_id, user_id } = JSON.parse(
  localStorage.getItem("businessInfo")!
);

const OrderDetail = ({
  setOrderDetailModal,
  orderDetailModal,
  setSelectionModel,
  selectedOrder,
}: orderDetailsProps) => {
  const classes = useStyles();
  const {
    options,
    setOptions,
    selectedOrderContext,
    setSelectedOrderContext,
    editAbleItem,
    setEditAbleItem,
  } = useContext(OptionSetContext);
  const { decimalPlaces, minimumSpend, currency } = useSelector(
    (state) => state.main
  );
  const [fieldError, setFieldError] = useState(errorMessage);
  const [orderDetailLoader, setOrderDetailLoader] = useState(false);
  const [customerDetailLoader, setCustomerDetailLoader] = useState(false);
  const [rowSkeletonLoader, setRowSkeletonLoader] = useState(false);

  const [orderFromAPI, setOrderFromAPI] = useState<
    OrderListingResponseResult[]
  >([]);

  const [openAddEditItemModal, setAddEditItemModal] = useState<boolean>(false);

  const [editItemFlag, setEditItemFlag] = useState<boolean>(false);
  const [customerDetailModal, setCustomerDetailModal] = useState(false);
  const [notify, setNotify] = useState<boolean>(false);
  const [notifyMessage, setNotifyMessage] = useState("");
  const [notifyType, setNotifyType] = useState<
    "success" | "info" | "warning" | "error"
  >("info");
  const [deliveryChargesModal, setDeliveryChargesModal] = useState(false);

  // state for cancel and update buttons show/hide
  const [cancelUpdateButtonToggle, setCancelUpdateButtonToggle] =
    useState(false);
  const [customerAddress, setCustomerAddress] = React.useState("");
  const [customerMobileNo, setCustomerMobileNo] = React.useState("");

  // Weight States
  const [haveWeight, setHaveWeight] = useState(false);
  const [totalWeight, setTotalWeight] = useState(0);
  const [weightUnit, setWeightUnit] = useState("");

  // Delivery States
  const [deliveryChargesList, setDeliveryChargesList] = useState([
    {
      label: "",
      value: "",
    },
  ]);
  const [canadaPostDeliveryCharges, setCanadaPostDeliveryCharges] =
    useState("");
  const [deliveryChargeField, setDeliveryChargesField] = useState("");

  const [prevState, setPrevState] = useState<string | null>(null);
  const [prevDeliveryState, setPrevDeliveryState] = useState(true);

  //======================================= API Calls & Handlers =======================================//

  // single order API call payload
  const getSingleOrderAPIPayload = () => {
    const formData = new FormData();

    formData.append("eatout_id", eatout_id);
    formData.append("order_id", `${selectedOrder.order_id}`);
    formData.append("user_email", selectedOrder.user_email);
    formData.append("attributes", `${1}`);
    formData.append("admin_id", user_id);
    formData.append("source", "biz");
    return formData;
  };

  // single order API call
  const [{}, getSingleOrderAPICall] = useAxios(
    {
      url: "/order_get",
      method: "post",
    },
    { manual: true }
  );

  useEffect(() => {
    // set order detail response to state
    (async () => {
      setOrderDetailLoader(true);

      // API call to get single order
      const {
        data: { result },
      } = await getSingleOrderAPICall({
        data: getSingleOrderAPIPayload(),
      });

      setSelectedOrderContext(result[0]);
      setOrderFromAPI(result);
      setOrderDetailLoader(false);

      // give delivery charges to delivery charges state
      setDeliveryChargesField(result[0].delivery_charges);

      // update weights
      weightUpdate(result[0]);
    })();
  }, []);

  // order update API call payload
  const orderUpdateAPIPayload = (orderUpdate_payload: any) => {
    const formData = new FormData();

    formData.append("orders", JSON.stringify(orderUpdate_payload));
    formData.append("admin_id", user_id);
    formData.append("source", "biz");
    return formData;
  };

  // order update API call
  const [{}, orderUpdateAPICall] = useAxios(
    {
      url: "/order_update",
      method: "post",
    },
    { manual: true }
  );

  // biz-Delivery-Calculation API call payload
  const bizDeliveryCalculationAPIPayload = (
    bizDeliveryPayload: BizDeliveryPayloadType
  ) => {
    const formData = new FormData();

    formData.append("source", "biz");
    formData.append("eatout_id", eatout_id);
    formData.append("admin_id", user_id);
    formData.append("param", JSON.stringify(bizDeliveryPayload));
    return formData;
  };

  // biz-Delivery-Calculation API call
  const [{}, bizDeliveryCalculationAPICall] = useAxios(
    {
      url: `${process.env.REACT_APP_TOSSDOWN_SITE}/biz_delivery_calculations`,
      method: "post",
    },
    { manual: true }
  );

  // customer info update API call payload
  const customerInfoUpdateAPIPayload = () => {
    const { order_id, landline_number } = orderFromAPI[0];

    const formData = new FormData();
    formData.append("eatout_id", eatout_id);
    formData.append("order_id", order_id);
    formData.append("mobile", customerMobileNo);
    formData.append("address", customerAddress);
    formData.append("landline", landline_number);
    formData.append("admin_id", user_id);
    formData.append("source", "biz");
    return formData;
  };

  // customer info update API call
  const [{}, customerInfoUpdateAPICall] = useAxios(
    {
      url: "/update_user_order_info",
      method: "post",
    },
    { manual: true }
  );

  // get single item API call (for edit item)
  const [{}, singleItemCall] = useAxios(
    {
      method: "get",
    },
    { manual: true }
  );

  // Delivery charges
  const orderDeliveryChargesAPIPayload = (item: OrderDeliveryAreasRequest) => {
    const formData = new FormData();

    formData.append("eatout_id", `${eatout_id}`);
    formData.append("lat", `${item["lat"]}`);
    formData.append("lng", `${item["lng"]}`);
    formData.append("bid", `${item["bid"]}`);
    formData.append("weight", `${item["weight"]}`);
    formData.append("postal_code", `${item["postal_code"]}`);
    formData.append("admin_id", user_id);
    formData.append("source", "biz");
    return formData;
  };

  const [{ data: canadaPostSetting }, orderDeliveryChargesAPICall] = useAxios(
    {
      url: "/get_order_delivery_areas",
      method: "post",
      data: orderDeliveryChargesAPIPayload({
        eatout_id,
        lat: selectedOrderContext.user_latitude,
        lng: selectedOrderContext.user_longitude,
        bid: selectedOrderContext.eatout_bid,
        weight: totalWeight,
        postal_code: selectedOrderContext.postal_code,
        admin_id: user_id,
        source: "biz",
      }),
    },
    { manual: true }
  );

  useEffect(() => {
    if (!canadaPostSetting) return;

    if (
      canadaPostSetting.canada_post_settings &&
      canadaPostSetting.canada_post_settings.status === "200"
    ) {
      const { result } = canadaPostSetting.canada_post_settings;
      const canadaPostOptions =
        result &&
        result.map((option: CanadaPostSettingsResult) => ({
          label: `${option.name} (${option.price} CAD)`,
          value: option.price,
        }));
      setDeliveryChargesList(canadaPostOptions);

      setCustomerDetailLoader(false);
    }
  }, [canadaPostSetting]);

  const openDeliveryModal = () => {
    setDeliveryChargesModal(true);

    if (Number(selectedOrderContext.canada_post)) {
      const { user_latitude, user_longitude, eatout_bid, postal_code } =
        selectedOrderContext;

      setCustomerDetailLoader(true);

      orderDeliveryChargesAPICall({
        data: orderDeliveryChargesAPIPayload({
          eatout_id,
          lat: user_latitude,
          lng: user_longitude,
          bid: eatout_bid,
          weight: totalWeight,
          postal_code: postal_code,
          admin_id: user_id,
          source: "biz",
        }),
      });
    }
  };

  // Delivery charges handler
  const handleDeliveryChargesField = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    if (prevDeliveryState) {
      setPrevState(deliveryChargeField);
      setPrevDeliveryState(false);
    }
    setFieldError({ ...fieldError, deliveryCharges: "" });
    setDeliveryChargesField(e.target.value);
  };

  // Update Delivery Charges
  const handleDeliveryChargesUpdate = () => {
    const customDeliveryCharges = "1";
    if (selectedOrderContext.canada_post === "1") {
      if (canadaPostDeliveryCharges === "") return;

      setDeliveryChargesField(canadaPostDeliveryCharges);

      // update Order
      makeOrderDetailObjForBizDeliveryAPI("", customDeliveryCharges);
    } else if (deliveryChargesValidation()) {
      makeOrderDetailObjForBizDeliveryAPI("", customDeliveryCharges);
    }

    toggleDeliveryChargesModal();
  };

  const deliveryChargesValidation = () => {
    if (!deliveryChargeField) {
      setFieldError({
        ...fieldError,
        deliveryCharges: "Please Enter the Delivery Charges",
      });

      return false;
      // entry should be positive integer or float
    } else if (!/^[0-9.|()&^]*$/.test(deliveryChargeField)) {
      setFieldError({
        ...fieldError,
        deliveryCharges: "Please Enter a Positive number",
      });

      return false;
    }
    return true;
  };

  const toggleCustomerDetailModal = () => {
    if (!customerDetailModal) {
      setCustomerAddress(orderFromAPI[0].address);
      setCustomerMobileNo(orderFromAPI[0].mobile_number);
    }

    setCustomerDetailModal((state) => !state);
  };

  const handleAddressChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setFieldError({ ...fieldError, address: "" });
    setCustomerAddress(e.target.value);
  };

  const handleMobileNoChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setFieldError({ ...fieldError, mobileNo: "" });
    setCustomerMobileNo(e.target.value);
  };

  const canadaPostHandler = (e: { target: { value: string } }) => {
    setCanadaPostDeliveryCharges(e.target.value);
  };

  const handleCustomerDetailUpdate = async () => {
    if (customerAddress === "") {
      setFieldError({ ...fieldError, address: "Enter your address!" });
      return;
    } else if (customerMobileNo === "") {
      setFieldError({ ...fieldError, mobileNo: "Enter your mobile no!" });
      return;
    } else {
      setCustomerDetailLoader(true);

      // customer info update API call
      const {
        data: { status },
      } = await customerInfoUpdateAPICall({
        data: customerInfoUpdateAPIPayload(),
      });

      if (status === "1") {
        let selectedOrder = [...orderFromAPI];

        selectedOrder[0].mobile_number = customerMobileNo;
        selectedOrder[0].address = customerAddress;

        setOrderFromAPI(selectedOrder);
        setCustomerDetailLoader(false);
        setCustomerDetailModal(false);

        setNotifyMessage("Customer details updated successfully");
        setNotifyType("success");
        setNotify(true);
      }
    }
  };

  const closeNotify = () => setNotify(false);

  const linearLoader = () => {
    return <Progress type="linear" />;
  };

  const getEditItemCallback = (editedItem: OrderListingResponseOrderDetail) => {
    let selectedOrder = orderFromAPI;

    const editedOrderDetail = selectedOrder[0].order_detail.map((item) =>
      item.item_id === editedItem.item_id ? editedItem : item
    );

    selectedOrder[0].order_detail = editedOrderDetail;

    setOrderFromAPI(selectedOrder);

    // make payload object for biz-delivery-calculation api
    makeOrderDetailObjForBizDeliveryAPI("editItem");
  };

  // getting new item in order
  const getNewItemCallback = (item: ProductResponseItem) => {
    if (checkItemExistence(item)) {
      setNotifyMessage("Item already exists with this option set");
      setNotifyType("error");
      setNotify(true);
      return;
    } else {
      // creating object To Append In Order Detail array for table
      let objectToAppendInOrderDetail = { ...orderFromAPI[0].order_detail[0] };

      objectToAppendInOrderDetail.attributes = item.attributes;
      objectToAppendInOrderDetail.item_name = item.name;
      objectToAppendInOrderDetail.brand_name = item.item_brand[0].brand_name;
      objectToAppendInOrderDetail.item_id = item.menu_item_id;
      objectToAppendInOrderDetail.product_code = item.product_code;
      objectToAppendInOrderDetail.item_cat_id = item.menu_cat_id;
      objectToAppendInOrderDetail.quantity = item.quantity;
      objectToAppendInOrderDetail.price = item.price;
      objectToAppendInOrderDetail.status = item.status;
      objectToAppendInOrderDetail.weight_value = item.weight_value;
      objectToAppendInOrderDetail.weight_unit = item.weight_unit;
      objectToAppendInOrderDetail.comment = item.comment;
      objectToAppendInOrderDetail.discount = item.discount;
      objectToAppendInOrderDetail.tax = item.tax;
      objectToAppendInOrderDetail.options = item.options;
      objectToAppendInOrderDetail.brand_id = item.item_brand[0].brand_id;
      objectToAppendInOrderDetail.label = item.label;

      // handling pre-auth for biz delivery calculations
      if (orderFromAPI[0].pre_auth == "1") {
        if (typeof item.calculated_weight === "undefined")
          objectToAppendInOrderDetail.weight = item.weight_value
            ? Number(item.weight_value)
            : 0.5;
        else
          objectToAppendInOrderDetail.weight =
            item.calculated_weight > 0 ? Number(item.calculated_weight) : 0.5;
      } else {
        objectToAppendInOrderDetail.weight = Number(item.weight_value);
      }

      // these keys are not present in some items
      objectToAppendInOrderDetail.total = "";
      objectToAppendInOrderDetail.item_level_grand_total = "";
      objectToAppendInOrderDetail.category_id = item.menu_cat_id;
      objectToAppendInOrderDetail.item_level_discount_value = "";
      objectToAppendInOrderDetail.coupon_discount = "";
      objectToAppendInOrderDetail.coupon_discount_value = "";
      objectToAppendInOrderDetail.item_level_tax_value = "";

      let selectedOrders = orderFromAPI;

      selectedOrders[0].order_detail = [
        ...orderFromAPI[0].order_detail,
        objectToAppendInOrderDetail,
      ];
      setOrderFromAPI(selectedOrders);

      // make payload object for biz-delivery-calculation api
      makeOrderDetailObjForBizDeliveryAPI("addItem");
    }
  };

  const checkItemExistence = (newItem: ProductResponseItem) => {
    return orderFromAPI[0].order_detail.some(
      (orderItem) => orderItem.item_id === newItem.menu_item_id
    );
  };

  const makeOrderDetailObjForBizDeliveryAPI = async (
    actionType: string,
    customDeliveryCharges = "0"
  ) => {
    if (actionType === "addItem") {
      setRowSkeletonLoader(true);
    } else {
      // linear loader in case of edit and delete
      setOrderDetailLoader(true);
    }

    const selectedOrderDetail = orderFromAPI[0].order_detail;

    // array of objects like; this is created for biz_delivery_calculation
    const orderDetailItemsArrayForBizDelivery = selectedOrderDetail.map(
      (item) => ({
        menu_item_id: item.item_id,
        productname: item.item_name,
        label: item.label,
        productprice: item.price,
        itemQty: item.quantity,
        rid: eatout_id,
        item_category_id: item.category_id,
        item_brand_id: item.brand_id,
        product_code: item.product_code,
        weight_value: item.weight_value,
        weight_unit: item.weight_unit,
        note: item.comment,
        newItemTax: item.tax,
        newItemDiscount: item.discount,
        slug: `menu_item_id_${item.item_id}`,
        option: item.options,
      })
    );

    let bizDeliveryPayload = {
      session: {},
      user_email: "",
      order_type: "",
      coupon_type: "",
      coupon_discount: "",
      coupon_id: "",
      res_id: "",
      tip: "",
      delivery_charges: "",
      service_charges: "",
      usr_lat: "",
      usr_lng: "",
      delivery_bit: "",
      branch_id: "",
      postal_code: "",
      canada_post: "",
      custom_delivery_charges: "",
    };

    const formatOptionSet = (item: any) => {
      let option: any = {};
      if (
        item.option &&
        item.option !== "{}" &&
        Object.keys(item.option).length !== 0
      ) {
        let obj: any = {};
        const options = JSON.parse(item.option);
        for (const key in options) {
          const option_array: any = [];
          options[key].map((option: any) => {
            option_array.push(
              `${option.name},${option.price},${option.quantity}`
            );
            if (option.inner_options && option.inner_options !== "{}") {
              let innerObj: any = {};
              for (const innerKey in option.inner_options) {
                option.inner_options[innerKey].map((innerOption: any) => {
                  innerObj[
                    innerKey
                  ] = `${innerOption.name},${innerOption.price},${innerOption.quantity}`;
                });
              }
              option_array.push({ ...innerObj });
            }
          });
          obj[key] = [...option_array];
          option = obj;
        }
        return option;
      } else return "";
    };

    // type is any because we are getting the unknown keys according to item id
    let itemsSessionObj: any = {};

    if (orderDetailItemsArrayForBizDelivery.length > 0) {
      orderDetailItemsArrayForBizDelivery.forEach((item) => {
        // Making menu menuItemIdOptionNameSlug
        let optionSetName = "";
        if (item.option) {
          const itemOptions = JSON.parse(item.option);
          for (const option in itemOptions) {
            itemOptions[option].map((optionItem: any) => {
              if (optionSetName === "")
                optionSetName = `${optionItem.name
                  .split(" ")
                  .join("")
                  .toLowerCase()}`;
              else
                optionSetName = `${optionItem.name
                  .split(" ")
                  .join("")
                  .toLowerCase()}`;
            });
          }
        }
        item.option = formatOptionSet(item);
        let makeAKey = `${item.slug}${optionSetName}`;

        // make session object with menuItemIdOptionNameSlug keys with their respective values
        itemsSessionObj[makeAKey] = item;
      });
    }
    bizDeliveryPayload.session = JSON.stringify(itemsSessionObj);
    bizDeliveryPayload.user_email = orderFromAPI[0].user_email;
    bizDeliveryPayload.order_type = orderFromAPI[0].order_type;
    bizDeliveryPayload.coupon_type = orderFromAPI[0].custom_code_type;
    bizDeliveryPayload.coupon_discount = orderFromAPI[0].custom_code_discount;
    bizDeliveryPayload.coupon_id = orderFromAPI[0].custom_code_id;
    bizDeliveryPayload.res_id = eatout_id;
    bizDeliveryPayload.tip = orderFromAPI[0].tip;
    bizDeliveryPayload.delivery_charges =
      orderFromAPI[0].canada_post == "1"
        ? canadaPostDeliveryCharges
        : deliveryChargeField;
    bizDeliveryPayload.service_charges = orderFromAPI[0].service_charges;
    bizDeliveryPayload.usr_lat = orderFromAPI[0].user_latitude;
    bizDeliveryPayload.usr_lng = orderFromAPI[0].user_longitude;
    bizDeliveryPayload.delivery_bit = orderFromAPI[0].pre_auth;
    bizDeliveryPayload.branch_id = orderFromAPI[0].eatout_bid;
    bizDeliveryPayload.custom_delivery_charges = customDeliveryCharges;
    bizDeliveryPayload.postal_code = orderFromAPI[0].postal_code;
    bizDeliveryPayload.canada_post = orderFromAPI[0].canada_post;

    // biz-Delivery-Calculation API call
    const {
      data: { final_order_array },
    } = await bizDeliveryCalculationAPICall({
      data: bizDeliveryCalculationAPIPayload(bizDeliveryPayload),
    });

    let selectedOrder = orderFromAPI;
    const itemsFromBizDelivery = final_order_array.items;

    selectedOrder[0].total = final_order_array.sub_total;
    selectedOrder[0].grand_total = final_order_array.grand_total;
    selectedOrder[0].tax = final_order_array.tax;
    selectedOrder[0].discount_value = final_order_array.discount;
    selectedOrder[0].custom_code_discount_value =
      final_order_array.custom_code_discount_value;
    selectedOrder[0].service_charges = final_order_array.service_charges;
    selectedOrder[0].tip = final_order_array.tip;
    selectedOrder[0].delivery_charges = final_order_array.delivery_charges;

    selectedOrder[0].order_detail.forEach((item, index) => {
      item.item_name = itemsFromBizDelivery[index].dish_name;
      item.label = item.label === undefined ? "" : item.label;

      item.brand_id = itemsFromBizDelivery[index].brand_id;
      item.brand_name =
        item.brand_name === undefined
          ? item.item_brand === undefined
            ? ""
            : item.item_brand[0].brand_name
          : item.brand_name;

      item.category_id = itemsFromBizDelivery[index].category_id;
      item.comment =
        itemsFromBizDelivery[index].comment === undefined
          ? ""
          : itemsFromBizDelivery[index].comment;
      item.product_code = itemsFromBizDelivery[index].product_code;

      item.tax = itemsFromBizDelivery[index].tax;
      item.discount = itemsFromBizDelivery[index].discount;

      item.coupon_discount_value =
        itemsFromBizDelivery[index].coupon_discount_value;

      item.price = itemsFromBizDelivery[index].dish_price;

      item.quantity = itemsFromBizDelivery[index].dish_qty;

      item.total = parseFloat(itemsFromBizDelivery[index].dtotal);

      item.item_level_discount_value =
        itemsFromBizDelivery[index].item_level_discount_value;

      item.item_level_tax_value =
        itemsFromBizDelivery[index].item_level_tax_value;
      item.coupon_discount = itemsFromBizDelivery[index].coupon_discount;

      item.item_level_grand_total = parseFloat(
        itemsFromBizDelivery[index].item_level_grand_total
      );
      item.item_id = itemsFromBizDelivery[index].menu_item_id;
      item.weight_unit =
        itemsFromBizDelivery[index].weight_unit === null
          ? ""
          : itemsFromBizDelivery[index].weight_unit;
      item.weight_value =
        itemsFromBizDelivery[index].weight_value === ""
          ? "0.5"
          : itemsFromBizDelivery[index].weight_value;

      item.options =
        itemsFromBizDelivery[index].options === ""
          ? "{}"
          : JSON.stringify(itemsFromBizDelivery[index].options);
    });

    // let totalQuantity = 0;
    // selectedOrder[0].order_detail.forEach((item) => {
    //   totalQuantity = totalQuantity + parseInt(item.quantity);
    // });

    // selectedOrder.totalQuantity = totalQuantity;

    setOrderFromAPI(selectedOrder);

    setCancelUpdateButtonToggle(true);

    if (actionType === "addItem") {
      // add new item
      setNotifyMessage("Item added successfully");
      setNotifyType("success");
      setRowSkeletonLoader(false);
    } else if (actionType === "editItem") {
      // edit item
      setNotifyMessage("Item updated successfully");
      setNotifyType("success");
      setOrderDetailLoader(false);
    } else if (actionType === "deleteItem") {
      //delete item
      setNotifyMessage("Item deleted");
      setNotifyType("warning");
      setOrderDetailLoader(false);
    } else {
      setNotifyMessage("Updated successfully");
      setNotifyType("success");
      setOrderDetailLoader(false);
    }

    setNotify(true);
  };

  const addItemClick = () => {
    setEditItemFlag(false);
    openAddEditModal();
  };

  const cancelOrderUpdate = async () => {
    setOrderDetailLoader(true);

    // single order API call
    const {
      data: { result },
    } = await getSingleOrderAPICall({
      data: getSingleOrderAPIPayload(),
    });

    setOrderFromAPI(result);

    setNotifyMessage("Order update cancelled");
    setNotifyType("warning");

    setCancelUpdateButtonToggle(false);
    setOrderDetailLoader(false);

    setNotify(true);
  };

  const updateOrder = async () => {
    // (type: any , and spread the order) did this because of order_update api payload
    let orderUpdatePayload: any = { ...orderFromAPI[0] };

    const selectedOrder = orderFromAPI[0];
    const selectedOrderDetail = orderFromAPI[0].order_detail;
    const { grand_total, pre_auth_trans, pre_auth, total, discount_value } =
      orderUpdatePayload;
    const calculatingMinimumSpend = total - discount_value;

    // Minimum Spend Error
    if (calculatingMinimumSpend < minimumSpend) {
      setNotifyMessage(
        `Your cart minimum spend is ${currency} ${minimumSpend}`
      );
      setNotifyType("error");
      setNotify(true);
      return;
    }

    // Pre-auth Error
    if (Number(pre_auth)) {
      // grand total is more than pre auth  amount
      const totalTransactionAmount = pre_auth_trans[0].trans_amount;

      if (grand_total > totalTransactionAmount) {
        setNotifyMessage(
          "Order cannot be updated because the grand total of the order is greater than the pre-authorized charge."
        );
        setNotifyType("error");
        setNotify(true);
        return;
      }
    }

    setOrderDetailLoader(true);

    // making order detail objects in array for order_update api payload
    let selectedOrderDetailApiFormat: any = [];

    selectedOrderDetail.forEach((item) => {
      let option = {};
      if (item.options && item.options !== "[]" && item.options !== "{}") {
        option = JSON.parse(item.options);
      }
      selectedOrderDetailApiFormat.push({
        comment: item.comment === undefined ? "" : item.comment,
        desc: "",
        tax: item.tax,
        discount: item.discount,
        coupon_discount: item.coupon_discount,
        coupon_discount_value: item.coupon_discount_value,
        item_level_grand_total: item.item_level_grand_total,
        item_level_tax_value: item.item_level_tax_value,
        item_level_discount_value: item.item_level_discount_value,
        label: item.label === undefined ? "" : item.label,
        dish_name: item.item_name,
        dish_price: item.price + "",
        dish_qty: item.quantity + "",
        item_cat_id:
          item.item_cat_id === undefined
            ? item.category_id
            : item.item_cat_id + "",
        category_id:
          item.item_cat_id === undefined
            ? item.category_id
            : item.item_cat_id + "",
        options: item.options ? option : "{}",
        mCurrency: "",
        menu_item_id: item.item_id + "",
        totalPrice: item.total + "",
        weight_value: item.weight_value,
        weight_unit: item.weight_unit,
      });
    });
    orderUpdatePayload.order = JSON.stringify({
      items: selectedOrderDetailApiFormat,
    });
    orderUpdatePayload.grandtotal = selectedOrder.grand_total;
    orderUpdatePayload.area = selectedOrder.user_area;
    orderUpdatePayload.bid = selectedOrder.eatout_bid;
    orderUpdatePayload.cash_change = selectedOrder.change;
    orderUpdatePayload.city = selectedOrder.user_city;
    orderUpdatePayload.comment = "";
    orderUpdatePayload.country = selectedOrder.user_country;
    orderUpdatePayload.delivery = "";
    orderUpdatePayload.discount_type = "";
    orderUpdatePayload.guests = "";
    orderUpdatePayload.landline_phone = selectedOrder.landline_number;
    orderUpdatePayload.loyalty_points = "";
    orderUpdatePayload.mobile_phone = selectedOrder.mobile_number;
    orderUpdatePayload.user_email = selectedOrder.user_email;
    orderUpdatePayload.pay_owner = "";
    orderUpdatePayload.pay_type = "";
    orderUpdatePayload.postal_code = selectedOrder.postal_code;
    orderUpdatePayload.ref = "";
    orderUpdatePayload.td_user_id = user_id;
    orderUpdatePayload.time = "";
    orderUpdatePayload.transaction_timing = "";
    orderUpdatePayload.user_latitude = selectedOrder.user_latitude;
    orderUpdatePayload.user_longitude = selectedOrder.user_longitude;
    orderUpdatePayload.eatout_id = eatout_id;
    orderUpdatePayload.eatout_manager_id = user_id;
    orderUpdatePayload.delivery_charges = selectedOrder.delivery_charges;

    // order update API call
    const {
      data: { status },
    } = await orderUpdateAPICall({
      data: orderUpdateAPIPayload({
        orders: [orderUpdatePayload],
      }),
    });

    if (status === "1") {
      if (selectedOrderContext.canada_post === "0") {
        // Reset Delivery Charges states
        setPrevState(null);
        setPrevDeliveryState(true);
      }

      setNotifyMessage("Order updated successfully");
      setNotifyType("success");
    } else {
      setNotifyMessage("Order update failed");
      setNotifyType("error");
    }

    setCancelUpdateButtonToggle(false);
    setOrderDetailLoader(false);
    setNotify(true);
  };

  const deleteOrderItem = (itemId: number) => {
    const selectedOrderDetail = orderFromAPI[0].order_detail.filter(
      (item) => item.item_id !== String(itemId)
    );

    if (selectedOrderDetail.length > 0) {
      let selectedOrders = orderFromAPI;

      selectedOrders[0].order_detail = selectedOrderDetail;

      setOrderFromAPI(selectedOrders);

      // make payload object for biz-delivery-calculation api
      makeOrderDetailObjForBizDeliveryAPI("deleteItem");
    } else {
      setNotifyMessage("Cart cannot be empty!");
      setNotifyType("error");
      setNotify(true);
    }
  };

  const addCurrency = (params: GridRenderCellParams) => {
    // for skeleton loader for a row to be added
    const lastItem = orderFromAPI[0].order_detail.slice(-1);

    return rowSkeletonLoader && params.row.item_id === lastItem[0].item_id ? (
      <Skeleton animation="wave" height={15} width="90%" />
    ) : (
      <Stack direction="row" spacing={0.25} sx={{ alignItems: "end" }}>
        <Typography
          sx={{
            fontFamily: "Roboto",
            fontStyle: "normal",
            fontWeight: "400",
            fontSize: "10px",
            color: "#757575",
          }}
        >
          {orderFromAPI[0] !== undefined && orderFromAPI[0].currency}
        </Typography>
        <Typography variant={"subtitle1"} sx={{ color: "#212121" }}>
          {parseFloat(params.value).toFixed(decimalPlaces)}
        </Typography>
      </Stack>
    );
  };

  const weight = (params: GridRenderCellParams) => {
    // for skeleton loader for a row to be added
    const lastItem = orderFromAPI[0].order_detail.slice(-1);

    return rowSkeletonLoader && params.row.item_id === lastItem[0].item_id ? (
      <Skeleton animation="wave" height={15} width="90%" />
    ) : params.row.weight_value && Number(params.row.weight_value) > 0 ? (
      <Typography variant="subtitle1" sx={{ color: "#212121" }}>{`${parseFloat(
        params.row.weight_value
      ).toFixed(decimalPlaces)} ${params.row.weight_unit}`}</Typography>
    ) : (
      <Typography variant="subtitle1" sx={{ color: "#212121" }}>
        -
      </Typography>
    );
  };

  const actionsButton = (params: GridRowParams) => {
    const actionsArray = [
      <GridActionsCellItem
        icon={<EditTwoTone />}
        label="Edit"
        showInMenu
        onClick={async () => {
          const item_id = Number(params.id);
          const row = params.row;

          // get single item API call (for edit item)
          const {
            data: { items },
          } = await singleItemCall({
            url: `/product_details?business_id=${eatout_id}&item_id=${item_id}&admin_id=${user_id}&source=biz`,
          });

          if (items[0].status === "1" || items !== null) {
            // setEditAbleItem([row]);

            if (items[0].options.length > 0) {
              setOptions(items[0].options);
            }

            setEditAbleItem([row]);
            setEditItemFlag(true);
            openAddEditModal();
          }
        }}
      />,
      <GridActionsCellItem
        icon={<DeleteTwoTone />}
        label="Delete"
        showInMenu
        onClick={() => deleteOrderItem(Number(params.id))}
      />,
    ];

    return actionsArray;
  };

  const productFormatting = (params: GridRenderCellParams) => {
    // for skeleton loader for a row to be added
    const lastItem = orderFromAPI[0].order_detail.slice(-1);

    if (rowSkeletonLoader && params.row.item_id === lastItem[0].item_id) {
      return <Skeleton animation="wave" height={15} width="90%" />;
    } else {
      const row = params.row;
      const value = params.value;
      let options: any = {};
      const optionSets: any = [];
      let attributes: any = [];
      let count = 0;
      let innerOptionsName = "";

      if (row.attributes.length > 0) {
        row.attributes.map((attribute: any) => {
          for (const key in attribute) {
            attributes.push(` ${attribute[key]}`);
          }
        });
      }

      if (
        row.options &&
        row.options !== "[]" &&
        row.options !== "{}" &&
        Object.keys(row.options).length !== 0
      ) {
        options = JSON.parse(row.options);
        if (typeof options === "string") {
          options = JSON.parse(options);
        }
        for (const key in options) {
          options[key].map((opt: any) => {
            innerOptionsName = "";
            let haveInnerOpt = opt.inner_options !== "" ? true : false;
            optionSets.push({
              name: opt.name,
              quantity: opt.quantity,
              price: opt.price,
              weight: opt.weight,
              haveInnerOptions: haveInnerOpt,
            });
            let inner_options = opt.inner_options;
            if (inner_options !== "") {
              for (const innerKey in inner_options) {
                inner_options[innerKey].map((innerOpt: any) => {
                  innerOptionsName = `${innerOptionsName}${innerOpt.name},`;
                });
              }
            }
            optionSets[count].inner_options = innerOptionsName;
            count++;
          });
        }
      }

      return (
        <Stack direction={"column"}>
          <Typography variant={"subtitle1"} sx={{ color: "#212121" }}>
            {value}
          </Typography>

          {attributes.length > 0 && (
            <Typography
              sx={{
                fontFamily: "Roboto",
                fontStyle: "normal",
                fontWeight: "400",
                fontSize: "12px",
                mt: "5px",
              }}
            >
              ({attributes.join()})
            </Typography>
          )}

          {optionSets.length > 0 && (
            <Stack //option sets stack
              direction={"row"}
              spacing={1}
            >
              {optionSets.map((e: any, index: number) => {
                return e.haveInnerOptions ? (
                  <Box
                    sx={{
                      width: "fit-content",
                      height: "fit-content",
                      boxSizing: "border-box",
                      mt: "5px",
                      p: "4px",
                      border: "1px solid",
                      color: "#531dab",
                      background: "#f9f0ff",
                      borderColor: "#d3adf7",
                    }}
                  >
                    <Typography
                      sx={{
                        display: "block !important",
                        fontFamily: "Roboto",
                        fontStyle: "normal",
                        fontWeight: "500",
                        fontSize: "12px",
                      }}
                      key={index}
                    >
                      {`${e.quantity}x ${e.name} `}
                      <div>{`price ${
                        parseFloat(e.price) * parseInt(e.quantity)
                      }`}</div>
                      {e.weight !== "" && e.weight !== undefined && (
                        <div>{`weight ${
                          parseInt(e.weight.split(" ")[0]) *
                          parseInt(e.quantity)
                        } ${e.weight.split(" ")[1]}`}</div>
                      )}
                      {e.inner_options === "" ? "" : `(${e.inner_options})`}
                    </Typography>
                  </Box>
                ) : (
                  <Box
                    sx={{
                      width: "fit-content",
                      height: "fit-content",
                      boxSizing: "border-box",
                      mt: "5px",
                      p: "4px",
                      border: "1px solid",
                      color: "#531dab",
                      background: "#f9f0ff",
                      borderColor: "#d3adf7",
                    }}
                  >
                    <Typography
                      sx={{
                        fontFamily: "Roboto",
                        fontStyle: "normal",
                        fontWeight: "500",
                        fontSize: "12px",
                      }}
                      key={index}
                    >
                      {`${e.quantity}x ${e.name} `}
                      <div>{`price ${
                        parseFloat(e.price) * parseInt(e.quantity)
                      }`}</div>
                      {e.weight !== "" && e.weight !== undefined && (
                        <div>{`weight ${
                          parseInt(e.weight.split(" ")[0]) *
                          parseInt(e.quantity)
                        } ${e.weight.split(" ")[1]}`}</div>
                      )}
                    </Typography>
                  </Box>
                );
              })}
            </Stack>
          )}

          {row.comment !== undefined && row.comment && (
            <Stack direction={"row"} spacing={0.4} sx={{ mt: "5px" }}>
              <Typography
                sx={{
                  fontFamily: "Roboto",
                  fontStyle: "normal",
                  fontWeight: "500",
                  fontSize: "12px",
                }}
              >
                Instructions:
              </Typography>
              <Typography
                sx={{
                  fontFamily: "Roboto",
                  fontStyle: "normal",
                  fontWeight: "400",
                  fontSize: "12px",
                }}
              >
                {row.comment}
              </Typography>
            </Stack>
          )}

          {((row.item_level_discount_value &&
            Number(row.item_level_discount_value) > 0) ||
            (row.tax && Number(row.tax) > 0)) && (
            <Stack
              direction={"row"}
              spacing={0.5}
              sx={{ alignItems: "center", mt: "5px" }}
            >
              {row.item_level_discount_value &&
                row.item_level_discount_value.toString().charAt(0) > 0 && ( // converting toString() because getting this in number from biz_delivery API
                  <Stack direction={"row"} spacing={0.4}>
                    <Typography
                      sx={{
                        fontFamily: "Roboto",
                        fontStyle: "normal",
                        fontWeight: "500",
                        fontSize: "12px",
                      }}
                    >
                      Discount:
                    </Typography>
                    <Typography
                      sx={{
                        fontFamily: "Roboto",
                        fontStyle: "normal",
                        fontWeight: "400",
                        fontSize: "12px",
                      }}
                    >
                      {`(${orderFromAPI[0].currency} ${parseFloat(
                        row.item_level_discount_value
                      ).toFixed(2)})`}
                    </Typography>
                  </Stack>
                )}

              {row.tax && row.tax.charAt(0) > 0 && (
                <Stack direction={"row"} spacing={0.4}>
                  <Typography
                    sx={{
                      fontFamily: "Roboto",
                      fontStyle: "normal",
                      fontWeight: "500",
                      fontSize: "12px",
                    }}
                  >
                    Tax:
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: "Roboto",
                      fontStyle: "normal",
                      fontWeight: "400",
                      fontSize: "12px",
                    }}
                  >
                    ({parseFloat(row.tax).toFixed(2)}%)
                  </Typography>
                </Stack>
              )}
            </Stack>
          )}

          {row.product_code &&
            (Number(eatout_id) === DWP_BUSINESS_ID ||
              Number(eatout_id) === DWP_STAGING_BUSINESS_ID ||
              Number(eatout_id) === AMANAT_BUSINESS_ID ||
              Number(eatout_id) === AMANAT_STAGING_BUSINESS_ID) && (
              <Stack
                direction={"row"}
                spacing={0.4}
                sx={{ alignItems: "center", mt: "5px" }}
              >
                <Typography
                  sx={{
                    fontFamily: "Roboto",
                    fontStyle: "normal",
                    fontWeight: "500",
                    fontSize: "12px",
                  }}
                >
                  SKU:
                </Typography>
                <Typography
                  sx={{
                    fontFamily: "Roboto",
                    fontStyle: "normal",
                    fontWeight: "400",
                    fontSize: "12px",
                  }}
                >
                  {row.product_code}
                </Typography>
              </Stack>
            )}
        </Stack>
      );
    }
  };

  const rowSkeleton = (params: GridRenderCellParams) => {
    if (rowSkeletonLoader) {
      const lastItem = orderFromAPI[0].order_detail.slice(-1);

      if (params.row.item_id === lastItem[0].item_id) {
        return <Skeleton animation="wave" height={15} width="90%" />;
      }
    }

    return (
      <Typography variant="subtitle1" sx={{ color: "#212121" }}>
        {params.value}
      </Typography>
    );
  };

  const columns: GridColumns = [
    {
      field: "item_id",
      headerName: "Item#",
      flex: 0.6,
      headerAlign: "right",
      align: "right",
      sortable: false,
      renderCell: rowSkeleton,
    },
    {
      field: "item_name",
      headerName: "Item Name",
      sortable: false,
      flex: 2,
      renderCell: productFormatting,
    },
    {
      field: "weight_value",
      headerName: "Weight",
      headerAlign: "right",
      align: "right",
      flex: 0.6,
      sortable: false,
      renderCell: weight,
    },
    {
      field: "quantity",
      headerName: "Quantity",
      headerAlign: "right",
      align: "right",
      flex: 0.7,
      sortable: false,
      renderCell: rowSkeleton,
    },
    {
      field: "price",
      headerName: "Price",
      flex: 1,
      headerAlign: "right",
      align: "right",
      sortable: false,
      renderCell: addCurrency,
    },
    {
      field: "item_level_grand_total",
      headerName: "Amount",
      headerAlign: "right",
      align: "right",
      flex: 1,
      sortable: false,
      renderCell: addCurrency,
    },
    {
      field: "total",
      headerName: "Total",
      headerAlign: "right",
      align: "right",
      flex: 1,
      sortable: false,
      renderCell: addCurrency,
    },
    {
      field: "action",
      headerName: "",
      type: "actions",
      align: "right",
      headerAlign: "right",
      minWidth: 30,
      width: 30,
      sortable: false,
      getActions: actionsButton,
    },
  ];

  const closeDetailModal = () => {
    if (!cancelUpdateButtonToggle) {
      setOrderDetailModal((state) => !state);
      setSelectionModel([]);
    } else {
      setNotifyMessage("Cancel/Update order to proceed");
      setNotifyType("warning");
      setNotify(true);
    }
  };

  const openAddEditModal = () => setAddEditItemModal((state) => !state);

  const toggleDeliveryChargesModal = () => {
    // close delivery charges modal
    setDeliveryChargesModal(false);

    if (selectedOrderContext.canada_post === "0") {
      // when the delivery charges where removed and haven't send to api
      if (deliveryChargeField === "" && prevState !== null) {
        setDeliveryChargesField(prevState);
      }

      // when the delivery charges where changed and haven't send to api
      if (deliveryChargeField !== prevState && prevState !== null) {
        setDeliveryChargesField(prevState);

        if (
          deliveryChargeField === deliveryChargeField &&
          deliveryChargeField !== ""
        ) {
          setDeliveryChargesField(deliveryChargeField);
        }
      }
    }
  };

  const weightUpdate = (order: any) => {
    const { order_detail: orderDetails } = order;
    let tWeight = 0;
    let commonUnit = "";
    let unitCount = 0;
    orderDetails &&
      orderDetails.filter((detail: any) => {
        if (detail.weight_unit !== "") {
          commonUnit = detail.weight_unit;
          return;
        }
      });

    orderDetails &&
      orderDetails.map((detail: any, index: number) => {
        detail.weight = 0;
        // Check for option set weights
        if (detail.options && detail.options !== "[]") {
          let options = JSON.parse(detail.options);
          Object.keys(options).forEach((key) => {
            for (let i = 0; i < options[key].length; i++) {
              if (
                options[key][i].weight !== "" &&
                options[key][i].weight !== undefined
              ) {
                detail.weight =
                  detail.weight +
                  parseInt(options[key][i].quantity) *
                    parseInt(options[key][i].weight.split(" ")[0]);
                setHaveWeight(true);
              }
            }
          });
        }

        if (commonUnit === detail.weight_unit || detail.weight_unit === "")
          unitCount++;

        detail.weight =
          (detail.weight_value !== "" ? parseFloat(detail.weight_value) : 0) +
          detail.weight;

        detail.weight = detail.weight * parseInt(detail.quantity);

        tWeight = tWeight + detail.weight;

        if (detail.weight_value !== "") {
          setHaveWeight(true);
          setWeightUnit(
            unitCount === orderDetails.length
              ? detail.weight_unit.toString()
              : ""
          );
        }
      });
    setTotalWeight(tWeight);
  };

  return (
    <>
      {notify && (
        <Notify
          message={notifyMessage}
          type={notifyType}
          notify={notify}
          closeNotify={closeNotify}
        />
      )}

      {/* Order Detail Modal */}
      <Modal
        open={orderDetailModal}
        className={classes.modalStyle1}
        BackdropProps={{
          classes: {
            root: classes.backDrop,
          },
        }}
      >
        <MainCard
          dividerSX={{ m: "unset", display: "none" }}
          headerSX={{ p: "unset !important", mb: "32px" }}
          contentSX={{
            "& .MuiCardContent-root": {
              p: "unset !important",
            },
            m: "unset",
            p: "unset !important",
          }}
          sx={{
            m: "unset",
            borderRadius: "unset",
            p: "48px 55px",
            border: "none",
          }}
          title={
            <Grid container>
              <Grid
                item
                xs={12}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Grid
                  item
                  xs={6}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Box
                    sx={{
                      width: "100%",
                      maxWidth: "265px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography variant="h1">
                      Order
                      {orderFromAPI[0] !== undefined &&
                        ` ${orderFromAPI[0].order_id}`}
                    </Typography>
                    <Box>{orderDetailLoader && <Progress type="circle" />}</Box>
                  </Box>

                  <Typography
                    variant={"subtitle1"}
                    sx={{ fontWeight: "400", ml: "16px" }}
                  >
                    {orderFromAPI[0] !== undefined &&
                      moment(orderFromAPI[0].date).format(
                        "MMM Do, YYYY hh:mm a"
                      )}
                  </Typography>
                </Grid>

                <Grid
                  item
                  xs={6}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "end",
                  }}
                >
                  <ExcelExport
                    tableData={tableData}
                    orderDetailData={(() => {
                      if (!orderFromAPI[0]) return [];
                      return orderFromAPI[0].order_detail;
                    })()}
                    OrderDetailStatic={(() => {
                      if (!orderFromAPI[0]) return [];
                      return orderFromAPI[0];
                    })()}
                    exportType={"OrderDetail"}
                  />
                  <Stack
                    direction="row"
                    spacing={1}
                    sx={{
                      cursor: "pointer",
                      alignItems: "center",
                      ml: "24px",
                    }}
                  >
                    <PictureAsPdfTwoTone
                      className={
                        classes.pdf_print_user_phone_location_IconColor
                      }
                    />
                    <Typography variant="h5" className={classes.downloadPdf}>
                      Download PDF
                    </Typography>
                  </Stack>
                  <Stack
                    direction="row"
                    spacing={1}
                    sx={{
                      cursor: "pointer",
                      alignItems: "center",
                      ml: "24px",
                    }}
                    onClick={() => {
                      window.print();
                    }}
                  >
                    <PrintTwoTone
                      className={
                        classes.pdf_print_user_phone_location_IconColor
                      }
                    />
                    <Typography className={classes.printHeading}>
                      Print
                    </Typography>
                  </Stack>
                  <Stack
                    sx={{
                      cursor: "pointer",
                      alignItems: "center",
                      ml: "48px",
                    }}
                  >
                    <IconButton sx={{ p: "unset" }} onClick={closeDetailModal}>
                      <HighlightOffTwoTone
                        sx={{ color: "#D84315" }}
                        fontSize="large"
                      />
                    </IconButton>
                  </Stack>
                </Grid>
              </Grid>
            </Grid>
          }
        >
          <Grid container>
            <Grid item xs={12} sx={{ display: "flex" }}>
              <Grid item xs={8}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    border: "1px solid #EEEEEE",
                    borderRadius: "8px",
                    p: "10px 13px 10px 18px",
                    mb: "12px",
                    boxSizing: "border-box",
                    flexDirection: "row",
                    flexWrap: "wrap",
                  }}
                >
                  <Stack
                    spacing={3}
                    direction="row"
                    divider={
                      <Divider
                        orientation="vertical"
                        sx={{ border: "1px solid #EEEEEE" }}
                        flexItem
                      />
                    }
                  >
                    {orderFromAPI[0] !== undefined && orderFromAPI[0].name && (
                      <Stack
                        direction="row"
                        sx={{
                          alignItems: "center",
                        }}
                        spacing={1}
                      >
                        <AccountCircleTwoTone
                          className={
                            classes.pdf_print_user_phone_location_IconColor
                          }
                        />
                        <Typography variant={"subtitle1"}>
                          {orderFromAPI[0].name}
                        </Typography>
                      </Stack>
                    )}

                    <Stack
                      direction="row"
                      sx={{
                        alignItems: "center",
                      }}
                      spacing={1}
                    >
                      <SmartphoneTwoTone
                        className={
                          classes.pdf_print_user_phone_location_IconColor
                        }
                        fontSize="small"
                      />
                      <Typography
                        variant={"subtitle1"}
                        sx={{
                          maxWidth: "107px",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {orderFromAPI[0] !== undefined &&
                          orderFromAPI[0].mobile_number}
                      </Typography>
                    </Stack>

                    {orderFromAPI[0] !== undefined &&
                      orderFromAPI[0].user_area &&
                      orderFromAPI[0].user_city && (
                        <Stack
                          direction="row"
                          sx={{
                            alignItems: "center",
                          }}
                          spacing={1}
                        >
                          <PinDropTwoTone
                            className={
                              classes.pdf_print_user_phone_location_IconColor
                            }
                          />
                          <Typography variant={"subtitle1"}>
                            {`${orderFromAPI[0].user_area}, ${orderFromAPI[0].user_city}`}
                          </Typography>
                        </Stack>
                      )}
                  </Stack>

                  <Stack direction="row">
                    <CustomButton
                      variant="contained"
                      startIcon={<EditTwoTone />}
                      sx={{
                        background: "#F5F5F5 ",
                        color: "#212121",
                        p: "9px 20px",

                        "&:hover": {
                          backgroundColor: "#F5F5F5",
                        },
                      }}
                      onClick={toggleCustomerDetailModal}
                    >
                      Edit
                    </CustomButton>
                  </Stack>
                </Box>

                <Box
                  sx={{
                    border: "1px solid #EEEEEE",
                    borderRadius: "8px",
                    p: "17px 12px 24px 16px",
                    mb: "16px",
                    boxSizing: "border-box",
                  }}
                >
                  <Stack direction="column">
                    <Stack // address stack
                      direction="row"
                      sx={{
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <Stack direction="row">
                        <Typography variant="subtitle1">Address:</Typography>
                        <Typography variant="h5" sx={{ ml: "64px" }}>
                          {orderFromAPI[0] !== undefined &&
                            orderFromAPI[0].address}
                        </Typography>
                      </Stack>
                      <Stack>
                        <CustomButton
                          variant="contained"
                          startIcon={<EditTwoTone />}
                          sx={{
                            background: "#F5F5F5 ",
                            color: "#212121",
                            p: "9px 20px",

                            "&:hover": {
                              backgroundColor: "#F5F5F5",
                            },
                          }}
                          onClick={toggleCustomerDetailModal}
                        >
                          Edit
                        </CustomButton>
                      </Stack>
                    </Stack>

                    <Stack // order type stack
                      direction="row"
                      sx={{ mt: "4px" }}
                    >
                      <Typography variant="subtitle1">Order type:</Typography>
                      <Typography variant="h5" sx={{ ml: "52px" }}>
                        {orderFromAPI[0] !== undefined &&
                          toCapitalizeFirstLetter(orderFromAPI[0].order_type)}
                      </Typography>
                    </Stack>

                    {orderFromAPI[0] !== undefined &&
                      orderFromAPI[0].order_type_flag === "0" && //for delivery (0) & for pickup (1)
                      orderFromAPI[0].delivery_date !== "0000-00-00 00:00:00" &&
                      orderFromAPI[0].delivery_date !== "" && (
                        <Stack // delivery time stack
                          direction="row"
                          sx={{ mt: "16px" }}
                        >
                          <Typography variant="subtitle1">
                            Delivery Time:
                          </Typography>
                          <Typography variant="h5" sx={{ ml: "32px" }}>
                            {moment(orderFromAPI[0].delivery_date).format(
                              "MMM Do, YYYY h:mm A"
                            )}
                          </Typography>
                        </Stack>
                      )}

                    {orderFromAPI[0] !== undefined &&
                      orderFromAPI[0].order_type_flag === "1" && //for delivery (0) & for pickup (1)
                      orderFromAPI[0].pickup_time !== "0000-00-00 00:00:00" &&
                      orderFromAPI[0].pickup_time !== "" && (
                        <Stack // pickup time stack
                          direction="row"
                          sx={{ mt: "16px" }}
                        >
                          <Typography variant="subtitle1">
                            Pickup Time:
                          </Typography>
                          <Typography variant="h5" sx={{ ml: "38px" }}>
                            {moment(orderFromAPI[0].pickup_time).format(
                              "MMM Do, YYYY h:mm A"
                            )}
                          </Typography>
                        </Stack>
                      )}

                    {orderFromAPI[0] !== undefined && orderFromAPI[0].note && (
                      <Stack //Note Stack
                        direction="row"
                        sx={{ mt: "16px" }}
                      >
                        <Typography variant="subtitle1">Note:</Typography>
                        <Typography variant="h5" sx={{ ml: "86px" }}>
                          {orderFromAPI[0].note}
                        </Typography>
                      </Stack>
                    )}
                  </Stack>
                </Box>

                <MainCard
                  dividerSX={{ m: "0px 0px 0px 0px !important" }}
                  headerSX={{ p: "unset !important", mb: "20px" }}
                  contentSX={{
                    "& .MuiCardContent-root": {
                      p: "unset !important",
                    },
                    m: "unset",
                    p: "unset !important",
                  }}
                  sx={{
                    m: "unset",
                    p: "20px 16px 16px",
                    borderColor: "#EEEEEE",
                  }}
                  title={
                    <Stack
                      direction={"row"}
                      sx={{
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Typography variant={"h4"}>Order Items</Typography>
                      <Stack direction={"row"} spacing={1.5}>
                        {cancelUpdateButtonToggle && (
                          <>
                            <CustomButton
                              variant="contained"
                              color="secondary"
                              onClick={cancelOrderUpdate}
                              sx={{
                                p: "10px 23px",
                                fontFamily: "Roboto",
                                fontStyle: "normal",
                                fontWeight: 500,
                                fontSize: "13px",
                                backgroundColor: "#D84315",

                                "&:hover": {
                                  backgroundColor: "#D84315",
                                },
                              }}
                            >
                              Cancel Update
                            </CustomButton>
                            <CustomButton
                              variant="contained"
                              color="secondary"
                              onClick={updateOrder}
                              sx={{
                                p: "10px 26px",
                                fontFamily: "Roboto",
                                fontStyle: "normal",
                                fontWeight: 500,
                                fontSize: "13px",
                                backgroundColor: "#24335E",

                                "&:hover": {
                                  backgroundColor: "#24335E",
                                },
                              }}
                            >
                              Update Order
                            </CustomButton>
                          </>
                        )}
                        <CustomButton
                          variant="contained"
                          color="secondary"
                          startIcon={<AddTwoTone />}
                          onClick={addItemClick}
                          sx={{
                            p: "10px 24px",
                            fontFamily: "Roboto",
                            fontStyle: "normal",
                            fontWeight: 500,
                            fontSize: "13px",
                          }}
                        >
                          Add Item
                        </CustomButton>
                      </Stack>
                    </Stack>
                  }
                >
                  {orderFromAPI.length === 0 ? (
                    <OrderListingSkeleton />
                  ) : (
                    <Box
                      sx={{
                        width: "100%",

                        "& .MuiDataGrid-root": {
                          border: "none",
                        },
                        "& .MuiDataGrid-columnHeaderTitle": {
                          color: "#212121",
                        },
                        "& .MuiDataGrid-columnHeader": {
                          pr: "unset",
                          pl: "15px",
                        },
                        "& .MuiDataGrid-columnHeaders": {
                          borderBottom: "1px solid #EEEEEE",
                        },
                        "& .MuiIconButton-root": {
                          p: "unset",
                        },
                        "& .MuiDataGrid-columnSeparator": {
                          display: "none",
                        },
                        "& .MuiDataGrid-cell:focus-within, & .MuiDataGrid-cell:focus, & .MuiDataGrid-columnHeader:focus, & .MuiDataGrid-columnHeader:focus-within":
                          {
                            outline: "none",
                          },
                        "& .MuiDataGrid-row": {
                          maxHeight: "fit-content !important",
                        },
                        "& .MuiDataGrid-cell": {
                          maxHeight: "fit-content !important",
                          overflow: "auto",
                          whiteSpace: "initial !important",
                          lineHeight: "16px !important",
                          display: "flex !important",
                          alignItems: "start",
                          p: "25px 0px 25px 15px",
                          borderBottom: "1px solid #EEEEEE",
                        },
                        "& .MuiDataGrid-virtualScrollerContent": {
                          height: "100% !important",
                        },
                        "& .MuiDataGrid-virtualScrollerRenderZone": {
                          position: "unset",
                        },
                      }}
                    >
                      {/* <OrderListingSkeleton /> */}
                      <DataGrid
                        rows={(() => {
                          if (!orderFromAPI[0]) return [];
                          return orderFromAPI[0].order_detail;
                        })()}
                        getRowId={(row: any) => row.item_id}
                        columns={columns}
                        autoHeight
                        disableColumnMenu
                        hideFooterSelectedRowCount
                        hideFooter
                        components={{
                          LoadingOverlay: linearLoader,
                        }}
                        loading={orderDetailLoader}
                      />
                    </Box>
                  )}

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "end",
                      background: "#F5F5F5",
                      borderRadius: "8px",
                      p: "24px 31px",
                    }}
                  >
                    <Grid item xs={5.5}>
                      <Stack
                        direction={"row"}
                        sx={{ justifyContent: "space-between" }}
                      >
                        <Stack direction={"column"}>
                          <Stack // Sub Total
                            direction={"row"}
                            sx={{ justifyContent: "end" }}
                          >
                            <Typography variant="subtitle1">
                              Sub Total
                            </Typography>
                          </Stack>

                          {orderFromAPI[0] !== undefined &&
                            (Number(orderFromAPI[0].loyalty_points) > 0 ||
                              Number(orderFromAPI[0].custom_code_discount) >
                                0) && (
                              <Stack // Loyalty Points && Custom code discount
                                direction={"row"}
                                sx={{ mt: "14px", justifyContent: "end" }}
                              >
                                <Typography // switch loyalty points and custom code
                                  variant="subtitle1"
                                >
                                  {parseInt(orderFromAPI[0].loyalty_points) > 0
                                    ? `Loyalty Points (${orderFromAPI[0].loyalty_points})`
                                    : `Coupon Code (${orderFromAPI[0].custom_code_discount}%)`}
                                </Typography>
                              </Stack>
                            )}

                          {orderFromAPI[0] !== undefined &&
                            haveWeight &&
                            totalWeight !== 0 && (
                              <Stack // Total weight
                                direction={"row"}
                                sx={{ mt: "14px", justifyContent: "end" }}
                              >
                                <Typography variant="subtitle1">
                                  Total Weight
                                </Typography>
                              </Stack>
                            )}

                          {orderFromAPI[0] !== undefined &&
                            Number(orderFromAPI[0].discount) > 0 && (
                              <Stack // Discount
                                direction={"row"}
                                sx={{ mt: "14px", justifyContent: "end" }}
                              >
                                <Typography variant="subtitle1">
                                  Discount
                                </Typography>
                              </Stack>
                            )}

                          <Stack // Delivery Charges
                            direction={"row"}
                            sx={{ mt: "14px", justifyContent: "end" }}
                          >
                            <Typography
                              variant="subtitle1"
                              sx={{ display: "flex", alignItems: "end" }}
                            >
                              Delivery Charges
                              {selectedOrderContext.status === "Pending" && (
                                <IconButton
                                  sx={{ p: "unset", ml: "5px" }}
                                  onClick={openDeliveryModal}
                                >
                                  <EditTwoTone sx={{ fontSize: "1.3rem" }} />
                                </IconButton>
                              )}
                            </Typography>
                          </Stack>

                          {orderFromAPI[0] !== undefined &&
                            Number(orderFromAPI[0].tax) > 0 && (
                              <Stack // Tax
                                direction={"row"}
                                sx={{ mt: "14px", justifyContent: "end" }}
                              >
                                <Typography variant="subtitle1">Tax</Typography>
                              </Stack>
                            )}

                          {orderFromAPI[0] !== undefined &&
                            Number(orderFromAPI[0].tip) > 0 && (
                              <Stack // Tip
                                direction={"row"}
                                sx={{ mt: "14px", justifyContent: "end" }}
                              >
                                <Typography variant="subtitle1">Tip</Typography>
                              </Stack>
                            )}

                          {orderFromAPI[0] !== undefined &&
                            Number(orderFromAPI[0].service_charges) > 0 && (
                              <Stack // Service Charges
                                direction={"row"}
                                sx={{ mt: "14px", justifyContent: "end" }}
                              >
                                <Typography variant="subtitle1">
                                  Service Charges
                                </Typography>
                              </Stack>
                            )}
                        </Stack>

                        <Stack direction={"column"}>
                          <Stack // Sub Total
                            direction="row"
                            spacing={0.25}
                            sx={{
                              justifyContent: "end",
                              alignItems: "end",
                            }}
                          >
                            <Typography
                              sx={{
                                fontFamily: "Roboto",
                                fontStyle: "normal",
                                fontWeight: "400",
                                fontSize: "12px",
                                color: "#757575",
                              }}
                            >
                              {orderFromAPI[0] !== undefined &&
                                orderFromAPI[0].currency}
                            </Typography>
                            <Typography variant="h4">
                              {orderFromAPI[0] !== undefined &&
                                parseFloat(orderFromAPI[0].total).toFixed(
                                  decimalPlaces
                                )}
                            </Typography>
                          </Stack>

                          {orderFromAPI[0] !== undefined &&
                            (Number(orderFromAPI[0].loyalty_points) > 0 ||
                              Number(orderFromAPI[0].custom_code_discount) >
                                0) && (
                              <Stack // Loyalty Points && Custom code discount
                                direction={"row"}
                                sx={{
                                  mt: "14px",
                                  justifyContent: "end",
                                  alignItems: "end",
                                }}
                              >
                                <Typography variant="h5">
                                  {parseInt(orderFromAPI[0].loyalty_points) > 0
                                    ? parseInt(
                                        orderFromAPI[0].loyalty_points
                                      ).toFixed(decimalPlaces)
                                    : parseInt(
                                        orderFromAPI[0]
                                          .custom_code_discount_value
                                      )}
                                </Typography>
                              </Stack>
                            )}

                          {orderFromAPI[0] !== undefined &&
                            haveWeight &&
                            totalWeight !== 0 && (
                              <Stack // Total weight
                                direction={"row"}
                                spacing={0.25}
                                sx={{
                                  mt: "14px",
                                  justifyContent: "end",
                                  alignItems: "end",
                                }}
                              >
                                <Typography variant="h5">
                                  {`${totalWeight.toFixed(decimalPlaces)}
                            ${
                              orderFromAPI[0].pre_auth === "1"
                                ? "Kg"
                                : weightUnit
                            }`}
                                </Typography>
                              </Stack>
                            )}

                          {orderFromAPI[0] !== undefined &&
                            Number(orderFromAPI[0].discount) > 0 && (
                              <Stack // discount
                                direction={"row"}
                                spacing={0.25}
                                sx={{
                                  mt: "14px",
                                  justifyContent: "end",
                                  alignItems: "end",
                                }}
                              >
                                <Typography
                                  sx={{
                                    fontFamily: "Roboto",
                                    fontStyle: "normal",
                                    fontWeight: "400",
                                    fontSize: "12px",
                                    color: "#757575",
                                  }}
                                >
                                  {orderFromAPI[0].currency}
                                </Typography>
                                <Typography variant="h4">
                                  {parseFloat(orderFromAPI[0].discount).toFixed(
                                    decimalPlaces
                                  )}
                                </Typography>
                              </Stack>
                            )}

                          {orderFromAPI[0] !== undefined && (
                            <Stack // delivery charges
                              direction={"row"}
                              spacing={0.25}
                              sx={{
                                mt: "14px",
                                justifyContent: "end",
                                alignItems: "end",
                              }}
                            >
                              <Typography
                                sx={{
                                  fontFamily: "Roboto",
                                  fontStyle: "normal",
                                  fontWeight: "400",
                                  fontSize: "12px",
                                  color: "#757575",
                                }}
                              >
                                {orderFromAPI[0].currency}
                              </Typography>
                              <Typography variant="h4">
                                {parseFloat(
                                  orderFromAPI[0].delivery_charges
                                ).toFixed(decimalPlaces)}
                              </Typography>
                            </Stack>
                          )}

                          {orderFromAPI[0] !== undefined &&
                            Number(orderFromAPI[0].tax) > 0 && (
                              <Stack // tax
                                direction={"row"}
                                spacing={0.25}
                                sx={{
                                  mt: "14px",
                                  justifyContent: "end",
                                  alignItems: "end",
                                }}
                              >
                                <Typography
                                  sx={{
                                    fontFamily: "Roboto",
                                    fontStyle: "normal",
                                    fontWeight: "400",
                                    fontSize: "12px",
                                    color: "#757575",
                                  }}
                                >
                                  {orderFromAPI[0].currency}
                                </Typography>
                                <Typography variant="h4">
                                  {parseFloat(orderFromAPI[0].tax).toFixed(
                                    decimalPlaces
                                  )}
                                </Typography>
                              </Stack>
                            )}

                          {orderFromAPI[0] !== undefined &&
                            Number(orderFromAPI[0].tip) > 0 && (
                              <Stack // tip
                                direction={"row"}
                                spacing={0.25}
                                sx={{
                                  mt: "14px",
                                  justifyContent: "end",
                                  alignItems: "end",
                                }}
                              >
                                <Typography
                                  sx={{
                                    fontFamily: "Roboto",
                                    fontStyle: "normal",
                                    fontWeight: "400",
                                    fontSize: "12px",
                                    color: "#757575",
                                  }}
                                >
                                  {orderFromAPI[0].currency}
                                </Typography>
                                <Typography variant="h4">
                                  {parseFloat(orderFromAPI[0].tip).toFixed(
                                    decimalPlaces
                                  )}
                                </Typography>
                              </Stack>
                            )}

                          {orderFromAPI[0] !== undefined &&
                            Number(orderFromAPI[0].service_charges) > 0 && (
                              <Stack // service charges
                                direction={"row"}
                                spacing={0.25}
                                sx={{
                                  justifyContent: "end",
                                  alignItems: "end",
                                }}
                              >
                                <Typography
                                  sx={{
                                    fontFamily: "Roboto",
                                    fontStyle: "normal",
                                    fontWeight: "400",
                                    fontSize: "12px",
                                    color: "#757575",
                                  }}
                                >
                                  {orderFromAPI[0].currency}
                                </Typography>
                                <Typography variant="h4">
                                  {parseFloat(
                                    orderFromAPI[0].service_charges
                                  ).toFixed(decimalPlaces)}
                                </Typography>
                              </Stack>
                            )}
                        </Stack>
                      </Stack>

                      <Divider
                        sx={{
                          m: "24px 0px",
                          border: " 1px solid rgba(0, 0, 0, 0.06)",
                        }}
                      />

                      <Stack direction={"row"} justifyContent={"space-between"}>
                        <Stack direction={"column"}>
                          <Stack // total
                            direction={"row"}
                            sx={{
                              justifyContent: "end",
                              ml: "71px",
                            }}
                          >
                            <Typography variant="h4">Total</Typography>
                          </Stack>
                        </Stack>
                        <Stack direction={"column"}>
                          <Stack // total
                            direction="row"
                            spacing={0.25}
                            sx={{
                              justifyContent: "end",
                              alignItems: "end",
                            }}
                          >
                            <Typography
                              sx={{
                                fontFamily: "Roboto",
                                fontStyle: "normal",
                                fontWeight: "400",
                                fontSize: "12px",
                                color: "#757575",
                              }}
                            >
                              {orderFromAPI[0] !== undefined &&
                                orderFromAPI[0].currency}
                            </Typography>
                            <Typography variant="h4">
                              {orderFromAPI[0] !== undefined &&
                                parseFloat(orderFromAPI[0].grand_total).toFixed(
                                  decimalPlaces
                                )}
                            </Typography>
                          </Stack>
                        </Stack>
                      </Stack>
                    </Grid>
                  </Box>
                </MainCard>
              </Grid>

              <Grid item xs={4} sx={{ ml: "19px" }}>
                <OrderStatusAction // order  status component
                  selectedOrder={selectedOrder}
                  order_id={selectedOrder.order_id}
                  user_email={selectedOrder.user_email}
                />

                <MainCard // google map card
                  dividerSX={{ m: "0px 0px 18px 0px !important" }}
                  headerSX={{ p: "unset !important", mb: "24px" }}
                  contentSX={{
                    "& .MuiCardContent-root": {
                      p: "unset !important",
                    },
                    m: "unset",
                    p: "unset !important",
                  }}
                  sx={{
                    m: "unset",
                    p: "24px 16px",
                    borderColor: "#EEEEEE",
                  }}
                  title={<Typography variant="h4">Geo Location</Typography>}
                >
                  <GoogleMapFrame
                    longitude={
                      orderFromAPI[0] !== undefined
                        ? orderFromAPI[0].user_latitude
                        : ""
                    }
                    latitude={
                      orderFromAPI[0] !== undefined
                        ? orderFromAPI[0].user_latitude
                        : ""
                    }
                    title={""}
                    width={"100%"}
                    height={"279px"}
                    style={{ border: "none", borderRadius: "8px" }}
                  />
                </MainCard>
              </Grid>
            </Grid>
          </Grid>
        </MainCard>
      </Modal>

      <Modal // User Detail Modal
        open={customerDetailModal}
        onClose={toggleCustomerDetailModal}
      >
        <MainCard
          dividerSX={{ m: "0px 0px 33px 0px !important" }}
          headerSX={{ p: "unset !important", mb: "16px" }}
          contentSX={{
            "& .MuiCardContent-root": {
              p: "unset !important",
            },
            m: "unset",
            p: "unset !important",
          }}
          sx={{
            m: "unset",
            p: "40px",
            width: "50vw",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
          title={
            <Stack
              direction="row"
              sx={{ justifyContent: "space-between", alignItems: "center" }}
            >
              <Box
                sx={{
                  width: "100%",
                  maxWidth: "190px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Typography variant={"h3"}>Customer Details</Typography>
                <Box>{customerDetailLoader && <Progress type="circle" />}</Box>
              </Box>

              <IconButton
                sx={{ p: "unset" }}
                onClick={toggleCustomerDetailModal}
              >
                <HighlightOffTwoTone
                  sx={{ color: "#D84315" }}
                  fontSize="large"
                />
              </IconButton>
            </Stack>
          }
        >
          <CardContent>
            <Stack sx={{ mb: "24px" }}>
              <TdTextField
                label="Address"
                value={customerAddress}
                onChange={handleAddressChange}
                error={fieldError.address === "" ? false : true}
                helperText={fieldError.address}
              />
            </Stack>
            <Stack sx={{ mb: "33px" }}>
              <TdTextField
                label="Mobile"
                value={customerMobileNo}
                onChange={handleMobileNoChange}
                error={fieldError.mobileNo === "" ? false : true}
                helperText={fieldError.mobileNo}
              />
            </Stack>

            <Stack direction="row" sx={{ justifyContent: "end" }}>
              <CustomButton
                color={"secondary"}
                variant={"contained"}
                onClick={handleCustomerDetailUpdate}
                sx={{
                  p: "13px 44px",
                  fontFamily: "Roboto",
                  fontStyle: "normal",
                  fontWeight: 500,
                  fontSize: "14px",
                }}
              >
                Update
              </CustomButton>
            </Stack>
          </CardContent>
        </MainCard>
      </Modal>

      <Modal // Delivery charges modal
        open={deliveryChargesModal}
        onClose={toggleDeliveryChargesModal}
      >
        <MainCard
          dividerSX={{ m: "0px 0px 33px 0px !important" }}
          headerSX={{
            p: "unset !important",
            mb: "16px",
          }}
          contentSX={{
            "& .MuiCardContent-root": {
              p: "unset !important",
            },
            m: "unset",
            p: "unset !important",
          }}
          sx={{
            m: "unset",
            p: "40px",
            width: "40vw",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
          title={
            <Stack
              direction="row"
              sx={{ justifyContent: "space-between", alignItems: "center" }}
            >
              <Box
                sx={{
                  width: "100%",
                  maxWidth: "290px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Typography variant={"h3"}>Edit Delivery Charges</Typography>
                <Box>{customerDetailLoader && <Progress type="circle" />}</Box>
              </Box>

              <IconButton
                sx={{ p: "unset" }}
                onClick={() => {
                  setCanadaPostDeliveryCharges("");
                  setDeliveryChargesField("");
                  toggleDeliveryChargesModal();
                }}
              >
                <HighlightOffTwoTone
                  sx={{ color: "#D84315" }}
                  fontSize="large"
                />
              </IconButton>
            </Stack>
          }
        >
          <CardContent>
            <Stack
              sx={{
                mb: "33px",
                alignItem: "center",
              }}
            >
              {selectedOrderContext.canada_post === "1" ? (
                <>
                  <Typography variant="h5">Select Canada Post</Typography>
                  <CustomRadioButton
                    sx={{
                      display: "inline !important",
                    }}
                    options={deliveryChargesList}
                    onChange={canadaPostHandler}
                    value={canadaPostDeliveryCharges}
                  />
                </>
              ) : (
                <TdTextField
                  type="text"
                  label="Delivery Charges"
                  value={deliveryChargeField}
                  onChange={handleDeliveryChargesField}
                  error={fieldError.deliveryCharges === "" ? false : true}
                  helperText={fieldError.deliveryCharges}
                />
              )}
            </Stack>
            <Stack direction="row" sx={{ justifyContent: "end" }}>
              <CustomButton
                color={"secondary"}
                variant={"contained"}
                onClick={handleDeliveryChargesUpdate}
                sx={{
                  p: "13px 44px",
                  fontFamily: "Roboto",
                  fontStyle: "normal",
                  fontWeight: 500,
                  fontSize: "14px",
                }}
              >
                Update
              </CustomButton>
            </Stack>
          </CardContent>
        </MainCard>
      </Modal>

      {openAddEditItemModal && (
        <AddEditItemModal
          openAddEditItemModal={openAddEditItemModal}
          setAddEditItemModal={setAddEditItemModal}
          getNewItemCallback={getNewItemCallback}
          getEditItemCallback={getEditItemCallback}
          editItemFlag={editItemFlag}
        />
      )}
    </>
  );
};

export default OrderDetail;
