import React, { useEffect, useState } from "react";
import { SelectChangeEvent } from "@mui/material";
import useAxios from "axios-hooks";
import MultiSelectDropDown, {
  DropDownListType,
} from "components/MultiSelectDropDown";
import { getLocalStorage } from "orders/HelperFunctions";
import { useDispatch } from "store";
import { setSelectedBranch } from "store/slices/dropdown";

const BranchesDropdown = ({ applyFilter }: dropdownTypes) => {
  const dispatch = useDispatch();
  const [branches, setBranches] = useState<DropDownListType[]>([]);
  const [branchName, setBranchName] = useState<string[]>(["All Branches"]);
  //   Get local Storage
  const { eatout_id, user_id } = getLocalStorage();

  const [{ loading, error }, getBranchesAPI] = useAxios(
    {
      url: `/get_eatout_branches?restaurant_id=${eatout_id}&source=biz&admin_id=${user_id}`,
      method: "post",
    },
    { manual: true }
  );

  useEffect(() => {
    (async () => {
      const branchesList = await getBranchesAPI();
      // load Branches dropdown
      if (branchesList && branchesList.data) {
        const branches = branchesList.data.map((item: GetBranchesResponse) => ({
          value: item.branch_id,
          label: item.location_address,
        }));
        branches.unshift({ label: "All Branches", value: "" });
        setBranches(branches);
      }
    })();
  }, []);

  //  branches handler
  const handleBranchChange = (event: SelectChangeEvent<typeof branchName>) => {
    const {
      target: { value },
    } = event;
    let branchValueForApiFilter: string[] = [];
    branches &&
      branches.map((branchData) => {
        (typeof value === "string" ? [value] : value).map((label: string) => {
          if (label == branchData.label) {
            branchValueForApiFilter.push(branchData.value);
          }
        });
      });

    let selectedLabels = typeof value === "string" ? value.split(",") : value;
    // select all labels except all branches
    if (selectedLabels.length > 1) {
      if (selectedLabels.includes("All Branches")) {
        selectedLabels = selectedLabels.filter(
          (label) => label !== "All Branches" && label
        );
        // select all values except empty string because its of all branches case
        branchValueForApiFilter = branchValueForApiFilter.filter(
          (value) => value !== "" && value
        );
      }
    }
    // send values to reducer for consuming in api call
    dispatch(setSelectedBranch(branchValueForApiFilter));
    // set comma seperated labes in dropdown header
    setBranchName(selectedLabels);
  };

  if (error) return <span>Getting Branches Failed</span>;

  return (
    <MultiSelectDropDown
      value={branchName}
      onChange={handleBranchChange}
      dropDownList={branches}
      sx={{ width: "160px", height: "40px", ml: "8px" }}
      onChangeButton={applyFilter}
    />
  );
};

export default BranchesDropdown;
