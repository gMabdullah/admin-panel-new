import { useEffect, useState } from "react";
import { SelectChangeEvent } from "@mui/material";
import useAxios from "axios-hooks";
import MultiSelectDropDown, {
  DropDownListType,
} from "components/MultiSelectDropDown";
import { getLocalStorage } from "orders/HelperFunctions";
import { useDispatch, useSelector } from "store";
import { setSelectedCategory } from "store/slices/dropdown";
// required apply button handler to call respective api
// 1 - use this type "dropdownTypes"

const CategoriesDropdown = ({ applyFilter }: dropdownTypes) => {
  const dispatch = useDispatch();
  const { selectedCategory } = useSelector((state) => state.dropdown);
  const [categories, setCategories] = useState<DropDownListType[]>([]);
  const [CategoriesName, setCategoriesName] = useState<string[]>([
    "All Categories",
  ]);

  //   Get local Storage
  const { eatout_id, user_id } = getLocalStorage();
  const payload = () => {
    const formData = new FormData();

    formData.append("eatout_id", eatout_id);
    formData.append("menu_type_id", `${0}`);
    formData.append("admin_id", user_id);
    formData.append("source", `biz`);
    return formData;
  };
  const [{ data, loading, error }, getCategoriesAPI] = useAxios(
    { url: `/get_menu_item_category`, method: "post", data: payload() },
    { manual: true }
  );

  useEffect(() => {
    (async () => {
      const categoryResult = await getCategoriesAPI();
      // load Categories dropdown
      //   1 means success response
      if (categoryResult.data.status == 1 && categoryResult.data.result) {
        const { result } = categoryResult.data;
        const categories = result.map(
          (category: MenuCategoryResponseResult) => ({
            value: category.category_id,
            label: category.category_name,
          })
        );
        categories.unshift({ label: "All Categories", value: "" });

        setCategories(categories);
      }
    })();
  }, []);

  //  categories handler
  const handleCategoryChange = (
    event: SelectChangeEvent<typeof CategoriesName>
  ) => {
    const {
      target: { value },
    } = event;
    let valueForApiFilter: string[] = [];
    categories &&
      categories.map((branchData) => {
        (typeof value === "string" ? [value] : value).map((label: string) => {
          if (label == branchData.label) {
            valueForApiFilter.push(branchData.value);
          }
        });
      });

    let selectedLabels = typeof value === "string" ? value.split(",") : value;
    // select all labels except all categories
    if (selectedLabels.length > 1) {
      if (selectedLabels.includes("All Categories")) {
        selectedLabels = selectedLabels.filter(
          (label) => label !== "All Categories" && label
        );
        // select all values except empty string because its of all categories case
        valueForApiFilter = valueForApiFilter.filter(
          (value) => value !== "" && value
        );
      }
    }
    // send values to reducer for consuming in api call
    dispatch(setSelectedCategory(valueForApiFilter));
    // set comma seperated labes in dropdown header
    setCategoriesName(selectedLabels);
  };

  if (loading) return <span>Loading...</span>;
  if (error) return <span>Getting Categories Failed</span>;

  return (
    <MultiSelectDropDown
      value={CategoriesName}
      onChange={handleCategoryChange}
      dropDownList={categories}
      sx={{ width: "160px", height: "40px", ml: "8px" }}      // Get on Change function from parent where this component is using.
      onChangeButton={applyFilter}
    />
  );
};

export default CategoriesDropdown;
