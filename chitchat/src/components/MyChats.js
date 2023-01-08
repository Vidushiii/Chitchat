import React, {useEffect, useState} from 'react';
import { ChatState } from '../context/chatProvider';
import { toast } from 'react-toastify';
import axios from 'axios';
import styled from 'styled-components';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Typography from "@mui/material/Typography";
import Loading from './Loading';
import GroupChatModal from './GroupChatModal';

function MyChats() {
  const { user,
    selectedChat,
    setSelectedChat,
    chats,
    setChats } = ChatState();

    const [loggedUser, setLoggedUser] = useState();
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
        toast({
          title: "Error Occured!",
          description: "Failed to Load the chats",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom-left",
        });
      }
    };

    const getSender = (users) => {
      return users[0]._id === loggedUser._id ? users[1].name ?  users[1].name : users[1].firstName : users[0].name ? users[0].name  : users[0].firstName
    };

    useEffect(() => {
      setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
      fetchChats();
    },[]);

  return (
    <OuterContainer>
      <Header>
        <Typography>My Chats</Typography>
      <Button variant="outlined" endIcon={<AddIcon />} onClick={() => setOpen(true)} >
  Start Group Chat
</Button>
      </Header>
      <ChatsContainer>
        {chats ? chats.map(i => 
        <ChatCard key={i._id} onClick={() => setSelectedChat(i)}><Typography>{!i.isGroupChat ? getSender(i.users) : i.chatName}</Typography>
        <Typography>Msg : </Typography></ChatCard>
          ) : <Loading />}
      </ChatsContainer>
      {open && <GroupChatModal open={open} setOpen={() => setOpen(false)} /> }
      </OuterContainer>
  )
}

export default MyChats;

const OuterContainer = styled.div`
border: 2px solid;
width: 30%;
height: 82vh;
padding: 10px;
border-radius: 10px;
display: flex;
flex-direction: column;
gap: 20px;
`;

const Header = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
width: 100%;
`;

const ChatsContainer = styled.div`
display: flex;
    gap: 10px;
    flex-direction: column;
    overflow: auto;
`;

const ChatCard = styled.div`
border: 2px solid;
border-radius: 10px;
padding: 8px;
cursor: pointer;
`;
