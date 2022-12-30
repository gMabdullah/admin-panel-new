const chipStyle = {
  height: "48px",
  p: "8px 15px 8px 8px",
  alignItems: "center",
  borderRadius: "27px",
  transition: "all .2s ease-in-out",
  background: "#E5E7EB",
  border: "none",

  "& .MuiChip-label": {
    lineHeight: 0,
    pr: "unset",
    pl: "18px",
  },

  "& .MuiChip-icon": {
    m: "unset",
  },
};

const logoStyle = {
  background: "white !important",
  height: "32px",
  width: "32px",
  cursor: "pointer",

  "& .MuiAvatar-img": {
    objectFit: "contain !important",
  },
};

const popupStyle = {
  width: "100%",
  maxWidth: 200,
  minWidth: 150,
  p: "unset",
  borderRadius: "10px",
};

export { chipStyle, logoStyle, popupStyle };
