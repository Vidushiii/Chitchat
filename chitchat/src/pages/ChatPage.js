import React, { useState } from "react";
import styled from "styled-components";
import { ChatState } from "../context/chatProvider";
import MyChats from "../components/MyChats";
import Sidebar from "../components/Sidebar";
import ChatBox from "../components/ChatBox";
import Navbar from "../components/Navbar";

const ChatPage = () => {
  const { user } = ChatState();

  return (
    <>
      <TopSection>
        <Navbar />
      </TopSection>
      <Container>
        {user && <MyChats />}
        {user && <ChatBox />}
      </Container>
    </>
  );
};

export default ChatPage;

const TopSection = styled.div`
  width: 100%;
  background: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 10px;
  gap: 2%;
`;
