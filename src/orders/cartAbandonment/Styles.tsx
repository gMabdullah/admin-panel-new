const currencyStyle = {
  fontFamily: "Roboto",
  fontStyle: "normal",
  fontWeight: "400",
  fontSize: "10px",
  lineHeight: "12px",
  color: "#757575",
};

const cartListingHeaderStyle = {
  display: "flex",
  alignItems: "center",
};

const cartListingTableStyle = {
  width: "100%",
  "& .MuiDataGrid-root": {
    border: "none",

    "& .MuiDataGrid-footerContainer": {
      borderTop: "1px solid #EEEEEE",
    },
    "& .MuiDataGrid-columnHeaders": {
      borderBottom: "1px solid #EEEEEE",
    },
    "& .MuiDataGrid-cell": {
      borderBottom: "1px solid #EEEEEE",
    },
    "& .MuiDataGrid-columnSeparator": {
      display: "none",
    },
    "& .MuiDataGrid-cell:focus-within, & .MuiDataGrid-cell:focus, & .MuiDataGrid-columnHeader:focus, & .MuiDataGrid-columnHeader:focus-within":
      {
        outline: "none",
      },
  },
};

const cartDetailMainCardStyle = {
  m: "unset",
  borderRadius: "unset",
  p: "48px 55px",
  border: "none",
};

const cartDetailMainCardContentStyle = {
  "& .MuiCardContent-root": {
    p: "unset !important",
  },
  m: "unset",
  p: "unset !important",
};

const cartDetailGrid12Style = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
};

const cartDetailIdStyle = {
  display: "flex",
  alignItems: "center",
};

const customerSectionBoxStyle = {
  display: "flex",
  alignItems: "center",
  border: "1px solid #EEEEEE",
  borderRadius: "8px",
  p: "10px 12px 10px 16px",
  mb: "12px",
};

const noCustomerBoxStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  m: "15px 0px",
};

const deliverySectionBoxStyle = {
  border: "1px solid #EEEEEE",
  borderRadius: "8px",
  p: "17px 12px 24px 16px",
  mb: "16px",
  boxSizing: "border-box",
};

const noDeliveryBoxStyle = {
  justifyContent: "center",
  alignItems: "center",
  m: "15px 0px",
};

const tableCardContentStyle = {
  "& .MuiCardContent-root": {
    p: "unset !important",
  },
  m: "unset",
  p: "unset !important",
};

const tableCardStyle = {
  m: "unset",
  p: "20px 16px 16px",
  borderColor: "#EEEEEE",
};

const cartDetailTableBoxStyle = {
  width: "100%",

  "& .MuiDataGrid-root": {
    border: "none",
  },
  "& .MuiDataGrid-columnHeaderTitle": {
    color: "#212121",
  },
  "& .MuiDataGrid-columnHeader": {
    pl: "unset",
    pr: "15px",
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
    p: "25px 15px 25px 0px",
    borderBottom: "1px solid #EEEEEE",
  },
  "& .MuiDataGrid-virtualScrollerContent": {
    height: "100% !important",
  },
  "& .MuiDataGrid-virtualScrollerRenderZone": {
    position: "unset",
  },
};

const calculationSectionStyle = {
  display: "flex",
  justifyContent: "end",
  background: "#F5F5F5",
  borderRadius: "8px",
  p: "24px 31px",
  mt: "2px",
};

const mapCardContentStyle = {
  "& .MuiCardContent-root": {
    p: "unset !important",
  },
  m: "unset",
  p: "unset !important",
};

const mapCardStyle = {
  m: "unset",
  p: "24px 16px",
  borderColor: "#EEEEEE",
};

export {
  currencyStyle,
  cartListingHeaderStyle,
  cartListingTableStyle,
  cartDetailMainCardStyle,
  cartDetailMainCardContentStyle,
  cartDetailGrid12Style,
  cartDetailIdStyle,
  customerSectionBoxStyle,
  noCustomerBoxStyle,
  deliverySectionBoxStyle,
  noDeliveryBoxStyle,
  tableCardContentStyle,
  tableCardStyle,
  cartDetailTableBoxStyle,
  calculationSectionStyle,
  mapCardContentStyle,
  mapCardStyle,
};
