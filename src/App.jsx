import { useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Layout from "./Layout/Layout";
import Home from "./Pages/Home";
import Posts from "./Pages/Posts";
import Postdetails from "./Pages/Postdetails";
import Notfounfpage from "./Pages/Notfounfpage";
import SignUp from "./Components/Sign up";
import { Login } from "@mui/icons-material";
import { SnackbarProvider } from "notistack";

function App() {
  const [count, setCount] = useState(0);

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
            <Route path="post" element={<Posts />} />
            <Route path="post/:id" element={<Postdetails />} />

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
