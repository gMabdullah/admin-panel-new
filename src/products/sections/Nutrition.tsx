import { useContext, useState } from "react";

import { DeleteTwoTone, EditTwoTone } from "@mui/icons-material";
import { Grid, Stack, Box } from "@mui/material";
import {
  DataGrid,
  GridActionsCellItem,
  GridColumns,
  GridRowParams,
} from "@mui/x-data-grid";
import { makeStyles } from "@mui/styles";

import CustomButton from "components/CustomButton";
import ExpandablePanel from "components/ExpandablePanel";
import TdTextField from "components/TdTextField";
import { ProductsContext } from "../context/ProductsContext";
import { nutritionTableStyle } from "../Styles";

const useStyles = makeStyles(() => ({
  nutritionNameColumnStyle: {
    paddingLeft: "24px !important",
  },
}));

const Nutrition = () => {
  const classes = useStyles();
  const { state } = useContext(ProductsContext);
  const [nutritionRows, setNutritionRows] = useState<
    ItemDetailsResponseItemNutritionsTable[] | []
  >([]);
  const [nutrition, setNutrition] = useState({
    name: "",
    value: "",
  });
  const [editNutrition, setEditNutrition] = useState({
    editFlag: false,
    nutrition: { name: "", value: "", id: "" },
  });

  const handleChange = (e: { target: { value: string; name: string } }) => {
    setNutrition({ ...nutrition, [e.target.name]: e.target.value });
  };

  const addEditNutrition = () => {
    if (nutrition.name && nutrition.value) {
      if (editNutrition.editFlag) {
        const updatedNutrition = nutritionRows.map((item, index) => {
          if (item.id === editNutrition.nutrition.id) {
            // update state in useReducer hook
            if (Array.isArray(state.itemNutritions)) {
              state.itemNutritions[index] = nutrition;
            }
            return { ...editNutrition.nutrition, ...nutrition };
          } else {
            return item;
          }
        });
        setNutritionRows(updatedNutrition);
        setEditNutrition({
          editFlag: false,
          nutrition: { name: "", value: "", id: "" },
        });
      } else {
        // setting state for table
        setNutritionRows([
          { ...nutrition, id: `${nutritionRows.length + 1}` },
          ...nutritionRows,
        ]);
        // update state in useReducer hook
        if (Array.isArray(state.itemNutritions)) {
          state.itemNutritions = [nutrition, ...state.itemNutritions];
        } else {
          state.itemNutritions = [nutrition];
        }
      }
      setNutrition({
        name: "",
        value: "",
      });
    } else {
      // set field error;
    }
  };

  const deleteNutrition = (itemId: number) => {
    if (!editNutrition.editFlag) {
      const nutritionArray = nutritionRows.filter((item, index) => {
        if (item.id !== String(itemId)) {
          return item;
        } else {
          // update state in useReducer hook
          if (
            Array.isArray(state.itemNutritions) &&
            state.itemNutritions.length > 1
          ) {
            state.itemNutritions = [
              ...state.itemNutritions.slice(0, index),
              ...state.itemNutritions.slice(index + 1),
            ];
          } else {
            state.itemNutritions = "";
          }
        }
      });
      setNutritionRows(nutritionArray);
      setNutrition({
        name: "",
        value: "",
      });
    }
  };

  const editNutritions = (row: ItemDetailsResponseItemNutritionsTable) => {
    setEditNutrition({
      editFlag: true,
      nutrition: row,
    });
    setNutrition({
      name: row.name,
      value: row.value,
    });
  };

  const actionsButton = (params: GridRowParams) => {
    const actionsArray = [
      <GridActionsCellItem
        icon={<EditTwoTone />}
        label=""
        onClick={() => editNutritions(params.row)}
      />,
      <GridActionsCellItem
        icon={<DeleteTwoTone htmlColor="#D84315" />}
        label=""
        onClick={() => deleteNutrition(Number(params.id))}
      />,
    ];
    return actionsArray;
  };

  const columns: GridColumns = [
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      sortable: false,
      headerClassName: classes.nutritionNameColumnStyle,
      cellClassName: classes.nutritionNameColumnStyle,
    },
    {
      field: "value",
      headerName: "Value",
      flex: 0.5,
      align: "right",
      headerAlign: "right",
      sortable: false,
    },
    {
      field: "action",
      headerName: "Actions",
      type: "actions",
      flex: 1.3,
      sortable: false,
      getActions: actionsButton,
    },
  ];

  return (
    <Stack sx={{ mb: "32px" }}>
      <ExpandablePanel
        id="nutritionValue"
        title="Nutrition Value"
        subTitle="Allows to add nutritional value to the item"
        sx={{
          "& .MuiAccordionSummary-content": {
            m: "24px 0 0",
          },
        }}
      >
        <Grid container>
          <Grid item xs={12} sx={{ display: "flex", mb: "12px", mt: "24px" }}>
            <Grid item xs={6}>
              <TdTextField
                name="name"
                label="Nutrition Name"
                value={nutrition.name}
                onChange={handleChange}
                // error={fieldError.address === "" ? false : true}
                // helperText={fieldError.address}
              />
            </Grid>
            <Grid item xs={6} sx={{ ml: "8px" }}>
              <TdTextField
                name="value"
                label="Nutrition Value"
                value={nutrition.value}
                onChange={handleChange}
                // error={fieldError.address === "" ? false : true}
                // helperText={fieldError.address}
              />
            </Grid>
          </Grid>
        </Grid>
        <CustomButton
          sx={{
            color: "#DB154D",
            fontSize: "13px",
            lineHeight: "unset",
            mb: "17px",
          }}
          onClick={addEditNutrition}
        >
          {editNutrition.editFlag ? "Update Nutrition" : " Add Nutrition"}
        </CustomButton>
        {nutritionRows.length > 0 && (
          <Box
            sx={{
              ...nutritionTableStyle,
            }}
          >
            <DataGrid
              rows={nutritionRows}
              columns={columns}
              autoHeight
              disableColumnMenu
              hideFooterSelectedRowCount
              hideFooter
            />
          </Box>
        )}
      </ExpandablePanel>
    </Stack>
  );
};

export default Nutrition;
