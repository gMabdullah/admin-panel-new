import React from 'react'
import {  Box, Grid, Typography } from '@mui/material'
import CustomModal from 'components/CustomModal'
import { makeStyles } from "@mui/styles";
import CustomButton from 'components/CustomButton';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
const useStyles = makeStyles({
    modal: {
        position: 'absolute',
        width: 745,
        height: 350,
        left: 'calc(50% - 372.5px)',
        top: 'calc(50% - 175px)',
        background: '#FFFFFF',
        boxShadow: '0px 0px 36px rgba(0, 0, 0, 0.13)',
        borderRadius: 12,
    },
    box: {  
        boxSizing: 'border-box',
      //  position: 'absolute',
                height: '123px',
       // left: '40px',
//top:"32px",
        background: '#FAFAFA',
        border: '0.58216px dashed rgba(0, 0, 0, 0.23)',
        borderRadius: '4.65728px',
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin:"20px !important"
      },
      button:{
       alignItem:"center",
       justifyContent:"center",
       width: "144px",
       height: "36px",
       background: "#FFFFFF",
       border: "1px solid #DB154D",

      },

})
const ImportMenuExcel=()=> {
    const classes = useStyles()
    debugger;
  return (
    <CustomModal title={<Typography variant="h3">
          Import Menu Items(Excel File)
      </Typography>}
      open={true}
      paperStyle={{
          position: 'absolute',
          width: 745,
          height: 350,
          left: 'calc(50% - 372.5px)',
          top: 'calc(50% - 175px)',
          background: '#FFFFFF',
          boxShadow: '0px 0px 36px rgba(0, 0, 0, 0.13)',
      }} 
     

          >
               <Box className={classes.box}>
                <CustomButton  variant={"outlined"} color={"secondary"} startIcon={<CloudUploadIcon sx={{marginBottom:"2px"}}/>}
>
                    <Typography>

                    Choose File
                    </Typography>
                </CustomButton>
                </Box>
               
          </CustomModal>

  )
}

export default ImportMenuExcel