import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import MediaCard from "../Components/Card";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router-dom";
import { Postscontext } from "../Context/Context";
import Loadingstate from "./Loadingstate";
import Emptystate from "./Emptystate";
import Errorfetch from "./Errorfetch";

import { IconButton, InputBase, Pagination, Paper, Tooltip ,Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import SearchIcon from "@mui/icons-material/Search";
import debounce from "lodash.debounce";
import Nosearchmatch from "./Nosearchmatch";
import Addrecipe from "./Addrecipe";
export default function PostsProvider() {

  const [idedit,setidedit]=useState(null)
  const {
    stateloadind,
    stateerrorfetch,
    posts,
    usename,
    userdatalogin,
    fetchposts,
    setsearchparams,
    searchParams,
    handelpagination,

    datapagination,
    totalpage,setInputValue,inputValue,
currentpage,
    setcurrentpage,
  } = useContext(Postscontext);

  const [userpostsid, setuserpostsid] = useState([]);
  const catid = searchParams.get("catid");
  const search = searchParams.get("search");
  const navigate = useNavigate();
  const [catefid,setcatid]=useState()
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
      const [mood,setmood]=React.useState("add")

  console.log(currentpage)
  const handelclick = (id,name) => {
    setcatid(name)
    // console.log(id,name)
    navigate(`/post/${id}`,{
      state:{
        myData:name
      }
    });
  };
  useEffect(() => {
    const idspost = userdatalogin.recipes?.map((itm) => itm.id) || [];
    setuserpostsid(idspost);
  }, [userdatalogin]);

  const debouncedFetch = useMemo(
    () =>
      debounce((query) => {
        const params = {};

        if (catid) params.catid = catid;
        if (query) params.search = query;
        setsearchparams(params);

        fetchposts(catid, query);

        setcurrentpage(1);
      }, 1000),
    [setsearchparams, catid, setcurrentpage]
  );

  const handleSearchChange = (e) => {
    const value = e.target.value.trim();
    setInputValue(value);
    debouncedFetch(value.trim());
  };
  useEffect(() => () => debouncedFetch.cancel(), [debouncedFetch]);

  const onPageChange = (event, value) => {
    handelpagination(event, value);
  };
  return (
    <React.Fragment>
      {stateloadind ? (
        <Loadingstate />
      ) : stateerrorfetch ? (
        <Errorfetch />
      ) : posts.length == 0 && !search ? (
        <Emptystate />
      ) : (
        <Box sx={{ mx: 11, mt: 14 }}>
          <Paper
            component="form"
            sx={{
              display: "flex",

              mx: "auto",
              width: 500,
              border: "2px solid",
              borderColor: "primary.main",
              mb: 3,
            }}
            variant="outlined"
          >
            <InputBase
              sx={{ ml: 1, flex: 1, color: "primary.dark" }}
              placeholder="Search for a pastry recipe..."
              inputProps={{ "aria-label": "Search for a pastry recipe..." }}
              onChange={handleSearchChange}
              value={inputValue}
            />
            <IconButton
              type="button"
              sx={{ p: "10px", color: "primary.contrastText" }}
              aria-label="search"
            >
              <SearchIcon />
            </IconButton>
          </Paper>
          {posts.length === 0 && search ? (
            <Nosearchmatch serach={search} />
          ) : (
            ""
          )}
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12, lg: 12 }}
          >
            {datapagination.map((post, index) => {
              const isuserid = userpostsid.includes(post.id);
              return (
                <Grid
                  key={index}
                  size={{ xs: 4, sm: 4, md: 4, lg: 3 }}
                  onClick={() => {handelclick(post.id,post.category.name)}}
                >
                  <MediaCard
                    post={post}
                    isuserid={isuserid}
                    usename={usename}
                    currentpage={currentpage}
                    recipename={post.title}
                    handleOpen={handleOpen}
                    setmood={setmood}
                    mood={mood}
                    setidedit={setidedit}
                  />
                </Grid>
              );
            })}
          </Grid>
          {usename ? (
            <Box sx={{ position: "fixed", bottom: 100, right: 70 }}>
                <Tooltip title="Add New Post">
                      <Fab
                        size="small"
                        aria-label="add"
                        sx={{
                          color: "primary.light",
                          backgroundColor: "primary.contrastText",
                        }}
                        onClick={()=>{handleOpen(); setmood("add") ;setidedit(null)}}
                      >
                        <AddIcon />
                      </Fab>
                    </Tooltip>
              <Addrecipe open={open} setOpen={setOpen} handleOpen={handleOpen} handleClose={handleClose} setmood={setmood} mood={mood} idedit={idedit} catefid={catefid}
/>
            </Box>
          ) : (
            ""
          )}
          {posts.length === 0 ? (
            ""
          ) : (
            <Box sx={{ my: 3, display: "flex", justifyContent: "center" }}>
              <Pagination
                count={totalpage}
                variant="outlined"
                shape="rounded"
                siblingCount={1}
                boundaryCount={1}
                // onChange={(event, value) => handelpagination(event, value)}
                onChange={onPageChange}

              />
            </Box>
          )}
        </Box>
      )}
    </React.Fragment>
  );
}
