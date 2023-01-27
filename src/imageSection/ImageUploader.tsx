import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import {
  CircularProgress,
  IconButton,
  Input,
  InputLabel,
  FormControl,
  CardContent,
  Grid,
  Fab,
  Card,
} from "@mui/material";
import BackupIcon from "@mui/icons-material/Backup";
export const useStyles = makeStyles(() => ({
  input: {
    display: "none",
  },
  card: {
    width: "123px",
    marginTop: "unset !important",

    height: "123px",
    background: "#FAFAFA",
    border: "0.58216px dashed rgba(0, 0, 0, 0.23)",
    borderRadius: "4.65728px",
  },
  icon: {
    color: "#DB154D",
    display: "flex",
    alignItem: "center",
    justifyContent: "center",
  },
  IconButton: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

const ImageUploader = () => {
  const classes = useStyles();
  const [selectedFile, setSelectedFile] = useState<any>();
  console.log("selectedFile", selectedFile);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    debugger;
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
    console.log("imageUrl", imageUrl); // Would see a path?
    setSelectedFile(file);
    // if (beforeUpload(file)) {
    //   setLoading(true);
    //   getBase64(file, (url) => {
    //     setLoading(false);
    //     setImageUrl(url);
    //   });
    // }
  };
  return (
    <>
      <Card className={classes.card}>
        <CardContent>
          <Grid container justifyContent="center">
            <input
              accept="image/*"
              className={classes.input}
              id="contained-button-file"
              multiple
              type="file"
              onChange={handleChange}
            />
          </Grid>
        </CardContent>
        <label htmlFor="contained-button-file" className={classes.IconButton}>
          <BackupIcon className={classes.icon} />
        </label>
      </Card>
    </>
  );
};

export default ImageUploader;
