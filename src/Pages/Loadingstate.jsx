import * as React from "react";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import { Box, CardMedia, LinearProgress, Typography } from "@mui/material";

const Loadingstate = () => {
  return (
    <Box
      sx={{
        height: "100vh",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        m: 0,
        p: 0,
      }}
    >
      <CardMedia
        sx={{
          height: "200px",
          width: "150px",
          borderRadius: 1,
          objectFit: "contain",
          objectPosition: "center",
        }}
        component="img"
        image="/loading.png"
        title=" img2"
      />

      <Stack sx={{ width: "10%", color: "grey.500", mb: 1 }} spacing={2}>
        <LinearProgress color="secondary" />
      </Stack>
      <Typography
        variant="h4"
        component="h1"
        sx={{ fontSize: "2rem", color: "primary.contrastText" }}
      >
        Loading....{" "}
      </Typography>
    </Box>
  );
};

export default Loadingstate;
