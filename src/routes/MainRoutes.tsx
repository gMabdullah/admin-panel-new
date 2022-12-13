import { lazy } from "react";

// project imports
import MainLayout from "layout/mainLayout";
import Loadable from "uiComponent/Loadable";

// dashboard routing
const Dashboard = Loadable(lazy(() => import("views/dashboard/Dashboard")));
const DashboardSales = Loadable(
  lazy(() => import("views/dashboard/sales/DashboardSales"))
);
const DashboardOrders = Loadable(
  lazy(() => import("views/dashboard/orders/DashboardOrders"))
);
const DashboardCustomers = Loadable(
  lazy(() => import("views/dashboard/customers/DashboardCustomers"))
);

// orders routing
const BusinessOrders = Loadable(
  lazy(() => import("orders/businessOrders/Orders"))
);
const OrdersCartAbandonment = Loadable(
  lazy(() => import("orders/cartAbandonment/CartAbandonment"))
);

// performance routing
const Performance = Loadable(
  lazy(() => import("views/performance/Performance"))
);
const CustomReport = Loadable(
  lazy(() => import("views/performance/customReport/CustomReport"))
);
const POSReport = Loadable(
  lazy(() => import("views/performance/posReport/PosReport"))
);
const Feedback = Loadable(
  lazy(() => import("views/performance/feedback/Feedback"))
);

// products routing
const ProductsItems = Loadable(
  lazy(() => import("views/products/items/Items"))
);
const ProductsCategories = Loadable(
  lazy(() => import("views/products/categories/Categories"))
);
const ProductsSetup = Loadable(
  lazy(() => import("views/products/setup/Setup"))
);
const ProductsSetupOptionSets = Loadable(
  lazy(() => import("views/products/setup/optionSets/OptionSets"))
);
const ProductsSetupAttributes = Loadable(
  lazy(() => import("views/products/setup/attributes/Attributes"))
);
const ProductsSetupTags = Loadable(
  lazy(() => import("views/products/setup/tags/Tags"))
);
const ProductsSetupBrands = Loadable(
  lazy(() => import("views/products/setup/brands/Brands"))
);
const ProductsSetupPOSModifiers = Loadable(
  lazy(() => import("views/products/setup/posModifiers/PosModifiers"))
);

// customer loyalty routing
const CustomerLoyaltyRedemption = Loadable(
  lazy(() => import("views/customerLoyalty/redemptions/Redemptions"))
);
const CustomerLoyaltyCouponRedemptions = Loadable(
  lazy(
    () =>
      import(
        "views/customerLoyalty/redemptions/couponRedemptions/CouponRedemptions"
      )
  )
);
const CustomerLoyaltyRedemptions = Loadable(
  lazy(
    () =>
      import(
        "views/customerLoyalty/redemptions/loyaltyRedemptions/LoyaltyRedemptions"
      )
  )
);
const CustomerLoyaltyCampaigns = Loadable(
  lazy(() => import("views/customerLoyalty/campaigns/Campaigns"))
);

// inventory routing
const Inventory = Loadable(lazy(() => import("views/inventory/Inventory")));
const InventoryStock = Loadable(
  lazy(() => import("views/inventory/stock/Stock"))
);
const InventoryPurchases = Loadable(
  lazy(() => import("views/inventory/purchases/Purchases"))
);
const InventoryPurchaseOrders = Loadable(
  lazy(() => import("views/inventory/purchaseOrders/PurchaseOrders"))
);
const InventorySetup = Loadable(
  lazy(() => import("views/inventory/setup/Setup"))
);

// access management routing
const AccessManagement = Loadable(
  lazy(() => import("views/accessManagement/AccessManagement"))
);

// integrations routing
const Integrations = Loadable(
  lazy(() => import("views/integrations/Integrations"))
);
const PaymentsIntegration = Loadable(
  lazy(() => import("views/integrations/payments/PaymentsIntegration"))
);
const FirebaseIntegration = Loadable(
  lazy(() => import("views/integrations/firebase/FirebaseIntegration"))
);

// settings routing
const Settings = Loadable(lazy(() => import("views/settings/Settings")));
const BusinessHoursSettings = Loadable(
  lazy(() => import("views/settings/businessHours/BusinessHours"))
);
const BusinessInfoSettings = Loadable(
  lazy(() => import("views/settings/businessInfo/BusinessInfo"))
);
const EmailSettings = Loadable(
  lazy(() => import("views/settings/emailSettings/Email"))
);
const OrdersSettings = Loadable(
  lazy(() => import("views/settings/ordersSettings/OrdersSetting"))
);
const ReservationSettings = Loadable(
  lazy(() => import("views/settings/reservations/Reservation"))
);
const SMSSettings = Loadable(lazy(() => import("views/settings/sms/SMS")));
const POSSettings = Loadable(
  lazy(() => import("views/settings/posSettings/POSSettings"))
);

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: "/",
  element: <MainLayout />,
  children: [
    {
      path: "/dashboard",
      element: <Dashboard />,
      children: [
        {
          path: "sales",
          element: <DashboardSales />,
        },
        {
          path: "orders",
          element: <DashboardOrders />,
        },
        {
          path: "customers",
          element: <DashboardCustomers />,
        },
      ],
    },
    {
      path: "/orders",
      element: <BusinessOrders />,
    },
    {
      path: "/orders/cart-abandonment",
      element: <OrdersCartAbandonment />,
    },
    {
      path: "/performance",
      element: <Performance />,
      children: [
        {
          path: "custom-reports",
          element: <CustomReport />,
        },
        {
          path: "pos-report",
          element: <POSReport />,
        },
        {
          path: "feedback",
          element: <Feedback />,
        },
      ],
    },
    {
      path: "/products/items",
      element: <ProductsItems />,
    },
    {
      path: "/products/categories",
      element: <ProductsCategories />,
    },
    {
      path: "/products/setup",
      element: <ProductsSetup />,
      children: [
        {
          path: "option-sets",
          element: <ProductsSetupOptionSets />,
        },
        {
          path: "attributes",
          element: <ProductsSetupAttributes />,
        },
        {
          path: "tags",
          element: <ProductsSetupTags />,
        },
        {
          path: "brands",
          element: <ProductsSetupBrands />,
        },
        {
          path: "pos-modifiers",
          element: <ProductsSetupPOSModifiers />,
        },
      ],
    },
    {
      path: "/customer-loyalty/redemptions",
      element: <CustomerLoyaltyRedemption />,
      children: [
        {
          path: "coupon-redemption",
          element: <CustomerLoyaltyCouponRedemptions />,
        },
        {
          path: "loyalty-redemption",
          element: <CustomerLoyaltyRedemptions />,
        },
      ],
    },
    {
      path: "/customer-loyalty/campaigns",
      element: <CustomerLoyaltyCampaigns />,
    },
    {
      path: "/inventory",
      element: <Inventory />,
      children: [
        {
          path: "stock",
          element: <InventoryStock />,
        },
        {
          path: "purchases",
          element: <InventoryPurchases />,
        },
        {
          path: "purchaseOrders",
          element: <InventoryPurchaseOrders />,
        },
        {
          path: "setup",
          element: <InventorySetup />,
        },
      ],
    },
    {
      path: "/accessManagement",
      element: <AccessManagement />,
    },
    {
      path: "/integration",
      element: <Integrations />,
      children: [
        {
          path: "payments",
          element: <PaymentsIntegration />,
        },
        {
          path: "firebase",
          element: <FirebaseIntegration />,
        },
      ],
    },
    {
      path: "/settings",
      element: <Settings />,
      children: [
        {
          path: "business-info",
          element: <BusinessInfoSettings />,
        },
        {
          path: "orders",
          element: <OrdersSettings />,
        },
        {
          path: "business-hours",
          element: <BusinessHoursSettings />,
        },
        {
          path: "reservation",
          element: <ReservationSettings />,
        },
        {
          path: "email",
          element: <EmailSettings />,
        },
        {
          path: "sms",
          element: <SMSSettings />,
        },
        {
          path: "pos",
          element: <POSSettings />,
        },
      ],
    },
  ],
};

export default MainRoutes;
