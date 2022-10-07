import React from "react";
import NavPage from "./components/NavPage";
import BrandCarousel from "./components/BrandCarousel/BrandCarousel";
import MoveLikeStartup from "./components/MoveLikeStartup/MoveLikeStartup";
import Footer from "./components/Footer/Footer";
import CardText from "./components/CardText/CardText";
import HeroSection from "./components/HeroSection/HeroSection";
import SimplifyProcess from "./components/SimplifyProcess/SimplifyProcess";
import { styled } from "@mui/system";
import ClassCards from "./components/ClassCards/ClassCards";
import { IconContext } from "react-icons";
import Navbars from "./components/nav/Navbars";
const DivHeadr = styled("div")({
  maxWidth: "100vw",
  width: "100vw",
  fontFamily: "QuickSand",
});
const Home = () => {
  const moveLikeStartupdata1 = [
    {
      isreverse: true,
      Headtext: "School Management Software",
      Headtext2: "Completely digitze your School",
      listItem1: "School Admin Staff Automation",
      listItem2: "Teacher Task Automation",
      listItem3: "Student Ai Based HomeWork Automation",
    },
    {
      isreverse: false,
      Headtext: "School Management Software",
      Headtext2: "Completely digitze your School",
      listItem1: "School Admin Staff Automation",
      listItem2: "Teacher Task Automation",
      listItem3: "Student Ai Based HomeWork Automation",
    },
    {
      isreverse: true,
      Headtext: "School Management Software",
      Headtext2: "Completely digitze your School",
      listItem1: "School Admin Staff Automation",
      listItem2: "Teacher Task Automation",
      listItem3: "Student Ai Based HomeWork Automation",
    },
  ];
  return (
    <>
      <DivHeadr>
        <IconContext.Provider value={{ color: "#fff" }}>
          <div className=" row d-flex  flex-wrap flex-column NavPage-hero-section ">
            <Navbars />
          </div>
        </IconContext.Provider>
        <ClassCards />
        <BrandCarousel
          data={{
            url: "https://gloat.com/wp-content/uploads/logo-white-7.png",
            height: 100,
          }}
        />
        <MoveLikeStartup data={moveLikeStartupdata1} />
        <HeroSection />
        <BrandCarousel
          data={{
            url: "https://www.teachmint.com/static2/images/new-landing/web-sol-2.svg",
            height: 350,
          }}
        />
        <CardText />
        <SimplifyProcess />
        <BrandCarousel
          data={{
            url: "https://www.teachmint.com/static2/images/new-landing/school-1.png",
            height: 100,
          }}
        />
        <Footer />
      </DivHeadr>
    </>
  );
};

export default Home;
