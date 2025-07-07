import { Box, Button, CardMedia, Grid, Typography } from "@mui/material";
import React, { useContext, useEffect } from "react";
import { Postscontext } from "../Context/Context";
import { Link, useNavigate } from "react-router-dom";
import { Check, Close } from "@mui/icons-material";

const Home = () => {
  const { fetchcategory, category } = useContext(Postscontext);
  useEffect(() => {
    fetchcategory();
  }, []);
  console.log(category);
  const allcategory = category.map((itm, index) => ({
    ...itm,
    img: `/category${index}.svg`,
  }));
  let navigate = useNavigate();
  return (
    <>
      <CardMedia image="/hero.svg" component="img"></CardMedia>
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
          Welcome to Maison Douce
        </Typography>
        <Typography
          variant="h6"
          component="h1"
          sx={{ fontSize: "1.5rem", mb: "1.5rem" }}
        >
          Share your sweet recipes and let us taste your creativity!
        </Typography>
        <Link to="/Category">
          <Button
            variant="contained"
            sx={{
              backgroundColor: "secondary.contrastText",
              textTransform: "capitalize",
              fontFamily: "Playfair Display",
              fontWeight: 600,
              fontSize: "1.125rem",
              color: "primary.light",
              boxShadow: " 0 4px 8px rgba(0, 0, 0, 0.2)",
            }}
          >
            Start Blogging
          </Button>
        </Link>
      </Box>
      <Box sx={{ px: 11, py: 6, backgroundColor: "#F3EFEF" }}>
        <Typography
          variant="h4"
          component="h1"
          sx={{
            color: "primary.contrastText",
            fontSize: "1.75rem",
            textAlign: "center",
          }}
        >
          Recipes Shared by Our Community
        </Typography>
        <Typography
          variant="h6"
          component="h2"
          sx={{
            color: "primary.contrastText",
            fontSize: "1.1rem",
            textAlign: "center",
            mb: 5,
            mt: 2,
          }}
        >
          Browse by category and try what others love to bake.
        </Typography>
        <Grid container spacing={2} justifyContent="center">
          {allcategory.map((itm, index) => (
            <Grid
              onClick={() => navigate(`category?catid=${itm.id}`)}
              sx={{
                width: {
                  xs: "50%",
                  sm: "33.33%",
                  md: "15%",
                },
              }}
              key={index}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "1px solid",
                  borderColor: "primary.contrastText",
                  borderRadius: "50%",
                  width: 192,
                  height: 192,
                  p: 2,
                  mx: "auto",
                  boxShadow: " 0 4px 8px rgba(0, 0, 0, 0.2)",
                }}
                onClick={() => navigate(`category?catid=${itm.id}`)}
              >
                <CardMedia
                  image={itm.img}
                  component="img"
                  sx={{ width: 160 }}
                ></CardMedia>
              </Box>
              <Typography
                variant="h6"
                sx={{
                  textAlign: "center",
                  pt: "1rem",
                  color: "primary.contrastText",
                }}
              >
                {itm.name}
              </Typography>
            </Grid>
          ))}
        </Grid>
      </Box>
      <Box sx={{ display: "flex", mx: 11, py: 6, gap: 4 }}>
        <CardMedia
          image="public/makecake.png"
          component="img"
          sx={{ width: "400px" }}
        ></CardMedia>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 4,
            textAlign: "center",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h4"
            sx={{ color: "primary.contrastText", fontSize: "1.75rem" }}
          >
            Maison Douce – A Place for Sweet Creations
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: "primary.dark",
            }}
          >
            Whether you're a seasoned baker or just starting out, Maison Douce
            is your cozy corner on the web to share, discover, and fall in love
            with pastries. From fluffy cinnamon rolls to delicate macarons –
            your recipes belong here.
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: "primary.contrastText",
              px: 2,
              py: 1,
              borderRadius: 4,
              fontSize: "1.25rem",
            }}
          >
            ✨ Ready to enjoy the full experience? Just follow these sweet
            steps:
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "30%",
              gap: 3,
              textAlign: "center",
              mx: "auto",
            }}
          >
            <Typography
              variant="h6"
              sx={(theme) => ({
                border: `1px solid ${theme.palette.primary.contrastText}`,
                color: `${theme.palette.primary.contrastText}`,
                px: 2,
                py: 1,
                borderRadius: 4,
                fontSize: "1.25rem",
              })}
            >
              👩‍🍳 Create an account
            </Typography>
            <Typography
              variant="h6"
              sx={(theme) => ({
                border: `1px solid ${theme.palette.primary.contrastText}`,
                color: `${theme.palette.primary.contrastText}`,
                px: 2,
                py: 1,
                borderRadius: 4,
                fontSize: "1.25rem",
              })}
            >
              ✏️ Add your recipes
            </Typography>
            <Typography
              variant="h6"
              sx={(theme) => ({
                border: `1px solid ${theme.palette.primary.contrastText}`,
                color: `${theme.palette.primary.contrastText}`,
                px: 2,
                py: 1,
                borderRadius: 4,
                fontSize: "1.25rem",
              })}
            >
              🌍 Share with the world
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Home;
