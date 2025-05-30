import { Box, Button, CardMedia, Typography } from "@mui/material";
import React, { useContext } from "react";
import { Link } from "react-router-dom";

const Notfounfpage = () => {
 
  return (
    <>
      <Box sx={{ display: "flex", position: "absolute", bottom: 0 }}>
        <CardMedia
          sx={{
            height: {},
            width: "400px",
            height: "400px",
            borderRadius: 1,
            objectFit: "cover",
            objectPosition: "center",
            mr: 22,
          }}
          component="img"
          image="/not found.svg"
          title=" img2"
        />
      </Box>
      <Box
        sx={{ display: "flex", position: "absolute", left: "40%", top: "25%" }}
      >
        <Box sx={{ position: "relative" }}>
          <CardMedia
            sx={{
              height: "360px",
              width: "671px",
              borderRadius: 1,
              objectFit: "cover",
              objectPosition: "center",
            }}
            component="img"
            image="/Vector.svg"
            title=" img2"
          />
          <Box
            sx={{
              color: "primary.light",
              position: "absolute",
              top: "35%",
              left: "50%",
              width: "90%",

              transform: "translate(-50%, -50%)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <Typography varient="h4" component="h1" sx={{ fontSize: "10rem" }}>
              404
            </Typography>
            <Typography
              varient="h4"
              component="h1"
              sx={{ fontSize: "1.5rem", mb: "0.5rem" }}
            >
              Oops! Failed to load content.
            </Typography>
            <Typography
              varient="h6"
              component="h1"
              sx={{ fontSize: "1rem", mb: "1rem" }}
            >
              The page you’re looking for doesn’t exist or the URL is incorrect.
            </Typography>
            <Link to="/">
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "secondary.contrastText",
                  textTransform: "capitalize",
                  fontFamily: "Playfair Display",
                  fontWeight: 600,
                  fontSize: "1.125rem",
                  color: "primary.light",
                }}
              >
                Go Back Home
              </Button>
            </Link>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Notfounfpage;
