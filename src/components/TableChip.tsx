import { Chip } from "@mui/material";
interface propsType {
  statusValue: string;
}
const TableChip = ({ statusValue }: propsType) => {
  return (
    <Chip
      label={`${statusValue === "0" ? "Available" : "Out of Stock"}`}
      sx={{
        color: `${statusValue === "0" ? "#00C853" : "#D84315"}`,
        background: `${statusValue === "0" ? "#C7FFD6" : "#FBE9E7"}`,
        p: `${statusValue === "0" ? "8px 17.5px" : "8px"}`,

        alignItems: "center",
        mr: "16px",
        ml: "10px",

        "& .MuiChip-label": {
          p: "unset",
        },
      }}
    />
  );
};

export default TableChip;
