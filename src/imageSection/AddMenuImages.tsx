import { Typography } from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import CustomModal from "components/CustomModal";
import React, { useState } from "react";
import ImageUploader from "./ImageUploader";

interface addImagesPropType {
  imageUrl?: string;
}
const AddMenuImages = ({ imageUrl }: addImagesPropType) => {
  const [imageModal, setToggleImageModal] = useState(false);
  const toggleImageModal = () => {
    setToggleImageModal((prevState) => !prevState);
  };
  return (
    <div>
      {" "}
      {imageModal && (
        <CustomModal
          children={<ImageUploader />}
          open={imageModal}
          title={
            <>
              <Typography variant={"h5"}>Item Images</Typography>
              <ImageUploader />
            </>
          }
        />
      )}
      <CardMedia
        component="img"
        image={imageUrl}
        alt="Burger"
        onClick={toggleImageModal}
        sx={{
          height: "52px",
          width: "52px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      />
    </div>
  );
};

export default AddMenuImages;
