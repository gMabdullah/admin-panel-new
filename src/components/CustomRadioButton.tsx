import React from "react";

import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";

type radioButtonTypes<T extends React.ElementType> = {
  renderAs?: T;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string | SVGSVGElement;
  label?: string;
  options?: { value: string; label: string }[];
  sx?: object;
  row?: boolean;
  showCount?: boolean;
  count?: {
    withImages: number;
    withNoImages: number;
    available: number;
    unAvailable: number;
    availableWithImg: number;
    unAvailableWithImg: number;
    availableWithNoImg: number;
    unAvailableWithNoImg: number;
    displayNone: number;
    displayWeb: number;
    displayPOS: number;
  };
} & React.ComponentPropsWithoutRef<T>;

const radioButtonStyle = {
  "& .MuiFormControlLabel-root": {
    mr: "25px",
  },
  "& .MuiTypography-root": {
    fontSize: "12px",
  },
  "& .MuiRadio-root ": {
    p: "8px",
  },
  "& .Mui-checked": {
    color: "#DB154D !important",
  },
};

const CustomRadioButton = <T extends React.ElementType = "select">({
  onChange,
  value,
  options,
  count,
  row,
  sx,
  showCount,
  ...rest
}: radioButtonTypes<T>): JSX.Element => {
  const displayCount = (option: { label: string; value: string }) => {
    const { name } = rest;
    let countReceived: any = 0;
    if (name == "items") {
      if (option.value == "all_images") {
        // countReceived = count?.withNoImages
      } else if (option.value == "with_images") {
        countReceived = count?.withImages;
      } else if (option.value == "without_images") {
        countReceived = count?.withNoImages;
      }
    } else if (name == "items_stock") {
      if (option.value == "all_of_stock") {
        // countReceived = count?.withNoImages
      } else if (option.value == "in_stock") {
        countReceived = count?.available;
      } else if (option.value == "out_of_stock") {
        countReceived = count?.unAvailable;
      }
    } else if (name == "visibility_on_platform") {
      if (option.value == "all_platforms") {
        // countReceived = count?.withNoImages;
      } else if (option.value == "none") {
        countReceived = count?.displayNone;
      } else if (option.value == "web") {
        countReceived = count?.displayWeb;
      } else if (option.value == "pos") {
        countReceived = count?.displayPOS;
      }
    }
    return countReceived > 0 ? `(${countReceived})` : "";
  };
  return (
    <>
      <FormControl
        sx={{
          ...radioButtonStyle,
          ...sx,
        }}
      >
        <RadioGroup row={row} onChange={onChange} value={value} {...rest}>
          {options?.map<object>((option, index) => (
            <>
              <FormControlLabel
                value={option.value}
                key={index}
                control={<Radio />}
                label={option.label}
              />
              {showCount && displayCount(option)}
            </>
          ))}
        </RadioGroup>
      </FormControl>
    </>
  );
};

export default CustomRadioButton;
