import React, { useEffect, useState } from "react";
import { SelectChangeEvent } from "@mui/material";
import useAxios from "axios-hooks";
import MultiSelectDropDown, {
  DropDownListType,
} from "components/MultiSelectDropDown";
import { getLocalStorage } from "orders/HelperFunctions";
import { useDispatch, useSelector } from "store";
import { setSelectedCity } from "store/slices/dropdown";

const CitiesDropdown = ({ applyFilter }: dropdownTypes) => {
  const dispatch = useDispatch();
  const [citiesList, setCitiesList] = useState<DropDownListType[]>([
    { label: "All Cities", value: "" },
  ]);
  const [city, setCity] = useState<string[]>([citiesList[0].label]);
  //   Get local Storage
  const { eatout_id, user_id } = getLocalStorage();

  // cities api call payload
  const citiesPayload = (cityData: OrdersCityFilterRequest) => {
    const formData = new FormData();

    formData.append("eatout_id", eatout_id);
    formData.append("admin_id", `${cityData["admin_id"]}`);
    formData.append("source", `${cityData["source"]}`);
    return formData;
  };

  const [{ loading, error }, getCitiesAPI] = useAxios(
    {
      url: "/order_city_filter",
      method: "post",
      data: citiesPayload({
        eatout_id,
        source: "biz",
        admin_id: user_id,
      }),
    },
    { manual: true }
  );

  useEffect(() => {
    (async () => {
      const citiesList = await getCitiesAPI();
      // load Cities dropdown
      if (citiesList && citiesList.data.result) {
        const cities = citiesList.data.result;
        const remaingCities = cities.map((status: string) => ({
          label: status,
          value: status,
        }));
        remaingCities.unshift({ label: "All Cities", value: "" });
        setCitiesList(remaingCities);
      }
    })();
  }, []);

  //   branches handler
  const handleCityChange = (event: SelectChangeEvent<typeof city>) => {
    const {
      target: { value },
    } = event;
    let selectedLabels = typeof value === "string" ? value.split(",") : value;
    // select all labels except all cities
    if (selectedLabels.length > 1) {
      if (selectedLabels.includes("All Cities")) {
        selectedLabels = selectedLabels.filter(
          (label) => label !== "All Cities" && label
        );
      }
    }
    dispatch(setSelectedCity(selectedLabels));
    setCity(selectedLabels);
  };
  if (loading) return <span>Loading...</span>;
  if (error) return <span>Getting Cities Failed</span>;
  return (
    <MultiSelectDropDown
      value={city}
      onChange={handleCityChange}
      dropDownList={citiesList}
      sx={{ width: "160px", height: "40px", ml: "8px" }}
      onChangeButton={applyFilter}
    />
  );
};

export default CitiesDropdown;
