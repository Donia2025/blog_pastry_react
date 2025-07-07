import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {
  Box,
  Dialog,
  DialogTitle,
  Tooltip,
  DialogContent,
  Avatar,
} from "@mui/material";
import { IconButton } from "@mui/material";

import {
  CloseRounded,
  DeleteOutlineRounded,
  EditAttributesOutlined,
  EditOutlined,
  EditSquare,
} from "@mui/icons-material";
import axios from "axios";
import { Postscontext } from "../Context/Context";
import { useSearchParams } from "react-router-dom";
import { closeSnackbar, useSnackbar } from "notistack";
import MycustomeSnackbar from "./MycustomeSnackbarSucess";
import MycustomeSnackbarField from "./MycustomeSnackbarFaild";

export default function MediaCard({
  post,
  isuserid,
  usename,
  currentpage,
  recipename,
  handleOpen,
  setmood,
  mood,setidedit,categoryid
}) {
  const [idpostselete, setidpostdelete] = React.useState("");
  const { fetchposts ,useimag} = React.useContext(Postscontext);
  const [searchParams, setsearchparams] = useSearchParams();
  const { enqueueSnackbar } = useSnackbar();
  const [open, setopen] = React.useState(false);
  const[catid,setcatid]=React.useState(null)

  const handeldeletepost = (e, id) => {
    e.stopPropagation();
    setidpostdelete(id);
    setopen(true);
  };
  const handeleditpost = (e, id) => {
    setcatid()
        handleOpen()
        setidedit(id)
setmood("edit")
    e.stopPropagation();

  };
  const handleClose = (e) => {
    e.stopPropagation();
    setopen(false);
  };
  console.log(mood)
  const fetchdeletepost = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:1337/api/recipes/${idpostselete}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("Deleted:", response.data);
      //notistack

      //
      setopen(false);

      const catid = searchParams.get("catid");
      const search = searchParams.get("search");
      fetchposts(catid, search, currentpage);

      enqueueSnackbar("recipe deleted successfully", {
        content: (key, message) => (
          <MycustomeSnackbar
            id={key}
            message={message}
            closeSnackbar={closeSnackbar}
          />
        ),
      });
    } catch (err) {
      console.error(err);

      setopen(false);
      enqueueSnackbar("Failed to delete the recipe", {
        content: (key, message) => (
          <MycustomeSnackbarField
            id={key}
            message={message}
            closeSnackbar={closeSnackbar}
          />
        ),
      });
    }
  };
  //for check
  console.log(post);
 React.useEffect(() => {
    if (post) {
      console.log(post)
    }
  }, [post]);


  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia sx={{ height: 200 }} image={post.images[0]?.img_url} />
      <CardContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            height: "1.5rem",
          }}
        >
          <Typography
            gutterBottom
            variant="body1"
            component="h2"
            sx={{ color: "primary.main", marginTop: 0 }}
          >
            {post.category.name}
          </Typography>
          {isuserid && usename ? (
            <Box sx={{ display: "flex" }}>
              <Tooltip title="Edit">
                <IconButton
                  color="secondary"
                  sx={{ px:1,py:2, m: 0, color: "primary.contrastText" }}
                  onClick={(e)=>{ 
                    handeleditpost(e, post.id,post.category.id,post.category.name)}}
                >
                  <EditOutlined />
                </IconButton>
              </Tooltip>
              <Tooltip title="Delete">
                <IconButton
                  sx={{ px:1,py:2, m: 0, color: "primary.contrastText" }}
                  onClick={(e) => handeldeletepost(e, post.id)}
                >
                  <DeleteOutlineRounded />
                </IconButton>
              </Tooltip>
              {/* modal dele */}

              <Dialog
                open={open}
                onClose={handleClose}
                PaperProps={{
                  sx: {
                    borderRadius: 4,
                    border: "1px solid",
                    borderColor: "primary.contrastText",
                    backgroundColor: "#ffffff",
                    width: 500,
                    height: 230,
                    px: 3,
                    position: "relative",
                    pt: 2,
                  },
                }}
              >
                <IconButton
                  sx={{ p: 0, ml: "auto", color: "primary.contrastText" }}
                  onClick={(e) => handleClose(e)}
                >
                  <CloseRounded />
                </IconButton>

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                  }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <DialogTitle
                    variant="h4"
                    sx={{
                      fontSize: "1.75rem",
                      color: "primary.contrastText",
                      p: 0,
                      mb:1
                    }}
                  >
                    Confirm Deletion
                  </DialogTitle>

                  <DialogContent
                    variant="h5"
                    sx={{
                      fontSize: "1.1rem",
                      color: "primary.main",
                      p: 0,
                    }}
                  >
                    Are you sure you want to delete
                    <span style={{ color: "#C40A68", fontWeight: 600 }}>
                      {" "}
                      '{recipename}'{" "}
                    </span>
                    Recipe?
                  </DialogContent>
                  <Box
                    sx={{
                      display: "flex",
                      gap: 3,
                      justifyContent: "space-between",
                      position: "absolute",
                      bottom: 24,
                      left: 24,
                      right: 24,
                    }}
                  >
                      <Button
                        variant="outlined"
                        type="submit"
                        sx={{
                          borderColor: "primary.contrastText",
                          textTransform: "capitalize",
                          fontFamily: "Playfair Display",
                          fontWeight: 600,
                          height: "3rem",
                          width:"50%",
                          fontSize: "1rem",
                          color: "primary.contrastText",
                          boxShadow: "0px 1px 2px 0px rgba(196, 10, 104, 0.25)",
                        }}
                        onClick={handleClose}
                      >
                        Cancel
                      </Button>

                      <Button
                        variant="contained"
                        type="submit"
                        sx={{
                          backgroundColor: "primary.contrastText",
                          textTransform: "capitalize",
                          fontFamily: "Playfair Display",
                          fontWeight: 600,
                          height: "3rem",
                          width:"50%",
                          fontSize: "1rem",
                          color: "primary.light",
                          boxShadow: "0px 4px 4px 0px rgba(196, 10, 104, 0.25)",
                        }}
                        onClick={fetchdeletepost}
                      >
                        Delete{" "}
                      </Button>
                  </Box>
                </Box>
              </Dialog>
            </Box>
          ) : (
            ""
          )}
        </Box>
        <Typography
          gutterBottom
          variant="h6"
          component="h1"
          fontWeight=" medium"
          sx={{
            color: "primary.contrastText",
            display: "-webkit-box",
            WebkitLineClamp: 1,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {post.title}
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
          {post.intro}
        </Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            variant="body1"
            component="h2"
            fontWeight=" medium"
            sx={{
              color: "primary.light",
              backgroundColor: "primary.contrastText",
              borderRadius: 1,
              px: 2,
              py: 1,
              width: "30%",
              textAlign: "center",
            }}
          >
            {post.difficulty}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Avatar alt="Remy Sharp" src={post.user?.imguser} sx={{width:25,height:25}}/>
                  <Typography
            variant="body1"
            component="h1"
            sx={{
              color: "primary.dark",
              textTransform: "capitalize",
              fontSize: "1rem",
            }}
          >
          {post.user.username}
          </Typography>
          </Box>
        
        </Box>
      </CardContent>
    </Card>
  );
}
