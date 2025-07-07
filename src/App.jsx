import { useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Layout from "./Layout/Layout";
import Home from "./Pages/Home";
import Posts from "./Pages/Posts";
import Postdetails from "./Pages/Postdetails";
import Notfounfpage from "./Pages/Notfounfpage";
import { SnackbarProvider } from "notistack";
import Profile from "./Pages/Profile";

function App() {

  return (
    <>
      <SnackbarProvider
        maxSnack={1}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            {/* <Route path="post" element={<Posts />} /> */}
            <Route path="/category/:catid/post/:id" element={<Postdetails />} />
            <Route path="profile" element={<Profile />} />

            <Route path="signup" element={<Home />} />
            <Route path="login" element={<Home />} />
            <Route path="Category" element={<Posts />} />
            <Route path="Category/:id" element={<Posts />} />

            <Route path="*" element={<Notfounfpage />} />
          </Route>
        </Routes>
      </SnackbarProvider>
    </>
  );
}

export default App;
