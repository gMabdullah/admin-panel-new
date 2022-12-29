import React, { useState, useContext, useEffect } from "react";

import {
  Grid,
  IconButton,
  Modal,
  Typography,
  CardActionArea,
  CardMedia,
  Card,
  Chip,
} from "@mui/material";
import {
  HighlightOffTwoTone as CloseIcon,
  Visibility as PreviewIcon,
  ArrowBackOutlined,
} from "@mui/icons-material";

import MainCard from "components/cards/MainCard";
import TdTextField from "components/TdTextField";
import CustomButton from "components/CustomButton";
import Progress from "components/Progress";
import Notify from "components/Notify";

import { OptionSetContext } from "orders/context/OptionSetContext";
import SelectOptionSet from "./SelectOptionSet";
import useAxios from "axios-hooks";
// import { axios } from "config";

// configure({ axios });

//============================================================

// import useAxios from 'axios-hooks';
// import MainCard from 'components/cards/MainCard';
// import CustomButton from 'components/CustomButton';
// import Notify from 'components/Notify';
// import Progress from 'components/Progress';
// import TdTextField from 'components/TdTextField';
// import { OptionSetContext } from 'orders/context/OptionSetContext';
// import React, { useContext, useEffect, useState } from 'react';
// import {
//     ArrowBackOutlined, HighlightOffTwoTone as CloseIcon, Visibility as PreviewIcon
// } from '@mui/icons-material';
// import {
//     Card, CardActionArea, CardMedia, Chip, Grid, IconButton, Modal, Typography
// } from '@mui/material';
// import SelectOptionSet from './SelectOptionSet';

interface AddEditItemProps {
  setAddEditItemModal: React.Dispatch<React.SetStateAction<boolean>>;
  openAddEditItemModal: boolean;
  getNewItemCallback: (item: ProductResponseItem) => void;
  getEditItemCallback: (item: OrderListingResponseOrderDetail) => void;
  editItemFlag: boolean;
}

const { eatout_id, user_id } = JSON.parse(
  localStorage.getItem("businessInfo")!
);

const AddEditItemModal = ({
  openAddEditItemModal,
  setAddEditItemModal,
  getNewItemCallback,
  getEditItemCallback,
  editItemFlag,
}: AddEditItemProps) => {
  let errorMessage = { quantityField: "" };

  const [imagePreview, setImagePreview] = React.useState(false);
  const [imagePreviewLink, setImagePreviewLink] = React.useState("");
  const { options, setOptions, editAbleItem, setEditAbleItem } =
    useContext(OptionSetContext);
  const [itemIndex, setItemIndex] = React.useState(-1);
  const [itemName, setItemName] = React.useState(
    editAbleItem.length > 0 ? editAbleItem[0].item_name : ""
  );
  const [itemPrice, setItemPrice] = React.useState(
    editAbleItem.length > 0 ? editAbleItem[0].price : ""
  );
  const [itemSearchPreview, setSearchPreview] = useState<ProductResponse>();
  const [itemQuantity, setItemQuantity] = React.useState(
    editAbleItem.length > 0 ? editAbleItem[0].quantity : ""
  );
  const [itemComments, setItemComments] = React.useState(
    editAbleItem.length > 0 ? editAbleItem[0].comment : ""
  );
  const [selectedItem, setSelectedItem] = React.useState({});
  const [searchLoader, setSearchLoader] = useState(false);
  const [fieldError, setFieldError] = useState(errorMessage);
  const [isItemSelected, setItemSelected] = useState(false);
  const [isOptionSetLayer, setOptionSetLayer] = useState<boolean>(false);

  const [notify, setNotify] = useState<boolean>(false);
  const [itemMessage, setItemMessage] = useState("");
  const [itemNotifyType, setItemNotifyType] = useState<
    "success" | "info" | "warning" | "error"
  >("info");

  //======================================= API Calls & Handlers =======================================//

  useEffect(() => {
    if (!editItemFlag) {
      setEditAbleItem([]);
    } else if (editItemFlag) {
      setItemSelected(true);
      setOptionSetLayer(true);
    }
  }, []);

  // API call on searching items (add item)
  const [{}, searchItemAPICall] = useAxios(
    {
      method: "post",
    },
    { manual: true }
  );

  const closeNotify = () => setNotify(false);

  const closeAddEditModal = () => {
    setOptions([]);
    setAddEditItemModal((state) => !state);

    setEditAbleItem([]);
  };

  const getSelectedOptionApiFormat = () => {
    let selectedOptionsApiFormat: any = {};

    for (let i = 0; i < options.length; i++) {
      let option = options[i];
      let selectedOptions = [];
      for (let j = 0; j < option.items.length; j++) {
        let item = option.items[j];
        if (item.isSelected === true) {
          let itemToPush = {};
          if (item.hasInnerOptions) {
            let selectedInnerOptionsApiFormat: any = {};
            for (let k = 0; k < item.items.length; k++) {
              let selectedInnerOptions = [];
              let innerOption = item.items[k];
              for (let l = 0; l < innerOption.items.length; l++) {
                let innerItem = innerOption.items[l];
                if (innerItem.isSelected === true) {
                  let innerItemToPush = {
                    name: innerItem.name,
                    quantity: innerItem.quantity,
                    price: innerItem.price,
                  };
                  selectedInnerOptions.push(innerItemToPush);
                }
              }
              if (selectedInnerOptions.length > 0) {
                let key = innerOption.name;

                selectedInnerOptionsApiFormat[key] = selectedInnerOptions;
              }
            }

            itemToPush = {
              name: item.name,
              quantity: item.quantity,
              price: item.price,
              weight: item.weight,
              inner_options: selectedInnerOptionsApiFormat,
            };
          } else {
            itemToPush = {
              name: item.name,
              quantity: item.quantity,
              price: item.price,
              weight: item.weight,
              inner_options: {},
            };
          }

          selectedOptions.push(itemToPush);
        }
      }
      if (selectedOptions.length > 0) {
        let key = option.name;

        selectedOptionsApiFormat[key] = selectedOptions;
      }
    }
    return selectedOptionsApiFormat;
  };

  const getSelectedOptionSetsDetails = () => {
    let selectedOptionSetsValidityDetails = options.map(
      (option: any, i: number) => ({
        name: option.name,
        max: option.max,
        min: option.min,
        weight: option.weight,
        totalSelected: option.totalSelected,
        required: option.required,
      })
    );
    return selectedOptionSetsValidityDetails;
  };

  const isValidOptionSetsSelected = () => {
    let selectedOptionSetsDetails = getSelectedOptionSetsDetails();
    let status = {
      isValid: true,
      message: "",
    };
    // TODO: Improve this
    for (let i = 0; i < selectedOptionSetsDetails.length; i++) {
      let obj = selectedOptionSetsDetails[i];
      if (obj.required) {
        if (parseInt(obj.totalSelected) < parseInt(obj.min)) {
          status = {
            isValid: false,
            message: obj.name + " is required (Min = " + obj.min + " )",
          };
          return status;
        }
      }
    }

    return status;
  };

  const addEditItemClick = () => {
    // checking itemIndex so that we came to know that at least 1 item is selected
    if (itemQuantity && parseInt(itemQuantity) > 0) {
      if (!editItemFlag && itemIndex === -1) {
        // this if condition is applicable in case of adding a new Item
        // checks if we are adding an item but no item is selected
        setItemMessage("No item selected");
        setItemNotifyType("error");
        setNotify(true);
        return;
      }

      const status = isValidOptionSetsSelected();
      if (status.isValid) {
      }

      if (!editItemFlag) {
        //case of adding new item
        let newItem = itemSearchPreview?.items[itemIndex];

        if (newItem) {
          newItem.quantity = itemQuantity;
          newItem.comment = itemComments;
          newItem.options = JSON.stringify(getSelectedOptionApiFormat());

          getNewItemCallback(newItem);
        }
      } else {
        // case of editing item
        let editableItem = editAbleItem[0];

        editableItem.quantity = itemQuantity;
        editableItem.comment = itemComments;
        editableItem.options = JSON.stringify(getSelectedOptionApiFormat());

        getEditItemCallback(editableItem);
      }
    } else {
      setFieldError({
        ...fieldError,
        quantityField: "Quantity must be greater than zero",
      });
      return;
    }
    closeAddEditModal();
  };

  let timeOut: NodeJS.Timeout;

  const imagePreviewModalHandler = (imageLink: string) => {
    setImagePreview((state) => !state);

    setImagePreviewLink(imageLink);
  };

  const handleSearchChange = async (e: { target: { value: string } }) => {
    clearTimeout(timeOut);

    timeOut = setTimeout(async () => {
      setSearchLoader(true);

      // API call on searching items (add item)
      const { data } = await searchItemAPICall({
        url: `products?business_id=${eatout_id}&types=0&menu_type_id=0&offset=0&num=6&categories=0&brands=0&menu_item=0&query=${e.target.value}&attributes=1&source=biz&admin_id=${user_id}`,
      });

      data && setSearchPreview(data);
      setSearchLoader(false);
    }, 1000);
  };

  const selectedItemHandler = (item: any, index: number) => {
    // check if item have option sets
    let hasOptionSet = false;
    if (item.options.length > 0) {
      setOptions(item.options);
      hasOptionSet = true;
    }
    setItemIndex(index);
    setSelectedItem(item);
    setItemName(item.name);
    setItemPrice(item.price);
    setItemSelected(true);
    setOptionSetLayer(hasOptionSet);
  };

  const handleCommentChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setItemComments(e.target.value);
  };

  const handleQuantityChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setItemQuantity(e.target.value);
    setFieldError({ ...fieldError, quantityField: "" });
  };

  const backToSearchItem = () => {
    setOptionSetLayer(false);
    setItemSelected(false);
  };

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
      <Modal
        sx={{ overflow: "auto" }}
        open={openAddEditItemModal}
        onClose={closeAddEditModal}
      >
        <MainCard
          dividerSX={{ m: "0px 0px 33px 0px !important" }}
          headerSX={{ p: "unset !important", mb: "16px" }}
          contentSX={{
            "& .MuiCardContent-root": {
              p: "unset !important",
            },
            m: "unset",
            p: "unset !important",
          }}
          sx={{
            position: "absolute",
            m: "unset",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "65vw",
            p: "40px",
            border: "none",
          }}
          title={
            <Grid container>
              <Grid
                item
                xs={12}
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Grid
                  item
                  xs={10}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {!isOptionSetLayer ? (
                    <>
                      <Typography
                        variant="h3"
                        sx={{
                          width: "100%",
                          maxWidth: "110px",
                          fontFamily: "Roboto",
                          fontStyle: "normal",
                          fontWeight: 600,
                          fontSize: "24px",
                          color: "#212121",
                          display: "flex",
                        }}
                      >
                        {editItemFlag === true ? "Edit Item" : "Add Item"}
                      </Typography>
                      {!editItemFlag && searchLoader && (
                        <Progress type="circle" />
                      )}
                    </>
                  ) : (
                    <>
                      <IconButton
                        onClick={backToSearchItem}
                        sx={{ p: "unset", mr: "11px" }}
                      >
                        <ArrowBackOutlined />
                      </IconButton>
                      <Typography variant={"h3"}>{itemName}</Typography>
                    </>
                  )}
                </Grid>

                <Grid
                  item
                  xs={2}
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center",
                  }}
                >
                  <IconButton onClick={closeAddEditModal} sx={{ p: "unset" }}>
                    <CloseIcon htmlColor="#616161" fontSize="large" />
                  </IconButton>
                </Grid>
              </Grid>
            </Grid>
          }
        >
          {isItemSelected ? (
            isOptionSetLayer && <SelectOptionSet />
          ) : (
            <>
              {!editItemFlag && (
                <Grid container>
                  <Grid item xs={12}>
                    <Grid sx={{ mb: "32px" }}>
                      <TdTextField
                        type="search"
                        placeholder="Search Item"
                        Adornment
                        onChange={handleSearchChange}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              )}
              <Grid
                container
                sx={{ mb: "32px" }}
                spacing={{ xs: 1 }}
                columns={{ xs: 2 }}
              >
                {itemSearchPreview &&
                  itemSearchPreview?.items.map((item, cardIndex) => (
                    <Grid
                      item
                      xs={1}
                      key={cardIndex}
                      sx={{
                        p: "8px 0px 0px  8px !important",
                      }}
                    >
                      <Card
                        sx={{
                          background: "#FFFFFF",
                          border: "1px solid rgba(0, 0, 0, 0.23)",
                          borderRadius: "8px",
                          display: "flex",
                        }}
                      >
                        <Grid container sx={{ position: "relative" }}>
                          <CardMedia
                            component="img"
                            image={item.image}
                            alt="Burger"
                            sx={{
                              height: "56px",
                              width: "56px",
                              borderRadius: "8px",
                              m: "8px 0px 8px 8px",
                            }}
                          />

                          <IconButton
                            sx={{
                              position: "absolute",
                              left: "25%",
                              top: "21%",
                              color: "#FFFFFF",
                            }}
                            onClick={() => imagePreviewModalHandler(item.image)}
                          >
                            <PreviewIcon />
                          </IconButton>
                        </Grid>

                        <CardActionArea
                          onClick={() => selectedItemHandler(item, cardIndex)}
                        >
                          <Grid
                            item
                            xs={12}
                            sm
                            container
                            sx={{
                              justifyContent: "space-between",
                              alignItems: "center",
                            }}
                          >
                            <Grid
                              item
                              xs
                              container
                              direction="column"
                              spacing={2}
                            >
                              <Grid item xs>
                                <Typography
                                  variant="body1"
                                  sx={{
                                    ml: "12px",
                                    mb: "6px",
                                    color: "#757575",
                                  }}
                                >
                                  {item.name}
                                </Typography>
                                <Typography
                                  sx={{
                                    ml: "12px",
                                    fontFamily: "Roboto",
                                    fontStyle: "normal",
                                    fontWeight: 700,
                                    fontSize: "16px",
                                    color: "#212121",
                                  }}
                                >
                                  {item.price}
                                </Typography>
                              </Grid>
                            </Grid>

                            <Grid item>
                              <Chip
                                label={`${
                                  item.status === "0"
                                    ? "Available"
                                    : "Not Available"
                                }`}
                                sx={{
                                  color: `${
                                    item.status === "0" ? "#00C853" : "#673AB7"
                                  }`,
                                  background: `${
                                    item.status === "0" ? "#B9F6CA" : "#EDE7F6"
                                  }`,
                                  alignItems: "center",
                                  p: "7px 15px",
                                  mr: "16px",
                                }}
                              />
                            </Grid>
                          </Grid>
                        </CardActionArea>
                      </Card>
                    </Grid>
                  ))}
              </Grid>
            </>
          )}

          <Typography
            variant={"h3"}
            sx={{
              marginBottom: "24px",
              fontWeight: 700,
              color: "#000000",
            }}
          >
            Item Details
          </Typography>
          <Grid container sx={{ mb: "32px" }}>
            <Grid item xs={12}>
              <Grid container sx={{ mb: "24px" }}>
                <Grid item xs={12} sx={{ display: "flex" }}>
                  <Grid item xs={6} sx={{ mr: "8px" }}>
                    <TdTextField
                      disabled={true}
                      label="Name"
                      value={itemName}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TdTextField
                      disabled={true}
                      label="Price"
                      value={itemPrice}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={12} sx={{ display: "flex" }}>
                  <Grid item xs={6} sx={{ mr: "8px" }}>
                    <TdTextField
                      required={true}
                      value={itemQuantity}
                      type="number"
                      label="Quantity"
                      onChange={handleQuantityChange}
                      error={fieldError.quantityField === "" ? false : true}
                      helperText={fieldError.quantityField}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TdTextField
                      value={itemComments}
                      label="Comment"
                      onChange={handleCommentChange}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid container>
            <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
              }}
            >
              <CustomButton
                variant={"contained"}
                color={"secondary"}
                onClick={addEditItemClick}
                sx={{
                  p: "13px 43px",
                  fontFamily: "Roboto",
                  fontStyle: "normal",
                  fontWeight: 500,
                  fontSize: "13px",
                }}
              >
                {editItemFlag === true ? "Update" : "Add Item"}
              </CustomButton>
            </Grid>
          </Grid>
        </MainCard>
      </Modal>

      <Modal open={imagePreview} onClose={() => setImagePreview(false)}>
        <Card
          sx={{
            position: "absolute",
            m: "unset",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <CardMedia
            component="img"
            image={imagePreviewLink}
            alt="Burger"
            sx={{
              height: "400px",
              width: "400px",
              borderRadius: "8px",
              m: "10px",
            }}
          />
        </Card>
      </Modal>
    </>
  );
};
export default AddEditItemModal;
