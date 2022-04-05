import React from "react";
import { BsArrowDownCircleFill } from "react-icons/bs";

import Navbar from "../components/Navbar";
import { Rooms } from "../components/Rooms";

import { HomeContainer, SubHeading } from "../views/styles";

const HomePage = () => {
  return (
    <>
      <Navbar />
      <HomeContainer>
        <SubHeading>
          Hy there! <br />
          <br /> Wanna connect with people, know about them, explore new exiting
          stuff!!
          <br />
          <br />
          Then, do join the room according to the GENRE you like and CHITCHAT.{" "}
          <BsArrowDownCircleFill />
        </SubHeading>
        <Rooms />
      </HomeContainer>
    </>
  );
};

export default HomePage;
