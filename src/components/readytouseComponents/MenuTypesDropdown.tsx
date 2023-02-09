import { useEffect, useState } from "react";

import { SelectChangeEvent } from "@mui/material";

import useAxios from "axios-hooks";

import MultiSelectDropDown, {
  DropDownListType,
} from "components/MultiSelectDropDown";
import { compareItem, getLocalStorage } from "orders/HelperFunctions";
import { useDispatch } from "store";
import { setSelectedMenu } from "store/slices/Dropdown";
// required apply button handler to call respective api
// 1 - use this type "dropdownTypes"

const MenuTypesDropdown = ({ applyFilter, disabled }: dropdownTypes) => {
  const dispatch = useDispatch();
  const [menus, setMenus] = useState<DropDownListType[]>([]);
  const [menuName, setMenuName] = useState<string[]>(["Menu"]);

  //   Get local Storage
  const { eatout_id, user_id } = getLocalStorage();

  const [{ data, loading, error }, getMenusAPI] = useAxios(
    {
      url: `/get_menu_type?eatout_id=${eatout_id}&source=biz&admin_id=${user_id}`,
      method: "GET",
    },
    { manual: true }
  );

  useEffect(() => {
    (async () => {
      const menuResult = await getMenusAPI();
      // load Brands dropdown
      //   1 means success response
      if (menuResult.data.status == 1 && menuResult.data.result) {
        const { result } = menuResult.data;
        const menus = result.map((brand: BrandResponse) => ({
          label: brand.name,
          value: brand.id,
        }));
        // Sort A-Z
        menus.sort(compareItem);
        // Append All Brands option
        menus.unshift({ label: "Menu", value: "" });
        setMenus(menus);
      }
    })();
  }, []);

  //  menus handler
  const handleChange = (event: SelectChangeEvent<typeof menuName>) => {
    const {
      target: { value },
    } = event;
    let valueForApiFilter: string[] = [];
    menus &&
      menus.map((brand) => {
        (typeof value === "string" ? [value] : value).map((label: string) => {
          if (label == brand.label) {
            valueForApiFilter.push(brand.value);
          }
        });
      });

    let selectedLabels = typeof value === "string" ? value.split(",") : value;
    // select all labels except all menus
    if (selectedLabels.length > 1) {
      if (selectedLabels.includes("Menu")) {
        selectedLabels = selectedLabels.filter(
          (label) => label !== "Menu" && label
        );
        // select all values except empty string because its of all menus case
        valueForApiFilter = valueForApiFilter.filter(
          (value) => value !== "" && value
        );
      }
    }
    // send values to reducer for consuming in api call
    dispatch(setSelectedMenu(valueForApiFilter));
    // set comma seperated labes in dropdown header
    setMenuName(selectedLabels);
  };

  if (error) return <span>Getting Menus Failed</span>;

  return menus.length > 2 ? (
    <MultiSelectDropDown
      disabled={disabled}
      value={menuName}
      onChange={handleChange}
      dropDownList={menus}
      sx={{ width: "160px", height: "40px" }}
      // Get on Change function from parent where this component is using.
      onChangeButton={applyFilter}
    />
  ) : (
    <></>
  );
};

export default MenuTypesDropdown;
