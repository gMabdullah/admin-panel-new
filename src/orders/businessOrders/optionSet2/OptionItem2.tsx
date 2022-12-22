import React, { useContext, useState } from "react";

import { Box, Stack, Typography, IconButton } from "@mui/material";

import { AddCircleOutlined, RemoveOutlined } from "@mui/icons-material";

import { OptionSetContext } from "orders/context/OptionSetContext";
import { replaceItemAtIndexInArray } from "orders/HelperFunctions";

interface setInnerOptionSetProps {
  setInnerOptionSet: React.Dispatch<React.SetStateAction<boolean>>;
}

interface propsReceived {
  parentIndex: number;
  itemIndex: number;
  parentIndex2: number;
  itemIndex2: number;
  item: any;
}

export const OptionItem2 = (props: propsReceived) => {
  const { options, setOptions, selectedOrderContext } =
    useContext(OptionSetContext);
  const [item] = useState(props.item);
  const [parentIndex] = useState(props.parentIndex);
  const [itemIndex] = useState(props.itemIndex);
  const [parentIndex2] = useState(props.parentIndex2);
  const [itemIndex2] = useState(props.itemIndex2);
  const [isInnerOptionToogle, setInnerOptionSetToogle] =
    useState<boolean>(false);

  const currency = selectedOrderContext.currency;

  const onIncrementClicked = () => {
    let quantity =
      options[parentIndex].items[itemIndex].items[parentIndex2].items[
        itemIndex2
      ].quantity;

    let max = options[parentIndex].items[itemIndex].items[parentIndex2].max;
    let totalSelected =
      options[parentIndex].items[itemIndex].items[parentIndex2].totalSelected;
    if (totalSelected < max) {
      quantity += 1;
      totalSelected += 1;
      updateTotalSelectedQuantityAndSelection(totalSelected, quantity, true);
    } else {
      alert("Max Selection Reached");
    }
  };

  const onDecrementClicked = () => {
    let quantity =
      options[parentIndex].items[itemIndex].items[parentIndex2].items[
        itemIndex2
      ].quantity;
    let totalSelected =
      options[parentIndex].items[itemIndex].items[parentIndex2].totalSelected;

    let isSelected = true;
    if (quantity > 0) {
      quantity -= 1;
      totalSelected -= 1;
      if (quantity === 0) {
        isSelected = false;
      }
      updateTotalSelectedQuantityAndSelection(
        totalSelected,
        quantity,
        isSelected
      );
    } else {
      alert("Can't be less than 0");
    }
  };

  const updateTotalSelectedQuantityAndSelection = (
    totalSelected: number,
    quantity: number,
    isSelected: boolean
  ) => {
    let localOptions = options;
    // this need to be updated in options array at index parentindex
    let selectedOption = localOptions[parentIndex];
    // this need to be updated in selectedOptions.items
    let selectedOptionItems = selectedOption.items;
    // this need to be updated in selectedOptionItems at index itemIndex
    let selectedOptionItem = selectedOptionItems[itemIndex];
    // this need to be update in selectedOptionItem.items
    let localOptions2 = selectedOptionItem.items;
    // this need to be update in localOptions2 at index parentIndex2
    let localOption = localOptions2[parentIndex2];
    // this need to be update in local localOption.items
    let localOptionItems = localOption.items;
    // this need to be updated in localOptionItems at index itemIndex2
    let localItem = localOptionItems[itemIndex2];

    localItem.quantity = quantity;
    localItem.isSelected = isSelected;
    localOption.totalSelected = totalSelected;

    localOptionItems = replaceItemAtIndexInArray(
      itemIndex2,
      localItem,
      localOptionItems
    );
    localOption.items = localOptionItems;
    localOptions2 = replaceItemAtIndexInArray(
      parentIndex2,
      localOption,
      localOptions2
    );
    selectedOptionItem.items = localOptions2;
    selectedOptionItems = replaceItemAtIndexInArray(
      itemIndex,
      selectedOptionItem,
      selectedOptionItems
    );
    selectedOption.items = selectedOptionItems;
    localOptions = replaceItemAtIndexInArray(
      parentIndex,
      selectedOption,
      localOptions
    );
    setOptions(localOptions);
  };
  return (
    <>
      <Box
        sx={{
          marginTop: "16px",
          width: "60vw",
          border: "1px solid rgba(0, 0, 0, 0.23)",
          color: "#000000",
          borderRadius: "8px",
          marginBottom: "8px",
        }}
      >
        <Stack
          spacing={2}
          direction="row"
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* 1-  Name and Price */}
          <Stack spacing={12} direction="row" sx={{ marginLeft: "24px" }}>
            <Typography variant={"body1"}> {item.name}</Typography>
          </Stack>
          {/* controls */}
          <Stack spacing={3} direction="row" sx={{ alignItems: "center" }}>
            <Stack spacing={0.4} direction="row" sx={{ alignItems: "center" }}>
              <Typography
                sx={{
                  fontFamily: "Roboto",
                  fontStyle: "normal",
                  fontWeight: "400",
                  fontSize: "10px",
                  lineHeight: "12px",
                  color: "#757575",
                }}
              >
                {currency}
              </Typography>
              <Typography variant={"h4"}>{item.price}</Typography>
            </Stack>
            <IconButton
              color="inherit"
              size="medium"
              onClick={onDecrementClicked}
            >
              <RemoveOutlined
                sx={{
                  boxSizing: "border-box",
                  width: "36px",
                  height: "36px",
                  background: "#F5F5F5",
                  color: "#212121",
                  borderRadius: "2em",
                }}
              />
            </IconButton>

            <Typography variant={"body1"}> {item.quantity}</Typography>

            <IconButton
              color="inherit"
              size="large"
              sx={{ background: "#FFFFFF" }}
              onClick={onIncrementClicked}
            >
              <AddCircleOutlined
                sx={{
                  width: "36px",
                  height: "36px",
                  color: "#DB154D",
                }}
              />
            </IconButton>
          </Stack>
        </Stack>
      </Box>
    </>
  );
};
