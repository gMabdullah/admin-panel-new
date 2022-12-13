import { useContext, useState, SyntheticEvent, useEffect } from "react";

import { Typography, Grid, Tab, Tabs } from "@mui/material";

import CustomButton from "uiComponent/CustomButton";

import { getHeaderString, getMinMaxAndRequired } from "../../HelperFunctions";
import OptionSetLayer2 from "./OptionSetLayer2";
import SwipeableViews from "react-swipeable-views";
import { replaceItemAtIndexInArray } from "orders/HelperFunctions";
import { OptionSetContext } from "orders/context/OptionSetContext";

// receive props
interface propsReceived {
  parentIndex: number;
  itemIndex: number;
  toggleInnerOptionModal: () => void;
  incrementAfterInnerOptionsSelected: () => void;
}

const SelectOptionSet2 = (props: propsReceived) => {
  const { options, setOptions } = useContext(OptionSetContext);
  const [tabIndex, setTabIndex] = useState(0);
  const [itemIndex] = useState(props.itemIndex);
  const [parentIndex] = useState(props.parentIndex);
  const [isOptionsUpdated, setIsOptionsUpdated] = useState<boolean>(false);

  useEffect(() => {
    let localOptions = options;
    // this need to be updated in options array at index parent index
    let selectedOption = localOptions[parentIndex];
    // this need to be updated in selectedOptions.items
    let selectedOptionItems = selectedOption.items;
    // this need to be updated in selectedOptionItems at index itemIndex
    let selectedOptionItem = selectedOptionItems[itemIndex];
    // this need to be update in selectedOptionItem.items
    let localOptions2 = selectedOptionItem.items;

    let localOptionsArray = [];
    for (let i = 0; i < localOptions2.length; i++) {
      let localOption = localOptions2[i];
      let minMaxRequiredObj = getMinMaxAndRequired(localOption);
      localOption.max = minMaxRequiredObj.max;
      localOption.min = minMaxRequiredObj.min;
      localOption.required = minMaxRequiredObj.required;
      localOption.totalSelected = 0;
      localOptionsArray.push(localOption);
    }

    localOptions2 = localOptionsArray;
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
  }, []);

  const getSelectedOptionSetsDetails = () => {
    let selectedOptionSetsValidityDetails = [];

    for (
      let i = 0;
      i < options[parentIndex].items[itemIndex].items.length;
      i++
    ) {
      let option = options[parentIndex].items[itemIndex].items[i];
      selectedOptionSetsValidityDetails.push({
        name: option.name,
        max: option.max,
        min: option.min,
        totalSelected: option.totalSelected,
        required: option.required,
      });
    }
    return selectedOptionSetsValidityDetails;
  };

  const isValidOptionSetsSelected = () => {
    let selectedOptionSetsDetails = getSelectedOptionSetsDetails();
    let status = {
      isValid: true,
      message: "",
    };

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

  const onAddInnerOptionSetsClicked = () => {
    let result = isValidOptionSetsSelected();

    if (result.isValid === true) {
      props.incrementAfterInnerOptionsSelected();
      props.toggleInnerOptionModal();
    } else {
      alert(result.message);
    }
  };
  const handleTabChange = (event: SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  const handleSlideChange = (index: number) => {
    setTabIndex(index);
  };

  const getTabsContent = (index: number) => {
    if (!isOptionsUpdated) {
      const optionSetReceived = options.map((option: OptionSetProps) => {
        let minMaxRequiredObj = getMinMaxAndRequired(option);
        option.max = minMaxRequiredObj.max;
        option.min = minMaxRequiredObj.min;
        option.required = minMaxRequiredObj.required;
        option.totalSelected = 0;
        return option;
      });
      setOptions(optionSetReceived);
      setIsOptionsUpdated(true);
    }

    return (
      <>
        <OptionSetLayer2
          parentIndex={parentIndex}
          itemIndex={itemIndex}
          parentIndex2={index}
        />
      </>
    );
  };

  return (
    <>
      <Tabs
        value={tabIndex}
        indicatorColor="primary"
        onChange={handleTabChange}
        sx={{
          "& .MuiTabs-flexContainer": {
            borderBottom: "none",
          },
          "& .MuiTabs-indicator": {
            height: "4px",
            background: "#24335E",
            borderRadius: "0 0 4px 4px",
          },
        }}
        aria-label="product description tabs example"
        variant="scrollable"
      >
        {/* Print Tabs First */}
        {options[parentIndex].items[itemIndex].items.map(
          (option: any, index: number) => {
            return (
              <Tab
                sx={{
                  width: "186px",
                  height: "74px",
                  background: "#F5F5F5",
                  borderRadius: "8px",
                  marginRight: "6px",
                  textAlign: "left",
                  alignItems: "unset",
                }}
                key={index}
                label={
                  <>
                    <Typography
                      sx={{
                        fontFamily: "Roboto",
                        fontStyle: "normal",
                        fontWeight: 700,
                        fontSize: "14px",
                        lineHeight: "20px",
                        color: "#212121",
                      }}
                    >
                      {option.name}
                    </Typography>
                    <Typography
                      sx={{
                        fontFamily: "Roboto",
                        fontStyle: "normal",
                        fontWeight: 400,
                        fontSize: "12px",
                        lineHeight: "20px",
                        color: "#616161",
                      }}
                    >
                      {getHeaderString(getMinMaxAndRequired(option))}
                    </Typography>
                  </>
                }
              />
            );
          }
        )}
      </Tabs>
      <SwipeableViews
        index={tabIndex}
        onChangeIndex={handleSlideChange}
        enableMouseEvents
      >
        {/* Print Tabs content then */}
        {options[parentIndex].items[itemIndex].items.map(
          (option: any, index: number) => (
            <div key={index}>{getTabsContent(index)}</div>
          )
        )}
      </SwipeableViews>
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
          onClick={onAddInnerOptionSetsClicked}
          sx={{
            alignContent: "right",
            p: "12px 29.5px",
            fontFamily: "Roboto",
            fontStyle: "normal",
            fontWeight: 500,
            fontSize: "13px",
            mt: "32px",
            mb: "40px",
          }}
        >
          Done
        </CustomButton>
      </Grid>
    </>
  );
};

export default SelectOptionSet2;
