import React, { useContext, useEffect, useState } from "react";

import { Typography } from "@mui/material";

import { OptionItem2 } from "./OptionItem2";
import { OptionSetContext } from "orders/context/OptionSetContext";
import { replaceItemAtIndexInArray } from "orders/HelperFunctions";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

interface propsReceived {
  parentIndex: number;
  itemIndex: number;
  parentIndex2: number;
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

const OptionSetLayer2 = (props: propsReceived) => {
  const { options, setOptions, indexOptionSet, setIndexOptionSet } =
    useContext(OptionSetContext);

  const [parentIndex, setParentIndex] = useState(props.parentIndex);
  const [parentIndex2, setParentIndex2] = useState(props.parentIndex2);
  const [itemIndex, setItemIndex] = useState(props.itemIndex);

  const [option, setOption] = useState(
    options[parentIndex].items[itemIndex].items[parentIndex2]
  );
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
    // this need to be update in localOptions2 at index parentIndex2
    let localOption = localOptions2[parentIndex2];

    let localItemsArray = [];

    for (let i = 0; i < localOption.items.length; i++) {
      let localItem = localOption.items[i];

      localItem.isSelected = false;
      localItem.quantity = 0;

      localItemsArray.push(localItem);
    }
    localOption.items = localItemsArray;
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
    // updating options for local usage
    setOption(localOption);
  }, []);

  return (
    <>
      {option.items.map((item: any, index1: number) => (
        <TabPanel value={indexOptionSet} index={index1}>
          <OptionItem2
            parentIndex={parentIndex}
            itemIndex={itemIndex}
            itemIndex2={index1}
            parentIndex2={parentIndex2}
            item={item}
          />
        </TabPanel>
      ))}
    </>
  );
};

export default OptionSetLayer2;
