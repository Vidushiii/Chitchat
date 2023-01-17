import React, { useState } from "react";
import styled from "styled-components";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import MenuItem from "@mui/material/MenuItem";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import { ChatState } from "../context/chatProvider";
import MyChats from "../components/MyChats";
import Sidebar from "../components/Sidebar";
import ChatBox from "../components/ChatBox";
import Navbar from "../components/Navbar";

const ChatPage = () => {
  const { user } = ChatState();

  const [showSearchSidebar, setShowSearchSidebar] = useState(false);

  return (
    <>
      <TopSection>
        <Navbar />
        {/* <Search onClick={() => setShowSearchSidebar(true)}>
              <SearchIcon /> Search
            </Search>
           <h2>Chitchat</h2> */}
      </TopSection>
      <Container>
        {user && <MyChats />}
        {user && <ChatBox />}
      </Container>
      {showSearchSidebar && (
        <Sidebar
          open={showSearchSidebar}
          setOpen={() => setShowSearchSidebar(false)}
          user={user}
        />
      )}
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

const Search = styled.div`
  width: 100px;
  border-bottom: 2px solid;
  display: flex;
  cursor: pointer;
`;

const AccountSection = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 10px;
  gap: 2%;
`;
