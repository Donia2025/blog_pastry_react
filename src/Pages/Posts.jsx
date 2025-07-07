import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import MediaCard from "../Components/Card";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { NavLink, useNavigate, useSearchParams } from "react-router-dom";
import { Postscontext } from "../Context/Context";
import Loadingstate from "./Loadingstate";
import Emptystate from "./Emptystate";
import Errorfetch from "./Errorfetch";

import {
  IconButton,
  InputBase,
  Pagination,
  Paper,
  Tooltip,
  Fab,
  Button,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import SearchIcon from "@mui/icons-material/Search";
import debounce from "lodash.debounce";
import Nosearchmatch from "./Nosearchmatch";
import Addrecipe from "./Addrecipe";
import { Filter, Filter1Outlined, FilterList } from "@mui/icons-material";
export default function PostsProvider() {
  const [idedit, setidedit] = useState(null);
  const [selectedCategoryId, setSelectedCategoryId] = useSearchParams();
  const categoryid = selectedCategoryId.get("catid");
  console.log(categoryid);

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
    totalpage,
    setInputValue,
    inputValue,
    currentpage,
    setcurrentpage,
    category,
    fetchcategory,
    handleCloseCat,
    anchorElCat,
    setAnchorElCat,
  } = useContext(Postscontext);

  const [userpostsid, setuserpostsid] = useState([]);
  const catid = searchParams.get("catid");
  const search = searchParams.get("search");
  const navigate = useNavigate();
  const [catefid, setcatid] = useState();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [mood, setmood] = React.useState("add");
  const handleClickCat = async (e) => {
    setAnchorElCat(e.currentTarget);
    fetchcategory();
  };
  const openCat = Boolean(anchorElCat);
  console.log(currentpage);
  const handelclick = (id, name, categoryid) => {
    setcatid(name);
    // console.log(id,name)
    navigate(`/category/${categoryid}/post/${id}`, {
      state: {
        myData: name,
      },
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
      ) : (
        <Box sx={{ mx: 11, mt: 14 }}>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Button
              id="cat-button"
              aria-haspopup="true"
              onClick={handleClickCat}
              sx={{
                my: 2,
                // mr: 3,
                color: "primary.main",
                display: "block",
                fontSize: "1.125rem",
                fontWeight: 600,
                fontFamily: " Playfair Display",
                textTransform: "capitalize",
                display: "flex",
              }}
            >
              <FilterList sx={{ color: "primary.contrastText" }} />
              <Typography
                sx={{
                  color: "primary.contrastText",
                  textTransform: "capitalize",
                  fontFamily: "Playfair Display",
                  fontWeight: 600,
                  fontSize: "1.25rem",
                  ml: 1,
                }}
              >
                Filter
              </Typography>
            </Button>
            <Menu
              id="cat-menu"
              anchorEl={anchorElCat}
              open={openCat}
              onClose={() => handleCloseCat()}
              MenuListProps={{ "aria-labelledby": "cat-button" }}
            >
              {[{ id: null, name: "All" }, ...category].map((item) => (
                <MenuItem
                  key={item.id}
                  selected={
                    String(item.id) === catid ||
                    (item.id === null && catid === null)
                  }
                  onClick={() => {
                    handleCloseCat(item.id);
                  }}
                  sx={{
                    fontFamily: "Playfair Display",
                    fontSize: "1.125rem",
                    fontWeight: 500,
                    backgroundColor:
                      String(item.id) === catid ||
                      (item.id === null && catid === null)
                        ? "primary.main"
                        : "transparent",
                    color:
                      String(item.id) === catid ||
                      (item.id === null && catid === null)
                        ? "primary.contrastText"
                        : "",   
                  }}
                >
                  {item.name}
                </MenuItem>
              ))}
            </Menu>

            <Paper
              component="form"
              sx={{
                display: "flex",

                mx: "auto",
                width: 500,
                border: "2px solid",
                borderColor: "primary.main",
                my: 3,
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
          </Box>
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
                  onClick={() => {
                    handelclick(post.id, post.category.name, post.category.id);
                  }}
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
            <Box sx={{ position: "fixed", bottom: 0, right: 70 }}>
              <Tooltip title="Add New Post">
                <Fab
                  size="small"
                  aria-label="add"
                  sx={{
                    color: "primary.light",
                    backgroundColor: "primary.contrastText",
                  }}
                  onClick={() => {
                    handleOpen();
                    setmood("add");
                    setidedit(null);
                  }}
                >
                  <AddIcon />
                </Fab>
              </Tooltip>
              <Addrecipe
                open={open}
                setOpen={setOpen}
                handleOpen={handleOpen}
                handleClose={handleClose}
                setmood={setmood}
                mood={mood}
                idedit={idedit}
                catefid={catefid}
              />
            </Box>
          ) : (
            ""
          )}
          {posts.length === 0 && !search ? (
            <Emptystate
              handleOpen={handleOpen}
              setmood={setmood}
              setidedit={setidedit}
            />
          ) : (
            <Box sx={{ my: 3, display: "flex", justifyContent: "center" }}>
              <Pagination
                count={totalpage}
                variant="outlined"
                shape="rounded"
                siblingCount={1}
                boundaryCount={1}
                onChange={onPageChange}
              />
            </Box>
          )}
        </Box>
      )}
    </React.Fragment>
  );
}
