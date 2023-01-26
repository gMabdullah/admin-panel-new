import { useEffect } from "react";

import { Stack, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import LibraryBooksTwoToneIcon from "@mui/icons-material/LibraryBooksTwoTone";

import Excel from "exceljs";
import { saveAs } from "file-saver";
import moment from "moment";

import CustomButton from "components/CustomButton";

import { AnyObject } from "immer/dist/internal";

const useStyles = makeStyles(() => ({
  libraryBookIcon: {
    color: "#616161",
  },
  excelExportFile: {
    width: "104px",
    height: " 20px",
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: 500,
    fontSize: "14px",
    lineHeight: "20px",
  },
}));

type TableData = {
  header: string;
  key: string;
};

type ExcelExportPropsType = {
  tableData: TableData[];
  // listingData?: any;
  listingData?: OrderListingResponseResult[] | ProductResponseItem[];
  orderDetailData?: OrderListingResponseOrderDetail[];
  OrderDetailStatic?: any;
  exportType: string;
};

const ExcelExport = ({
  tableData,
  listingData,
  orderDetailData,
  exportType,
  OrderDetailStatic,
}: ExcelExportPropsType) => {
  const classes = useStyles();

  useEffect(() => {
    if (exportType == "ProductListing") {
      fileExport();
    }
  }, [exportType]);

  const fileExport = async () => {
    const { eatout_name } = JSON.parse(localStorage.getItem("businessInfo")!);
    const workSheetName = `${exportType}`;
    const workBookName = `${eatout_name}`;

    const workBook = new Excel.Workbook();
    const workSheet = workBook.addWorksheet(workSheetName);

    console.log("table data = ", tableData);
    console.log("listingData data = ", listingData);

    switch (exportType) {
      case "OrdersList": {
        workSheet.columns = tableData;

        workSheet.getRow(1).font = { bold: true };

        // loop through all of the columns and set the alignment with width.
        workSheet.columns.forEach((column) => {
          column.width = column.header!.length + 10;
          column.alignment = { horizontal: "center" };
        });

        // loop through data and add each one to worksheet
        listingData?.forEach((singleData) => {
          workSheet.addRow(singleData);
        });

        break;
      }
      case "ProductListing": {
        workSheet.mergeCells("A1:W1");
        workSheet.mergeCells("A2:W2");

        workSheet.getRow(1).getCell(1).value =
          "Follow the date format MM/DD/YYYY   &   Do not update category column";

        workSheet.getRow(1).getCell(1).font = {
          bold: true,
          color: { argb: "DB154D" },
          size: 14,
        };

        workSheet.getRow(1).getCell(1).alignment = {
          vertical: "middle",
          horizontal: "center",
        };

        workSheet.getRow(1).getCell(1).border = {
          top: { style: "thick" },
          left: { style: "thick" },
          bottom: { style: "thick" },
          right: { style: "thick" },
        };

        // adding column keys to add data
        workSheet.columns = tableData.map((obj) => ({
          key: obj.key,
        }));

        // adding table column heads
        workSheet.getRow(workSheet.rowCount + 1).values = tableData.map(
          (obj) => obj.header
        );

        let row: { [x: string]: string | number } = {};

        listingData?.forEach((item: any) => {
          tableData.forEach((obj) => {
            // brand name column values
            if (obj.key === "item_brand" && Array.isArray(item[obj.key])) {
              return (row[obj.key] = item.item_brand[0].brand_name);
            }

            // discount_start date column values
            if (obj.key === "discount_start_at" && item.discount_start_at) {
              return (row[obj.key] = moment(item.discount_start_at).format(
                "MM/DD/YYYY"
              ));
            }

            // discount_expiry date column values
            if (obj.key === "discount_expiry" && item.discount_expiry) {
              return (row[obj.key] = moment(item.discount_expiry).format(
                "MM/DD/YYYY"
              ));
            }

            // description column values
            if (obj.key === "desc" && item.desc) {
              return (row[obj.key] = item.desc.replace(
                /<\/?([a-zA-Z_]+?)>/g,
                ""
              ));
            }

            // all other column values
            return (row[obj.key] = item[obj.key]);
          });

          // add the computed single row to the table
          workSheet.addRow(row);
        });

        break;
      }
      case "OrderDetail": {
        workSheet.mergeCells("A1:M1");
        workSheet.mergeCells("A2:M2");

        workSheet.mergeCells("B3:M3");
        workSheet.mergeCells("B4:M4");
        workSheet.mergeCells("B5:M5");
        workSheet.mergeCells("B6:M6");
        workSheet.mergeCells("B7:M7");
        workSheet.mergeCells("B8:M8");
        workSheet.mergeCells("B9:M9");
        workSheet.mergeCells("B10:M10");
        workSheet.mergeCells("B11:M11");
        workSheet.mergeCells("B12:M12");
        workSheet.mergeCells("B13:M13");
        workSheet.mergeCells("B14:M14");

        workSheet.getRow(1).getCell(1).value = `${eatout_name}`;
        workSheet.getRow(1).getCell(1).font = {
          bold: true,
          color: { argb: "DB154D" },
          size: 22,
        };

        workSheet.getRow(1).getCell(1).alignment = {
          vertical: "middle",
          horizontal: "center",
        };

        workSheet.getRow(1).getCell(1).border = {
          top: { style: "thick" },
          left: { style: "thick" },
          bottom: { style: "thick" },
          right: { style: "thick" },
        };

        // starting order details information rows
        workSheet.getRow(3).getCell(1).value = "Order #";
        workSheet.getRow(3).getCell(2).value = `${OrderDetailStatic?.order_id}`;

        workSheet.getRow(4).getCell(1).value = "Payment Type";
        workSheet
          .getRow(4)
          .getCell(2).value = `${OrderDetailStatic?.payment_type}`;

        workSheet.getRow(5).getCell(1).value = "Order Type";
        workSheet
          .getRow(5)
          .getCell(2).value = `${OrderDetailStatic?.order_type}`;

        workSheet.getRow(6).getCell(1).value = "Status";
        workSheet.getRow(6).getCell(2).value = `${OrderDetailStatic?.status}`;

        workSheet.getRow(7).getCell(1).value = "Receipt #";
        workSheet
          .getRow(7)
          .getCell(2).value = `${OrderDetailStatic?.receipt_no}`;

        workSheet.getRow(8).getCell(1).value = "Date";
        workSheet.getRow(8).getCell(2).value = `${OrderDetailStatic?.date}`;
        // `${OrderDetailStatic?.date}` ?
        workSheet.getRow(9).getCell(1).value = "Pickup Time";
        workSheet
          .getRow(9)
          .getCell(2).value = `${OrderDetailStatic?.pickup_time}`;

        workSheet.getRow(10).getCell(1).value = "Name";
        workSheet.getRow(10).getCell(2).value = `${OrderDetailStatic?.name}`;

        workSheet.getRow(11).getCell(1).value = "Address";
        workSheet.getRow(11).getCell(2).value = `${OrderDetailStatic?.address}`;

        workSheet.getRow(12).getCell(1).value = "Email";
        workSheet
          .getRow(12)
          .getCell(2).value = `${OrderDetailStatic?.user_email}`;

        workSheet.getRow(13).getCell(1).value = "Landline";
        workSheet
          .getRow(13)
          .getCell(2).value = `${OrderDetailStatic?.landline_number}`;

        workSheet.getRow(14).getCell(1).value = "Phone";
        workSheet
          .getRow(14)
          .getCell(2).value = `${OrderDetailStatic?.mobile_number}`;

        // adding styles to order details information rows
        let headerRows = 3;
        while (headerRows < 15) {
          workSheet.getRow(headerRows).getCell(1).font = {
            bold: true,
            size: 13,
          };

          workSheet.getRow(headerRows).getCell(2).font = {
            size: 12,
          };

          headerRows++;
        }

        // adding column keys to add data
        workSheet.columns = tableData.map((obj) => ({
          key: obj.key,
        }));

        // adding table column heads
        workSheet.getRow(workSheet.rowCount + 2).values = tableData.map(
          (obj) => obj.header
        );

        // format option sets into comma separated string
        const formatOptionSet = () => {
          let optionSetArr = "";
          OrderDetailStatic &&
            OrderDetailStatic.order_detail.map(
              (item: OrderListingResponseOrderDetail) => {
                let row = item;
                let textToShow = "";
                let options: AnyObject = {};
                let optionSets: any = [];
                let innerOptions: any = [];
                if (row.options !== "") {
                  options = JSON.parse(row.options);

                  Object.keys(options).forEach((key) => {
                    for (let i = 0; i < options[key].length; i++) {
                      textToShow += options[key][i].name + ",";
                      optionSets.push(options[key][i].name);

                      let inner_options = options[key][i].inner_options;
                      for (let property in inner_options) {
                        for (
                          let j = 0;
                          j < inner_options[property].length;
                          j++
                        ) {
                          innerOptions.push(inner_options[property][j].name);
                        }
                      }
                    }
                  });
                }

                optionSets.map((f: any, j: number) =>
                  innerOptions.length > 0
                    ? (optionSetArr =
                        optionSetArr + `${f}( ${innerOptions.join()} ),`)
                    : (optionSetArr = optionSetArr + `${f},`)
                );
              }
            );
          return optionSetArr;
        };

        // populating data in table rows
        let row: { [x: string]: string | any } = {};
        let setOptionSet = "";
        orderDetailData?.forEach(
          (item: { [x: string]: string | number | any }) => {
            tableData.forEach((obj) => {
              if (obj.key == "options") {
                setOptionSet = item[obj.key];
                if (
                  setOptionSet &&
                  Object.keys(item[obj.key]).length !== 0 &&
                  setOptionSet !== "[]" &&
                  setOptionSet !== "{}"
                ) {
                  row[obj.key] = formatOptionSet();
                  return row[obj.key];
                } else {
                  return (row[obj.key] = "");
                }
              }
              return (row[obj.key] = item[obj.key]);
            });

            // add the computed single row to the table
            workSheet.addRow(row);
          }
        );

        // order details footer information
        let footerRows = workSheet.rowCount + 2;

        workSheet.mergeCells(`B${footerRows}:M${footerRows}`);
        workSheet.mergeCells(`B${footerRows + 1}:M${footerRows + 1}`);
        workSheet.mergeCells(`B${footerRows + 2}:M${footerRows + 2}`);
        workSheet.mergeCells(`B${footerRows + 3}:M${footerRows + 3}`);
        workSheet.mergeCells(`B${footerRows + 4}:M${footerRows + 4}`);

        workSheet.getRow(footerRows).getCell(1).value = "Total Items";
        workSheet
          .getRow(footerRows)
          .getCell(2).value = `${OrderDetailStatic?.order_detail.length}`;

        workSheet.getRow(footerRows + 1).getCell(1).value = "Total Price";
        workSheet
          .getRow(footerRows + 1)
          .getCell(2).value = `${OrderDetailStatic?.total}`;

        workSheet.getRow(footerRows + 3).getCell(1).value = "Tax";
        workSheet
          .getRow(footerRows + 3)
          .getCell(2).value = `${OrderDetailStatic?.tax}`;

        workSheet.getRow(footerRows + 4).getCell(1).value = "Grand Total";
        workSheet
          .getRow(footerRows + 4)
          .getCell(2).value = `${OrderDetailStatic?.grand_total}`;

        workSheet.getRow(footerRows + 4).getCell(2).border = {
          top: { style: "thin" },
          left: { style: "thin" },
          bottom: { style: "thin" },
          right: { style: "thin" },
        };

        let totalFooterRows = footerRows + 5;
        while (footerRows < totalFooterRows) {
          workSheet.getRow(footerRows).getCell(1).font = {
            bold: true,
            size: 15,
          };

          workSheet.getRow(footerRows).getCell(2).font = {
            size: 14,
          };

          workSheet.getRow(footerRows).getCell(2).alignment = {
            vertical: "middle",
            horizontal: "right",
          };

          footerRows++;
        }

        // adding company name at the end of sheet
        let copyRightCell = workSheet.rowCount + 3;

        workSheet.mergeCells(`A${copyRightCell}:M${copyRightCell}`);

        workSheet.getRow(copyRightCell).getCell(1).value =
          "Powered by tossdown.com";

        workSheet.getRow(copyRightCell).getCell(1).font = {
          bold: true,
          size: 13,
        };

        workSheet.getRow(copyRightCell).getCell(1).alignment = {
          vertical: "middle",
          horizontal: "center",
        };

        workSheet.getRow(copyRightCell).getCell(1).border = {
          top: { style: "thick" },
          left: { style: "thick" },
          bottom: { style: "thick" },
          right: { style: "thick" },
        };

        workSheet.getColumn(1).width = 20;

        break;
      }

      default: {
        alert("No data to export!");
        break;
      }
    } //  end of switch statement

    // download the processed file
    const buffer = await workBook.xlsx.writeBuffer();

    saveAs(new Blob([buffer]), `${workBookName}.xlsx`);
  };

  return (
    <>
      {/* Return orders Listing export Button  UI */}
      {exportType === "OrdersList" && (
        <CustomButton
          variant={"contained"}
          color={"secondary"}
          sx={{
            p: "12px 32px",
            ml: "13px",
            height: "44px",
            width: "151px",
          }}
          onClick={fileExport}
        >
          Export Orders
        </CustomButton>
      )}

      {/* Return order details icon button UI */}
      {exportType === "OrderDetail" && (
        <Stack
          direction="row"
          spacing={1}
          sx={{
            cursor: "pointer",
            alignItems: "center",
          }}
          onClick={fileExport}
        >
          <LibraryBooksTwoToneIcon className={classes.libraryBookIcon} />
          <Typography variant="h5" className={classes.excelExportFile}>
            Export Excel File
          </Typography>
        </Stack>
      )}
    </>
  );
};

export default ExcelExport;
