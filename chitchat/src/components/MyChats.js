import React, {useEffect, useState} from 'react';
import { ChatState } from '../context/chatProvider';
import { toast } from 'react-toastify';
import axios from 'axios';
import styled from 'styled-components';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Typography from "@mui/material/Typography";


function MyChats() {
  const { user,
    selectedChat,
    setSelectedChat,
    chats,
    setChats } = ChatState();

    const [loggedUser, setLoggedUser] = useState();

    const fetchChats = async () => {
      // console.log(user._id);
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

    useEffect(() => {
      setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
      fetchChats();
    },[]);

  return (
    <OuterContainer>
      <Header>
        <Typography>My Chats</Typography>
      <Button variant="outlined" endIcon={<AddIcon />}>
  Start Group Chat
</Button>
      </Header>
      <ChatsContainer>
        {chats.length > 0 && chats.map(i => 
        <ChatCard><Typography>John</Typography>
        <Typography>Msg : </Typography> {console.log(i)}</ChatCard>
          )}
      </ChatsContainer>
      </OuterContainer>
  )
}

export default MyChats;

const OuterContainer = styled.div`
border: 2px solid;
width: 40%;
height: 72vh;
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
`;