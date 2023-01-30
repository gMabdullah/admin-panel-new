import React, { useEffect, useState } from "react";

import { Card, Grid, Stack, Typography } from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import CustomModal from "components/CustomModal";
import ImageUploader from "./ImageUploader";
import useAxios from "axios-hooks";
import { getLocalStorage } from "orders/HelperFunctions";

interface addImagesPropType {
  imageUrl?: string;
  itemId?: string | number;
}
interface singleItemImages {
  image_thumbnail: string;
  image: string;
  image_id: string;
  image_position: string;
}

const AddMenuImages = ({ imageUrl, itemId }: addImagesPropType) => {
  const [imageModal, setToggleImageModal] = useState(false);
  const [itemDetailImages, setItemDetailImages] = useState([]);
  const [selectedFile, setSelectedFile] = useState<any>();
  console.log("selectedFile", selectedFile);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }
    const reader = new FileReader();
    const imageUrl = reader.readAsDataURL(file);
    reader.onloadend = () => {
      if (reader.result instanceof ArrayBuffer) {
        setSelectedFile([reader.result]);
      }
    };
    setSelectedFile(file);
    // if (beforeUpload(file)) {
    //   setLoading(true);
    //   getBase64(file, (url) => {
    //     setLoading(false);
    //     setImageUrl(url);
    //   });
    // }
  };
  // Api Call of Product Detail
  const [{}, singleItemAPICall] = useAxios(
    {
      method: "get",
    },
    { manual: true }
  );

  useEffect(() => {
    imageModal && getImages();
  }, [imageModal]);
  const getImages = async () => {
    const {
      // data,
      data: { items },
    } = await singleItemAPICall({
      url: `/product_details?business_id=${
        getLocalStorage().eatout_id
      }&item_id=${itemId}&admin_id=${getLocalStorage().user_id}&source=biz`,
    });
    setItemDetailImages(items[0].images);
  };
  const toggleImageModal = () => {
    setToggleImageModal((prevState) => !prevState);
  };
  return (
    <>
      {imageModal && (
        <CustomModal
          open={imageModal}
          paperStyle={{
            position: "absolute",
            width: 745,
            //   height: "fit-content",
            left: "calc(50% - 372.5px)",
            top: "calc(50% - 175px)",
            background: "#FFFFFF",
            boxShadow: "0px 0px 36px rgba(0, 0, 0, 0.13)",
          }}
          scrollbarStyle={{
            height: "fit-content",
          }}
          onClose={toggleImageModal}
          title={
            <>
              <Typography variant={"h3"}>Item Images</Typography>
            </>
          }
        >
          <>
            <Grid
              padding={4}
              container
              rowGap={3}
              //spacing={{ xs: 2, md: 3 }}
              columns={{ xs: 4, sm: 8, md: 12 }}
            >
              {itemDetailImages.map(
                (imagesData: singleItemImages, index: number) => (
                  <Grid item xs={3} key={index}>
                    <Card
                      sx={{
                        width: "123px",
                        height: "123px",
                        background: "#FAFAFA",
                        borderRadius: "4.65728px",
                      }}
                    >
                      <CardMedia
                        component="img"
                        alt="Burger"
                        src={imagesData.image_thumbnail}
                        sx={{
                          padding: "12px",
                        }}
                      />
                    </Card>
                  </Grid>
                )
              )}
              <ImageUploader handleChange={handleChange} />
            </Grid>

            {/* <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              <Grid item xs={6}>
                {itemDetailImages.map((imagesData: singleItemImages) => (
                  <Card
                    sx={{
                      width: "123px",
                      height: "123px",
                      background: "#FAFAFA",
                      borderRadius: "4.65728px",
                    }}
                  >
                    <CardMedia
                      component="img"
                      alt="Burger"
                      src={imagesData.image_thumbnail}
                    />
                  </Card>
                ))}
              </Grid>
              <Grid>
                <ImageUploader />
              </Grid>
            </Grid> */}
            {/* <Grid
              spacing={3}
              alignItems={"center"}
              padding={3.5}
              //  gridTemplateColumns={"1fr 1fr 1fr 1fr !important"}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr 1fr !important",
              }}
            >
              {itemDetailImages.map((imagesData: singleItemImages) => (
                <Card
                  sx={{
                    width: "123px",
                    height: "123px",
                    background: "#FAFAFA",
                    borderRadius: "4.65728px",
                  }}
                >
                  <CardMedia
                    component="img"
                    alt="Burger"
                    src={imagesData.image_thumbnail}
                  />
                </Card>
              ))}

              <ImageUploader />
            </Grid> */}
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
    </>
  );
};

export default AddMenuImages;
