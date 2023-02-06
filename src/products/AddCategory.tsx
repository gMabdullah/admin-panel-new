import { useState } from "react";

import { Stack, Grid, Typography } from "@mui/material";

import useAxios from "axios-hooks";

import CustomButton from "components/CustomButton";
import TdTextField from "components/TdTextField";
import RichEditor from "components/RichEditor";
import Notify from "components/Notify";
import CustomModal from "components/CustomModal";

import {
  capitalizeFLetter,
  getLocalStorage,
  slugify,
} from "orders/HelperFunctions";
import { alphaNumericRegex } from "../constants";
import Display from "./sections/Display";
import { useSelector } from "store";

let typingTimer: any = "";
const doneTypingInterval = 1000;

interface AddEditCategoryProps {
  addCategoryModal: boolean;
  toggleCategoryModal: () => void;
}

let errorMessage = { categoryError: "", slugError: "" };

const AddCategory = ({
  addCategoryModal,
  toggleCategoryModal,
}: AddEditCategoryProps) => {
  const { richEditor } = useSelector((state) => state.main),
    [slug, setSlug] = useState(""),
    [categoryName, setCategoryName] = useState(""),
    [isSlugAvailable, setIsSlugAvailable] = useState(true),
    [description, setDescription] = useState(""),
    // Erros
    [errors, setErrors] = useState(errorMessage),
    // remove edit case bit after receiving from parent
    [editcase, setEditcase] = useState(false),
    // Notifications
    [notify, setNotify] = useState<boolean>(false),
    [notifyMessage, setNotifyMessage] = useState(""),
    [notifyType, setNotifyType] = useState<
      "success" | "info" | "warning" | "error"
    >("info"),
    // Local storage
    { eatout_id, user_id } = getLocalStorage();

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
      url: editcase ? `edit_menu_item_category` : `add_menu_item_category`,
      method: "POST",
      data: payload(),
    },
    { manual: true }
  );

  // Validate Slug API
  const [{ loading: slugLoading, error: slugAPIError }, validateSlugAPI] =
    useAxios(
      {
        url: `check_category_slug?business_id=${eatout_id}&slug=${slug.trim()}&admin_id=${user_id}&source=biz`,
        method: "GET",
      },
      { manual: true }
    );

  const addEditCategory = async () => {
    if (validateCategory()) {
      // if add case
      const categoryResult = await addEditCategoryAPI({
        data: payload(),
      });
      if (categoryResult && categoryResult.data) {
        const { status, message, result } = categoryResult.data;
        // category added
        if (status == 1) {
          // reset states after
          setCategoryName("");
          setSlug("");
          setDescription("");
          toggleCategoryModal();
          setNotifyMessage(message);
          setNotifyType("success");
          setNotify(true);
        } else if (status == 0) {
          // category not added
          setNotifyMessage(message);
          setNotifyType("error");
          setNotify(true);
        }
      }
    }
  };

  // onKeyUp listener
  const handleOnKeyUp = () => {
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
          !success && setErrors({ ...errors, slugError: message });
        }
      }
    } catch (error) {
      setNotifyMessage("Validation Slug Failed");
      setNotifyType("error");
      setNotify(true);
    }
  };

  const validateCategory = () => {
    if (categoryName === "") {
      setErrors({ ...errors, categoryError: "Name can't be empty" });
      return false;
    }
    if (slug === "") {
      setErrors({ ...errors, slugError: "Slug can't be empty" });
      return false;
    }
    if (!isSlugAvailable) {
      setErrors({ ...errors, slugError: "Slug already exist" });
      return false;
    }
    return true;
  };

  const handleChange = (e: { target: { value: string; name: string } }) => {
    const { name, value } = e.target;

    if (alphaNumericRegex.test(e.target.value)) {
      //   categoryName case
      if (e.target.name == "category") {
        setCategoryName(value);
        setSlug(slugify(value));
        setErrors({ categoryError: "", slugError: "" });
      } else if (name == "slug") {
        // slug case
        setSlug(slugify(value));
        setErrors({ ...errors, slugError: "" });
      }
    } else if (name == "description") {
      setDescription(value);
    }
  };

  //   return Error if API failed
  if (slugAPIError) return <p>Validaton Slug API Failed</p>;
  if (addEditCategoryError) return <p> Category API Failed</p>;

  return (
    <>
      {notify && (
        <Notify
          message={notifyMessage}
          type={notifyType}
          notify={notify}
          closeNotify={() => setNotify(false)}
        />
      )}

      <CustomModal
        title="Add Category"
        buttonText="Add Category"
        open={addCategoryModal}
        onClose={toggleCategoryModal}
        paperStyle={{
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "45vw",
          position: "absolute",
        }}
        scrollbarStyle={{
          height: "100%",
          maxHeight: "80vh",
          overflowX: "hidden",
          borderRadius: "8px",
        }}
      >
        <Stack sx={{ p: "0 40px 40px" }}>
          <Grid container>
            <Grid item xs={12} sx={{ m: "24px 0" }}>
              <TdTextField
                name="category"
                label="Category Name"
                value={categoryName}
                onChange={handleChange}
                onKeyUp={handleOnKeyUp}
                onKeyDown={handleOnKeydown}
                error={errors.categoryError === "" ? false : true}
                helperText={errors.categoryError}
              />
            </Grid>
          </Grid>

          <Grid container>
            <Grid item xs={12} sx={{ display: "flex", mb: "18px" }}>
              <TdTextField
                name="slug"
                label="Category Slug"
                value={slug}
                onChange={handleChange}
                onKeyUp={handleOnKeyUp}
                onKeyDown={handleOnKeydown}
                error={errors.slugError === "" ? false : true}
                helperText={errors.slugError}
              />
            </Grid>
          </Grid>

          <Grid container>
            <Grid item xs={12} sx={{ mb: "18px" }}>
              <Typography variant="h5">Description</Typography>
            </Grid>
          </Grid>

          <Grid container>
            <Grid item xs={12} sx={{ mb: "24px" }}>
              {richEditor ? (
                <RichEditor
                  value={description}
                  onEditorChange={(event: string) => setDescription(event)}
                />
              ) : (
                <TdTextField
                  name="description"
                  label="Category description"
                  value={description}
                  onChange={handleChange}
                  multiline={true}
                  rows={4}
                />
              )}
            </Grid>
          </Grid>

          <Display />

          <Grid container>
            <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "end",
                mt: "22px",
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
                onClick={toggleCategoryModal}
              >
                Cancel
              </CustomButton>

              <CustomButton
                variant={"contained"}
                sx={{
                  p: "12px 24px",
                  ml: "12px",
                }}
                color={"secondary"}
                onClick={addEditCategory}
                disabled={
                  errors.categoryError === "" && errors.slugError === ""
                    ? false
                    : true
                }
              >
                Add Category
              </CustomButton>
            </Grid>
          </Grid>
        </Stack>
      </CustomModal>
    </>
  );
};

export default AddCategory;
