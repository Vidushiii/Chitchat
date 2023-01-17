import React, { useEffect, useState } from "react";
import { ChatState } from "../context/chatProvider";
import { toast } from "react-toastify";
import axios from "axios";
import styled from "styled-components";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Typography from "@mui/material/Typography";
import { Avatar } from "@mui/material";
import Loading from "./Loading";
import GroupChatModal from "./GroupChatModal";
import { getSender, getSenderPic } from "../config/appLogic";
import { capitalize, truncate } from "lodash";

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

  const getName = (chatData) => {
    return !chatData.isGroupChat
      ? getSender(chatData.users, user)
      : chatData.chatName;
  };

  const getSelectedChatName = () => {
    return (
      selectedChat &&
      (selectedChat.isGroupChat
        ? selectedChat.chatName
        : getSender(selectedChat && selectedChat.users, user))
    );
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
          chats.map(
            (i) =>
              i.users && (
                <ChatCard
                  key={i._id}
                  onClick={() => setSelectedChat(i)}
                  selected={getSelectedChatName() === getName(i)}
                >
                  <Avatar
                    alt={capitalize(getName(i))}
                    src={!i.isGroupChat && (getSenderPic(i.users, user) || "")}
                    sx={{ width: 40, height: 40 }}
                    style={{ boxShadow: "0px 0px 10px -3px #0080ff" }}
                  />
                  <Content>
                    <Typography>{capitalize(getName(i))}</Typography>
                    <Typography style={{ color: "gray" }}>
                      {i.latestMessage
                        ? truncate(i.latestMessage.content, {
                            length: 40,
                          })
                        : "Start chatting.."}
                    </Typography>
                  </Content>
                </ChatCard>
              )
          )
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
  border-bottom: 2px solid lightblue;
  padding: 10px;
  cursor: pointer;
  background: ${({ selected }) => selected && "#def7ff"};
  border-radius: ${({ selected }) => selected && "10px"};
  margin-right: 5px;
  display: flex;
  gap: 4%;
  align-items: center;
  &:hover {
    background: #91d7ed;
    border-radius: 10px;
  }
`;

const Content = styled.div``;
