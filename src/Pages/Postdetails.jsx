import { Box, CardMedia, Grid, Typography } from "@mui/material";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Postscontext } from "../Context/Context";

import { useLocation, useParams } from "react-router-dom";
import Loadingstate from "./Loadingstate";

export default function Postdetails() {
  const location = useLocation();
  const { myData } = location.state || {};
  console.log("myData", myData);
  const { id } = useParams();
  const [postdetails, setpostdetails] = useState({});
  const [postdetails_user, setpostdetails_user] = useState({});
  const [postdetails_category, setpostdetails_category] = useState({});
  const [postdetails_images, setpostdetails_images] = useState([]);
  const { setstateloading, stateloadind } = useContext(Postscontext);

  useEffect(() => {
    const fetchpostdetails = async () => {
      setstateloading(true);
      await new Promise((res) => setTimeout(res, 200));
      try {
        const { data } = await axios.get(
          `http://localhost:1337/api/recipes/${id}`
        );

        setpostdetails(data);
        setpostdetails_user(data.user);
        setpostdetails_category(data.category);
        setpostdetails_images(data.images);
      } catch (err) {
        console.log(err);
      } finally {
        setstateloading(false);
      }
    };
    fetchpostdetails();
  }, [id]);
  console.log(stateloadind);
  return (
    <>
      {stateloadind ? (
        <Loadingstate />
      ) : (
        <Box sx={{ mt: 13, mb: 3, mx: 11 }}>
          <Box
            sx={{
              display: "flex",
              color: "primary.dark",
              marginBottom: "0.5rem",
            }}
          >
            <Typography
              variant="h3"
              sx={{ fontSize: "1rem", textTransform: "capitalize" }}
            >
              <Typography
                variant="h5"
                component="span"
                sx={{ color: "primary.contrastText", fontSize: "1rem" }}
              >
                Author:{" "}
              </Typography>
              {postdetails_user.username}
            </Typography>
            {/*  */}
            <Typography
              variant="h3"
              sx={{ fontSize: "1rem", paddingLeft: "0.75rem" }}
            >
              <Typography
                variant="h5"
                component="span"
                sx={{ color: "primary.contrastText", fontSize: "1rem" }}
              >
                Published:
              </Typography>
              {new Date(postdetails.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}{" "}
            </Typography>
            {/*  */}
            <Typography variant="h3" sx={{ fontSize: "1rem" }}>
              <Typography
                variant="h5"
                component="span"
                sx={{
                  color: "primary.contrastText",
                  fontSize: "1rem",
                  paddingLeft: "0.75rem",
                }}
              >
                Updated:{" "}
              </Typography>
              {new Date(postdetails.updatedAt).toLocaleString("en-Us", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}{" "}
            </Typography>
          </Box>
          <Box sx={{ borderTop: "1px solid #ccc", mb: 2 }} />
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid size={{ xs: 6, md: 4 }}>
              <CardMedia
                sx={{
                  height: { xs: 208, sm: 258, md: 308, lg: 508 },
                  borderRadius: 1,
                  objectFit: "cover",
                  objectPosition: "center",
                }}
                component="img"
                image={postdetails_images[0]?.img_url}
                title="img1"
              />
            </Grid>
            <Grid size={{ xs: 6, md: 4 }}>
              <CardMedia
                sx={{
                  height: { xs: 208, sm: 258, md: 308, lg: 508 },
                  borderRadius: 1,
                  objectFit: "cover",
                  objectPosition: "center",
                }}
                component="img"
                image={postdetails_images[1]?.img_url}
                title=" img2"
              />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <Grid container rowSpacing={1} columnSpacing={{ xs: 2, md: 3 }}>
                <Grid size={{ xs: 6, md: 12 }}>
                  <CardMedia
                    sx={{
                      height: { xs: 208, sm: 258, md: 150, lg: 250 },
                      borderRadius: 1,
                      objectFit: "cover",
                      objectPosition: "center",
                    }}
                    component="img"
                    image={postdetails_images[2]?.img_url}
                    title="img3"
                  />
                </Grid>
                <Grid size={{ xs: 6, md: 12 }}>
                  <CardMedia
                    sx={{
                      height: { xs: 208, sm: 258, md: 150, lg: 250 },
                      borderRadius: 1,
                      objectFit: "cover",
                      objectPosition: "center",
                    }}
                    component="img"
                    image={postdetails_images[3]?.img_url}
                    title="img4"
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 1,
            }}
          >
            <Typography
              variant="h4"
              component="h1"
              sx={{
                color: "primary.contrastText",
                fontSize: "1.75rem",
                marginBottom: 2,
              }}
            >
              {postdetails.title}{" "}
            </Typography>
            <Typography
              variant="h1"
              sx={{
                color: "primary.light",
                backgroundColor: "primary.contrastText",
                borderRadius: 1,
                px: 2,
                py: 1,
                textAlign: "center",
                fontSize: "1rem",
              }}
            >
              {postdetails_category?.name || myData}
            </Typography>
          </Box>
          <Typography
            variant="h3"
            sx={{
              color: "primary.dark",
              fontSize: "1.25rem",
              marginBottom: 4,
            }}
          >
            {postdetails.intro}
          </Typography>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Grid size={6}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Typography
                  variant="h4"
                  component="h1"
                  sx={{
                    color: "primary.contrastText",
                    fontSize: "1.5rem",
                    marginBottom: 2,
                  }}
                >
                  Preparation Method
                </Typography>
                <Typography
                  variant="h3"
                  sx={{
                    color: "primary.dark",
                    whiteSpace: "pre-line",
                    fontSize: "1.25rem",
                    marginBottom: 3,
                  }}
                >
                  {postdetails.description
                    ?.split("\n")
                    .filter((line) => line.trim() !== "")
                    .join("\n")}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Typography
                  variant="h4"
                  component="h1"
                  fontWeight=" medium"
                  sx={{
                    color: "primary.contrastText",
                    fontSize: "1.5rem",
                    marginBottom: 2,
                  }}
                >
                  Ingredient
                </Typography>
                <Typography
                  variant="h3"
                  sx={{
                    color: "primary.dark",
                    whiteSpace: "pre-line",
                    fontSize: "1.25rem",
                  }}
                >
                  {postdetails.ingredient
                    ?.split("\n")
                    .filter((line) => line.trim() !== "")
                    .join("\n")}
                </Typography>
              </Box>
            </Grid>
            <Grid size={3}></Grid>

            <Grid size={3}>
              <Box sx={{ position: "relative" }}>
                <CardMedia
                  component="img"
                  image="/Frame 1321318346.svg"
                  title="post img"
                  sx={{
                    width: 60,
                    height: 60,
                    position: "absolute",
                    zIndex: 3,
                    top: -30,
                    left: 35,
                  }}
                />
                <Box
                  sx={{
                    display: "flex",
                    backgroundColor: "primary.main",
                    paddingLeft: 3,
                    paddingTop: 5,
                    paddingBottom: 2,
                    borderRadius: 1,
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    position: "relative",
                    boxShadow: 5,
                  }}
                >
                  <Box
                    xs={{ display: "flex", flexDirection: "column", gap: 1 }}
                  >
                    <Typography
                      variant="h4"
                      component="h1"
                      sx={{
                        color: "primary.light",
                        fontSize: "1.25rem",
                        marginBottom: 1,
                      }}
                    >
                      Difficulty{" "}
                    </Typography>
                    <Typography
                      variant="h1"
                      sx={{
                        color: "primary.contrastText",
                        backgroundColor: "primary.light",
                        borderRadius: 1,
                        px: 2,
                        py: 1,
                        width: "30%",

                        textAlign: "center",
                        fontSize: "1rem",
                      }}
                    >
                      {postdetails.difficulty}{" "}
                    </Typography>
                  </Box>
                  {/*  */}
                  <Box
                    xs={{ display: "flex", flexDirection: "column", gap: 1 }}
                  >
                    <Typography
                      variant="h4"
                      component="h1"
                      sx={{
                        color: "primary.light",
                        fontSize: "1.25rem",
                        marginBottom: 1,
                      }}
                    >
                      Preparation Time{" "}
                    </Typography>
                    <Typography
                      variant="h1"
                      sx={{
                        color: "primary.contrastText",
                        backgroundColor: "primary.light",
                        borderRadius: 1,
                        px: 2,
                        py: 1,
                        width: "30%",

                        textAlign: "center",
                        fontSize: "1rem",
                      }}
                    >
                      {postdetails.preparation_time} Min{" "}
                    </Typography>
                  </Box>
                  {/*  */}
                  <Box
                    xs={{ display: "flex", flexDirection: "column", gap: 1 }}
                  >
                    <Typography
                      variant="h4"
                      component="h1"
                      sx={{
                        color: "primary.light",
                        fontSize: "1.25rem",
                        marginBottom: 1,
                      }}
                    >
                      Baking Time{" "}
                    </Typography>
                    <Typography
                      variant="h1"
                      sx={{
                        color: "primary.contrastText",
                        backgroundColor: "primary.light",
                        borderRadius: 1,
                        px: 2,
                        py: 1,
                        width: "30%",
                        textAlign: "center",
                        fontSize: "1rem",
                      }}
                    >
                      {postdetails.baking_time} Min{" "}
                    </Typography>
                  </Box>

                  {/*  */}
                  <Box
                    xs={{ display: "flex", flexDirection: "column", gap: 1 }}
                  >
                    <Typography
                      variant="h4"
                      component="h1"
                      sx={{
                        color: "primary.light",
                        fontSize: "1.25rem",
                        marginBottom: 1,
                      }}
                    >
                      Serves{" "}
                    </Typography>
                    <Typography
                      variant="h1"
                      sx={{
                        color: "primary.contrastText",
                        backgroundColor: "primary.light",
                        borderRadius: 1,
                        px: 2,
                        py: 1,
                        width: "30%",

                        textAlign: "center",
                        fontSize: "1rem",
                      }}
                    >
                      {postdetails.serves}{" "}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      )}
    </>
  );
}
