import React, {useEffect }from "react";
import axios from 'axios';
import { BsArrowDownCircleFill } from "react-icons/bs";
import { Typography } from "@mui/material";
import Navbar from "../components/Navbar";
import { Rooms } from "../components/Rooms";

import { HomeContainer, SubHeading } from "../views/styles";

const HomePage = () => {
  const fetchData = async() => {
    const { data } = await axios.get('/chats');
  }
  const featuresData = [
    {content: "- Users have the ability to search for other users using their name and email."},
    {content: "- Users can create a group."},
    {content: "- Users can update group details like name, participants through settings icon on group chat."},
    {content: "- Group create/update modal supports user search and shows the list of existing members."},
    {content: "- User will receive notification for each new message, if he is not in that specific chat."},
    {content: "- After clicking on notification, user will be redirected to specific chat."}
  ];

  useEffect(() => {
    fetchData();
  },[])

  return (
    <>
      <Navbar />
      <HomeContainer>
        <SubHeading>
          <Typography color="primary">Hy there!</Typography>
          <Typography color="primary">Wanna connect with people, know about them, explore new exiting
          stuff!!</Typography>
          <Typography color="primary">Then, do start a chat with your friends and loved ones, LET'S CHITCHAT...</Typography>
        </SubHeading>

        <SubHeading>
          <Typography color="primary"><b>CHITCHAT</b> is an application that enables users to create an account, connect with others, view their chats in the "My chats" section, and initiate new conversations.</Typography>
          <Typography variant="h6" color="primary">Features of "My Chats" section : </Typography>
          <ul>{featuresData.map(i=> <Typography color="primary">{i.content}</Typography>)}</ul>
        </SubHeading>
      </HomeContainer>
    </>
  );
};

export default HomePage;
