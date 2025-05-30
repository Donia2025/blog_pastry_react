import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { Link, useNavigate } from "react-router-dom";
import { Postscontext } from "../Context/Context";
import { Tooltip } from "@mui/material";

const pages = ["Home", "Posts", "Category", "About Us", "Contact Us"];
const route = ["/", "/post", "/Category", "/", "/"];
const settings = ["Profile", "Logout"];

function ResponsiveAppBar({ onclicksignup, onclicklogin }) {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const { usename, logout, setsearchparams } = React.useContext(Postscontext);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const logoutuser = (setting) => {
    if (setting === "Logout") {
      logout();
    }
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const {
    category,
    fetchcategory,
    handleCloseCat,
    anchorElCat,
    setAnchorElCat,
    fetchposts,
  } = React.useContext(Postscontext);
  const openCat = Boolean(anchorElCat);

  const handleClickCat = async (e) => {
    setAnchorElCat(e.currentTarget);
    fetchcategory();
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        width: "100%",
        px: 11,
        background: "linear-gradient(90deg, #C40A68 0%, #FF69B4 100%)",
      }}
    >
      <Toolbar disableGutters>
        <Link to="/">
          <Avatar
            alt="Profile Picture"
            src="/416195c3-053b-44ce-a2f1-a425d68f70eb_removalai_preview 1.svg"
            sx={{
              mr: 4,
              width: 75,
              height: 75,
              py: 1,
              display: { xs: "none", md: "flex" },
            }}
          />
        </Link>
        <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleOpenNavMenu}
            color="inherit"
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorElNav}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
            sx={{ display: { xs: "block", md: "none" } }}
          >
            {pages.map((page) => (
              <MenuItem key={page} onClick={handleCloseNavMenu}>
                <Typography sx={{ textAlign: "center" }}>{page}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>
        <Avatar
          alt="Profile Picture"
          src="/416195c3-053b-44ce-a2f1-a425d68f70eb_removalai_preview 1.svg"
          sx={{
            mr: 4,
            width: 75,
            height: 75,
            py: 1,
            display: { xs: "flex", md: "none" },
          }}
        />

        <Typography variant="h4" component="h1" sx={{}}></Typography>
        <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" }, gap: 2 }}>
          {pages.map((page, index) =>
            page === "Category" ? (
              <React.Fragment key={page}>
                <Link to="/category" style={{ textDecoration: "none" }}>
                  <Button
                    id="cat-button"
                    // key={page}
                    aria-haspopup="true"
                    onClick={handleClickCat}
                    sx={{
                      my: 2,
                      // mr: 3,
                      color: "primary.light",
                      display: "block",
                      fontSize: "1.125rem",
                      fontWeight: 600,
                      fontFamily: " Playfair Display",
                      textTransform: "capitalize",
                      mx: "auto",
                    }}
                  >
                    Category
                  </Button>
                </Link>
                <Menu
                  id="cat-menu"
                  anchorEl={anchorElCat}
                  open={openCat}
                  onClose={() => handleCloseCat()}
                  MenuListProps={{ "aria-labelledby": "cat-button" }}
                >
                  {category.map((item) => (
                    <MenuItem
                      key={item.id}
                      onClick={() => {
                        handleCloseCat(item.id);
                      }}
                    >
                      {item.name}
                    </MenuItem>
                  ))}
                </Menu>
              </React.Fragment>
            ) : page === "Posts" ? (
              <Link to="/post" key={page} style={{ textDecoration: "none" }}>
                <Button
                  key={page}
                  onClick={() => fetchposts()}
                  sx={{
                    my: 2,
                    color: "primary.light",
                    display: "block",
                    fontSize: "1.125rem",
                    fontWeight: 600,
                    fontFamily: " Playfair Display",
                    textTransform: "capitalize",
                    mx: "auto",
                  }}
                >
                  Posts
                </Button>
              </Link>
            ) : (
              <Link to="/" key={page} style={{ textDecoration: "none" }}>
                <Button
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{
                    my: 2,
                    // mr: 3,
                    color: "primary.light",
                    display: "block",
                    fontSize: "1.125rem",
                    fontWeight: 600,
                    fontFamily: " Playfair Display",
                    textTransform: "capitalize",
                    mx: "auto",
                  }}
                >
                  {page}
                </Button>
              </Link>
            )
          )}
        </Box>
        <Box sx={{ display: "flex", gap: 3 }}>
          {usename ? (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <Typography sx={{ mx: 2, my: 2, color: "primary.main" }}>
                  Welcome Back {usename}
                </Typography>

                {settings.map((setting) => (
                  <MenuItem
                    key={setting}
                    onClick={() => {
                      handleCloseUserMenu();
                      logoutuser(setting);
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{ textAlign: "center", px: 1, py: 1 }}
                    >
                      {setting}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          ) : (
            <>
              <Button
                onClick={onclicklogin}
                variant="outlined"
                sx={{
                  color: "primary.light",
                  borderColor: "primary.light",
                  textTransform: "capitalize",
                  fontFamily: "Playfair Display",
                  fontWeight: 600,
                  fontSize: "1.125rem",
                }}
              >
                Log In
              </Button>{" "}
              <Button
                onClick={onclicksignup}
                variant="contained"
                sx={{
                  backgroundColor: "secondary.contrastText",
                  textTransform: "capitalize",
                  fontFamily: "Playfair Display",
                  fontWeight: 600,
                  fontSize: "1.125rem",
                  color: "primary.light",
                  boxShadow: "0px 4px 4px 0px rgba(196, 10, 104, 0.25)",
                }}
              >
                Sign Up
              </Button>{" "}
            </>
          )}
        </Box>
      </Toolbar>
      {/* </Container> */}
    </AppBar>
  );
}
export default ResponsiveAppBar;
