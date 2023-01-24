import React, { useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import CustomModal from "components/CustomModal";
import { makeStyles } from "@mui/styles";
import CustomButton from "components/CustomButton";

import * as XLSX from "xlsx";
import { capitalizeFLetter, getLocalStorage } from "orders/HelperFunctions";
import useAxios from "axios-hooks";

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
    margin: "20px !important",
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

const ImportMenuExcel = () => {
  const [items, setItems] = useState([]);
  const [validationError, setValidationError] = useState(false);
  const [rowData, setRowData] = useState(null);
  const [bulkUploadModal, setBulkUploadModal] = useState<boolean>(true);
  const { eatout_id, user_id } = getLocalStorage();
  const toggleBulkUploadModal = () => {
    setBulkUploadModal((prevState) => !prevState);
  };

  const payload = () => {
    const formData = new FormData();

    formData.append("eatout_id", eatout_id);
    formData.append("admin_id", user_id);
    formData.append("menu", JSON.stringify(rowData));
    formData.append("source", `biz`);
    return formData;
  };
  const [{ data, loading, error }, addProductBulk] = useAxios(
    { url: `/bulk_upload_menu`, method: "post" },
    { manual: true }
  );
  const callBulkApi = () => {
    addProductBulk({
      data: payload(),
    });
  };
  const handleUpload = async (e: any) => {
    setItems([]);
    setValidationError(false);
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
        if (rows.length > 0) {
          setRowData(rows);
          const response = await addProductBulk();
        }
      } else {
        console.log("The reader.result is not a valid ArrayBuffer");
      }

      //     rows.map((item: string[], index: number) => {
      //       let errorCount = 0;
      //       if (index === 0 || index === 1) return true;
      //       errorCount = item[0] === "" || item[2] === ""
      //         ? errorCount + 1
      //         : errorCount + 0;
      // //      errorCount += this.isString(item[6]);

      //       item[7] = getFormatTime(item[7]);
      //       item[19] = getFormatTime(item[19]);

      //     //  errorCount += this.isString(item[8]);

      //       // 20       "Max Distance"
      //       item[20] = item[20];
      //       let discountExpiryDate = item[7];
      //       let discountStart = item[19];
      //       // check Discount Start and End Date
      //       if (discountExpiryDate && discountStart) {
      //         if(discountExpiryDate >= discountStart){
      //           errorCount += 0
      //         }else {
      //           errorCount += 1;

      //         }
      //       }
      //       if ((!discountExpiryDate && discountStart) || (discountExpiryDate && !discountStart)) {
      //         errorCount += 1;

      //       }
      //       let price = item[3];
      //       // Price validation
      //       // check for price only if category and product name exist
      //       if(
      //         ((item[0] !== "") && (item[2] !== "")) && priceValidation(price))
      //       {
      //         errorCount += 1;

      //       }
      //       if (errorCount === 0) return true;

      //     });
      // const data = new Uint8Array(reader.result as ArrayBuffer).subarray(0, 4);

      //   debugger
      //  let wb = XLSX.read(data, { type: "array" });
      //   debugger;

      // /* Convert array to json*/

      // check Discount Start and End Date
      // if (discountExpiryDate && discountStart) {
      //   if(discountExpiryDate >= discountStart){
      //     errorCount += 0
      //   }else {
      //     errorCount += 1;
      //     toast.error("Discount Expiry should greater than Discount Start", toastOptions)
      //   }
      // }
      // if ((!discountExpiryDate && discountStart) || (discountExpiryDate && !discountStart)) {
      //   errorCount += 1;
      //   toast.error("Discount Start and Expiry are Must", toastOptions);
      // }
      // Price validation
      // check for price only if category and product name exist
      //   if(
      //     ((item[0] !== "") && (item[2] !== "")) && this.priceValidation(price))
      //   {
      //     errorCount += 1;
      //     toast.error("Please enter a valid Price", toastOptions);
      //   }
      //   if (errorCount === 0) return true;
      //   document.getElementById("input").value = "";
      //   this.setState({
      //     data: [],
      //     disabled: true,
      //     validationError: true,
      //   });
      // });
    };

    // perform the actual file upload logic here
  };

  const classes = useStyles();

  return (
    <CustomModal
      title={
        <Typography variant="h3">Import Menu Items(Excel File)</Typography>
      }
      open={bulkUploadModal}
      onClose={toggleBulkUploadModal}
      paperStyle={{
        position: "absolute",
        width: 745,
        height: 350,
        left: "calc(50% - 372.5px)",
        top: "calc(50% - 175px)",
        background: "#FFFFFF",
        boxShadow: "0px 0px 36px rgba(0, 0, 0, 0.13)",
      }}
    >
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
            handleUpload(e);
          }}
        />

        {/* </Button> */}
        {/* <Button variant="contained" component="label">
        Upload
     
      </Button> */}
        {/* <UploadFileButton onUpload={function (file: File): void {
          throw new Error('Function not implemented.');
        } } /> */}
      </Box>
      <Grid container>
        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "end",
            p: "30px !important",
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
            onClick={callBulkApi}
            // disabled={
            //   errors.categoryError === "" && errors.slugError === ""
            //     ? false
            //     : true
            // }
          >
            Import Menu
          </CustomButton>
        </Grid>
      </Grid>
    </CustomModal>
  );
};

export default ImportMenuExcel;
