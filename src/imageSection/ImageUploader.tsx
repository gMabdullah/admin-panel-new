import React from "react";
import { makeStyles } from "@mui/styles";
import {
  CircularProgress,
  IconButton,
  Input,
  InputLabel,
  FormControl,
} from "@mui/material";
import BackupIcon from "@mui/icons-material/Backup";
const useStyles = makeStyles((theme: { spacing: (arg0: number) => any }) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  //   input: {
  //     display: "none",
  //   },
  imagePreview: {
    maxWidth: "100%",
    maxHeight: "100%",
  },
}));
const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  const file = event.target.files?.[0];
  if (!file) {
    return;
  }

  // if (beforeUpload(file)) {
  //   setLoading(true);
  //   getBase64(file, (url) => {
  //     setLoading(false);
  //     setImageUrl(url);
  //   });
  // }
};
const ImageUploader = () => {
  const classes = useStyles();

  return (
    <>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="upload-button">Upload</InputLabel>
        <Input
          {...{
            id: "upload-button",
            type: "file",
            accept: "image/*",
            onChange: handleChange,
            //  className: classes.input,
          }}
        />
        <IconButton color="primary" component="span">
          <BackupIcon />
        </IconButton>
        {/* {imageUrl && (
        <img src={imageUrl} alt="preview" className={classes.imagePreview} />
      )} */}
      </FormControl>
    </>
  );
};

export default ImageUploader;
