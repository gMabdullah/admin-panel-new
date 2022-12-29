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

import {
  contentStyle,
  mainCardStyle,
  grid12Style,
  grid11Style,
  searchFieldStyle,
  grid1Style,
  businessListingBoxStyle,
  businessListingCardStyle,
  cardMediaStyle,
} from "./Styles";

import { debounce } from "lodash";

const BusinessListing = () => {
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

  const handleSearchChange = debounce((e: { target: { value: string } }) => {
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

  return localStorage.getItem("tdLogin") ? (
    <MainCard
      dividerSX={{ m: "unset", display: "none" }}
      headerSX={{ p: "unset !important", mb: "30px" }}
      contentSX={contentStyle}
      sx={mainCardStyle}
      title={
        <Grid container>
          <Grid item xs={12} sx={grid12Style}>
            <Grid item xs={11} sx={grid11Style}>
              <Typography variant="h2">Businesses</Typography>

              <TdTextField
                type="search"
                placeholder="Search Profile"
                onChange={handleSearchChange}
                sx={searchFieldStyle}
              />
            </Grid>

            <Grid item xs={1} sx={grid1Style}>
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
      <Box sx={businessListingBoxStyle}>
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
                <Card sx={businessListingCardStyle}>
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
                        sx={cardMediaStyle}
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
