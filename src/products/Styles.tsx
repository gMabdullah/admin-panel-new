export const orderTextStyle = {
  width: "260px",
  height: "40px",
  marginLeft: "48px",

  "& .MuiOutlinedInput-input": {
    background: "#F5F5F5",
    padding: "10px 16px 10px 0px !important",
  },
  "& .MuiOutlinedInput-notchedOutline": {
    border: "unset",
  },
  "& .MuiOutlinedInput-root": {
    backgroundColor: "#F5F5F5",
  },
};

export const AddItemStyle = {
  p: "12px 32px",
  height: "44px",
  width: "151px",
  border: "1px solid #CCD1DB",
};

export const gridIconsCss = {
  display: "flex",
  alignItems: "center",
  justifyContent: "end",
  color: "#212121",
};

const nutritionTableStyle = {
  width: "100%",
  "& .MuiDataGrid-root": {
    border: "1px solid #EEEEEE",
    borderRadius: "8px",
    color: "#212121",

    "& .MuiDataGrid-footerContainer": {
      borderTop: "1px solid #EEEEEE",
    },
    "& .MuiDataGrid-columnHeaders": {
      background: "#F5F5F5",
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

export { nutritionTableStyle };
