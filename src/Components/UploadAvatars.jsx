import * as React from "react";
import Avatar from "@mui/material/Avatar";
import ButtonBase from "@mui/material/ButtonBase";
import { Box, Grid } from "@mui/material";
import { Add } from "@mui/icons-material";
import { Postscontext } from "../Context/Context";

export default function UploadAvatars({handleAvatarChange,avatarSrc,postdetails_images}) {
//   const { uploadimag} = React.useContext(Postscontext);
//   const [avatarSrc, setAvatarSrc] = React.useState([null, null, null, null]);
//   const [fileSrc, setfileSrc] = React.useState([null, null, null, null]);

//   const handleAvatarChange = (event, index) => {
//     const file = event.target.files?.[0];
//     if (file) {
//       // file
//       const updatedFileSrc = [...fileSrc];
//       updatedFileSrc[index - 1] = file;
//       setfileSrc(updatedFileSrc);

//       // to make url preview
//       const updatedavatarSrc = [...avatarSrc];
//       updatedavatarSrc[index - 1] = URL.createObjectURL(file);
//       setAvatarSrc(updatedavatarSrc);
//     }
//   };
//   console.log(fileSrc);
//   console.log(avatarSrc);
//  React.useEffect(()=>{
//   if(fileSrc.filter(Boolean).length===4){
// uploadimag(fileSrc)
//   }
//  },[fileSrc])



  return (
    <Box sx={{}}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid
          container
          rowSpacing={1}
          columnSpacing={{ xs: 1, sm: 2, md: 3, marginTop: 11 }}
        >
          {[1, 2].map((itm) => (
            <Grid item sx={{ xs: 6, md: 4 }} key={itm}>
              <ButtonBase
                component="label"
                role={undefined}
                tabIndex={-1}
                aria-label=""
                sx={{
                  borderRadius: "40px",
                  "&:has(:focus-visible)": {
                    outline: "2px solid",
                    outlineOffset: "2px",
                  },
                }}
              >
                <Avatar
                  alt="Upload new avatar"
                  src={avatarSrc[itm - 1]}
                  sx={{
                    width: "280px",
                    height: "380px",
                    backgroundColor: "#E5E2E2",
                    borderRadius: 1,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  variant="square"
                >
                  {!avatarSrc[itm - 1] && <Add sx={{ fontSize: 80 }} />}
                </Avatar>
                <input
                  type="file"
                  accept="image/*"
                  style={{
                    border: 0,
                    clip: "rect(0 0 0 0)",
                    overflow: "hidden",
                    padding: 0,
                    position: "absolute",
                    whiteSpace: "nowrap",
                    width: "1px",
                  }}
                  onChange={(e) => handleAvatarChange(e, itm)}
                />
              </ButtonBase>
            </Grid>
          ))}
          <Grid size={{ xs: 12, md: 4 }}>
            <Grid container rowSpacing={2} columnSpacing={{ xs: 2, md: 3 }}>
              {[3, 4].map((itm) => (
                <Grid size={{ xs: 6, md: 12 }} key={itm}>
                  <ButtonBase
                    component="label"
                    role={undefined}
                    tabIndex={-1}
                    aria-label=""
                    sx={{
                      borderRadius: "40px",
                      "&:has(:focus-visible)": {
                        outline: "2px solid",
                        outlineOffset: "2px",
                      },
                    }}
                  >
                    <Avatar
                      alt="Upload new avatar"
                      src={avatarSrc[itm - 1]}
                      sx={{
                        width: "278px",
                        height: "181px",
                        backgroundColor: "#E5E2E2",
                        borderRadius: 1,
                      }}
                      variant="square"
                    >
                      {!avatarSrc[itm - 1] && <Add sx={{ fontSize: 80 }} />}
                    </Avatar>
                    <input
                      type="file"
                      accept="image/*"
                      style={{
                        border: 0,
                        clip: "rect(0 0 0 0)",
                        overflow: "hidden",
                        padding: 0,
                        position: "absolute",
                        whiteSpace: "nowrap",
                      }}
                      onChange={(e) => handleAvatarChange(e, itm)}
                    />
                  </ButtonBase>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
