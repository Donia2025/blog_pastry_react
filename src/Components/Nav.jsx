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
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Postscontext } from "../Context/Context";
import { Tooltip } from "@mui/material";

const pages = ["Home", "Posts"];
const route = ["/", "/Category"];
const settings = ["Logout"];

function ResponsiveAppBar({ onclicksignup, onclicklogin }) {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const { usename, logout, useimag } = React.useContext(Postscontext);
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
  const { fetchposts } = React.useContext(Postscontext);

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
         {pages.map((page, index) => (
  <NavLink
    to={route[index]}
    key={page}
    style={{ textDecoration: "none" }}
  >
    {({ isActive }) => (
      <Button
        onClick={() => {
          handleCloseNavMenu();
          if (page === "Posts") fetchposts(); 
        }}
        sx={{
          my: 2,
          color:"white",
          display: "block",
          fontSize: "1.125rem",
          fontWeight: 600,
          fontFamily: "Playfair Display",
          textTransform: "capitalize",
          mx: "auto",
          borderBottom: isActive ? "2px solid white" : "none",
        }}
      >
        {page}
      </Button>
    )}
  </NavLink>
))}
        </Box>
        <Box sx={{ display: "flex", gap: 3 }}>
          {usename ? (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src={useimag} />
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
                    {setting === "Profile" ? (
                      <Link
                        to="/profile"
                        style={{ textDecoration: "none", color: "inherit" }}
                      >
                        <Typography
                          variant="h6"
                          sx={{
                            textAlign: "center",
                            px: 1,
                            py: 1,
                            fontSize: "1.25rem",
                          }}
                        >
                          Profile
                        </Typography>
                      </Link>
                    ) : (
                      <Typography
                        variant="h6"
                        sx={{
                          textAlign: "center",
                          px: 1,
                          py: 1,
                          fontSize: "1.25rem",
                        }}
                      >
                        {setting}
                      </Typography>
                    )}
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
                  boxShadow: " 0 4px 8px rgba(0, 0, 0, 0.2)",
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
                  boxShadow: " 0 4px 8px rgba(0, 0, 0, 0.2)",
                }}
              >
                Sign Up
              </Button>{" "}
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
export default ResponsiveAppBar;
