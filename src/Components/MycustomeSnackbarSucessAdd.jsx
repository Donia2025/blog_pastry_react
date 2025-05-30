import { Check, Close } from "@mui/icons-material";
import React from "react";

const MycustomeSnackbarSucessAdd = React.forwardRef(
  ({ id, message, onClick, closeSnackbar }, ref) => {
    return (
      <div
        ref={ref}
        id={id}
        style={{
          background: "linear-gradient(135deg,rgb(59, 237, 85),rgb(8, 160, 36))",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          color: "#ffffff",
          fontSize: "1rem",
          fontFamily: "Playfair Display",
          fontWeight: 500,
          borderRadius: "1rem",
          padding: "20px 20px",
          display: "flex",
          flexDirection: "column", 
          gap: "1rem",
          maxWidth: "400px", 
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
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
              color: "rgb(59, 237, 85)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
            }}
          >
            <Check />
          </button>
          <span
            style={{
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              display: "-webkit-box",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {message}
          </span>
        </div>

        <button
          onClick={onClick}
          style={{
            all: "unset",
            backgroundColor: "#ffffff",
            color: "rgb(59, 237, 85)",
            borderRadius: "1rem",
            fontSize: "1rem",
            height: "3rem",
            width: "50%", 
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
            fontWeight: "600",
          }}
        >
          Show your post
        </button>
      </div>
    );
  }
);

export default MycustomeSnackbarSucessAdd;
