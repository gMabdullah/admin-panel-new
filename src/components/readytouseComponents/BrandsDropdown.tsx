import { useEffect, useState } from "react";

import { SelectChangeEvent } from "@mui/material";

import useAxios from "axios-hooks";

import MultiSelectDropDown, {
  DropDownListType,
} from "components/MultiSelectDropDown";
import { compareItem, getLocalStorage } from "orders/HelperFunctions";
import { useDispatch, useSelector } from "store";
import { setSelectedBrand } from "store/slices/Dropdown";
// required apply button handler to call respective api
// 1 - use this type "dropdownTypes"

const BrandsDropdown = ({ applyFilter }: dropdownTypes) => {
  const dispatch = useDispatch();
  const { selectedCategory } = useSelector((state) => state.dropdown);
  const [brands, setBrands] = useState<DropDownListType[]>([]);
  const [BrandName, setBrandName] = useState<string[]>(["All Brands"]);

  //   Get local Storage
  const { eatout_id, user_id } = getLocalStorage();
  const payload = () => {
    const formData = new FormData();

    formData.append("eatout_id", eatout_id);
    formData.append("admin_id", user_id);
    formData.append("source", `biz`);
    return formData;
  };
  const [{ data, loading, error }, getBrandsAPI] = useAxios(
    { url: `/get_eatout_brands_display`, method: "post", data: payload() },
    { manual: true }
  );

  useEffect(() => {
    (async () => {
      const brandResult = await getBrandsAPI();
      // load Brands dropdown
      //   1 means success response
      if (brandResult.data.status == 1 && brandResult.data.result) {
        const { result } = brandResult.data;
        const brands = result.map((brand: BrandResponse) => ({
          label: brand.name,
          value: brand.id,
        }));
        // Sort A-Z
        brands.sort(compareItem);
        // Append All Brands option
        brands.unshift({ label: "All Brands", value: "" });
        setBrands(brands);
      }
    })();
  }, []);

  //  brands handler
  const handleBrandChange = (event: SelectChangeEvent<typeof BrandName>) => {
    const {
      target: { value },
    } = event;
    let valueForApiFilter: string[] = [];
    brands &&
      brands.map((brand) => {
        (typeof value === "string" ? [value] : value).map((label: string) => {
          if (label == brand.label) {
            valueForApiFilter.push(brand.value);
          }
        });
      });

    let selectedLabels = typeof value === "string" ? value.split(",") : value;
    // select all labels except all brands
    if (selectedLabels.length > 1) {
      if (selectedLabels.includes("All Brands")) {
        selectedLabels = selectedLabels.filter(
          (label) => label !== "All Brands" && label
        );
        // select all values except empty string because its of all brands case
        valueForApiFilter = valueForApiFilter.filter(
          (value) => value !== "" && value
        );
      }
    }
    // send values to reducer for consuming in api call
    dispatch(setSelectedBrand(valueForApiFilter));
    // set comma seperated labes in dropdown header
    setBrandName(selectedLabels);
  };

  if (error) return <span>Getting Brands Failed</span>;

  return (
    <MultiSelectDropDown
      value={BrandName}
      onChange={handleBrandChange}
      dropDownList={brands}
      sx={{ width: "160px", height: "40px", ml: "8px" }} // Get on Change function from parent where this component is using.
      onChangeButton={applyFilter}
    />
  );
};

export default BrandsDropdown;
