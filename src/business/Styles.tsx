const contentStyle = {
  "& .MuiCardContent-root": {
    p: "unset !important",
  },
  height: "calc(100vh - 138px)",
  m: "unset",
  p: "unset !important",
};

const mainCardStyle = {
  m: "unset",
  borderRadius: "unset",
  p: "32px 32px 0px 32px",
  border: "none",
  height: "100vh",
};

const grid12Style = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
};

const grid11Style = {
  display: "flex",
  alignItems: "center",
};

const searchFieldStyle = {
  width: "260px",
  height: "44px",
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

const grid1Style = {
  display: "flex",
  alignItems: "center",
  justifyContent: "end",
};

const businessListingPaperStyle = {
  borderRadius: "8px",
  background: "#E5E7EB",
  height: "100%",
  p: "24px 0px",
};

const businessListingCardStyle = {
  background: "#FFFFFF",
  border: "1px solid rgba(0, 0, 0, 0.16)",
  borderRadius: "8px",
};

const cardMediaStyle = {
  height: "56px",
  width: "56px",
  borderRadius: "8px",
  mr: "12px",
  p: "3px",
  border: "1px solid rgba(0, 0, 0, 0.12)",
  objectFit: "contain",
};

export {
  contentStyle,
  mainCardStyle,
  grid12Style,
  grid11Style,
  searchFieldStyle,
  grid1Style,
  businessListingPaperStyle,
  businessListingCardStyle,
  cardMediaStyle,
};
