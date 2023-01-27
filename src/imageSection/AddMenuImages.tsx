import React, { useState } from "react";

import { Card, Stack, Typography } from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import CustomModal from "components/CustomModal";
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
          open={imageModal}
          paperStyle={{
            position: "absolute",
            width: 745,
            height: 350,
            left: "calc(50% - 372.5px)",
            top: "calc(50% - 175px)",
            background: "#FFFFFF",
            boxShadow: "0px 0px 36px rgba(0, 0, 0, 0.13)",
          }}
          title={
            <>
              <Typography variant={"h3"}>Item Images</Typography>
            </>
          }
        >
          <>
            <Stack
              flexDirection={"row"}
              spacing={3}
              alignItems={"center"}
              padding={3.5}
            >
              <Card
                sx={{
                  width: "123px",
                  height: "123px",
                  background: "#FAFAFA",
                  borderRadius: "4.65728px",
                }}
              >
                <CardMedia component="img" alt="Burger" src={imageUrl} />
              </Card>

              <ImageUploader />
            </Stack>
          </>
        </CustomModal>
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
