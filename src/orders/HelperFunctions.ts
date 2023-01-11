export const convertMinutesInToHours = (mins: number) => {
  if (mins === 0) return;

  const numberOfHours = Math.floor(mins) / 60;
  const days = Math.floor(numberOfHours / 24);
  const remainder = numberOfHours % 24;
  const hours = Math.floor(remainder);
  const minutes = Math.floor(60 * (remainder - hours));
  // if less than 1 Day/ 24 hours then only show Hours and Minutes
  if (days < 1) {
    // if less than Hour return only Minutes
    if (hours < 1) {
      return `${minutes} min(s)`;
    }
    return `${hours} hr(s) ${minutes} min(s)`;
  } else {
    // show only days and minutes if hour is less than 1
    if (hours < 1) {
      return `${days} day(s) ${minutes} min(s)`;
    }
    // return All days
    return `${days} day(s) ${hours} hr(s) and ${minutes} min(s)`;
  }
};

export const replaceItemAtIndexInArray = (
  index: number,
  item: any,
  itemArray: any
) => {
  const newData = [
    ...itemArray.slice(0, index),
    item,
    ...itemArray.slice(index + 1),
  ];
  return newData;
};

export const toCapitalizeFirstLetter = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

// Throw error message of min and  max required
export const getHeaderString = (minMaxOptionalObject: OptionSetProps) => {
  let strToReturn = "";
  if (minMaxOptionalObject.required) {
    strToReturn += "Required";
  } else {
    strToReturn += "Optional";
  }
  if (minMaxOptionalObject.min === "0") {
    strToReturn += " Max = " + minMaxOptionalObject.max;
  } else {
    strToReturn +=
      " Min = " +
      minMaxOptionalObject.min +
      ", Max = " +
      minMaxOptionalObject.max;
  }
  return strToReturn;
};

// Get Min Max for Option set
export const getMinMaxAndRequired = (optionHead: any) => {
  // if(optionHead === undefined) return
  const minQty = optionHead.min_quantity;
  const qty = optionHead.quantity;
  let objToReturn: ReturnObjProp = {
    min: "",
    max: "",
    required: "",
    optional: "",
  };
  // optional
  if (minQty === "0") {
    if (qty === "0" || qty === "") {
      objToReturn = {
        min: 0,
        max: optionHead.items && optionHead.items.length,
        required: false,
      };
    } else {
      objToReturn = {
        min: 0,
        max: qty,
        required: false,
      };
    }
  } // requried
  else {
    if (minQty === "") {
      if (qty == "0") {
        objToReturn = {
          min: optionHead.items && optionHead.items.length,
          max: optionHead.items && optionHead.items.length,
          required: true,
        };
      } else {
        objToReturn = {
          min: qty,
          max: qty,
          required: true,
        };
      }
    } else {
      if (qty === "0" || qty === "") {
        objToReturn = {
          min: minQty,
          max: optionHead.items && optionHead.items.length,
          required: true,
        };
      } else {
        objToReturn = {
          min: minQty,
          max: qty,
          required: true,
        };
      }
    }
  }

  return objToReturn;
};
export const getLocalStorage = () => {
  const { eatout_id, user_id } = JSON.parse(
    localStorage.getItem("businessInfo")!
  );
  return { eatout_id, user_id };
};
// clear local storage on logout
export const clearStorage = () => {
  localStorage.removeItem("allBusinessesInfo");
  localStorage.removeItem("businessInfo");
  localStorage.removeItem("tdLogin");
};

export const compareItem = (
  a: { label: string; value: string },
  b: { label: string; value: string }
) => {
  // a should come before b in the sorted order
  if (a.label.toLowerCase() < b.label.toLowerCase()) {
    return -1;
    // a should come after b in the sorted order
  } else if (a.label.toLowerCase() > b.label.toLowerCase()) {
    return 1;
    // and and b are the same
  } else {
    return 0;
  }
};

export const slugify = (slug: string) => {
  return (
    slug
      .toString()
      .trim()
      .toLowerCase()
      // remove any special character with spaces
      .replace(/[\W_]+/g, " ")
      // remove more than one spaces and dashes
      .replace(/\s+|-+/g, "-")
      // remove -dashes from start of string
      .replace(/^\-/i, " ")
  );
};

export const capitalizeFLetter = (value: string) => {
  // handle null, undefined etc
  if (!value) return;

  let splitStr = value.toLowerCase().split(" ");
  for (let i = 0; i < splitStr.length; i++) {
    splitStr[i] =
      splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
  }
  // Directly return the joined string
  return splitStr.join(" ");
};
const handleLeadingZero = (n: number) => (n < 10 ? "0" + n : n);
// Format time
export const formatDate = (date: any) => {
  return (
    date.getFullYear() +
    "-" +
    handleLeadingZero(date.getMonth() + 1) +
    "-" +
    handleLeadingZero(date.getDate()) +
    " " +
    handleLeadingZero(date.getHours()) +
    ":" +
    handleLeadingZero(date.getMinutes()) +
    ":00"
  );
};
