import { useContext, useState } from "react";
import { Box, Stack, Typography, IconButton, Modal, Grid } from "@mui/material";
import {
  AddCircleOutlined,
  ArrowBackOutlined,
  RemoveOutlined,
  HighlightOffTwoTone as CloseIcon,
} from "@mui/icons-material";

import MainCard from "components/cards/MainCard";

import SelectOptionSet2 from "../optionSet2/SelectOptionSet2";
import { OptionSetContext } from "orders/context/OptionSetContext";
import { replaceItemAtIndexInArray } from "orders/HelperFunctions";

interface propsReceived {
  parentIndex: number;
  itemIndex: number;
  item: any;
}

export const OptionItem1 = (props: propsReceived) => {
  const {
    options,
    setOptions,
    indexOptionSet,
    setIndexOptionSet,
    optionSetEdit,
    setOptionSetEdit,
    selectedOrderContext,
  } = useContext(OptionSetContext);

  const [item] = useState(props.item);
  const [itemIndex] = useState(props.itemIndex);
  const [parentIndex] = useState(props.parentIndex);
  const [option, setOption] = useState(options[parentIndex]);
  const [isInnerOption, setInnerOptionSet] = useState<boolean>(false);
  const currency = selectedOrderContext.currency;
  const hasInnerOptions = () => {
    if (item.items.length > 0) {
      return true;
    }
    return false;
  };

  const onIncrementClicked = () => {
    setOptionSetEdit(true);

    let quantity = options[parentIndex].items[itemIndex].quantity;
    let max = options[parentIndex].max;
    let totalSelected = options[parentIndex].totalSelected;
    if (totalSelected < max) {
      if (hasInnerOptions()) {
        if (quantity < 1) {
          // it means inner option set have been selected
          toggleInnerOptionModal();
        } else {
          quantity += 1;
          totalSelected += 1;
          updateTotalSelectedQuantityAndSelection(
            totalSelected,
            quantity,
            true
          );
          // auto slide to next option set
          if (parseInt(totalSelected) === parseInt(max)) {
            let currentSlide = indexOptionSet;
            let totalSlides = options.length;
            if (currentSlide < totalSlides - 1) {
              setIndexOptionSet((currentSlide + 1) % totalSlides);
            }
          }
        }
      } else {
        quantity += 1;
        totalSelected += 1;
        updateTotalSelectedQuantityAndSelection(totalSelected, quantity, true);
        // auto slide to next option set
        if (parseInt(totalSelected) === parseInt(max)) {
          let currentSlide = indexOptionSet;
          let totalSlides = options.length;
          if (currentSlide < totalSlides - 1) {
            setIndexOptionSet((currentSlide + 1) % totalSlides);
          }
        }
      }
    }
  };

  const updateTotalSelectedQuantityAndSelection = (
    totalSelected: number,
    quantity: number,
    isSelected: boolean
  ) => {
    let localOptions = options;
    let localOption = options[parentIndex];
    let localItems = options[parentIndex].items;
    let localItem = options[parentIndex].items[itemIndex];

    localItem.quantity = quantity;
    localItem.isSelected = isSelected;
    localOption.totalSelected = totalSelected;

    localItems = replaceItemAtIndexInArray(itemIndex, localItem, localItems);
    localOption.items = localItems;
    localOptions = replaceItemAtIndexInArray(parentIndex, localOption, options);
    setOptions(localOptions);
  };

  const onDecrementClicked = () => {
    setOptionSetEdit(true);
    let quantity = options[parentIndex].items[itemIndex].quantity;
    let totalSelected = options[parentIndex].totalSelected;

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
    }
  };

  const incrementAfterInnerOptionsSelected = () => {
    var quantity = options[parentIndex].items[itemIndex].quantity;
    var max = options[parentIndex].max;
    var totalSelected = options[parentIndex].totalSelected;
    if (totalSelected < max) {
      quantity += 1;
      totalSelected += 1;
      updateTotalSelectedQuantityAndSelection(totalSelected, quantity, true);
    }
  };

  const toggleInnerOptionModal = () => {
    setInnerOptionSet((toggle) => !toggle);
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
            <Typography variant={"body1"}> {item.name} </Typography>
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
            {/* Add button */}
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
            {/* Remove button */}
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
      <Modal //Inner option set Modal
        open={isInnerOption}
        onClose={toggleInnerOptionModal}
      >
        <MainCard
          sx={{
            position: "absolute",
            m: "unset",
            top: "40%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "65vw",
          }}
          title={
            <Grid container sx={{ mb: "-9px" }}>
              <Grid
                item
                xs={6}
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <ArrowBackOutlined onClick={toggleInnerOptionModal} />
                <span>Inner Option Sets</span>
              </Grid>
              <Grid
                item
                xs={6}
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                }}
              >
                <IconButton
                  onClick={toggleInnerOptionModal}
                  size="large"
                  sx={{ p: "unset" }}
                >
                  <CloseIcon fontSize="medium" />
                </IconButton>
              </Grid>
            </Grid>
          }
        >
          <SelectOptionSet2
            itemIndex={itemIndex}
            parentIndex={parentIndex}
            toggleInnerOptionModal={toggleInnerOptionModal}
            incrementAfterInnerOptionsSelected={
              incrementAfterInnerOptionsSelected
            }
          />
        </MainCard>
      </Modal>
    </>
  );
};
