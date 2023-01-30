import React, { useEffect, useState } from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import CustomRadioButton from "./CustomRadioButton";
import IconButton from "@mui/material/IconButton/IconButton";
import FilterListIcon from "@mui/icons-material/FilterList";
import Divider from "@mui/material/Divider/Divider";
import Grid from "@mui/material/Grid";
import CustomizedSwitch from "./CustomSwitch";
import { keysOfItems as columns, filtersMap } from "../constants";
import { useDispatch, useSelector } from "store";
import {
  selectedFilter,
  setProductColumn,
  toggleColumn,
} from "store/slices/Main";
import CustomButton from "./CustomButton";

interface filtersProps {
  items?: ProductResponse["items"];
  setItems: React.Dispatch<React.SetStateAction<ProductResponseItem[]>>;
  productLoading?: boolean;
  productData: any;
}
let countObj = {
  withImages: 0,
  withNoImages: 0,
  available: 0,
  unAvailable: 0,
  availableWithImg: 0,
  unAvailableWithImg: 0,
  availableWithNoImg: 0,
  unAvailableWithNoImg: 0,
  displayNone: 0,
  displayWeb: 0,
  displayPOS: 0,
};
interface menuItemProps {
  withImages: ProductResponseItem[];
  withNoImages: ProductResponseItem[];
  available: ProductResponseItem[];
  unAvailable: ProductResponseItem[];
  availableWithImg: ProductResponseItem[];
  unAvailableWithImg: ProductResponseItem[];
  availableWithNoImg: ProductResponseItem[];
  unAvailableWithNoImg: ProductResponseItem[];
  displayNone: ProductResponseItem[];
  displayWeb: ProductResponseItem[];
  displayPOS: ProductResponseItem[];
}
const Filters = ({
  items,
  setItems,
  productLoading,
  productData,
}: //  count
filtersProps) => {
  const [toggleFilter, setToggleFilter] = useState<SVGSVGElement | null>(null);
  const [count, setCount] = useState(countObj);
  const open = Boolean(toggleFilter);
  const id = open ? "simple-popover" : undefined;
  const dispatch = useDispatch();
  // const [menuItem, setMenuItem] = useState<menuItemProps[] | []>([]);
  const {
    productColumns,
    CountError,
    showImagesItem,
    availableItems,
    displayType,
  } = useSelector((state) => state.main);

  useEffect(() => {
    if (items && items.length > 0) {
      groupData(items);
    }
  }, [items]);

  // Group  the data
  const groupData = (items: ProductResponse["items"]) => {
    let result = [];
    let array: menuItemProps[] = [];
    if (
      items !== null &&
      items.length > 0
      // && items[0] !== ""
    ) {
      result = items.reduce((r, a) => {
        r[a.category] = r[a.category] || [];
        r[a.category].push(a);
        return r;
      }, Object.create(null));

      let categoryWiseItems: any = Object.entries(result);
      let withNoImages: any = [],
        withImages: any = [],
        available: any = [],
        unAvailable: any = [],
        availableWithImg: any = [],
        unAvailableWithImg: any = [],
        availableWithNoImg: any = [],
        unAvailableWithNoImg: any = [],
        displayNone: any = [],
        displayWeb: any = [],
        displayPOS: any = [];
      // for (let i = 0; i < categoryWiseItems.length; i++) {
      // categoryWiseItems[i][1]
      productData.items &&
        productData.items.map((e: ProductResponseItem) => {
          // items with no image
          e.image.includes("no_image") && withNoImages.push(e);
          // items with image
          !e.image.includes("no_image") && withImages.push(e);
          // items available
          e.status === "0" && available.push(e);
          // items unavailable
          e.status === "1" && unAvailable.push(e);
          // items with images and avialable
          e.status === "0" &&
            !e.image.includes("no_image") &&
            availableWithImg.push(e);
          // items with images but unavialable
          e.status === "1" &&
            !e.image.includes("no_image") &&
            unAvailableWithImg.push(e);
          // items with no images and avialable
          e.status === "0" &&
            e.image.includes("no_image") &&
            availableWithNoImg.push(e);
          // items with no images and also unavialable
          e.status === "1" &&
            e.image.includes("no_image") &&
            unAvailableWithNoImg.push(e);
          // items not displaying at anywhere
          e.display_source === "1" && displayNone.push(e);
          // items only displaying on the web
          e.display_source === "2" && displayWeb.push(e);
          // items only displaying on the pos
          e.display_source === "3" && displayPOS.push(e);
        });

      // set Data of all
      array.push({
        // menuItems: categoryWiseItems[i][1],
        withImages,
        withNoImages,

        available,
        unAvailable,
        availableWithImg,
        unAvailableWithImg,
        availableWithNoImg,
        unAvailableWithNoImg,

        displayNone,
        displayWeb,
        displayPOS,
      });
      // }
      // set Count of all
      setCount({
        withImages: withImages.length,
        withNoImages: withNoImages.length,

        available: available.length,
        unAvailable: unAvailable.length,
        availableWithImg: availableWithImg.length,
        unAvailableWithImg: unAvailableWithImg.length,
        availableWithNoImg: availableWithNoImg.length,
        unAvailableWithNoImg: unAvailableWithNoImg.length,

        displayNone: displayNone.length,
        displayWeb: displayWeb.length,
        displayPOS: displayPOS.length,
      });

      // setMenuItem(array);
    }
  };

  const handleClick = (event: React.MouseEvent<SVGSVGElement>) =>
    setToggleFilter(event.currentTarget);

  const onRadioChange = (event: { target: { name: string; value: any } }) => {
    const name = event.target.name;
    const value = event.target.value;
    dispatch(selectedFilter({ name, value }));
  };

  const handleSwitchChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    { key }: FiltersProps
  ) => {
    const value = event.target.checked;
    dispatch(toggleColumn({ key, value }));
  };

  // Applying Filters of radio button and column switching
  const applyFilters = () => {
    // 1 - all cases of all filters
    if (
      showImagesItem == "all_images" &&
      availableItems == "all_of_stock" &&
      displayType == "all_platforms"
    ) {
      const filtered = productData.items;
      setItems(filtered == undefined ? [] : filtered);
    } else if (
      // with images
      showImagesItem == "with_images" &&
      availableItems == "all_of_stock" &&
      displayType == "all_platforms"
    ) {
      const filtered = productData.items?.filter(
        (item: ProductResponseItem) => !item.image.includes("no_image") && item
      );
      setItems(filtered == undefined ? [] : filtered);
    } else if (
      // without images
      showImagesItem == "without_images" &&
      availableItems == "all_of_stock" &&
      displayType == "all_platforms"
    ) {
      const filtered = productData.items?.filter(
        (item: ProductResponseItem) => item.image.includes("no_image") && item
      );
      setItems(filtered == undefined ? [] : filtered);
    } else if (
      // available
      showImagesItem == "all_images" &&
      availableItems == "in_stock" &&
      displayType == "all_platforms"
    ) {
      const filtered = productData.items?.filter(
        (item: ProductResponseItem) => item.status === "0" && item
      );
      setItems(filtered == undefined ? [] : filtered);
    } else if (
      // unavailable
      showImagesItem == "all_images" &&
      availableItems == "out_of_stock" &&
      displayType == "all_platforms"
    ) {
      const filtered = productData.items?.filter(
        (item: ProductResponseItem) => item.status === "1" && item
      );
      setItems(filtered == undefined ? [] : filtered);
    } else if (
      // available with images
      showImagesItem == "with_images" &&
      availableItems == "in_stock" &&
      displayType == "all_platforms"
    ) {
      const filtered = productData.items?.filter(
        (item: ProductResponseItem) =>
          !item.image.includes("no_image") && item.status === "0" && item
      );
      setItems(filtered == undefined ? [] : filtered);
    } else if (
      // available without  images
      showImagesItem == "without_images" &&
      availableItems == "in_stock" &&
      displayType == "all_platforms"
    ) {
      const filtered = productData.items?.filter(
        (item: ProductResponseItem) =>
          item.image.includes("no_image") && item.status === "0" && item
      );
      setItems(filtered == undefined ? [] : filtered);
    } else if (
      // unavailable with images
      showImagesItem == "with_images" &&
      availableItems == "out_of_stock" &&
      displayType == "all_platforms"
    ) {
      const filtered = productData.items?.filter(
        (item: ProductResponseItem) =>
          !item.image.includes("no_image") && item.status === "1" && item
      );
      setItems(filtered == undefined ? [] : filtered);
    } else if (
      // unavailable without  images
      showImagesItem == "without_images" &&
      availableItems == "out_of_stock" &&
      displayType == "all_platforms"
    ) {
      const filtered = productData.items?.filter(
        (item: ProductResponseItem) =>
          item.image.includes("no_image") && item.status === "1" && item
      );
      setItems(filtered == undefined ? [] : filtered);
    } else if (
      // display NONE variations start //
      // ------------------------------
      // image -  all | available - all | display - none
      showImagesItem == "all_images" &&
      availableItems == "all_of_stock" &&
      displayType == "none"
    ) {
      const filtered = productData.items?.filter(
        (item: ProductResponseItem) => item.display_source === "1" && item
      );
      setItems(filtered == undefined ? [] : filtered);
    } else if (
      // image -  yes | available - all | display - none
      showImagesItem == "with_images" &&
      availableItems == "all_of_stock" &&
      displayType == "none"
    ) {
      const filtered = productData.items?.filter(
        (item: ProductResponseItem) =>
          !item.image.includes("no_image") &&
          item.display_source === "1" &&
          item
      );
      setItems(filtered == undefined ? [] : filtered);
    } else if (
      // image - no
      // available - all
      // display - none
      showImagesItem == "without_images" &&
      availableItems == "all_of_stock" &&
      displayType == "none"
    ) {
      const filtered = productData.items?.filter(
        (item: ProductResponseItem) =>
          item.image.includes("no_image") && item.display_source === "1" && item
      );
      setItems(filtered == undefined ? [] : filtered);
    } else if (
      // image -  all
      // available - yes
      // display - none
      showImagesItem == "all_images" &&
      availableItems == "in_stock" &&
      displayType == "none"
    ) {
      const filtered = productData.items?.filter(
        (item: ProductResponseItem) =>
          item.status === "0" && item.display_source === "1" && item
      );
      setItems(filtered == undefined ? [] : filtered);
    } else if (
      // image -  yes
      // available - yes
      // display - none
      showImagesItem == "with_images" &&
      availableItems == "in_stock" &&
      displayType == "none"
    ) {
      const filtered = productData.items?.filter(
        (item: ProductResponseItem) =>
          !item.image.includes("no_image") &&
          item.status === "0" &&
          item.display_source === "1" &&
          item
      );
      setItems(filtered == undefined ? [] : filtered);
    } else if (
      // image -  no | available - yes | display - none
      showImagesItem == "without_images" &&
      availableItems == "in_stock" &&
      displayType == "none"
    ) {
      const filtered = productData.items?.filter(
        (item: ProductResponseItem) =>
          item.image.includes("no_image") &&
          item.status === "0" &&
          item.display_source === "1" &&
          item
      );
      setItems(filtered == undefined ? [] : filtered);
    } else if (
      // image -  all
      // available - no
      // display - none
      showImagesItem == "all_images" &&
      availableItems == "out_of_stock" &&
      displayType == "none"
    ) {
      const filtered = productData.items?.filter(
        (item: ProductResponseItem) =>
          item.status === "1" && item.display_source === "1" && item
      );
      setItems(filtered == undefined ? [] : filtered);
    } else if (
      // image -  yes
      // available - no
      // display - none
      showImagesItem == "with_images" &&
      availableItems == "out_of_stock" &&
      displayType == "none"
    ) {
      const filtered = productData.items?.filter(
        (item: ProductResponseItem) =>
          !item.image.includes("no_image") &&
          item.status === "1" &&
          item.display_source === "1" &&
          item
      );
      setItems(filtered == undefined ? [] : filtered);
    } else if (
      // image -  no
      // available - no
      // display - none
      showImagesItem == "without_images" &&
      availableItems == "out_of_stock" &&
      displayType == "none"
    ) {
      const filtered = productData.items?.filter(
        (item: ProductResponseItem) =>
          item.image.includes("no_image") &&
          item.status === "1" &&
          item.display_source === "1" &&
          item
      );
      setItems(filtered == undefined ? [] : filtered);
    } else if (
      // display WEB variations start //
      // ------------------------------
      // image -  all
      // available - all
      // display - web
      showImagesItem == "all_images" &&
      availableItems == "all_of_stock" &&
      displayType == "web"
    ) {
      const filtered = productData.items?.filter(
        (item: ProductResponseItem) => item.display_source === "2" && item
      );
      setItems(filtered == undefined ? [] : filtered);
    } else if (
      // image -  yes
      // available - all
      // display - web
      showImagesItem == "with_images" &&
      availableItems == "all_of_stock" &&
      displayType == "web"
    ) {
      const filtered = productData.items?.filter(
        (item: ProductResponseItem) =>
          !item.image.includes("no_image") &&
          item.display_source === "2" &&
          item
      );
      setItems(filtered == undefined ? [] : filtered);
    } else if (
      // image - no
      // available - all
      // display - web
      showImagesItem == "without_images" &&
      availableItems == "all_of_stock" &&
      displayType == "web"
    ) {
      const filtered = productData.items?.filter(
        (item: ProductResponseItem) =>
          item.image.includes("no_image") && item.display_source === "2" && item
      );
      setItems(filtered == undefined ? [] : filtered);
    } else if (
      // image -  all
      // available - yes
      // display - web
      showImagesItem == "all_images" &&
      availableItems == "in_stock" &&
      displayType == "web"
    ) {
      const filtered = productData.items?.filter(
        (item: ProductResponseItem) =>
          item.status === "0" && item.display_source === "2" && item
      );
      setItems(filtered == undefined ? [] : filtered);
    } else if (
      // image -  yes
      // available - yes
      // display - web
      showImagesItem == "with_images" &&
      availableItems == "in_stock" &&
      displayType == "web"
    ) {
      const filtered = productData.items?.filter(
        (item: ProductResponseItem) =>
          !item.image.includes("no_image") &&
          item.status === "0" &&
          item.display_source === "2" &&
          item
      );
      setItems(filtered == undefined ? [] : filtered);
    } else if (
      // image -  no
      // available - yes
      // display - web
      showImagesItem == "without_images" &&
      availableItems == "in_stock" &&
      displayType == "web"
    ) {
      const filtered = productData.items?.filter(
        (item: ProductResponseItem) =>
          item.image.includes("no_image") &&
          item.status === "0" &&
          item.display_source === "2" &&
          item
      );
      setItems(filtered == undefined ? [] : filtered);
    } else if (
      // image -  all
      // available - no
      // display - web
      showImagesItem == "all_images" &&
      availableItems == "out_of_stock" &&
      displayType == "web"
    ) {
      const filtered = productData.items?.filter(
        (item: ProductResponseItem) =>
          item.status === "1" && item.display_source === "2" && item
      );
      setItems(filtered == undefined ? [] : filtered);
    } else if (
      // image -  yes
      // available - no
      // display - web
      showImagesItem == "with_images" &&
      availableItems == "out_of_stock" &&
      displayType == "web"
    ) {
      const filtered = productData.items?.filter(
        (item: ProductResponseItem) =>
          !item.image.includes("no_image") &&
          item.status === "1" &&
          item.display_source === "2" &&
          item
      );
      setItems(filtered == undefined ? [] : filtered);
    } else if (
      // image -  no
      // available - no
      // display - web
      showImagesItem == "without_images" &&
      availableItems == "out_of_stock" &&
      displayType == "web"
    ) {
      const filtered = productData.items?.filter(
        (item: ProductResponseItem) =>
          item.image.includes("no_image") &&
          item.status === "1" &&
          item.display_source === "2" &&
          item
      );
      setItems(filtered == undefined ? [] : filtered);
    } else if (
      // display POS variations start //
      // ------------------------------
      // image -  all
      // available - all
      // display - pos
      showImagesItem == "all_images" &&
      availableItems == "all_of_stock" &&
      displayType == "pos"
    ) {
      const filtered = productData.items?.filter(
        (item: ProductResponseItem) => item.display_source === "3" && item
      );
      setItems(filtered == undefined ? [] : filtered);
    } else if (
      // image -  yes
      // available - all
      // display - pos
      showImagesItem == "with_images" &&
      availableItems == "all_of_stock" &&
      displayType == "pos"
    ) {
      const filtered = productData.items?.filter(
        (item: ProductResponseItem) =>
          !item.image.includes("no_image") &&
          item.display_source === "3" &&
          item
      );
      setItems(filtered == undefined ? [] : filtered);
    } else if (
      // image - no
      // available - all
      // display - pos
      showImagesItem == "without_images" &&
      availableItems == "all_of_stock" &&
      displayType == "pos"
    ) {
      const filtered = productData.items?.filter(
        (item: ProductResponseItem) =>
          item.image.includes("no_image") && item.display_source === "3" && item
      );
      setItems(filtered == undefined ? [] : filtered);
    } else if (
      // image -  all
      // available - yes
      // display - pos
      showImagesItem == "all_images" &&
      availableItems == "in_stock" &&
      displayType == "pos"
    ) {
      const filtered = productData.items?.filter(
        (item: ProductResponseItem) =>
          item.status === "0" && item.display_source === "3" && item
      );
      setItems(filtered == undefined ? [] : filtered);
    } else if (
      // image -  yes
      // available - yes
      // display - pos
      showImagesItem == "with_images" &&
      availableItems == "in_stock" &&
      displayType == "pos"
    ) {
      const filtered = productData.items?.filter(
        (item: ProductResponseItem) =>
          !item.image.includes("no_image") &&
          item.status === "0" &&
          item.display_source === "3" &&
          item
      );
      setItems(filtered == undefined ? [] : filtered);
    } else if (
      // image -  no
      // available - yes
      // display - pos
      showImagesItem == "without_images" &&
      availableItems == "in_stock" &&
      displayType == "pos"
    ) {
      const filtered = productData.items?.filter(
        (item: ProductResponseItem) =>
          item.image.includes("no_image") &&
          item.status === "0" &&
          item.display_source === "3" &&
          item
      );
      setItems(filtered == undefined ? [] : filtered);
    } else if (
      // image -  all
      // available - no
      // display - pos
      showImagesItem == "all_images" &&
      availableItems == "out_of_stock" &&
      displayType == "pos"
    ) {
      const filtered = productData.items?.filter(
        (item: ProductResponseItem) =>
          item.status === "1" && item.display_source === "3" && item
      );
      setItems(filtered == undefined ? [] : filtered);
    } else if (
      // image -  yes
      // available - no
      // display - pos
      showImagesItem == "with_images" &&
      availableItems == "out_of_stock" &&
      displayType == "pos"
    ) {
      const filtered = productData.items?.filter(
        (item: ProductResponseItem) =>
          !item.image.includes("no_image") &&
          item.status === "1" &&
          item.display_source === "3" &&
          item
      );
      setItems(filtered == undefined ? [] : filtered);
    } else if (
      // image -  no
      // available - no
      // display - pos
      showImagesItem == "without_images" &&
      availableItems == "out_of_stock" &&
      displayType == "pos"
    ) {
      const filtered = productData.items?.filter(
        (item: ProductResponseItem) =>
          item.image.includes("no_image") &&
          item.status === "1" &&
          item.display_source === "3" &&
          item
      );
      setItems(filtered == undefined ? [] : filtered);
    }
    // close filter modal
    setToggleFilter(null);
  };

  return (
    <>
      <IconButton>
        <Stack>
          <FilterListIcon onClick={handleClick} />
        </Stack>
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={toggleFilter}
        onClose={() => setToggleFilter(null)}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Stack spacing={2} padding={4}>
          {filtersMap.map((item: any) => (
            <>
              <Stack
                display="flex"
                spacing={2}
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                width="100%"
              >
                <Typography width="20%" variant="h5">
                  {item.name}
                </Typography>
                <Stack width="80%">
                  <CustomRadioButton
                    name={item.key}
                    row={true}
                    options={item.options}
                    count={count}
                    showCount={true}
                    value={
                      item.key == "items"
                        ? showImagesItem
                        : item.key == "items_stock"
                        ? availableItems
                        : item.key == "visibility_on_platform"
                        ? displayType
                        : ""
                    }
                    onChange={onRadioChange}
                  />
                </Stack>
              </Stack>
              <Divider />
            </>
          ))}

          <Typography variant="h3">Custom Columns</Typography>
          <Grid container>
            <Grid
              item
              xs={12}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                rowGap: "2px",
                columnGap: "16px",
              }}
            >
              {productColumns?.map((column: any) => (
                <CustomizedSwitch
                  checked={column.selected}
                  name={column.key}
                  label={column.value}
                  sx={{
                    "& .MuiFormControlLabel-root": {
                      mr: "28px",
                      ml: "-6px",
                    },
                  }}
                  onChange={(event) => handleSwitchChange(event, column)}
                />
              ))}
            </Grid>
          </Grid>
          <Divider />

          <Grid container>
            <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "end",
                pt: "24px !important",
              }}
            >
              <CustomButton
                variant={"contained"}
                sx={{
                  p: "12px 44.5px",
                  background: "#F5F5F5",
                  color: "#212121",
                  "&:hover": {
                    backgroundColor: "#F5F5F5",
                  },
                }}
                onClick={() => setToggleFilter(null)}
              >
                Cancel
              </CustomButton>

              <CustomButton
                variant={"contained"}
                sx={{
                  p: "12px 48px",
                  ml: "12px",
                }}
                color={"secondary"}
                onClick={applyFilters}
                // disabled={
                //   errors.categoryError === "" && errors.slugError === ""
                //     ? false
                //     : true
                // }
              >
                Apply
              </CustomButton>
            </Grid>
          </Grid>
        </Stack>
      </Popover>
    </>
  );
};

export default Filters;
