import React from "react";
import Feature from "./components/Features/Feature";
import { styled } from "@mui/system";
import Tabses from "./components/Features/Tabs";
const DivHeadr = styled("div")({
  maxWidth: "100vw",
});
const Features = () => {
  return (
    <DivHeadr>
      <Feature />
      <Tabses />
    </DivHeadr>
  );
};

export default Features;
