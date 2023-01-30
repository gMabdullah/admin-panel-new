// Business IDs
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
    {
      key: "image",
      value: "Image",
      align: "left",
      selected: true,
      width: "10%",
    },
    {
      key: "name",
      value: "Name",
      align: "left",
      selected: true,
      width: "30%",
    },
    {
      key: "category",
      value: "Category",
      align: "left",
      selected: true,
      width: "15%",
    },
    {
      key: "price",
      value: "Price",
      align: "left",
      selected: true,
      // width: "10%",
    },
    {
      key: "discount",
      value: "Discount",
      align: "center",
      selected: true,
      // width: "10%",
    },
    {
      key: "tax",
      value: "Tax %",
      align: "right",
      selected: true,
      // width: "10%",
    },
    {
      key: "status",
      value: "Status",
      align: "center",
      selected: true,
      width: "10%",
    },
    {
      key: "",
      value: "Actions",
      align: "center",
      selected: true,
      width: "10%",
    },
    {
      key: "carton",
      value: "Carton Size",
      selected: false,
      align: "right",
    },
    {
      key: "pallet",
      value: "Pallet Size",
      selected: false,
      align: "right",
    },
    {
      key: "carton_price",
      value: "Carton Price",
      selected: false,
      align: "right",
    },
    {
      key: "pallet_price",
      value: "Pallet Price",
      selected: false,
      align: "right",
    },
    {
      key: "product_code",
      value: "Product Code",
      selected: false,
      align: "right",
    },
    {
      key: "upc",
      value: "Universal Product Code",
      selected: false,
      align: "right",
    },
    {
      key: "suggestions",
      value: "Suggestions",
      selected: false,
      align: "left",
    },
    {
      key: "unit_price",
      value: "Unit price",
      selected: false,
      align: "right",
    },
    {
      key: "item_weight",
      value: "Item Weight",
      selected: false,
      align: "right",
    },
    {
      key: "order_limit",
      value: "Order Limit",
      selected: false,
      align: "right",
    },
    {
      key: "inv_limit",
      value: "Inventory Limit",
      selected: false,
      align: "right",
    },
    {
      key: "price_per",
      value: "Price Per",
      selected: false,
      align: "right",
    },
  ],
  filtersMap: FiltersProps[] = [
    {
      name: "Items",
      key: "items",
      options: [
        { label: "All", value: "all_images" },
        { label: "With Images", value: "with_images" },
        { label: "Without Images", value: "without_images" },
      ],
    },
    {
      name: "Items Stock",
      key: "items_stock",
      options: [
        { label: "All", value: "all_of_stock" },
        { label: "In Stock", value: "in_stock" },
        { label: "Out of Stock", value: "out_of_stock" },
      ],
    },
    {
      name: "Visibility on Platform",
      key: "visibility_on_platform",
      options: [
        { label: "All", value: "all_platforms" },
        { label: "None", value: "none" },
        { label: "Web", value: "web" },
        { label: "POS", value: "pos" },
      ],
    },
  ],
  // Product Export Columns
  itemExportColumns = [
    { header: "Product ID", key: "menu_item_id" },
    { header: "Category ID", key: "menu_cat_id" },
    { header: "Brand", key: "item_brand[0].brand_name" },
    { header: "Name", key: "name" },
    { header: "Description", key: "desc" },
    { header: "Price", key: "price" },
    { header: "Category", key: "category" },
    { header: "Discount", key: "discount" },
    { header: "Discount Start", key: "discount_start_at" },
    { header: "Discount Expiry", key: "discount_expiry" },
    { header: "Tax%", key: "tax" },
    { header: "Weight", key: "item_weight" },
    { header: "SKU", key: "sku" },
    { header: "Status", key: "status" },
    { header: "Carton Size", key: "carton" },
    { header: "Pallet Size", key: "pallet" },
    { header: "Carton Price", key: "carton_price" },
    { header: "Pallet Price", key: "pallet_price" },
    { header: "Product Code", key: "product_code" },
    { header: "Universal Product Code", key: "upc" },
    { header: "Unit price", key: "unit_price" },
    { header: "Order Limit", key: "order_limit" },
    { header: "Price Per", key: "price_per" },
    { header: "Minimum Quantity", key: "min_qty" },
    { header: "Maximum Distance", key: "max_distance" },
    { header: "Image", key: "image" },
  ],
  weightUnits = [
    { label: "Gram (g)", value: "g" },
    { label: "Kilogram (kg)", value: "kg" },
    { label: "Litre (l)", value: "l" },
    { label: "Milliliter (ml)", value: "ml" },
    { label: "Milligram (mg)", value: "mg" },
    { label: "Pound (lb)", value: "lb" },
  ],
  canadaPostMaximumDistance = 10000;
