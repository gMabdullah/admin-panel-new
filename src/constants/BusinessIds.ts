// Business ID
export const IQBAL_BUSINESS_ID = 12092,
  TEZMART_BUSINESS_ID = 12154,
  APNA_FORM_BUSINESS_ID = 12185,
  DWP_BUSINESS_ID = 12230,
  DWP_STAGING_BUSINESS_ID = 12180,
  AMANAT_STAGING_BUSINESS_ID = 12208,
  AMANAT_BUSINESS_ID = 12257,
  // Regex
  // -------
  // - small and capital alphabates
  // - positive numbers
  // - not more than one hypen or Minus sign
  alphaNumericRegex = /^[a-zA-Z0-9 &-]*$/,
  TINY_EDITOR_API_KEY = "00f31vkt0j9pkd1pt5g9vqgfdfog3kvmzjtsfsyfi5mcbit0",
  // Static Array and Objects
  OrderDetailColumns = [
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
  ],
  orderListingColumns = [
    { header: "Order ID", key: "order_id" },
    { header: "Date", key: "date" },
    { header: "Name", key: "name" },
    { header: "Note", key: "note" },
    { header: "Tip", key: "tip" },
    { header: "Payment Method", key: "payment_type" },
    { header: "Grand Total", key: "grand_total" },
    { header: "Status", key: "status" },
    { header: "Source", key: "source" },
    { header: "Area", key: "user_area" },
    { header: "Address", key: "address" },
    { header: "City", key: "user_city" },
    { header: "Tel #", key: "landline_number" },
    { header: "Mobile No", key: "mobile_number" },
    { header: "CNIC", key: "cnic" },
    { header: "Email", key: "user_email" },
    { header: "Status Comment", key: "statuscomment" },
  ],
  ordersType = [
    { value: "", label: "All Order Type" },
    { value: "1", label: "Pick Up" },
    { value: "0", label: "Delivery" },
    { value: "1", label: "Canada Post" },
  ],
  keysOfItems: TypeKeyOfItem["keysOfItems"] = [
    { key: "image", value: "Image", align: "left", width: "10%" },
    { key: "name", value: "Item Name", align: "left", width: "30%" },
    { key: "category", value: "Category", align: "left", width: "15%" },
    { key: "price", value: "Price", align: "left", width: "10%" },
    { key: "discount", value: "Discount", align: "right", width: "10%" },
    { key: "tax", value: "Tax %", align: "right", width: "10%" },
    { key: "status", value: "Status", align: "center", width: "10%" },
    { key: "", value: "Actions", align: "center" },
  ];
