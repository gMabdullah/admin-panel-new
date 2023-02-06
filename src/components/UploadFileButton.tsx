import React, { useState } from "react";
import CustomButton from "./CustomButton";
import { TextField, Typography } from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

interface Props {
  onUpload: (file: File) => void;
}

const ExcelUploader: React.FC<Props> = ({ onUpload }) => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.target.files && event.target.files[0] && setFile(event.target.files[0]);
  };

  const handleUpload = () => {
    if (!file) {
      return;
    }
    onUpload(file);
  };

  return (
    <>
      <TextField
        type="file"
       // accept=".xls,.xlsx"
        onChange={handleFileChange}
        style={{ display: "none" }}
        ref={(input) => (input)}
      />
       {/* <CustomButton  variant={"outlined"} color={"secondary"} startIcon={<CloudUploadIcon sx={{marginBottom:"2px"}}/>}
>
                    <Typography>

                    Choose File
                    </Typography>
                </CustomButton> */}
      <CustomButton
        variant="contained"
        color="primary"
        onClick={handleUpload}
        disabled={!file}
      >
        Confirm Upload
      </CustomButton>
    </>
  );
};

export default ExcelUploader;
