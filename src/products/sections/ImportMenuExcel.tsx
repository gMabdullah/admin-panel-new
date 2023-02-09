import React, { useState } from "react";

import { makeStyles } from "@mui/styles";
import { Box, Divider, Grid, IconButton, Typography } from "@mui/material";
import { HighlightOffTwoTone as CloseIcon } from "@mui/icons-material";

import * as XLSX from "xlsx";
import useAxios from "axios-hooks";

import CustomModal from "components/CustomModal";
import CustomButton from "components/CustomButton";
import Notify from "components/Notify";
import {
  capitalizeFLetter,
  getFormatTime,
  getLocalStorage,
  isString,
  priceValidation,
} from "orders/HelperFunctions";

const useStyles = makeStyles({
  modal: {
    position: "absolute",
    width: 745,
    height: 350,
    left: "calc(50% - 372.5px)",
    top: "calc(50% - 175px)",
    background: "#FFFFFF",
    boxShadow: "0px 0px 36px rgba(0, 0, 0, 0.13)",
    borderRadius: 12,
  },
  box: {
    boxSizing: "border-box",
    //  position: 'absolute',
    height: "123px",
    // left: '40px',
    //top:"32px",
    background: "#FAFAFA",
    border: "0.58216px dashed rgba(0, 0, 0, 0.23)",
    borderRadius: "4.65728px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0px 40px 32px",
  },
  button: {
    alignItem: "center",
    justifyContent: "center",
    width: "144px",
    height: "36px",
    background: "#FFFFFF",
    border: "1px solid #DB154D",
  },
});

const isFloat = (n: number) => {
  return Number(n) === n && n % 1 !== 0;
};

interface menuExcelPropsType {
  importType: string;
  setImportExportValue: React.Dispatch<React.SetStateAction<string>>;
}

const ImportMenuExcel = ({
  importType,
  setImportExportValue,
}: menuExcelPropsType) => {
  const [itemsUpdated, setUpdatedItems] = useState([]);
  const [validationError, setValidationError] = useState(false);
  const [rowData, setRowData] = useState([]);
  const [bulkUploadModal, setBulkUploadModal] = useState<boolean>(true);
  const { eatout_id, user_id } = getLocalStorage();
  const toggleBulkUploadModal = () => {
    setBulkUploadModal((prevState) => !prevState);
    setImportExportValue("");
  };
  const [notify, setNotify] = useState<boolean>(false);
  const [itemMessage, setItemMessage] = useState("");
  const [itemNotifyType, setItemNotifyType] = useState<
    "success" | "info" | "warning" | "error"
  >("info");

  const payload = () => {
    const formData = new FormData();

    formData.append("eatout_id", eatout_id);
    formData.append("admin_id", user_id);
    formData.append("menu", JSON.stringify(rowData));
    formData.append("source", `biz`);
    return formData;
  };

  const [{ loading: newBulkLoading, error: newBulkError }, addProductBulk] =
    useAxios({ url: `/bulk_upload_menu`, method: "post" }, { manual: true });

  const UpdateItempayload = () => {
    const formData = new FormData();

    formData.append("admin_id", user_id);
    formData.append("business_id", eatout_id);
    formData.append("menu", JSON.stringify(itemsUpdated));
    formData.append("source", `biz`);
    return formData;
  };

  const [
    { loading: updateBulkLoading, error: updateBulkError },
    updateProductBulk,
  ] = useAxios(
    { url: `/products_bulk_edit`, method: "post" },
    { manual: true }
  );

  const callBulkApi = async () => {
    const response = await addProductBulk({
      data: payload(),
    });

    setItemMessage(`Products Uploaded`);
    setItemNotifyType("success");
    setNotify(true);
    // toggleBulkUploadModal();
  };

  const callUpdateDataApi = async () => {
    const response = await updateProductBulk({
      data: UpdateItempayload(),
    });
    setItemMessage(`Products Updated`);
    setItemNotifyType("success");
    setNotify(true);
    // toggleBulkUploadModal();
  };

  ////////////// Import Menu Sheet /////////////
  const handleImportUpload = async (e: any) => {
    setNotify(false);
    let list = [];

    let reader = new FileReader();
    if (!reader) return;
    reader.readAsArrayBuffer(e.target.files[0]);

    reader.onload = async (e: any) => {
      if (reader.result instanceof ArrayBuffer) {
        const data = new Uint8Array(reader.result as ArrayBuffer);
        let wb = XLSX.read(data, { type: "array" });
        let rows: any = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]], {
          header: 1,
        });
        rows = rows.filter(
          (row: any) => row.length > 0 && row && row[0] !== undefined
        );
        const headerIndex = 1;
        for (let i = headerIndex; i < rows.length; i++) {
          for (let j = 0; j < rows[headerIndex].length; j++) {
            if (rows[i][j] === null) rows[i][j] = "";

            if (j === 0 && i >= 2) {
              rows[i][j] = capitalizeFLetter(rows[i][j]);
            }

            if (j === 1 && i >= 2) {
              rows[i][j] = capitalizeFLetter(rows[i][j]);
            }

            if (j == 2) {
              if (isFloat(rows[i][j]) == true) {
                rows[i][j] = parseFloat(rows[i][j]).toFixed(2);
              }
            }
            if (rows[i][j] === undefined) {
              rows[i][j] = "";
            }
          }
        }
        // SWAPPING - swap Discount Start to end of the row and their content in all rows accordingly
        let setIndex = true;
        for (let k = 1; k < rows.length; k++) {
          for (let l = 0; l < rows[k].length; l++) {
            // swap column headings
            if (rows[k][l] === "Discount Start" && setIndex) {
              rows[k].splice([rows[k].length - 1], 0, rows[k][l]); // swapping discount start index
              rows[k].splice(l, 1);
              setIndex = false;
            }
            // swap column content
            if (k >= 2 && l === 7) {
              rows[k].splice([rows[k].length - 1], 0, rows[k][l]);
              rows[k].splice(l, 1);
            }
          }
        }
        rows.map((item: string[], index: number) => {
          let errorCount = 0;
          // Skip the first and Second lines
          if (index === 0 || index === 1) return true;

          // Category and Product name can't be empty
          if (item[0] === "" || item[2] === "") {
            setItemMessage(`Category/Name is missing on line # ${index + 2}`);
            setItemNotifyType("error");
            setNotify(true);
            setRowData([]);
            errorCount++;
            return;
          }
          const discount = item[6];
          const tax = item[8];
          item[7] = getFormatTime(item[7]);
          item[19] = getFormatTime(item[19]);

          // Discount and Tax can't be string type
          if (isString(tax) || isString(discount)) {
            setItemMessage(
              `Discont / Tax can't be String on line # ${index + 2}`
            );
            setItemNotifyType("error");
            setNotify(true);
            errorCount++;
            return;
          }
          // 20       "Max Distance"
          item[20] = item[20];
          let discountExpiryDate = item[7];

          let discountStart = item[19];
          if (discount) {
            // check Discount Start and End Date
            if (discountExpiryDate && discountStart) {
              if (discountExpiryDate <= discountStart) {
                setItemMessage(
                  `Discount Expiry should greater than Discount Start on line # ${
                    index + 2
                  }`
                );
                setItemNotifyType("error");
                setNotify(true);
                setRowData([]);
                rows = [];
                errorCount++;
                return;
              }
            }
            if (
              (!discountExpiryDate && discountStart) ||
              (discountExpiryDate && !discountStart)
            ) {
              setItemMessage(
                `Discount Start and Expiry are Must on line # ${index + 2}`
              );
              setItemNotifyType("error");
              setNotify(true);
              setRowData([]);
              rows = [];
              errorCount++;
              return false;
            }
          }
          let price = item[3];
          // Price validation
          // check for price only if category and product name exist
          if (item[0] !== "" && item[2] !== "" && priceValidation(price)) {
            setItemMessage(`Please enter a valid Price on line # ${index + 2}`);
            setItemNotifyType("error");
            setNotify(true);
            setRowData([]);
            errorCount++;
            return false;
          }
          if (errorCount > 0) {
            return;
          }
        });
        if (rows.length > 0) {
          setRowData(rows);
        }
      } else {
        console.log("The reader.result is not a valid ArrayBuffer");
      }
    };

    // perform the actual file upload logic here
  };

  ////////////// Update Menu Sheet ///////////////
  const handleUpdateImport = (files: any) => {
    let list: any = [];
    if (files.length === 1) {
      var reader = new FileReader();
      reader.readAsBinaryString(files[0]);

      reader.onload = (e) => {
        const data = e.target && e.target.result && e.target.result;
        let readedData = XLSX.read(data, { type: "binary" });
        const wsname = readedData.SheetNames[0];
        const ws = readedData.Sheets[wsname];
        const dataParse: (string | number)[][] = XLSX.utils.sheet_to_json(ws, {
          header: 1,
        });
        let i = 3;
        const headerIndex = 2;
        dataParse.map((data, index) => {
          dataParse[headerIndex].map((column: any, index2: any) => {
            if (typeof dataParse[index][index2] === "undefined")
              dataParse[index][index2] = "";
          });
          let itemsUpdateObject: any = {};
          if (dataParse.length > 3) {
            if (
              dataParse[headerIndex][0] !== "Product ID" ||
              dataParse[headerIndex][1] !== "Category ID"
            ) {
              setItemMessage(
                `Product ID / Category ID are Required on line # # ${
                  index + headerIndex
                }`
              );
              setItemNotifyType("error");
              setNotify(true);
              return;
            }
            while (i < dataParse.length) {
              itemsUpdateObject = {};
              itemsUpdateObject.product_id = dataParse[i][0];
              itemsUpdateObject.cat_id = dataParse[i][1];
              dataParse[i].map((row, index) => {
                dataParse[headerIndex][index] === "Brand"
                  ? (itemsUpdateObject.item_brand = dataParse[i][index])
                  : dataParse[headerIndex][index] === "Name"
                  ? (itemsUpdateObject.name = dataParse[i][index])
                  : dataParse[headerIndex][index] === "Description"
                  ? (itemsUpdateObject.desc = dataParse[i][index])
                  : dataParse[headerIndex][index] === "Price"
                  ? (itemsUpdateObject.price = dataParse[i][index])
                  : dataParse[headerIndex][index] === "Discount"
                  ? (itemsUpdateObject.discount = dataParse[i][index]
                      ? dataParse[i][index]
                      : 0)
                  : dataParse[headerIndex][index] === "Discount Start"
                  ? (itemsUpdateObject.discount_start_at = getFormatTime(
                      dataParse[i][index]
                    ))
                  : dataParse[headerIndex][index] === "Discount Expiry"
                  ? (itemsUpdateObject.discount_expiry = getFormatTime(
                      dataParse[i][index]
                    ))
                  : dataParse[headerIndex][index] === "Tax%"
                  ? (itemsUpdateObject.tax = dataParse[i][index])
                  : dataParse[headerIndex][index] === "Weight"
                  ? (itemsUpdateObject.weight = dataParse[i][index])
                  : dataParse[headerIndex][index] === "SKU"
                  ? (itemsUpdateObject.sku = dataParse[i][index])
                  : dataParse[headerIndex][index] === "Status"
                  ? (itemsUpdateObject.status = dataParse[i][index])
                  : dataParse[headerIndex][index] === "Carton Size"
                  ? (itemsUpdateObject.carton_size = dataParse[i][index])
                  : dataParse[headerIndex][index] === "Pallet Size"
                  ? (itemsUpdateObject.pallet_size = dataParse[i][index])
                  : dataParse[headerIndex][index] === "Carton Price"
                  ? (itemsUpdateObject.carton_price = dataParse[i][index])
                  : dataParse[headerIndex][index] === "Pallet Price"
                  ? (itemsUpdateObject.pallet_price = dataParse[i][index])
                  : dataParse[headerIndex][index] === "Product Code"
                  ? (itemsUpdateObject.product_code = dataParse[i][index])
                  : dataParse[headerIndex][index] === "Universal Product Code"
                  ? (itemsUpdateObject.upc = dataParse[i][index])
                  : dataParse[headerIndex][index] === "Unit Price"
                  ? (itemsUpdateObject.unit_price = dataParse[i][index])
                  : dataParse[headerIndex][index] === "Order Limit"
                  ? (itemsUpdateObject.order_limit = dataParse[i][index])
                  : dataParse[headerIndex][index] === "Inventory Limit"
                  ? (itemsUpdateObject.inv_limit = dataParse[i][index])
                  : dataParse[headerIndex][index] === "Price Per"
                  ? (itemsUpdateObject.price_per = dataParse[i][index])
                  : dataParse[headerIndex][index] === "Minimum Quantity"
                  ? (itemsUpdateObject.min_qty = dataParse[i][index])
                  : dataParse[headerIndex][index] === "Maximum Distance" &&
                    (itemsUpdateObject.max_distance =
                      dataParse[i][index] === "" ? 0 : dataParse[i][index]);
              });
              if (/[a-zA-Z]/.test(itemsUpdateObject.tax)) {
                itemsUpdateObject.tax = "";
              }

              // Price
              if (priceValidation(itemsUpdateObject.price)) {
                setItemMessage(`Price is missing`);
                setItemNotifyType("error");
                setNotify(true);
                return false;
              }

              if (
                itemsUpdateObject.discount_expiry &&
                itemsUpdateObject.discount_start_at
              ) {
                // start data can't be greater than expiry date.
                if (
                  getFormatTime(itemsUpdateObject.discount_expiry) <
                  getFormatTime(itemsUpdateObject.discount_start_at)
                ) {
                  setItemMessage(
                    `Discount Expiry should greater than Discount Start`
                  );
                  setItemNotifyType("error");
                  setNotify(true);
                  return false;
                }
              }
              // one of the each is present.
              if (
                (!itemsUpdateObject.discount_expiry &&
                  itemsUpdateObject.discount_start_at) ||
                (itemsUpdateObject.discount_expiry &&
                  !itemsUpdateObject.discount_start_at)
              ) {
                setItemMessage(`Discount Start/Expiry are Missing`);
                setItemNotifyType("error");
                setNotify(true);
                return false;
              }
              // no  discount and start expiry  present
              if (
                !itemsUpdateObject.discount &&
                itemsUpdateObject.discount_expiry &&
                itemsUpdateObject.discount_start_at
              ) {
                setItemMessage(
                  `Discount Start and Expiry date should have Discount`
                );
                setItemNotifyType("error");
                setNotify(true);
                return false;
              }
              // }
              list.push({ ...itemsUpdateObject });
              i++;
            } // while
            setUpdatedItems(list);
          } // if
        }); // map
      };
    }
  };

  const closeNotify = () => setNotify(false);

  const classes = useStyles();

  return (
    <>
      {notify && (
        <Notify
          message={itemMessage}
          type={itemNotifyType}
          notify={notify}
          closeNotify={closeNotify}
        />
      )}
      <CustomModal open={bulkUploadModal} onClose={toggleBulkUploadModal}>
        <Grid container>
          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              p: "40px 40px 0 !important",
            }}
          >
            <Typography variant="h3">
              {importType === "Import New Items"
                ? "Import Menu from Excel"
                : "Import Bulk Update"}
            </Typography>

            <IconButton onClick={toggleBulkUploadModal} sx={{ p: "unset" }}>
              <CloseIcon htmlColor="#D84315" fontSize="large" />
            </IconButton>
          </Grid>
        </Grid>

        <Divider sx={{ m: "16px 40px 32px" }} />

        <Box className={classes.box}>
          {/* <Button  variant={"outlined"} color={"secondary"} startIcon={<CloudUploadIcon sx={{marginBottom:"2px"}}/>}
>
                    <Typography>

                    Choose Filess
                    </Typography>  */}

          {/* <input   type="file"  accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" onChange={handleUpload}/> */}
          <input
            type="file"
            accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
            id="input"
            onChange={(e) => {
              importType === "Update Existing Item"
                ? handleUpdateImport(e.target.files)
                : handleImportUpload(e);
            }}
          />
        </Box>

        <Grid container>
          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "end",
              p: "0px 40px 40px !important",
            }}
          >
            <CustomButton
              variant={"contained"}
              sx={{
                p: "12px 44.5px",
                background: "#F5F5F5",
                color: "#212121",
                "&:hover": {
                  backgroundColor: "#F5F5F5",
                },
              }}
              onClick={toggleBulkUploadModal}
            >
              Cancel
            </CustomButton>

            <CustomButton
              variant={"contained"}
              sx={{
                p: "12px 26px",
                ml: "12px",
              }}
              color={"secondary"}
              onClick={
                importType === "Import New Items"
                  ? callBulkApi
                  : callUpdateDataApi
              }
              disabled={
                newBulkLoading || updateBulkLoading || itemMessage
                  ? true
                  : false
              }
            >
              Import Menu
            </CustomButton>
          </Grid>
        </Grid>
      </CustomModal>
    </>
  );
};

export default ImportMenuExcel;
