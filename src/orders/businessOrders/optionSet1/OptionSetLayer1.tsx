import React, { useContext, useEffect, useState } from "react";

import { Typography } from "@mui/material";

import { getMinMaxAndRequired } from "../../HelperFunctions";
import { OptionItem1 } from "./OptionItem1";
import { OptionSetContext } from "orders/context/OptionSetContext";
import { replaceItemAtIndexInArray } from "orders/HelperFunctions";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

interface propsReceived {
  parentIndex: number;
  indexOptionSet: number;
}

export const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      <Typography>{children}</Typography>
    </div>
  );
};

const OptionSetLayer1 = ({ parentIndex, indexOptionSet }: propsReceived) => {
  const {
    options,
    setOptions,
    setIndexOptionSet,
    editAbleItem,
    setEditAbleItem,
  } = useContext(OptionSetContext);
  const [option, setOption] = useState(options[parentIndex]);

  useEffect(() => {
    // Edit case
    let selectedOptionSet: any = {};
    let selectedInnerOptionset: any = {};

    if (editAbleItem[0] && editAbleItem[0].options) {
      let options2 = editAbleItem[0].options;

      let optionsObj: any = {};
      if (options2 !== "") {
        optionsObj = JSON.parse(options2);
        Object.keys(optionsObj).forEach((key) => {
          let parent = key;
          let keys: any = {};
          selectedInnerOptionset = {};
          for (let i = 0; i < optionsObj[key].length; i++) {
            let optionSetName = optionsObj[key][i].name;
            let optionSetQuantity = optionsObj[key][i].quantity;
            let innerOptionSet = optionsObj[key][i].inner_options;
            if (innerOptionSet !== "") {
              let innerKeys: any = {};
              for (const innerKey in innerOptionSet) {
                innerKeys = {};
                innerOptionSet[innerKey].map((innerOpt: any) => {
                  let innerName = innerOpt.name;
                  let innerQuantity = innerOpt.quantity;
                  innerKeys[innerName] = innerQuantity;
                });
                selectedInnerOptionset[innerKey] = innerKeys;
              }
            }
            keys[optionSetName] = optionSetQuantity;
          }
          selectedOptionSet[parent] = { ...keys, ...selectedInnerOptionset };
        });
      }
    }
    let localOption = options[parentIndex];
    const localOptionItems = option.items.map((item: any, i: number) => {
      const localOptionName = option.name;
      let quantity: number | string = 0;
      let isSelected = false;

      if (selectedOptionSet[localOptionName] !== undefined) {
        let selectedOptionsObject = selectedOptionSet[localOptionName];
        if (selectedOptionsObject[option.items[i].name] !== undefined) {
          quantity = selectedOptionsObject[option.items[i].name];
          isSelected = true;

          for (const obj in selectedOptionSet[localOptionName]) {
            if (typeof selectedOptionSet[localOptionName][obj] === "object") {
              localOption.items[i].items[0].items.map((innerItem: any) => {
                if (
                  typeof selectedOptionSet[localOptionName][obj][
                    innerItem.name
                  ] !== "undefined"
                ) {
                  innerItem.isSelected = true;
                }
              });
            }
          }
          // updating total selected
          let minMaxRequiredObj = getMinMaxAndRequired(localOption);

          let totalSelected = localOption.totalSelected;
          localOption.max = minMaxRequiredObj.max;
          localOption.min = minMaxRequiredObj.min;
          localOption.required = minMaxRequiredObj.required;
          // TODO: make sure totalSelected and quantity must be numbers while adding to  each other
          localOption.totalSelected =
            parseInt(totalSelected) +
            (typeof quantity === "string" ? parseInt(quantity) : quantity);
        } else {
          quantity = 0;
          isSelected = false;
        }
      } else {
        quantity = 0;
        isSelected = false;
      }
      let localItem = option.items[i];

      localItem.isSelected = isSelected;
      // TODO: make sure totalSelected and quantity must be numbers while adding to each other
      localItem.quantity =
        typeof quantity === "string" ? parseInt(quantity) : quantity;
      if (localItem.items.length > 0) {
        localItem.hasInnerOptions = true;
      } else {
        localItem.hasInnerOptions = false;
      }
      return localItem;
    });

    localOption.items = localOptionItems;
    // updating options for local usage
    setOption(localOption);

    let localOptions = replaceItemAtIndexInArray(
      parentIndex,
      localOption,
      options
    );

    setOptions(localOptions);
  }, []);
  return (
    <>
      {option &&
        option.items.map((item: any, index1: number) => {
          return (
            <>
              <TabPanel value={indexOptionSet} index={index1}>
                <OptionItem1
                  parentIndex={parentIndex}
                  itemIndex={index1}
                  item={item}
                />
              </TabPanel>
            </>
          );
        })}
    </>
  );
};

export default OptionSetLayer1;
