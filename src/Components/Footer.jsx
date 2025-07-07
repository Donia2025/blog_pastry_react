import {
  Facebook,
  FacebookOutlined,
  Instagram,
  Pinterest,
  Twitter,
} from "@mui/icons-material";
import { Avatar, Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div>
      <Box
        sx={{
          backgroundColor: "primary.main",
          px: 11,
          display: "flex",
          width:"100%",
          justifyContent: "space-between",
          alignItems: "center",

          background: "linear-gradient(90deg, #C40A68 0%, #FF69B4 100%)",
        }}
      >
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
        <Typography variant="h6" sx={{color:"primary.light",fontSize:"1rem"}}> © 2025 Maison Douce — Designed by Donia</Typography>
        <Box
          sx={{ display: "flex", gap: 2, color: "primary.light", fontSize: 4 }}
        >
                  <Typography variant="h6" sx={{color:"primary.light",fontSize:"1rem"}}>    Follow Us</Typography>

          <Facebook />
          <Instagram />
          <Twitter />
          <Pinterest />
        </Box>
      </Box>
    </div>
  );
};

export default Footer;
