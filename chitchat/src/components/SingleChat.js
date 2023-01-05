import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import Typography from '@mui/material/Typography';
import SettingsIcon from '@mui/icons-material/Settings';
import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import capitalize from 'lodash.capitalize';
import { ChatState } from '../context/chatProvider';
import axios from 'axios';
import { toast } from 'react-toastify';

const EditDetails = ({ open, setOpen, selectedChat, user, setGroupChatName, handleAddUser, handleSearch, handleRemove }) => {
  return (<Modal
    aria-labelledby="transition-modal-title"
    aria-describedby="transition-modal-description"
    open={open}
    onClose={() => setOpen(false)}
    closeAfterTransition
    BackdropComponent={Backdrop}
    BackdropProps={{
      timeout: 500,
    }}
  >
    <Fade in={open}>
    <ModalContainer>
      <Header><Typography>
        {capitalize(selectedChat.chatName)}
      </Typography>
      <CloseIcon />
      </Header>
      <SelectedUsersContainer>{selectedChat && selectedChat.users.filter(addedUser => addedUser._id !== user._id).slice(0,2).map( d => <Button variant="contained" endIcon={<CloseIcon />} >
    {/* onClick={( ) => handleDelete(addedUser)}> */}
{d.name ? d.name : d.firstName}
</Button>)}</SelectedUsersContainer>
<Box component="form" sx={{ mt: 1 }}>
<TextField
            margin="normal"
            required
            fullWidth
            id="groupName"
            placeholder='Group Name'
            onChange={(e) => setGroupChatName(e.target.value)}
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="groupMembers"
            id="groupMembers"
            placeholder='Add group members'
            onChange={(e) => handleSearch(e.target.value)}
          /></Box>
          <Header>
            <Button variant="contained" color="success">Update</Button>
            <Button variant="contained" color="error" onClick={() => handleRemove(user)}>Leave Group</Button>
          </Header>
    </ModalContainer>
    </Fade>
</Modal>)
}

function SingleChat() {
    const { selectedChat, setSelectedChat, user, notification, setNotification, fetchAgain, setFetchAgain } =
    ChatState();

    const [open, setOpen] = useState(false);
    const [groupChatName, setGroupChatName] = useState();
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [renameloading, setRenameLoading] = useState(false);

    const getSender = (users) => {
        return users[0]._id === user._id ? users[1].name ?  users[1].name : users[1].firstName : users[0].name ? users[0].name  : users[0].firstName
      };

      const handleSearch = async (query) => {
        setSearch(query);
        if (!query) {
          return;
        }
    
        try {
          setLoading(true);
          const config = {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          };
          const { data } = await axios.get(`/api/user?search=${search}`, config);
          console.log(data);
          setLoading(false);
          setSearchResult(data);
        } catch (error) {
          toast.error("Failed to Load the Search Results");
          setLoading(false);
        }
      };

      const handleRename = async () => {
        if (!groupChatName) return;
    
        try {
          setRenameLoading(true);
          const config = {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          };
          const { data } = await axios.put(
            `/api/chat/rename`,
            {
              chatId: selectedChat._id,
              chatName: groupChatName,
            },
            config
          );
    
          console.log(data._id);
          setSelectedChat("");
          setSelectedChat(data);
          setFetchAgain(!fetchAgain);
          setRenameLoading(false);
        } catch (error) {
          toast.error(error.response.data.message);
          setRenameLoading(false);
        }
        setGroupChatName("");
      };
    
      const handleAddUser = async (user1) => {
        if (selectedChat.users.find((u) => u._id === user1._id)) {
          toast.error("User Already in group!");
          return;
        }
    
        if (selectedChat.groupAdmin._id !== user._id) {
          toast.error("Only admins can add someone!");
          return;
        }
    
        try {
          setLoading(true);
          const config = {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          };
          const { data } = await axios.put(
            `/api/chat/groupadd`,
            {
              chatId: selectedChat._id,
              userId: user1._id,
            },
            config
          );
    
          setSelectedChat(data);
         // setFetchAgain(!fetchAgain);
          setLoading(false);
        } catch (error) {
          toast.error(error.response.data.message);
          setLoading(false);
        }
        setGroupChatName("");
      };
    
      const handleRemove = async (user1) => {
        if (selectedChat.groupAdmin._id !== user._id && user1._id !== user._id) {
          toast.error("Only admins can remove someone!");
          return;
        }
    
        try {
          setLoading(true);
          const config = {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          };
          const { data } = await axios.put(
            `/api/chat/groupremove`,
            {
              chatId: selectedChat._id,
              userId: user1._id,
            },
            config
          );
    
          user1._id === user._id ? setSelectedChat() : setSelectedChat(data);
          setFetchAgain(!fetchAgain);
         // fetchMessages();
          setLoading(false);
        } catch (error) {
          toast.error(error.response.data.message);
          setLoading(false);
        }
        setGroupChatName("");
      };

  return (
    selectedChat ?
    <OuterContainer> <Header><Typography>{selectedChat.isGroupChat
 ? capitalize(selectedChat.chatName) : getSender(selectedChat.users) }</Typography> {selectedChat.isGroupChat && <SettingsIcon onClick={() => setOpen(true)} />} </Header>

 {open && <EditDetails open = {open} setOpen = {setOpen} 
 selectedChat = {selectedChat} user = {user} setGroupChatName = {setGroupChatName}
  handleAddUser = {handleAddUser} 
  handleRemove = {handleRemove}
  handleSearch = {handleSearch}
   />}
        SingleChat jijiji</OuterContainer> : "Please select a chat"
  )
}

export default SingleChat;

const OuterContainer = styled.div`
width: 100%;
`;

const Header = styled.div`
width: 100%;
display: flex;
    justify-content: space-between;
`;

const ModalContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  border: 2px solid #726969;
  padding: 30px 30px 40px 30px;
  color: black;
  background: white;
  border-radius: 20px;
  display:flex;
  gap: 15px;
  flex-direction: column;
`;

const SelectedUsersContainer = styled.div`
`;
