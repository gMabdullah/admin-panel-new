import { ConfigProps } from "types/config";
import Axios from "axios";
const development = process.env.REACT_APP_BASEURL;
const production = process.env.REACT_APP_LIVE;

let environment: string | undefined = "";
const type = development;

switch (type) {
  case production:
    environment = production;
    break;
  case development:
    environment = development;
    break;
}

export const PRE_AUTH_CONFIRM_PAYMENT = environment?.includes("beta1")
  ? development
  : process.env.REACT_APP_TOSSDOWN_SITE_LIVE;

export const TOSSDOWN_SITE = environment?.includes("beta1")
  ? process.env.REACT_APP_TOSSDOWN_SITE
  : process.env.REACT_APP_TOSSDOWN_SITE_LIVE;

export const GATEWAY_API_URL = environment?.includes("beta1")
  ? process.env.REACT_APP_GATEWAY_DEV_URL
  : process.env.REACT_APP_GATEWAY_PROD_URL;

export const GATEWAY_API_KEY = environment?.includes("apidev")
  ? process.env.REACT_APP_GATEWAY_DEV_API_KEY
  : process.env.REACT_APP_GATEWAY_PROD_API_KEY;

export const ORDER_PUSHER_EVENT = environment?.includes("beta1")
  ? process.env.REACT_APP_PUSHER_DEV
  : process.env.REACT_APP_PUSHER_PRODUCTION;

export const axios = Axios.create({
  baseURL: environment,
});

export const JWT_API = {
  secret: "SECRET-KEY",
  timeout: "1 days",
};

export const FIREBASE_API = {
  apiKey: "AIzaSyBernKzdSojh_vWXBHt0aRhf5SC9VLChbM",
  authDomain: "berry-material-react.firebaseapp.com",
  projectId: "berry-material-react",
  storageBucket: "berry-material-react.appspot.com",
  messagingSenderId: "901111229354",
  appId: "1:901111229354:web:a5ae5aa95486297d69d9d3",
  measurementId: "G-MGJHSL8XW3",
};

export const AUTH0_API = {
  client_id: "7T4IlWis4DKHSbG8JAye4Ipk0rvXkH9V",
  domain: "dev-w0-vxep3.us.auth0.com",
};

export const AWS_API = {
  poolId: "us-east-1_AOfOTXLvD",
  appClientId: "3eau2osduslvb7vks3vsh9t7b0",
};

// basename: only at build time to set, and Don't add '/' at end off BASENAME for breadcrumbs, also Don't put only '/' use blank('') instead,
// like '/berry-material-react/react/default'
export const BASE_PATH = "";

export const DASHBOARD_PATH = "/orders";

const config: ConfigProps = {
  fontFamily: `'Roboto', sans-serif`,
  borderRadius: 8,
  outlinedFilled: true,
  navType: "light", // light, dark
  presetColor: "default", // default, theme1, theme2, theme3, theme4, theme5, theme6
  locale: "en", // 'en' - English, 'fr' - French, 'ro' - Romanian, 'zh' - Chinese
  rtlLayout: false,
  container: false,
};

export default config;
