import React, { useEffect, useRef, useState } from "react";
import { Stack, Typography, Grid, Divider } from "@mui/material";
import TdTextField from "components/TdTextField";
import useAxios from "axios-hooks";
import {
  capitalizeFLetter,
  getLocalStorage,
  slugify,
} from "orders/HelperFunctions";
import CustomButton from "components/CustomButton";
import { alphaNumericRegex } from "constants/BusinessIds";
import RichEditor from "components/RichEditor";
import Display from "./sections/Display";

let typingTimer: any = "";
const doneTypingInterval = 1000;

const AddCategory = () => {
  const [slug, setSlug] = useState(""),
    [slugErr, setSlugErr] = useState(""),
    [categoryName, setCategoryName] = useState(""),
    [categoryError, setCategoryError] = useState(""),
    [isSlugAvailable, setIsSlugAvailable] = useState(true),
    [description, setDescription] = useState(""),
    // remove edit case bit after receiving from parent
    [editcase, setEditcase] = useState(false),
    // Get it from Global setting
    [editor, setEditor] = useState(true),
    { eatout_id, user_id } = getLocalStorage(),
    ref = useRef();
  //
  const payload = () => {
    const formData = new FormData();
    formData.append("eatout_id", eatout_id);
    formData.append(
      "menu_category",
      `${capitalizeFLetter(categoryName)?.trim()}`
    );
    formData.append("slug", slug.replace(/\-$/i, " "));
    formData.append("description", description);

    // formData.append("menu_type_id", );
    // formData.append("display_source", );

    // category  id goes here
    if (editcase) formData.append("category_id", `${14081}`);

    formData.append("admin_id", `${user_id}`);
    formData.append("source", "biz");
    return formData;
  };
  const [
    { loading: addEditCategoryLoading, error: addEditCategoryError },
    addEditCategoryAPI,
  ] = useAxios(
    {
      url: editcase ? `add_menu_item_category` : `edit_menu_item_category`,
      method: "POST",
      data: payload(),
    },
    { manual: true }
  );

  // Validate Slug API
  const [{ loading: slugLoading, error: slugError }, validateSlugAPI] =
    useAxios(
      {
        url: `check_category_slug?business_id=${eatout_id}&slug=${slug.trim()}&admin_id=${user_id}&source=biz`,
        method: "GET",
      },
      { manual: true }
    );

  //   component Did Mount
  //   useEffect(() => {
  //     // const element = ref.current;
  //     window.addEventListener("keypress", (e: { key: string }) => {
  //       if (e.key == "Enter") {
  //         debugger;
  //       }
  //     });
  //     return () =>
  //       window.removeEventListener("keypress", (e: { key: string }) => {
  //         if (e.key == "Enter") {
  //           debugger;
  //         }
  //       });
  //   }, []);

  const addEditCategory = async () => {
    if (validateCategory()) {
      // if add case
      const categoryResult = await addEditCategoryAPI();
      if (categoryResult && categoryResult.data) {
        const { status, message, result } = categoryResult.data;
        // category added
        if (status == 1) {
          console.log("message", message);
          // reset states after
          setSlug("");
          setCategoryName("");
          setDescription("");
        } else if (status == 0) {
          // category not added
          console.log("message", message);
        }
        // close modal after completion
      }
    }
  };

  // onKeyUp listener
  const hanldeOnKeyUp = () => {
    clearTimeout(typingTimer);
    typingTimer = setTimeout(validateSlug, doneTypingInterval);
  };

  // onKeydown listener
  const handleOnKeydown = () => {
    clearTimeout(typingTimer);
  };

  //   Validate Slug
  const validateSlug = async () => {
    try {
      if (slug && categoryName) {
        const slugResult = await validateSlugAPI();
        if (slugResult && slugResult.data) {
          const { success, message } = slugResult.data;
          setIsSlugAvailable(success);
          !success && setCategoryError(message);
        }
      }
    } catch (error) {
      console.log("validation slug error", error);
    }
  };

  const validateCategory = () => {
    if (categoryName === "") {
      setCategoryError("Name can't be empty");
      return false;
    }
    if (slug === "") {
      setCategoryError("Slug can't be empty");
      return false;
    }
    if (!isSlugAvailable) {
      setCategoryError("Slug already exist");
      return false;
    }
    return true;
  };
  const handleChange = (e: { target: { value: string; name: string } }) => {
    if (alphaNumericRegex.test(e.target.value)) {
      const { name, value } = e.target;
      //   categoryName case
      if (e.target.name == "category") {
        setCategoryName(value);
        setSlug(slugify(value));
        setCategoryError("");
        setSlugErr("");
      } else if (name == "slug") {
        // slug case
        setSlug(slugify(value));
        setSlugErr("");
      } else if (name == "description") {
        setDescription(value);
      }
    }
  };
  //   return Error if API failed
  if (slugError) return <p>Validation Slug API Failed</p>;
  return (
    <Stack sx={{ p: "32px 25px 0px" }}>
      <Grid container>
        <Grid item xs={12} sx={{ display: "flex", mb: "24px" }}>
          <TdTextField
            name="category"
            label="Category Name"
            value={categoryName}
            onChange={handleChange}
            onKeyUp={hanldeOnKeyUp}
            onKeyDown={handleOnKeydown}
          />
        </Grid>
        <Grid item xs={12} sx={{ display: "flex", mb: "24px" }}>
          <TdTextField
            name="slug"
            label="Category Slug"
            value={slug}
            onChange={handleChange}
            onKeyUp={hanldeOnKeyUp}
            onKeyDown={handleOnKeydown}
          />
        </Grid>
        {editor ? (
          <RichEditor
            description={description}
            setDescription={setDescription}
          />
        ) : (
          <Grid item xs={12} sx={{ display: "flex", mb: "24px" }}>
            <TdTextField
              name="description"
              label="Category description"
              value={description}
              onChange={handleChange}
              multiline={true}
              rows={4}
            />
          </Grid>
        )}
      </Grid>
      <Display />
      <CustomButton
        variant={"contained"}
        color={"secondary"}
        onClick={addEditCategory}
        // ref={ref}
        sx={{
          p: "13px 43px",
          fontFamily: "Roboto",
          fontStyle: "normal",
          fontWeight: 500,
          fontSize: "13px",
        }}
      >
        Add Category
      </CustomButton>
    </Stack>
  );
};

export default AddCategory;
