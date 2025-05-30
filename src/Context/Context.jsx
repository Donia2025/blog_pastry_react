import React, { createContext, use, useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import { closeSnackbar, enqueueSnackbar } from "notistack";
import MycustomeSnackbarSucess from "../Components/MycustomeSnackbarSucess";
export const Postscontext = createContext({
  posts: [],
  category: [],
  fetchposts: () => {},
  fetchcategory: () => {},
  handleCloseCat: () => {},
});

export default function PostsProvider({ children }) {
  const [posts, setposts] = useState([]);
  const [category, setcategory] = React.useState([]);
  const [anchorElCat, setAnchorElCat] = React.useState(null);
  // hadel state
  const [stateloadind, setstateloading] = useState(false);
  const [stateerrorfetch, setstateerrorfetch] = useState(false);
  //Auth
  const [usename, setusername] = React.useState(null);
  const [jwt, setJwt] = React.useState(null);
  const [userloginid, setuserloginid] = React.useState(null);
  const [userdatalogin, setuserdatalogin] = React.useState([]);
  const [searchQuery, setsearchquery] = useState();
  const [searchParams, setsearchparams] = useSearchParams();
  const [currentpage, setcurrentpage] = useState(1);
  const search = searchParams.get("search");

  const [inputValue, setInputValue] = useState(search || "");

  // fetch products
  const fetchposts = async (catid = null, search = null, page = 1) => {
    try {
      setstateerrorfetch(false);
      setstateloading(true);
      await new Promise((res) => setTimeout(res, 500));

      let url = "http://localhost:1337/api/recipes";
      const filters = [`pagination[limit]=null`, `sort=createdAt:desc`];
      if (catid) filters.push(`filters[category][id][$eq]=${catid}`);
      if (search) filters.push(`filters[title][$containsi]=${search}`);
      if (filters.length) {
        url += "?" + filters.join("&");
      }
      const { data } = await axios.get(url);

      setposts(data.data);
      setstateloading(false);
      setstateerrorfetch(false);
      setcurrentpage(page);
    } catch (err) {
      setstateerrorfetch(true);
      setstateloading(false);

      console.log(err);
    }
  };
  //fetch categores
  const fetchcategory = async () => {
    try {
      const response = await axios.get("http://localhost:1337/api/categories");
      const cat = [...response.data.data].map((cat) => cat);
      setcategory(cat);
    } catch (err) {
      console.log(err);
    }
  };

  const handleCloseCat = (item) => {
    setAnchorElCat(null);
    const search = searchParams.get("search");
    const params = {};

    if (item) params.catid = item;
    if (search) params.search = search;

    setsearchparams(params);
  };

  useEffect(() => {
    const catid = searchParams.get("catid");
    const search = searchParams.get("search");
    fetchposts(catid, search, currentpage);
  }, [searchParams]);

  //fetch data userlogin
  const fetchuserlogindata = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const response = await axios.get(
        "http://localhost:1337/api/users/me?populate=recipes",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setuserdatalogin(response.data);
    } catch (err) {
      console.log(err);
    }
  };
  //login and logout
  const login = async (username, usertoken, userid) => {
    setusername(username);
    setJwt(usertoken);
    setuserloginid(userid);
    localStorage.setItem("name", username);
    localStorage.setItem("token", usertoken);
    localStorage.setItem("userid", userid);
    await fetchuserlogindata();
  };
  const logout = () => {
    setusername(null);
    setJwt(null);
    setuserloginid(null);
    localStorage.removeItem("name");
    localStorage.removeItem("token");
    localStorage.removeItem("userid");
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    const nameuser = localStorage.getItem("name");
    if ((token, nameuser)) {
      setusername(nameuser);
      setJwt(token);
      fetchuserlogindata();
    }
  }, []);
  //////////////////////////////////////
  //pagination
  const itemsperpage = 12;
  //total pages
  const totalpage = Math.ceil(posts.length / itemsperpage);
  //start slice
  let datapagination;
  const start = itemsperpage * (currentpage - 1);

  //end slice
  const end = itemsperpage * (currentpage - 1) + itemsperpage;
  datapagination = posts.slice(start, end);
  //function
  const handelpagination = (e, value) => {
    console.log(value);
    setcurrentpage(value);
  };
  //upload imag
  const [imagesurl, setimagesurl] = useState([]);
  const [form, setform] = React.useState({
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
  const [uploading, setUploading] = useState(false);
  const [addingPost, setAddingPost] = useState(false);
  const [uploadError, setUploadError] = useState(false);
  const [addPostError, setAddPostError] = useState(false);
  const [statesucces, setstatesucess] = useState(false);

  const uploadimag = async (imges) => {
    console.log("yoy call me");
    const allamages = [];
    setUploading(true);
    setUploadError(false);
    setstatesucess(false);

    try {
      for (const imge of imges) {
        const formData = new FormData();
        formData.append("file", imge);
        formData.append("upload_preset", "my_preset");
        formData.append("cloud_name", "dkpw1hn3b");

        const response = await axios.post(
          "https://api.cloudinary.com/v1_1/dkpw1hn3b/image/upload",
          formData
        );
        allamages.push(response.data.secure_url);
        console.log(response.data.secure_url);
      }
      setimagesurl(allamages);
      setUploading(false);
      if (allamages.length === 4) {
        const payload = {
          ...form,
          images: allamages,
          category: form.category ? { id: form.category } : null,
        };
        console.log(payload);

        await addpost(payload);
      }
    } catch (err) {
      setUploading(false);
      setUploadError(true);
      console.log(err);
    }
  };

  ////////////////////////////////////////////
  // add post
  const addpost = async (payload) => {
    setAddingPost(true);
    setAddPostError(false);
    try {
      const response = await axios.post(
        "http://localhost:1337/api/recipes",
        { data: payload },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("✅ Recipe created:", response.data);

      setAddingPost(false);
      setstatesucess(true);
      await fetchuserlogindata();
      const catid = searchParams.get("catid");
      const search = searchParams.get("search");
      await fetchposts(catid, search);
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

      enqueueSnackbar("Your recipe was uploaded successfully!", {
        content: (key, message) => (
          <MycustomeSnackbarSucess
            id={key}
            message={message}
            onClick={closeSnackbar}
          />
        ),
      });
      return response.data;
    } catch (err) {
      setAddingPost(false);
      setAddPostError(true);
      console.error("addpost failed—status", err.response.status);
      console.error("addpost failed—body", err.response.data);
    }
  };

  return (
    <Postscontext.Provider
      value={{
        posts,
        setposts,
        category,
        fetchposts,
        fetchcategory,
        handleCloseCat,
        anchorElCat,
        setAnchorElCat,
        stateloadind,
        setstateloading,
        stateerrorfetch,
        login,
        usename,
        logout,
        usename,
        userdatalogin,
        setsearchquery,
        searchQuery,
        fetchposts,
        setsearchparams,
        searchParams,
        handelpagination,
        setcurrentpage,
        datapagination,
        totalpage,
        inputValue,
        setInputValue,
        // setimages,
        // images,
        uploadimag,
        imagesurl,
        setimagesurl,
        setform,
        form,
        currentpage,
        setcurrentpage,
        uploading,
        addingPost,
        uploadError,
        addPostError,
        statesucces,
      }}
    >
      {children}
    </Postscontext.Provider>
  );
}
