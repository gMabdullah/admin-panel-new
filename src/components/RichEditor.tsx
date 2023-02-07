import React from "react";

import { Grid } from "@mui/material";

import { Editor } from "@tinymce/tinymce-react";
import Compressor from "compressorjs";
import useAxios from "axios-hooks";

import { TINY_EDITOR_API_KEY } from "../constants";

import { formatDate, getLocalStorage } from "orders/HelperFunctions";
import { AWS_BUCKET_URL } from "config";

interface EditorProps {
  value?: string;
  initialValue?: string;
  onEditorChange: any;
  initials?: object;
  sx?: object;
}

interface imageAPIProps {
  imageType: string;
  imageTableType: string;
  resize: number;
  files: File[];
  im_date: string;
}

const RichEditor = ({
  value,
  initialValue,
  onEditorChange,
  initials,
  sx,
}: EditorProps) => {
  const { eatout_id, user_id } = getLocalStorage();

  const payload = ({
    imageType,
    imageTableType,
    resize,
    files,
    im_date,
  }: imageAPIProps) => {
    const formData = new FormData();
    formData.append("eatout_id", eatout_id);

    formData.append("image_type", imageType);
    formData.append("im_type", imageTableType);
    formData.append("resize", `${resize}`);

    if (imageTableType === "bulk") {
      for (let index = 0; index < files.length; index++) {
        const filterImagesFromData = files[index];
        formData.append("files", filterImagesFromData);
      }
    } else {
      formData.append("files", `${files}`);
    }

    formData.append("admin_id", `${user_id}`);
    formData.append("source", "biz");
    return formData;
  };

  // uploadImageAWS
  const [
    { loading: imageLoading, error: imageUploadError },
    uploadImageToAWSAPI,
  ] = useAxios(
    {
      url: AWS_BUCKET_URL,
      method: "POST",
    },
    { manual: true }
  );

  const blobToDataURL = (
    blob: Blob,
    callback: {
      (dataurl: any): Promise<void>;
      (arg0: string | ArrayBuffer | null): any;
    }
  ) => {
    const fileReader = new FileReader();
    fileReader.onload = (e) => callback(e?.target?.result);
    fileReader.readAsDataURL(blob);
  };

  const dataURLtoFile = (dataurl: any, filename: string) => {
    const arr = dataurl.split(","),
      mime = dataurl.split(",").match(/:(.*?);/)[1],
      bstr = atob(arr[1]);
    let n = bstr.length,
      u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
  };

  // Image upload handling
  const imageUploadHandler = (blobInfo?: any, success?: any, failure?: any) => {
    if (blobInfo.blob()) {
      const fileName = blobInfo.blob().name;
      const fileType = blobInfo.blob().type;

      new Compressor(blobInfo.blob(), {
        strict: true,
        checkOrientation: true,
        maxWidth: undefined,
        maxHeight: undefined,
        minWidth: 0,
        minHeight: 0,
        width: 1000,
        height: 1000,
        quality: 0.8,
        mimeType: "auto",
        convertSize: 5000000,
        success(result) {
          blobToDataURL(result, async (dataurl: any) => {
            let compressedFile;
            if (fileType == "image/png") {
              compressedFile = dataURLtoFile(
                dataurl,
                `${fileName.slice(0, blobInfo.blob().name.length - 4)}.png`
              );
            } else {
              compressedFile = dataURLtoFile(
                dataurl,
                `${fileName.slice(0, blobInfo.blob().name.length - 4)}.jpg`
              );
            }

            try {
              let { data } = await uploadImageToAWSAPI({
                data: payload({
                  imageType: "images",
                  imageTableType: "bulk",
                  resize: 1,
                  files: [compressedFile],
                  im_date: formatDate(new Date()),
                }),
              });
              success(data[0].imageUrl);
            } catch (err) {
              failure(err);
            }
          });
        },

        error(err) {
          console.log("err", err);
          //   toast.error(err.message, toastOptions);
        },
      });
    } else {
      console.log("No image attached!");
      //   toast.error("No image attached!", toastOptions);
    }
  };

  if (imageUploadError) return <span>Image Uploading Failed</span>;

  return (
    <Grid
      item
      xs={12}
      sx={{
        display: "flex",
        mb: "24px",
        "& .tox-tinymce": {
          border: "1px solid rgba(0, 0, 0, 0.23)",
        },

        ...sx,
      }}
    >
      <Editor
        apiKey={TINY_EDITOR_API_KEY}
        initialValue={initialValue}
        value={value}
        onEditorChange={onEditorChange}
        init={{
          height: 300,
          width: "100%",
          plugins:
            "link image code lists fullscreen autolink table " +
            "preview autosave anchor media wordcount",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
          // images_upload_handler: imageUploadHandler,
          ...initials,
        }}
      />
    </Grid>
  );
};

export default RichEditor;
