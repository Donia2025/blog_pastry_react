import { Box, CardMedia, Grid, Typography } from "@mui/material";
import React, { useContext, useEffect } from "react";
import { Postscontext } from "../Context/Context";
import { useNavigate } from "react-router-dom";
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
      <Box sx={{ px: 11 ,py:6,backgroundColor:"#F3EFEF"}}>
        <Typography
          variant="h4"
          component="h1"
          sx={{
            color: "primary.main",
            fontSize: "1.75rem",
            textAlign: "center",
          }}
        >
          Category{" "}
        </Typography>
        <Grid container spacing={2} justifyContent="center">
          {allcategory.map((itm, index) => (
            <Grid sx={{    width: {
                  xs: "50%",   
                  sm: "33.33%", 
                  md: "15%",  
                },}} key={index}>
                  
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "1px solid",
                  borderColor: "primary.main",
                  borderRadius: "50%",
                  width: 192,
                  height: 192,
                  p: 2,
                  mx:"auto"
                }}
                onClick={() => navigate(`category?catid=${itm.id}`)}
              >
                <CardMedia
                  image={itm.img}
                  component="img"
                  sx={{ width: 160 }}
                ></CardMedia>
              </Box>
              <Typography sx={{ textAlign: "center", pt: "1rem" }}>
                {itm.name}
              </Typography>
            </Grid>
          ))}
        </Grid>
   {/*  */}
   
        </Box>
    </>
  );
};

export default Home;
