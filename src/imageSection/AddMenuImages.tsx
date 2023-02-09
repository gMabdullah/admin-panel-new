import React, { useEffect, useState } from "react";

import {
  Card,
  Grid,
  IconButton,
  Typography,
  CardMedia,
  Divider,
} from "@mui/material";
import { HighlightOffTwoTone as CloseIcon } from "@mui/icons-material";

import useAxios from "axios-hooks";

import CustomModal from "components/CustomModal";
import ImageUploader from "./ImageUploader";
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
  /// [props: string]: string;
}

const AddMenuImages = ({ imageUrl, itemId }: addImagesPropType) => {
  const [imageModal, setToggleImageModal] = useState(false);
  const [itemDetailImages, setItemDetailImages] = useState([]);
  const [selectedFile, setSelectedFile] = useState<any>();
  const hasAlpha = (
    context: CanvasRenderingContext2D | null,
    canvas: HTMLCanvasElement
  ) => {
    let data =
        context && context.getImageData(0, 0, canvas.width, canvas.height).data,
      hasAlphaPixels = false;

    if (data) {
      const n = data.length;
      for (var i = 3; i < n; i += 4) {
        if (data[i] < 255) {
          hasAlphaPixels = true;
          break;
        }
      }
    }
    return hasAlphaPixels;
  };
  const sharpen = (
    ctx: {
      createImageData: (arg0: any, arg1: any) => any;
      getImageData: (
        arg0: number,
        arg1: number,
        arg2: any,
        arg3: any
      ) => { (): any; new (): any; data: any };
      putImageData: (arg0: any, arg1: number, arg2: number) => void;
    },
    w: number,
    h: number,
    mix: number
  ) => {
    var x,
      sx,
      sy,
      r,
      g,
      b,
      a,
      dstOff,
      srcOff,
      wt,
      cx,
      cy,
      scy,
      scx,
      weights = [0, -1, 0, -1, 5, -1, 0, -1, 0],
      katet = Math.round(Math.sqrt(weights.length)),
      half = (katet * 0.5) | 0,
      dstData = ctx.createImageData(w, h),
      dstBuff = dstData.data,
      srcBuff = ctx.getImageData(0, 0, w, h).data,
      y = h;

    while (y--) {
      x = w;
      while (x--) {
        sy = y;
        sx = x;
        dstOff = (y * w + x) * 4;
        r = 0;
        g = 0;
        b = 0;
        a = 0;

        for (cy = 0; cy < katet; cy++) {
          for (cx = 0; cx < katet; cx++) {
            scy = sy + cy - half;
            scx = sx + cx - half;

            if (scy >= 0 && scy < h && scx >= 0 && scx < w) {
              srcOff = (scy * w + scx) * 4;
              wt = weights[cy * katet + cx];

              r += srcBuff[srcOff] * wt;
              g += srcBuff[srcOff + 1] * wt;
              b += srcBuff[srcOff + 2] * wt;
              a += srcBuff[srcOff + 3] * wt;
            }
          }
        }

        dstBuff[dstOff] = r * mix + srcBuff[dstOff] * (1 - mix);
        dstBuff[dstOff + 1] = g * mix + srcBuff[dstOff + 1] * (1 - mix);
        dstBuff[dstOff + 2] = b * mix + srcBuff[dstOff + 2] * (1 - mix);
        dstBuff[dstOff + 3] = srcBuff[dstOff + 3];
      }
    }

    ctx.putImageData(dstData, 0, 0);
  };
  const dataURLtoFile = (dataurl: string, filename: string) => {
    const arr = dataurl.split(",");
    if (arr[0].length > 0) {
      let mime = null;
      const match = arr[0].match(/:(.*?);/);
      if (match) {
        mime = match[1];
      }
      const bstr = atob(arr[1]);

      let n = bstr.length;
      const u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new File([u8arr], filename, { type: mime as string });
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }
    const fileName = file.name;
    let size = file.size;
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);

    //const imageUrl = reader.readAsDataURL(file);

    reader.onload = () => {
      if (reader.readyState === FileReader.DONE && reader.result) {
        const img = new Image();
        img.src = URL.createObjectURL(new Blob([reader.result]));

        img.onload = async () => {
          let imagePixel2D = document.createElement("canvas");
          let create2dCanvas = document.createElement("canvas");
          let htmlCanvasElement = document.createElement("canvas");
          if (img.width < 600 && img.height < 600) {
            return false;
          }
          let large = img.width > img.height ? img.width : img.height;

          const factor = large > 1000 ? large / 1000 : large / large;

          const factor2 = large / 200;
          const smallImage = img.width < img.height ? img.width : img.height;
          const difference = large / smallImage;
          create2dCanvas.width = img.width / factor;
          create2dCanvas.height = img.height / factor;
          htmlCanvasElement.width = img.width / factor2;
          htmlCanvasElement.height = img.height / factor2;
          const canvasRenderingContext2d = create2dCanvas.getContext("2d");
          let draw2dImages = htmlCanvasElement.getContext("2d");
          if (canvasRenderingContext2d) {
            canvasRenderingContext2d.fillStyle = "transparent";
            canvasRenderingContext2d.drawImage(
              img,
              0,
              0,
              img.width / factor,
              img.height / factor
            );
          }
          if (draw2dImages) {
            draw2dImages.fillStyle = "transparent";
            draw2dImages.drawImage(
              img,
              0,
              0,
              img.width / factor2,
              img.height / factor2
            );
          }
          let isTransparent = hasAlpha(canvasRenderingContext2d, imagePixel2D);
          if (isTransparent) {
            let fullQuality =
              canvasRenderingContext2d &&
              canvasRenderingContext2d.canvas.toDataURL("image/png", 1);

            let thumbnail =
              draw2dImages && draw2dImages.canvas.toDataURL("image/png", 1);
            let compressedFile = dataURLtoFile(
              fullQuality as string,
              `${fileName.slice(0, fileName.length - 4)}.png`
            );
            // if (thumbnail !== undefined) {
            //   thumbnail = dataURLtoFile(
            //     thumbnail as string,
            //     `${fileName.slice(0, fileName.length - 4)}.png`
            //   );
            // }
          } else {
            sharpen(
              canvasRenderingContext2d as any,
              create2dCanvas.width,
              create2dCanvas.height,
              0.1
            );
            let fullQuality;
            let compressedFile;
            let thumbnail;
            fullQuality =
              canvasRenderingContext2d &&
              canvasRenderingContext2d.canvas.toDataURL("image/jpeg", 0.8);
            compressedFile = dataURLtoFile(
              fullQuality as string,

              `${fileName.slice(0, fileName.length - 5)}.jpeg`
            );
            thumbnail =
              draw2dImages && draw2dImages.canvas.toDataURL("image/jpeg", 0.9);
            thumbnail = dataURLtoFile(
              thumbnail as string,

              `${fileName.slice(0, fileName.length - 5)}.jpeg`
            );
          }
        };
      }
    };
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
    const { data } = await singleItemAPICall({
      url: `/product_details?business_id=${
        getLocalStorage().eatout_id
      }&item_id=${itemId}&admin_id=${getLocalStorage().user_id}&source=biz`,
    });

    if (
      data &&
      Array.isArray(data.items) &&
      Array.isArray(data.items[0].images)
    )
      setItemDetailImages(data.items[0].images);
  };

  const toggleImageModal = () => {
    setToggleImageModal((prevState) => !prevState);
  };

  return (
    <>
      {imageModal && (
        <CustomModal open={imageModal} onClose={toggleImageModal}>
          <Grid container>
            <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                p: "40px 40px 0 !important",
              }}
            >
              <Typography variant={"h3"}>Item Images</Typography>

              <IconButton onClick={toggleImageModal} sx={{ p: "unset" }}>
                <CloseIcon htmlColor="#D84315" fontSize="large" />
              </IconButton>
            </Grid>
          </Grid>

          <Divider sx={{ m: "16px 40px 32px" }} />

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
