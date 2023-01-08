import React, { useState } from 'react';
import styled from 'styled-components';
import Typography from "@mui/material/Typography";
import Loading from './Loading';
import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { toast } from 'react-toastify';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Avatar } from "@mui/material";
import { ChatState } from '../context/chatProvider';
import axios from 'axios';

const GroupChatModal= ({ open, setOpen}) => {
    const [groupChatName, setGroupChatName] = useState();
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);

  const { user, chats, setChats } = ChatState();

  const handleGroup = (userToAdd) => {
    if (selectedUsers.includes(userToAdd)) {
      toast({
        title: "User already added",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      return;
    }

    setSelectedUsers([...selectedUsers, userToAdd]);
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
      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      toast.error("Error Occured!, Failed to Load the Search Results");
    }
  };

  const handleDelete = (delUser) => {
    setSelectedUsers(selectedUsers.filter((sel) => sel._id !== delUser._id));
  };

  const handleSubmit = async () => {
    if (!groupChatName || !selectedUsers) {
      toast.warning("Please fill all the feilds");
      return;
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(
        `/api/chat/group`,
        {
          name: groupChatName,
          users: JSON.stringify(selectedUsers.map((u) => u._id)),
        },
        config
      );
      setChats([data, ...chats]);
      setOpen();
      toast.success("New Group Chat Created!");
    } catch (error) {
      toast.error("Failed to Create the Chat!");
    }
  };

  const UserListItem = (data) => {
    return (
      <UserCard onClick={() => handleGroup(data)}>
        <Avatar
          alt={data.name}
          src={data?.pic ? data.pic : ""}
          sx={{ width: 30, height: 30 }}
        />
        <UserDetail>
          <Typography variant="body1">
            {data.name ? data.name : data.firstName + " " + data.lastName}
          </Typography>
          <Typography variant="body2">{data.email}</Typography>
        </UserDetail>
      </UserCard>
    );
  };

  return (
    <Modal
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
        <CreateChat>
            <Header>
          <Typography variant="h5" textAlign="center">Create Group Chat!</Typography>
        <IconButton onClick={setOpen}>
  <CloseIcon />
</IconButton>
          </Header>
          <Box component="form" sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                size="small"
                required
                fullWidth
                id="groupName"
                placeholder='Group Name'
                onChange={(e) => setGroupChatName(e.target.value)}
                autoFocus
              />
             <SelectedUsersContainer>{selectedUsers.map(user => <Button size="small" variant="contained" endIcon={<CloseIcon />} onClick={( ) => handleDelete(user)}>
  {user.name ? user.name : user.firstName}
</Button>)}</SelectedUsersContainer>
              <TextField
                margin="normal"
                size="small"
                required
                fullWidth
                name="groupMembers"
                id="groupMembers"
                placeholder='Add group members'
                onChange={(e) => handleSearch(e.target.value)}
              />
            </Box>
            
          <SearchListContainer>
           {loading ? <Loading dimensions="20" marginTop="5%" /> : searchResult?.map(data => UserListItem(data))}
          </SearchListContainer>

          <Button onClick={() => handleSubmit()} variant="contained">
            Create Group
          </Button>
        </CreateChat>
      </Fade>
    </Modal>
  )
}

export default GroupChatModal;


const CreateChat = styled.div`
position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 450px;
  border: 2px solid #726969;
  padding: 30px 30px 40px 30px;
  color: black;
  background: white;
  border-radius: 20px;
  display:flex;
  gap: 15px;
  flex-direction: column;
`;

const SearchListContainer = styled.div`
display: flex;

    flex-direction: column;
    gap: 12px;
    max-height: 250px;
    overflow-y: auto;
    overflow-x: hidden;

`;

const Header = styled.div`
display: flex;
    justify-content: space-between;
    align-content: space-around;
    align-items: center;
`;

const UserCard = styled.div`
  display: flex;
  height: 35px;
  gap: 15px;
  align-items: center;
  cursor: pointer;
  border: 2px solid lightgrey;
    border-radius: 15px;
    padding: 5px 0px 5px 10px;
    padding: 5px 10px;
    width: 92%;
`;

const UserDetail = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`;

const SelectedUsersContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
    max-height: 138px;
    overflow-y: auto;
    overflow-x: hidden;
`;
