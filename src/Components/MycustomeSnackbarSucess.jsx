import { Check, Close } from "@mui/icons-material";
import React from "react";

const MycustomeSnackbar = React.forwardRef(
  ({ id, message, closeSnackbar }, ref) => {
    return (
      <div
           ref={ref}
           id={id}
           style={{
             background: "linear-gradient(135deg,rgb(59, 237, 85),rgb(8, 160, 36))",
             boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
             transition: "all 50s ease-in-out",
             color: "#ffffff",
             fontSize: "1rem",
             fontFamily: "Playfair Display",
             fontWeight: 500,
             display: "flex",
             gap: "1rem",
             padding: "20px 10px",
             borderRadius: "1rem",
             alignItems:"center"
           }}
         >
           <button
             onClick={() => closeSnackbar(id)}
             style={{
               all: "unset",
               width: "25px",
               height: "25px",
               borderRadius: "50%",
               backgroundColor: "#ffffff",
               fontSize: "1.2rem",
               display: "flex",
               justifyContent: "center",
               alignItems: "center",
               p: "0.5rem",
               color: "rgb(59, 237, 85)",
             }}
           >
             <Check />
           </button>
           <span>{message}</span>
         </div>
    );
  }
);

export default MycustomeSnackbar;
