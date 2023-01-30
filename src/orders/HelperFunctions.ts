import axios from "axios";

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
const getFormatedTodayDate = () => {
  let date = new Date();
  let today = `${handleLeadingZero(date.getDate())}-${handleLeadingZero(
    date.getMonth() + 1
  )}-${date.getFullYear()}`;
  return today;
};
// Drag And drop For Product listing Reorder Function
export const reorder = (list: any, sequence: any) => {
  const result = Array.from(list);
  const [removed] = result.splice(sequence[0].source, 1);
  result.splice(sequence[0].destination, 0, removed);

  return result;
};
export const sortMenuItems = (
  shortValues: any,
  type: string,
  shortType: string
) => {
  if (shortType === "itemShort") {
    shortValues.map((Items: any) => {
      if (type === "0") {
        Items.menu_item = Items.menu_item.sort((a: any, b: any) => {
          if (a.name < b.name) return -1;
          if (b.name < a.name) return 1;
          return 0;
        });
      } else {
        Items.menu_item = Items.menu_item.sort((a: any, b: any) => {
          if (a.name > b.name) return -1;
          if (b.name > a.name) return 1;
          return 0;
        });
      }
    });
  }
};

/* this method will upload images to AWS S3 Bucket */
export const uploadImageAWS = (data: AwsDataType) => {
  const { eatout_id, user_id } = JSON.parse(
    localStorage.getItem("businessInfo")!
  );
  var formData = new FormData();
  formData.append("dealid", data.dealId);
  formData.append("menuid", data.menuId);
  formData.append("menu_cat_id", data.categoryId);
  formData.append("uid", user_id);
  formData.append("r_id", eatout_id);
  formData.append("reviewid", data.reviewId);
  formData.append("option_cat_id", data.optionCatId);
  formData.append("option_id", data.optionItemId);
  formData.append("brand_id", data.Brandid);
  formData.append("img_title", "");
  formData.append("status", "Approved");
  formData.append("im_title", "");
  formData.append("image_position", data.imagePostion);
  formData.append("im_description", "");
  formData.append("im_type", data.imageTableType);
  formData.append("created_at", getFormatedTodayDate());
  formData.append("source", "biz");
  formData.append("cover", "");
  formData.append("featured_image", "0");
  formData.append("foodtype", "");
  formData.append("comment", "");
  formData.append("image_type", data.imageType);
  formData.append("resize", data.resize);
  formData.append("height", data.height);
  formData.append("width", data.width);
  formData.append("aws_flag", "1");
  let multipleFiles = data.files;
  let n = multipleFiles.length;

  if (data.imageTableType === "bulk") {
    for (let index = 0; index < n; index++) {
      const filterImagesFromData = multipleFiles[index];
      formData.append("files", filterImagesFromData);
    }
  } else {
    formData.append("files", multipleFiles);
  }

  return new Promise((resolve, reject) => {
    axios
      .post(`images/upload`, formData)
      .then((response) => resolve(response)) // Successfull responce
      .catch((err) => reject(err)); // Catch any error
  });
};
