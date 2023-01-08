import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Typography from "@mui/material/Typography";
import SettingsIcon from "@mui/icons-material/Settings";
import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import { Avatar } from "@mui/material";
import capitalize from "lodash.capitalize";
import { ChatState } from "../context/chatProvider";
import axios from "axios";
import { toast } from "react-toastify";
import Loading from "./Loading";

const EditDetails = ({
  open,
  setOpen,
  selectedChat,
  user,
  setSelectedChat,
  fetchAgain,
  setFetchAgain,
}) => {
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [renameloading, setRenameLoading] = useState(false);
  const [groupChatName, setGroupChatName] = useState();
  const [search, setSearch] = useState("");

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

  const UserListItem = ({data}) => {
    return (
      <UserCard onClick={() => handleAddUser(data)}>
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
        <ModalContainer>
          <Header>
            <Typography variant="h5" >{capitalize(selectedChat.chatName)}</Typography>
            <CloseIcon />
          </Header>
          <SelectedUsersContainer>
            {selectedChat &&
              selectedChat.users
                .filter((addedUser) => addedUser._id !== user._id)
                .map((d) => (
                  <Button
                    key={d._id}
                    variant="contained"
                    size="small"
                    endIcon={<CloseIcon />}
                    onClick={() => handleRemove(user)}
                  >
                    {d.name ? d.name : d.firstName}
                  </Button>
                ))}
          </SelectedUsersContainer>
          <Box component="form" sx={{ mt: 1 }} style={{ marginTop: "-20px"}}>
            <TextField
              margin="normal"
              required
              fullWidth
              size="small"
              id="groupName"
              placeholder="Group Name"
              onChange={(e) => setGroupChatName(e.target.value)}
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              size="small"
              name="groupMembers"
              id="groupMembers"
              placeholder="Add group members"
              onChange={(e) => handleSearch(e.target.value)}
            />
          </Box>
          <SearchListContainer>
            {loading ? (
              <Loading dimensions="20" marginTop="5%" />
            ) : (
              searchResult?.slice(0, 4).map((data) => <UserListItem key={data._id} data={data} />)
            )}
          </SearchListContainer>
          <Header>
            <Button variant="contained" color="success">
              Update
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => handleRemove(user)}
            >
              Leave Group
            </Button>
          </Header>
        </ModalContainer>
      </Fade>
    </Modal>
  );
};

function SingleChat() {
  const {
    selectedChat,
    setSelectedChat,
    user,
    notification,
    setNotification,
    fetchAgain,
    setFetchAgain,
  } = ChatState();

  const [open, setOpen] = useState(false);

  const getSender = (users) => {
    return users[0]._id === user._id
      ? users[1].name
        ? users[1].name
        : users[1].firstName
      : users[0].name
      ? users[0].name
      : users[0].firstName;
  };

  return selectedChat ? (
    <OuterContainer>
      {" "}
      <Header>
        <Typography>
          {selectedChat.isGroupChat
            ? capitalize(selectedChat.chatName)
            : getSender(selectedChat.users)}
        </Typography>{" "}
        {selectedChat.isGroupChat && (
          <SettingsIcon onClick={() => setOpen(true)} />
        )}{" "}
      </Header>
      {open && (
        <EditDetails
          key={user._id}
          open={open}
          setOpen={setOpen}
          setFetchAgain={setFetchAgain}
          fetchAgain={fetchAgain}
          selectedChat={selectedChat}
          setSelectedChat={setSelectedChat}
          user={user}
        />
      )}
      SingleChat jijiji
    </OuterContainer>
  ) : (
    "Please select a chat"
  );
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
  width: 450px;
  border: 2px solid #726969;
  padding: 30px 30px 40px 30px;
  color: black;
  background: white;
  border-radius: 20px;
  display: flex;
  gap: 15px;
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

const SearchListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-height: 250px;
  overflow-y: auto;
  overflow-x: hidden;
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
