import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";

import {
  Box,
  Typography,
  Grid,
  CardActionArea,
  CardMedia,
  Card,
} from "@mui/material";

import MainCard from "components/cards/MainCard";
import CustomButton from "components/CustomButton";
import TdTextField from "components/TdTextField";
import { clearStorage } from "orders/HelperFunctions";

const BusinessListing = () => {
  let timeOut: NodeJS.Timeout;
  const navigate = useNavigate();
  const [businesses, setBusinesses] = useState(
    JSON.parse(localStorage.getItem("allBusinessesInfo")!)
  );

  const handleLogout = async () => {
    navigate("/");
    clearStorage();
  };

  const handleBusinessSelection = (cardIndex: number) => {
    localStorage.setItem("businessInfo", JSON.stringify(businesses[cardIndex]));
    navigate("/orders");
  };

  const handleSearchChange = (e: { target: { value: string } }) => {
    clearTimeout(timeOut); // to stop setting Timeout on typing of every single character

    timeOut = setTimeout(() => {
      if (e.target.value) {
        setBusinesses(
          businesses.filter((business: any) =>
            business.eatout_name
              .toLowerCase()
              .includes(e.target.value.toLowerCase())
          )
        );
      } else {
        setBusinesses(JSON.parse(localStorage.getItem("allBusinessesInfo")!));
      }
    }, 1000);
  };

  return localStorage.getItem("tdLogin") ? (
    <MainCard
      dividerSX={{ m: "unset", display: "none" }}
      headerSX={{ p: "unset !important", mb: "30px" }}
      contentSX={{
        "& .MuiCardContent-root": {
          p: "unset !important",
        },
        m: "unset",
        p: "unset !important",
      }}
      sx={{
        m: "unset",
        borderRadius: "unset",
        p: "32px",
        border: "none",
      }}
      title={
        <Grid container>
          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Grid
              item
              xs={11}
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Typography variant="h2">Businesses</Typography>

              <TdTextField
                type="search"
                placeholder="Search Profile"
                onChange={handleSearchChange}
                sx={{
                  width: "260px",
                  height: "44px",
                  marginLeft: "24px",

                  "& .MuiOutlinedInput-input": {
                    background: "#F5F5F5",
                    padding: "10px 16px 10px 0px !important",
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    border: "unset",
                  },
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "#F5F5F5",
                  },
                }}
              />
            </Grid>

            <Grid
              item
              xs={1}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "end",
              }}
            >
              <CustomButton
                variant={"contained"}
                color={"secondary"}
                onClick={handleLogout}
                sx={{
                  p: "12px 32px",
                }}
              >
                Logout
              </CustomButton>
            </Grid>
          </Grid>
        </Grid>
      }
    >
      <Box
        sx={{
          borderRadius: "8px",
          p: "24px 30px",
          background: "#E5E7EB",
        }}
      >
        <Grid container spacing={{ xs: 1 }} columns={{ xs: 4 }}>
          {businesses &&
            businesses.map((business: BusinessInfo, cardIndex: number) => (
              <Grid
                item
                xs={1}
                key={cardIndex}
                sx={{
                  p: "8px 0px 0px  8px !important",
                }}
              >
                <Card
                  sx={{
                    background: "#FFFFFF",
                    border: "1px solid rgba(0, 0, 0, 0.16)",
                    borderRadius: "8px",
                  }}
                >
                  <CardActionArea
                    sx={{ p: "8px" }}
                    onClick={() => handleBusinessSelection(cardIndex)}
                  >
                    <Grid
                      item
                      xs={12}
                      sx={{ display: "flex", alignItems: "center" }}
                    >
                      <CardMedia
                        component="img"
                        image={business.eatout_logo}
                        alt="Logo"
                        sx={{
                          height: "56px",
                          width: "56px",
                          borderRadius: "8px",
                          mr: "12px",
                          p: "3px",
                          border: "1px solid rgba(0, 0, 0, 0.12)",
                          objectFit: "contain",
                        }}
                      />

                      <Typography
                        variant="body1"
                        sx={{
                          color: "#212121",
                        }}
                      >
                        {business.eatout_name}
                      </Typography>
                    </Grid>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
        </Grid>
      </Box>
    </MainCard>
  ) : (
    <Navigate to="/" />
  );
};

export default BusinessListing;
