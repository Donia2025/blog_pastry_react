import * as React from "react";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { Postscontext } from "../Context/Context";

export default function Multitoggelbutton({
  handelchangecategory,
  setcategory,
  categoryone,
}) {
  const { fetchcategory, category } = React.useContext(Postscontext);
  const handelchange = (_, value) => {
    setcategory(value);
    console.log(value);
  };
  React.useEffect(() => {
    fetchcategory();
  }, []);
  const control = {
    exclusive: true,
  };
  console.log(category);
  const children = [...category].map((itm, index) => (
    <ToggleButton
      variant="h1"
      sx={{
        p: 0,
        m: 0,
        mx: 1,
        backgroundColor:
          categoryone === (Number(itm.id)-1) ? "primary.contrastText" : "primary.main",
        color: "primary.light",
        border: "1px solid transparent",
        " &:hover": {
          backgroundColor: "primary.light",
          color: "primary.contrastText",
          boxSizing: "border-box",
        },
      }}
      key={itm.id}
      value={itm}
      style={{
        borderRadius: "8px ",
        fontSize: "1rem",
        padding: "0.5rem 1.5rem",
        textAlign: "center",
      }}
onChange={(e) => handelchangecategory(e, itm.id - 1)}
    >
      {itm.name}
    </ToggleButton>
  ));
  return (
    <ToggleButtonGroup
      size="small"
      {...control}
      onChange={handelchange}
      aria-label="small sizes"
    >
      {children}
    </ToggleButtonGroup>
  );
}
