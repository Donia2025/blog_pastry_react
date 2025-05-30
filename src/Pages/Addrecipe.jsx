import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import UploadAvatars from "../Components/UploadAvatars";
import Multitoggelbutton from "../Components/Multitoggelbutton";
import AddIcon from "@mui/icons-material/Add";

import {
  CircularProgress,
  Fab,
  Grid,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { Postscontext } from "../Context/Context";
import ErrorstateAddpost from "../Components/ErrorstateAddpost";
import MycustomeSnackbarwarning from "../Components/MycustomeSnackbarwarning";
import { closeSnackbar, enqueueSnackbar } from "notistack";
import MycustomeSnackbar from "../Components/MycustomeSnackbarSucess";
import axios from "axios";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 955.19,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  height: "650px",
  overflowY: "scroll",
  pl: 4,
  py: 4,
  border: "1px solid ",
  borderColor: "primary.contrastText",
  borderRadius: "16px",

  boxShadow: 24,
  "&::-webkit-scrollbar": {
    width: "8px",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "#E5E2E2",
    borderRadius: "24px",
  },
};

export default function Addrecipe({
  open,
  setOpen,
  handleOpen,
  handleClose,
  setmood,
  mood,
  idedit,
  
}) {
  const [postdetails, setpostdetails] = React.useState([]);
  console.log(mood);
  console.log(idedit);

  //
  React.useEffect(() => {
    const fetchpostdetails = async (id) => {
      try {
        const { data } = await axios.get(
          `http://localhost:1337/api/recipes/${id}`
        );

        setpostdetails(data);
        const imagarray = data.images.map((img) => img.img_url);
        setAvatarSrc(imagarray);
        setform({
          title: data.title || "",
          intro: data.intro || "",
          description: data.description || "",
          ingredient: data.ingredient || "",
          baking_time: data.baking_time || "",
          preparation_time: data.preparation_time || "",
          serves: data.serves || "",
          category: data.category || "",
          difficulty: data.difficulty || "",
          // images: [],
        });
           setdifficulty(data.difficulty);
      setform((prev) => ({
        ...prev,
        difficulty: data.difficulty,
      }))
          setcategory(data.category,id);
      setform((prev) => ({
        ...prev,
        difficulty: data.difficulty,
      }))

   
      } catch (err) {
        console.log(err);
      } finally {
        // setstateloading(false);
      }
    };
    if (idedit && mood === "edit") {
      fetchpostdetails(idedit);
    }
    if (mood === "add") {
      setAvatarSrc([]);

      setform({
        title: "",
        intro: "",
        description: "",
        ingredient: "",
        baking_time: "",
        preparation_time: "",
        serves: "",
        category: "",
        difficulty: "",
        images: [],
      });
        setdifficulty("");
      setform((prev) => ({
        ...prev,
        difficulty:"",
      }))
    }
  }, [idedit, mood]);
  console.log(postdetails);
  // console.log(postdetails_images);
  //

  const [difficulty, setdifficulty] = React.useState("");
  const [category, setcategory] = React.useState("");
  //images
  const { uploadimag, imagesurl, form, setform } =
    React.useContext(Postscontext);
  const [avatarSrc, setAvatarSrc] = React.useState([null, null, null, null]);
  const [fileSrc, setfileSrc] = React.useState([null, null, null, null]);
  const [imageuploaded, setimageuploaded] = React.useState([]);
  const {
    uploading,
    addingPost,
    uploadError,
    addPostError,
    stateerrorfetch,
    statesucces,
  } = React.useContext(Postscontext);
  React.useEffect(() => {
    if (statesucces) {
      setOpen(false);
    }
  }, [statesucces]);

  const handleAvatarChange = (event, index) => {
    const file = event.target.files?.[0];
    if (file) {
      // file
      const updatedFileSrc = [...fileSrc];
      updatedFileSrc[index - 1] = file;
      setfileSrc(updatedFileSrc);
      // to make url preview
      if (mood === "add") {
        const updatedavatarSrc = [...avatarSrc];
        updatedavatarSrc[index - 1] = URL.createObjectURL(file);
        setAvatarSrc(updatedavatarSrc);
      }
    }
  };
  console.log(fileSrc);
  console.log(avatarSrc);

  const control = {
    exclusive: true,
  };

  const children = ["Easy", "Medium", "Hard"].map((itm, index) => (
    <ToggleButton
      variant="h1"
      sx={{
        p: 0,
        m: 0,
        mx: 1,
        backgroundColor:
          difficulty === itm ? "primary.contrastText" : "primary.main",
        color: "primary.light",
        border: "1px solid transparent",
        " &:hover": {
          backgroundColor: "primary.light",
          color: "primary.contrastText",
          boxSizing: "border-box",
        },
      }}
      key={index}
      value={itm}
      style={{
        borderRadius: "8px ",
        fontSize: "1rem",
        padding: "0.5rem 1.5rem",
        textAlign: "center",
      }}
    >
      {itm}
    </ToggleButton>
  ));

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setform((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };
  const handelchange = (_, value) => {
    if (mood === "add") {
      setdifficulty(value);
      setform((prev) => ({
        ...prev,
        difficulty: value,
      }));
    }
  };
  const handelchangecategory = (_, value) => {
    console.log(value);
    if (value !== null) {
      setcategory(value);
      setform((prev) => ({
        ...prev,
        category: Number(value),
      }));
    }
  };
  const handelsumbitrecipe = () => {
    console.log("ggg");
    const images = fileSrc.filter(Boolean);
    if (
      form.title.trim() !== "" &&
      form.ingredient.trim() !== "" &&
      form.description.trim() !== "" &&
      form.intro.trim() !== "" &&
      form.category &&
      form.difficulty !== "" &&
      form.preparation_time !== 0 &&
      form.preparation_time !== "" &&
      form.preparation_time > 0 &&
      form.baking_time !== 0 &&
      form.baking_time !== "" &&
      form.baking_time > 0 &&
      form.serves !== "" &&
      form.serves !== 0 &&
      form.serves > 0 &&
      images.length === 4
    ) {
      console.log(typeof form.category);
      console.log("hi");
      uploadimag(images);
    } else {
      enqueueSnackbar("Please complete all fields before submitting.", {
        content: (key, message) => (
          <MycustomeSnackbarwarning
            id={key}
            message={message}
            closeSnackbar={closeSnackbar}
          />
        ),
      });
    }
  };

  React.useEffect(() => {
    setform((prev) => ({
      ...prev,
      images: imagesurl,
    }));
  }, [imagesurl]);
  console.log(form);
  return (
    <Box sx={{ mt: 11 }} component="form">
      {/* <Tooltip title="Add New Post">
        <Fab
          size="small"
          aria-label="add"
          sx={{
            color: "primary.light",
            backgroundColor: "primary.contrastText",
          }}
          onClick={handleOpen}
        >
          <AddIcon />
        </Fab>
      </Tooltip> */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            {uploading || addingPost ? (
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  bgcolor: "rgba(255,255,255,0.7)",
                  zIndex: 10,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                <CircularProgress />
                <Typography
                  variant="h4"
                  sx={{ color: "primary.contrastText", fontSize: "1.25rem" }}
                >
                  {" "}
                  Uploading your recipe... please wait.
                </Typography>
              </Box>
            ) : uploadError || addPostError ? (
              <ErrorstateAddpost />
            ) : (
              <>
                <Typography
                  variant="h4"
                  component="h1"
                  sx={{
                    color: "primary.contrastText",
                    fontSize: "2rem",
                    marginBottom: 3,
                  }}
                >
                  {mood === "edit" ? "Edit Recipe" : "Add New Recipe"}
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                  <UploadAvatars
                    handleAvatarChange={handleAvatarChange}
                    avatarSrc={avatarSrc}
                  />
                  <Typography
                    variant="h6"
                    style={{
                      minHeight: "32px",
                      display: "block",
                      fontSize: "0.75rem",
                      color: "red",
                    }}
                  >
                    {" "}
                    Upload exactly 4 images to complete your recipe.
                  </Typography>
                </Box>
                <TextField
                  label="Recipe Name"
                  id="outlined-size-normal"
                  placeholder="Enter Recipe Name"
                  focused
                  autoComplete="off"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  sx={{
                    my: 4,
                    pr: 4,
                    width: "100%",
                    "&.Mui-focused fieldset": {
                      borderColor: "primary.contrastText",
                    },

                    "& .MuiInputLabel-root.Mui-focused": {
                      color: "primary.contrastText",
                      fontSize: "1rem",
                      fontFamily: "Playfair Display",
                    },
                    "& .MuiInputBase-input::placeholder": {
                      color: "primary.contrastText",
                      opacity: 0.5,
                    },
                  }}
                />

                <Grid
                  container
                  rowSpacing={1}
                  columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                >
                  <Grid size={6}>
                    <Box
                      sx={{ display: "flex", flexDirection: "column", gap: 4 }}
                    >
                      {/*  Recipe Summary*/}
                      <TextField
                        label="Recipe Summary"
                        id="outlined-size-normal"
                        placeholder="Enter Recipe Summary"
                        focused
                        multiline
                        name="intro"
                        value={form.intro}
                        onChange={handleChange}
                        rows={3}
                        autoComplete="off"
                        sx={{
                          width: "100%",
                          "&.Mui-focused fieldset": {
                            borderColor: "primary.contrastText",
                          },

                          "& .MuiInputLabel-root.Mui-focused": {
                            color: "primary.contrastText",
                            fontSize: "1rem",
                            fontFamily: "Playfair Display",
                          },
                          "& .MuiInputBase-input::placeholder": {
                            color: "primary.contrastText",
                            opacity: 0.5,
                          },
                        }}
                      />
                      {/*Preparation Method*/}
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 1,
                        }}
                      >
                        <TextField
                          label="Preparation Method"
                          id="outlined-size-normal"
                          placeholder="Enter Preparation Method"
                          focused
                          name="description"
                          value={form.description}
                          onChange={handleChange}
                          multiline
                          rows={3}
                          autoComplete="off"
                          sx={{
                            width: "100%",
                            "&.Mui-focused fieldset": {
                              borderColor: "primary.contrastText",
                            },

                            "& .MuiInputLabel-root.Mui-focused": {
                              color: "primary.contrastText",
                              fontSize: "1rem",
                              fontFamily: "Playfair Display",
                            },
                            "& .MuiInputBase-input::placeholder": {
                              color: "primary.contrastText",
                              opacity: 0.5,
                            },
                          }}
                        />
                        <Typography
                          variant="h6"
                          style={{
                            minHeight: "32px",
                            display: "block",
                            fontSize: "0.75rem",
                            color: "red",
                          }}
                        >
                          {" "}
                          Please write each step on a new line
                        </Typography>
                      </Box>

                      {/* Ingredient */}
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 1,
                        }}
                      >
                        <TextField
                          label="Ingredients"
                          id="outlined-size-normal"
                          placeholder="Enter Ingredient"
                          focused
                          multiline
                          name="ingredient"
                          value={form.ingredient}
                          onChange={handleChange}
                          rows={3}
                          autoComplete="off"
                          sx={{
                            width: "100%",
                            "&.Mui-focused fieldset": {
                              borderColor: "primary.contrastText",
                            },

                            "& .MuiInputLabel-root.Mui-focused": {
                              color: "primary.contrastText",
                              fontSize: "1rem",
                              fontFamily: "Playfair Display",
                            },
                            "& .MuiInputBase-input::placeholder": {
                              color: "primary.contrastText",
                              opacity: 0.5,
                            },
                          }}
                        />
                        <Typography
                          variant="h6"
                          style={{
                            minHeight: "32px",
                            display: "block",
                            fontSize: "0.75rem",
                            color: "red",
                          }}
                        >
                          {" "}
                          Please write each ingredient on a new line
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid size={1}></Grid>
                  <Grid size={5}>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 4,
                        mr: 4,
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 2,
                        }}
                      >
                        <Typography
                          variant="h2"
                          component="h1"
                          sx={{
                            color: "primary.contrastText",
                            pl: 1,
                            fontSize: "1.25rem",
                          }}
                        >
                          Difficulty
                        </Typography>
                        <ToggleButtonGroup
                          size="small"
                          {...control}
                          name="difficulty"
                          onChange={handelchange}
                          aria-label="small sizes"
                          sx={{ mr: 4 }}
                        >
                          {children}
                        </ToggleButtonGroup>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 1,
                        }}
                      >
                        <TextField
                          label="Preparation Time"
                          id="outlined-size-normal"
                          placeholder="Enter Preparation Time"
                          focused
                          name="preparation_time"
                          value={form.preparation_time}
                          onChange={handleChange}
                          inputProps={{ min: 0 }}
                          type="number"
                          autoComplete="off"
                          sx={{
                            width: "100%",
                            "&.Mui-focused fieldset": {
                              borderColor: "primary.contrastText",
                            },

                            "& .MuiInputLabel-root.Mui-focused": {
                              color: "primary.contrastText",
                              fontSize: "1rem",
                              fontFamily: "Playfair Display",
                            },
                            "& .MuiInputBase-input::placeholder": {
                              color: "primary.contrastText",
                              opacity: 0.5,
                            },
                          }}
                        />
                        <Typography
                          variant="h6"
                          style={{
                            minHeight: "32px",
                            display: "block",
                            fontSize: "0.75rem",
                            color: "red",
                          }}
                        >
                          {" "}
                          please Enter Time In minute
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 1,
                        }}
                      >
                        <TextField
                          label="Baking Time"
                          id="outlined-size-normal"
                          placeholder="Enter Baking Time"
                          focused
                          inputProps={{ min: 0 }}
                          name="baking_time"
                          value={form.baking_time}
                          onChange={handleChange}
                          type="number"
                          autoComplete="off"
                          sx={{
                            width: "100%",
                            "&.Mui-focused fieldset": {
                              borderColor: "primary.contrastText",
                            },

                            "& .MuiInputLabel-root.Mui-focused": {
                              color: "primary.contrastText",
                              fontSize: "1rem",
                              fontFamily: "Playfair Display",
                            },
                            "& .MuiInputBase-input::placeholder": {
                              color: "primary.contrastText",
                              opacity: 0.5,
                            },
                          }}
                        />
                        <Typography
                          variant="h6"
                          style={{
                            minHeight: "32px",
                            display: "block",
                            fontSize: "0.75rem",
                            color: "red",
                          }}
                        >
                          {" "}
                          please Enter Time In minute
                        </Typography>
                      </Box>

                      <TextField
                        label="Serves"
                        id="outlined-size-normal"
                        placeholder="Enter Serves Numbers"
                        focused
                        inputProps={{ min: 0 }}
                        name="serves"
                        value={form.serves}
                        onChange={handleChange}
                        type="number"
                        autoComplete="off"
                        sx={{
                          width: "100%",
                          "&.Mui-focused fieldset": {
                            borderColor: "primary.contrastText",
                          },

                          "& .MuiInputLabel-root.Mui-focused": {
                            color: "primary.contrastText",
                            fontSize: "1rem",
                            fontFamily: "Playfair Display",
                          },
                          "& .MuiInputBase-input::placeholder": {
                            color: "primary.contrastText",
                            opacity: 0.5,
                          },
                        }}
                      />
                    </Box>
                  </Grid>
                </Grid>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    mt: 3,
                  }}
                >
                  <Typography
                    variant="h2"
                    component="h1"
                    sx={{
                      color: "primary.contrastText",
                      pl: 1,
                      fontSize: "1.25rem",
                    }}
                  >
                    Category{" "}
                  </Typography>

                  <Multitoggelbutton
                    handelchangecategory={handelchangecategory}
                    categoryone={category}
                    setcategory={setcategory}
                  />

                  <Box
                    sx={{
                      display: "flex",
                      gap: 3,
                      justifyContent: "end",
                      mr: 4,
                      mt: 3,
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
                        height: "3.5rem",
                        width: "17.25rem",
                        fontSize: "1.125rem",
                        color: "primary.contrastText",
                        boxShadow: "0px 4px 4px 0px rgba(196, 10, 104, 0.25)",
                      }}
                      onClick={handleClose}
                    >
                      Cancel
                    </Button>

                    <Button
                      variant="contained"
                      type="submit"
                      onClick={handelsumbitrecipe}
                      onClose={handleClose}
                      sx={{
                        backgroundColor: "primary.contrastText",
                        textTransform: "capitalize",
                        fontFamily: "Playfair Display",
                        fontWeight: 600,
                        height: "3.5rem",
                        width: "17.25rem",
                        fontSize: "1.125rem",
                        color: "primary.light",

                        boxShadow: "0px 4px 4px 0px rgba(196, 10, 104, 0.25)",
                      }}
                    >
                      {mood === "edit" ? "Update Recipe" : "Post recipe"}
                    </Button>
                  </Box>
                </Box>
              </>
            )}
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
}
