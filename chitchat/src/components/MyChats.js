import React, { useEffect, useState } from "react";
import { ChatState } from "../context/chatProvider";
import { toast } from "react-toastify";
import axios from "axios";
import styled from "styled-components";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Typography from "@mui/material/Typography";
import Loading from "./Loading";
import GroupChatModal from "./GroupChatModal";
import { getSender } from "../config/appLogic";

function MyChats() {
  const { user, selectedChat, setSelectedChat, chats, setChats } = ChatState();

  const [open, setOpen] = useState(false);

  const fetchChats = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get("/api/chat", config);
      setChats(data);
    } catch (error) {
      toast.error("Failed to Load the chats");
    }
  };

  useEffect(() => {
    fetchChats();
  }, []);

  return (
    <OuterContainer>
      <Header>
        <Typography color="primary" variant="h6">
          My Chats
        </Typography>
        <Button
          variant="contained"
          endIcon={<AddIcon />}
          onClick={() => setOpen(true)}
        >
          Group Chat
        </Button>
      </Header>
      <ChatsContainer>
        {chats ? (
          chats.map((i) => (
            <ChatCard key={i._id} onClick={() => setSelectedChat(i)}>
              <Typography>
                {!i.isGroupChat ? getSender(i.users, user) : i.chatName}
              </Typography>
              <Typography>Msg : </Typography>
            </ChatCard>
          ))
        ) : (
          <Loading />
        )}
      </ChatsContainer>
      {open && <GroupChatModal open={open} setOpen={() => setOpen(false)} />}
    </OuterContainer>
  );
}

export default MyChats;

const OuterContainer = styled.div`
  border: 2px solid lightgray;
  width: 30%;
  height: 82vh;
  padding: 10px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  border-bottom: 2px solid #1976d2;
  padding-bottom: 10px;
`;

const ChatsContainer = styled.div`
  display: flex;
  gap: 10px;
  flex-direction: column;
  overflow: auto;
  ::-webkit-scrollbar {
    width: 3px;
  }
  ::-webkit-scrollbar-thumb {
    background: lightgray;
  }
`;

const ChatCard = styled.div`
  border-bottom: 2px solid lightgray;
  padding: 5px;
  cursor: pointer;
  margin-right: 5px;
`;
