import { Translate } from "@mui/icons-material";
import { Box, Button, CardMedia, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
const Emptystate = () => {
  return (
    <>
      <Box sx={{ display: "flex", position: "absolute", bottom: 0, mt:11,mx:11 }}>
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
          image="/empty.svg"
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
              width: "90%",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <Typography
              variant="h4"
              component="h1"
              sx={{ fontSize: "2rem", mb: "1.5rem" }}
            >
              Oops! No posts in this space.{" "}
            </Typography>
            <Typography
              variant="h6"
              component="h1"
              sx={{ fontSize: "1.5rem", mb: "1.5rem" }}
            >
              Be the trendsetter—start the conversation with your first post!{" "}
            </Typography>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "secondary.contrastText",
                  textTransform: "capitalize",
                  fontFamily: "Playfair Display",
                  fontWeight: 600,
                  width:"30%",
                  fontSize: "1.125rem",
                  color: "primary.light",
                }}
              >
                Start posting{" "}
              </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Emptystate;
