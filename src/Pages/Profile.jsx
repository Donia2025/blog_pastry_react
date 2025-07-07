import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import { Postscontext } from "../Context/Context";

export default function Profile() {
  const { userdatalogin } = React.useContext(Postscontext);
  const theme = useTheme();
  console.log(userdatalogin);
  return (
    <Box>
      {userdatalogin?.recipes?.length > 0 &&
        userdatalogin.recipes.map((postuser, index) => (
          <Card sx={{ display: "flex", mt: 12, width: "75%" }} key={index}>
            <Box sx={{ display: "flex", width: "100%" }}>
              <CardMedia
                component="img"
                sx={{ width: 151 }}
                image={postuser.images[0].img_url}
                alt="Live from space album cover"
              />
              <Box
                sx={{ display: "flex", flexDirection: "column", width: "100%" }}
              >
                <Typography component="div" variant="h5">
                  {postuser.title}{" "}
                </Typography>
                <Typography
                  gutterBottom
                  variant="body2"
                  component="h3"
                  sx={{
                    color: "primary.dark",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    mb: 2,
                    height: "60px",
                  }}
                >
                  {postuser.intro}
                </Typography>
              </Box>
            </Box>
          </Card>
        ))}
    </Box>
  );
}
