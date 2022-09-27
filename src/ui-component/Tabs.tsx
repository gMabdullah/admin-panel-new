import { useState, SyntheticEvent } from "react";
import { useLocation, Link, Outlet } from "react-router-dom";
import { Box, Grid, Tab, Tabs } from "@mui/material";
import MainCard from "ui-component/cards/MainCard";

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

type TabDataType = {
  tabData: {
    labels: string[];
    to: string[];
  };
};

const TabsComponent = (tabData: TabDataType) => {
  const { pathname } = useLocation();

  const { labels, to } = tabData.tabData;

  let selectedTab = 0;
  switch (pathname) {
    case "/dashboard/orders":
    case "/performance/pos-report":
    case "/products/setup/attributes":
    case "/customer-loyalty/redemptions/loyalty-redemption":
    case "/inventory/purchases":
    case "/integration/firebase":
    case "/settings/orders":
      selectedTab = 1;
      break;

    case "/dashboard/customers":
    case "/performance/feedback":
    case "/products/setup/tags":
    case "/inventory/purchaseOrders":
    case "/settings/business-hours":
      selectedTab = 2;
      break;

    case "/products/setup/brands":
    case "/inventory/setup":
    case "/settings/reservation":
      selectedTab = 3;
      break;

    case "/products/setup/pos-modifiers":
    case "/settings/email":
      selectedTab = 4;
      break;

    case "/settings/sms":
      selectedTab = 5;
      break;

    case "/settings/pos":
      selectedTab = 6;
      break;

    case "/dashboard/sales":
    case "/performance/custom-reports":
    case "/products/setup/option-sets":
    case "/customer-loyalty/redemptions/coupon-redemption":
    case "/inventory/stock":
    case "/integration/payments":
    case "/settings/business-info":
    default:
      selectedTab = 0;
  }

  const [value, setValue] = useState(selectedTab);

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ display: "block" }}>
      <Grid container>
        <Grid item xs={12}>
          <MainCard
            sx={{
              "& .MuiCardContent-root": {
                mt: "unset",
              },
            }}
          >
            <Tabs
              value={value}
              variant="scrollable"
              onChange={handleChange}
              sx={{
                // px: 1,
                // pl: "22px",
                // pr: "25px",
                pb: "40px",
                // height: "54px",
                // width: "100%",
                "& a": {
                  minWidth: 10,
                  // px: 1,
                  // py: 1.5,
                  // mr: 2.25,
                  p: "17px 20px",
                  color: "grey.600",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",

                  fontFamily: "Roboto",
                  fontStyle: "normal",
                  fontWeight: 500,
                  fontSize: "14px",
                },
                "& a.Mui-selected": {
                  color: "primary.main",
                },
                "& a > svg": {
                  marginBottom: "0px !important",
                  mr: 1.25,
                },
              }}
            >
              {labels.map((label, index) => {
                return (
                  <Tab
                    key={label}
                    sx={{ textTransform: "none" }}
                    component={Link}
                    to={to[index]}
                    label={label}
                    {...a11yProps(selectedTab)}
                  />
                );
              })}
            </Tabs>

            <Outlet />
          </MainCard>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TabsComponent;
