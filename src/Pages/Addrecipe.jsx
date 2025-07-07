import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import UploadAvatars from "../Components/UploadAvatars";
import Multitoggelbutton from "../Components/Multitoggelbutton";
import {
  CircularProgress,
  Grid,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { Postscontext } from "../Context/Context";
import ErrorstateAddpost from "../Components/ErrorstateAddpost";
import MycustomeSnackbarwarning from "../Components/MycustomeSnackbarwarning";
import { closeSnackbar, enqueueSnackbar } from "notistack";
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
  handleClose,
  mood,
  idedit,
}) {
  const [postdetails, setpostdetails] = React.useState([]);
  const [difficulty, setdifficulty] = React.useState("");
  const [category, setcategory] = React.useState("");
  const originalDataRef = React.useRef(null);

  //images
  const { uploadimag, imagesurl, form, setform, updatepost } =
    React.useContext(Postscontext);
  const [avatarSrc, setAvatarSrc] = React.useState([null, null, null, null]);
  const [fileSrc, setfileSrc] = React.useState([null, null, null, null]);
  const [imageuploaded, setimageuploaded] = React.useState([]);
  const { uploading, addingPost, uploadError, addPostError, statesucces } =
    React.useContext(Postscontext);

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
          category: data.category.id || "",
          difficulty: data.difficulty || "",
        });
        setdifficulty(data.difficulty);
        setform((prev) => ({
          ...prev,
          difficulty: data.difficulty,
        }));
        setcategory(data.category.id);
        setform((prev) => ({
          ...prev,
          category: data.category.id,
        }));
        originalDataRef.current = {
          title: data.title || "",
          intro: data.intro || "",
          description: data.description || "",
          ingredient: data.ingredient || "",
          baking_time: data.baking_time || "",
          preparation_time: data.preparation_time || "",
          serves: data.serves || "",
          category: data.category.id || "",
          difficulty: data.difficulty || "",
          images: data.images.map((img) => img.img_url),
        };
      } catch (err) {
        console.log(err);
      }
    };
    if (idedit && mood === "edit") {
      fetchpostdetails(idedit);
    }
    if (mood === "add") {
      setAvatarSrc([]);
      setcategory("");
      setdifficulty("");
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
    }
  }, [idedit, mood]);

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
      const updatedavatarSrc = [...avatarSrc];
      updatedavatarSrc[index - 1] = URL.createObjectURL(file);
      setAvatarSrc(updatedavatarSrc);
    }
  };
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
      setdifficulty(value);
      setform((prev) => ({
        ...prev,
        difficulty: value,
      }));
    
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
  const handelsumbitrecipe = async () => {
    if (mood === "edit") {
      const imagesToUpload = [];
      const imagePositions = [];
      for (let i = 0; i < originalDataRef.current.images.length; i++) {
        const oldImageName = originalDataRef.current.images[i]
          ?.split("/")
          .pop();
        const newFile = fileSrc[i];
        if (newFile instanceof File && !newFile.name.includes(oldImageName)) {
          imagesToUpload.push(newFile);
          imagePositions.push(i);
        }
      }
      console.log(originalDataRef.current);
      console.log(form);
      const ismodified = Object.keys(form).some(
        (key) => form[key] !== originalDataRef.current[key]
      );
      console.log("Is modified:", ismodified);
      if(!ismodified && imagesToUpload.length === 0) {
        enqueueSnackbar("No changes detected to update.", {
          content: (key, message) => (
            <MycustomeSnackbarwarning
              id={key}
              message={message}
              closeSnackbar={closeSnackbar}
            />
          ),
        });
        return;
      } 

      let updatedForm = { ...form };
      let imagesUpdated = false;
      const updatedImages = [...originalDataRef.current.images];

      if (imagesToUpload.length > 0) {
        try {
          for (let i = 0; i < imagesToUpload.length; i++) {
            const imge = imagesToUpload[i];

            const formData = new FormData();
            formData.append("file", imge);
            formData.append("upload_preset", "my_preset");
            formData.append("cloud_name", "dkpw1hn3b");

            const response = await axios.post(
              "https://api.cloudinary.com/v1_1/dkpw1hn3b/image/upload",
              formData
            );
            const imageUrl = response.data.secure_url;
            updatedImages[imagePositions[i]] = imageUrl;
            imagesUpdated = true; // ✅

            console.log("Uploaded image URL:", imageUrl);
          }
            // Update the form with the new image URL
            updatedForm.images = updatedImages;
            setform((prev) => ({
              ...prev,
              images: updatedImages,
            }));

            // cal update function here
            console.log("Updated form with new images:", updatedForm);
          
        } catch (err) {
          console.log("Error uploading images:", err);
        }
      }

      if (ismodified || imagesUpdated) {
        
          // updatedForm.images = [...originalDataRef.current.images];

        updatepost(updatedForm, idedit);

        console.log(
          "Form has been modified or images updated. Proceeding with update."
        );
        //  call update only
      }
      // if(ismodified ||imagesToUpload.length > 0) {
      //   console.log("Form has been modified, proceeding with update.");
      // }
    } else {
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
        uploadimag(images, "add");
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
