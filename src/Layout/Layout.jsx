import { Box } from "@mui/material";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import ResponsiveAppBar from "../Components/Nav";
import PostsProvider from "../Context/Context";
import SignUp from "../Components/Sign up";
import Login from "../Components/Login";

import React, { useEffect, useState } from "react";
import Footer from "../Components/Footer";
import Emptystate from "../Pages/Emptystate";

export default function Layout() {
  const location = useLocation();
  console.log(location.pathname);
  const navigate = useNavigate();
  const [isSignUpOpen, setSignUpOpen] = useState(false);
  const [isLoginOpen, setLoginOpen] = useState(false);

  useEffect(() => {
    if (location.pathname === "/signup") {
      setSignUpOpen(true);
    }
    if (location.pathname === "/Login") {
      setLoginOpen(true);
    }
  }, [location.pathname]);
  const toggelsignuptologin = () => {
    setSignUpOpen(false);
    setLoginOpen(true);
  };
  return (
    <>
      <PostsProvider>
        <ResponsiveAppBar
          onclicksignup={() => setSignUpOpen(true)}
          onclicklogin={() => setLoginOpen(true)}
        />
        <SignUp
          open={isSignUpOpen}
          onClose={() => {
            setSignUpOpen(false);
            if (location.pathname === "/signup") {
              navigate("/");
            }
          }}
          switchtologin={toggelsignuptologin}
        />
        <Login
          open={isLoginOpen}
          onClose={() => {
            setLoginOpen(false);
            if (location.pathname === "/login") {
              navigate("/");
            }
          }}
          closelogin={() => setLoginOpen(false)}
        />
        <Box>
          <Outlet />
        </Box>
           <Footer
        />
      </PostsProvider>
    </>
  );
}
