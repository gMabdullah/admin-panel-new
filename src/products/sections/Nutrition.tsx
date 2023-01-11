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
import { nutritionTableStyle } from "../Styles";

const useStyles = makeStyles(() => ({
  nutritionNameColumnStyle: {
    paddingLeft: "24px !important",
  },
}));

const Nutrition = () => {
  const classes = useStyles();

  const actionsButton = (params: GridRowParams) => {
    const actionsArray = [
      <GridActionsCellItem
        icon={<EditTwoTone />}
        label=""
        // showInMenu
        // onClick={async () => {
        //   // const item_id = Number(params.id);
        //   // const row = params.row;
        //   // // get single item API call (for edit item)
        //   // const {
        //   //   data: { items },
        //   // } = await singleItemCall({
        //   //   url: `/product_details?business_id=${eatout_id}&item_id=${item_id}&admin_id=${user_id}&source=biz`,
        //   // });
        //   // if (
        //   //   (Array.isArray(items) && items.length > 0) ||
        //   //   items[0].status === "1" ||
        //   //   items !== null
        //   // ) {
        //   //   if (items[0].options.length > 0) {
        //   //     setOptions(items[0].options);
        //   //   }
        //   //   setEditAbleItem([row]);
        //   //   setEditItemFlag(true);
        //   //   openAddEditModal();
        //   // }
        // }}
      />,
      <GridActionsCellItem
        icon={<DeleteTwoTone htmlColor="#D84315" />}
        label=""
        // showInMenu
        // onClick={() => deleteOrderItem(Number(params.id))}
      />,
    ];

    return actionsArray;
  };

  const columns: GridColumns = [
    {
      field: "item_name",
      headerName: "Name",
      flex: 1,
      sortable: false,
      headerClassName: classes.nutritionNameColumnStyle,
      cellClassName: classes.nutritionNameColumnStyle,
      // renderCell: productFormatting,
    },
    {
      field: "item_value",
      headerName: "Value",
      flex: 0.5,
      align: "right",
      headerAlign: "right",
      sortable: false,
      // headerClassName: classes.nutritionNameColumnStyle,
      // cellClassName: classes.nutritionNameColumnStyle,
      // renderCell: productFormatting,
    },
    {
      field: "action",
      headerName: "Actions",
      type: "actions",
      flex: 1.3,
      // align: "right",
      // headerAlign: "right",
      // minWidth: 30,
      // width: 30,
      sortable: false,
      getActions: actionsButton,
    },
  ];

  const rows = [
    {
      id: 1,
      item_id: "11",
      item_name: "aa",
      item_value: "12g",
    },
    {
      id: 2,
      item_id: "22",
      item_name: "bb",
      item_value: "12g",
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
                label="Nutrition Name"
                value={customerAddress}
                onChange={handleAddressChange}
                error={fieldError.address === "" ? false : true}
                helperText={fieldError.address}
              />
            </Grid>
            <Grid item xs={6} sx={{ ml: "8px" }}>
              <TdTextField
                label="Nutrition Value"
                value={customerAddress}
                onChange={handleAddressChange}
                error={fieldError.address === "" ? false : true}
                helperText={fieldError.address}
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
        >
          Add Nutrition
        </CustomButton>

        <Box
          sx={{
            ...nutritionTableStyle,
          }}
        >
          <DataGrid
            rows={rows}
            columns={columns}
            getRowId={(row: any) => row.item_id}
            autoHeight
            disableColumnMenu
            hideFooterSelectedRowCount
            hideFooter
          />
        </Box>
      </ExpandablePanel>
    </Stack>
  );
};

export default Nutrition;
