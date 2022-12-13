import React from "react";

import { makeStyles, withStyles } from "@mui/styles";

import { DateRangePicker } from "rsuite";
import "rsuite/dist/rsuite.css";
import "./DatePicker.css";

import {
  addMonths,
  endOfMonth,
  startOfMonth,
  addDays,
  subDays,
} from "date-fns";

export declare type DateRange = [Date, Date];

type DatePickerRange<T extends React.ElementType> = {
  onOk?: (date: DateRange, event: React.SyntheticEvent) => void;
  onChange: (date: string[], event?: React.SyntheticEvent) => void;
} & React.ComponentPropsWithoutRef<T>;

const CSSDateRangePicker = withStyles({
  root: () => ({
    "& .rs-picker-daterange .rs-picker-toggle.rs-btn .rs-picker-toggle-caret ":
      {
        color: "#DB154D !important",
        width: "15px !important",
        height: "16px !important",
      },
    "& .rs-picker-menu": {
      marginTop: "20px !important",
      zIndex: "9999 !important",
    },
  }),
})(DateRangePicker);

const useStyles = makeStyles(() => ({
  rootClasses: {
    "& .rs-picker-menu": {
      marginTop: "20px !important",
      zIndex: "-1 !important",
    },
    "& .rs-anim-fade.rs-anim-in.rs-picker-daterange-menu.rs-picker-menu.placement-bottom-start":
      {
        marginTop: "20px !important",
      },
    width: 330,
    background: " #FAFAFA",

    borderRadius: "8px",
    "& .rs-picker-toggle-caret": {
      color: "#DB154D !important",
      width: "15px !important",
      height: "16px !important",
      padding: "12px 16px important",
    },
  },
}));

const predefinedRanges = [
  {
    label: "Last 24-48 hours",
    value: [subDays(new Date(), 2), new Date()],
    placement: "left",
  },
  {
    label: "Today",
    value: [new Date(), new Date()],
    placement: "left",
  },

  {
    label: "Yesterday",
    value: [addDays(new Date(), -1), addDays(new Date(), -1)],
    placement: "left",
  },

  {
    label: "Last 7 days",
    value: [subDays(new Date(), 6), new Date()],
    placement: "left",
  },
  {
    label: "Last 30 days",
    value: [subDays(new Date(), 29), new Date()],
    placement: "left",
  },
  {
    label: "This month",
    value: [startOfMonth(new Date()), new Date()],
    placement: "left",
  },
  {
    label: "Last month",
    value: [
      startOfMonth(addMonths(new Date(), -1)),
      endOfMonth(addMonths(new Date(), -1)),
    ],
    placement: "left",
  },
  {
    label: "This year",
    value: [new Date(new Date().getFullYear(), 0, 1), new Date()],
    placement: "left",
  },
];

const CustomDateRangePicker = <T extends React.ElementType = "input">({
  onOk,
  onChange,
}: DatePickerRange<T>): JSX.Element => {
  const classes = useStyles();

  return (
    <CSSDateRangePicker
      ranges={predefinedRanges}
      defaultValue={predefinedRanges[0].value}
      className={classes.rootClasses}
      onOk={onOk}
      cleanable={false}
      onChange={onChange}
      style={{
        ".rs-picker-menu ": {
          marginTop: "20px !important",
          zIndex: "-1 !important",
        },
      }}
    />
  );
};
export default CustomDateRangePicker;
