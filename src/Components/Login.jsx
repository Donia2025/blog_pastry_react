import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Avatar, IconButton, InputAdornment, TextField } from "@mui/material";
import { useForm, useWatch } from "react-hook-form";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Postscontext } from "../Context/Context";

export default function login({ open, onClose, closelogin,setuserdatalogin }) {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 482,
    height: 650,
    backgroundColor: "primary.light",
    border: "1px solid ",
    borderColor: "primary.contrastText",

    boxShadow: 24,
    p: 4,
    borderRadius: "16px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const [showPassword, setShowPassword] = useState(false);
  const [userinvaled, setuserinvaled] = useState(false);
  const { login } = useContext(Postscontext);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm({ mode: "onChange" });
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };
  const emailValue = useWatch({ control, name: "email" });
  useEffect(() => {
    setuserinvaled(false);
  }, [emailValue]);
  const loginuser = async (paylod) => {
    try {
      const res = await axios.post(
        "http://localhost:1337/api/auth/local",
        paylod
      );
      localStorage.clear();
      console.log(res.data);
      const { jwt, user } = res.data;
      console.log(user.imguser)
      login(user.username, jwt,user.id,user.imguser);
      setuserinvaled(false);
      reset();
      console.log("done");
      closelogin();
    } catch (err) {
      if (err?.response?.data?.error?.message) {
        console.log(err.response.data.error.message);
        setuserinvaled(true);
      }
      console.log(err.message);
    }
  };

  const onsubmit = (data) => {
    console.log(data);
    let paylod = data;
    loginuser(paylod);
  };
  const handelclose=()=>{
  onClose();
  reset();
}
  return (
    <div>
      <Modal
        open={open}
        onClose={handelclose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box
            component="form"
            autoComplete="off"
            sx={{ "& .MuiTextField-root": { width: "100%" } }}
            onSubmit={handleSubmit(onsubmit)}
            noValidate
          >
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Avatar
                alt="Profile Picture"
                src="/416195c3-053b-44ce-a2f1-a425d68f70eb_removalai_preview 1.svg"
                sx={{
                  width: 100,
                  height: 100,
                  mb: 1,
                }}
              />
            </Box>
            <Typography
              variant="h4"
              component="h1"
              sx={{
                color: "primary.contrastText",
                fontSize: "2.5rem",
                marginBottom: "1.5rem",
                textAlign: "center",
                mb: 2,
              }}
            >
              Masion Douce
            </Typography>
            <Typography
              variant="h4"
              component="h1"
              sx={{
                color: "primary.contrastText",
                fontSize: "1rem",
                marginBottom: "1.5rem",
                textAlign: "center",
                mb: 5,
              }}
            >
              Please log in to your account.
            </Typography>
            <div>
              <TextField
                label="Email"
                id="outlined-size-normal"
                placeholder="Enter your Email"
                focused
                type="email"
                {...register("identifier", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email address",
                  },
                })}
                sx={{
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
                error={!!errors.identifier}
                helperText={
                  <span
                    style={{
                      minHeight: "32px",
                      display: "block",
                      color: "#F5090D",
                    }}
                  >
                    {errors.identifier?.message ||
                      (userinvaled && "Invalied Email or Password")}
                  </span>
                }
              />
              <TextField
                label="Password"
                placeholder="Enter Your Password"
                variant="outlined"
                focused
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        sx={{ color: "primary.contrastText" }}
                        aria-label={
                          showPassword
                            ? "hide the password"
                            : "display the password"
                        }
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        onMouseUp={handleMouseUpPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                type={showPassword ? "text" : "password"}
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                  maxLength: {
                    value: 20,
                    message: "Password must be at most 20 characters",
                  },
                })}
                sx={{
                  mb: 1,

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
                error={!!errors.password}
                helperText={
                  <span style={{ minHeight: "32px", display: "block" }}>
                    {errors.password?.message || " "}
                  </span>
                }
              />
              <Button
                variant="contained"
                type="submit"
                sx={{
                  backgroundColor: "primary.contrastText",
                  textTransform: "capitalize",
                  fontFamily: "Playfair Display",
                  fontWeight: 600,
                  height: "3.5rem",
                  width: "100%",
                  fontSize: "1.125rem",
                  color: "primary.light",
                 boxShadow: '0px 4px 4px 0px rgba(196, 10, 104, 0.25)',
                }}
              >
                Log In{" "}
              </Button>
            </div>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
