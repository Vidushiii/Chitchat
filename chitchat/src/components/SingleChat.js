import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { BsChatTextFill } from "react-icons/bs";
import Typography from "@mui/material/Typography";
import SettingsIcon from "@mui/icons-material/Settings";
import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";
import { Button, Input } from "@mui/material";
import Box from "@mui/material/Box";
import { Avatar } from "@mui/material";
import capitalize from "lodash.capitalize";
import { ChatState } from "../context/chatProvider";
import axios from "axios";
import { ToastContainer, toast, Slide } from "react-toastify";
import Loading from "./Loading";
import SendIcon from "@mui/icons-material/Send";
import {
  getSender,
  isSameSender,
  isLastMessage,
  getSenderPic,
} from "../config/appLogic";
import io from "socket.io-client";

const ENDPOINT = "localhost:5000";
var socket, selectedChatCompare;

const EmptyChat = () => {
  return (
    <EmptyContainer>
      <BsChatTextFill style={{ color: "#1976d2", fontSize: "8em" }} />
      <Typography variant="h5" color="primary">
        Start Chatting!
      </Typography>
    </EmptyContainer>
  );
};

const EditDetails = ({
  open,
  setOpen,
  selectedChat,
  user,
  setSelectedChat,
  fetchAgain,
  setFetchAgain,
  fetchMessages,
}) => {
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [groupChatName, setGroupChatName] = useState(
    capitalize(selectedChat.chatName)
  );
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
      setSearch("");
    } catch (error) {
      toast.error("Failed to Load the Search Results");
      setLoading(false);
    }
  };

  const handleRename = async () => {
    if (!groupChatName) return;

    try {
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
      setOpen(false);
    } catch (error) {
      toast.error(error.response.data.message);
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
      fetchMessages();
      setLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
      setLoading(false);
    }
    setGroupChatName("");
  };

  const UserListItem = ({ data }) => {
    return (
      <UserCard onClick={() => handleAddUser(data)}>
        <Avatar
          alt={data.name}
          src={data && data.pic ? data.pic : ""}
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
            <Typography variant="h5">
              {capitalize(selectedChat.chatName)}
            </Typography>
            <CloseIcon
              onClick={() => setOpen(false)}
              style={{ cursor: "pointer" }}
            />
          </Header>
          <SelectedUsersContainer>
            {selectedChat &&
              selectedChat.users
                .filter((addedUser) => addedUser._id !== user._id)
                .map((userData) => (
                  <Button
                    key={userData._id}
                    variant="contained"
                    size="small"
                    endIcon={<CloseIcon />}
                    onClick={() => handleRemove(userData)}
                  >
                    {userData.name ? userData.name : userData.firstName}
                  </Button>
                ))}
          </SelectedUsersContainer>
          <Box component="form" sx={{ mt: 1 }} style={{ marginTop: "-20px" }}>
            <TextField
              margin="normal"
              required
              fullWidth
              size="small"
              id="groupName"
              placeholder="Group Name"
              value={groupChatName}
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
              searchResult &&
              searchResult.map((data) => (
                <UserListItem key={data._id} data={data} />
              ))
            )}
          </SearchListContainer>
          <Header>
            <Button
              variant="contained"
              color="success"
              onClick={() => handleRename()}
            >
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
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState();
  const [socketConnected, setSocketConnected] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const fetchMessages = async () => {
    if (!selectedChat) return;

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      setLoading(true);

      const { data } = await axios.get(
        `/api/message/${selectedChat._id}`,
        config
      );
      setMessages(data);
      setLoading(false);

      socket.emit("joinchat", selectedChat._id);
    } catch (error) {
      toast.error("Failed to Load the Messages");
    }
  };

  const sendMessage = async () => {
    if (newMessage) {
      socket.emit("stop typing", selectedChat._id);
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        };
        setNewMessage("");
        const { data } = await axios.post(
          "/api/message",
          {
            content: newMessage,
            chatId: selectedChat,
          },
          config
        );
        setMessages([...messages, data]);
        socket.emit("new message", data);
      } catch (error) {
        toast.error("Error Occured! Failed to send the Message");
      }
    }
  };

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", user);
    socket.on("connected", () => setSocketConnected(true));
    socket.on("typing", (userId) => {
      if (userId !== user._id) setIsTyping(true);
    });
    socket.on("stop typing", () => setIsTyping(false));

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    fetchMessages();
    selectedChatCompare = selectedChat;
    // eslint-disable-next-line
  }, [selectedChat]);

  useEffect(() => {
    if (socket) {
      socket.on("message recieved", (newMessageRecieved) => {
        if (
          !selectedChatCompare ||
          selectedChatCompare._id !== newMessageRecieved.chat._id
        ) {
          if (!notification.includes(newMessageRecieved)) {
            setNotification([newMessageRecieved, ...notification]);
            setFetchAgain(!fetchAgain);
          }
        } else {
          setMessages([...messages, newMessageRecieved]);
        }
      });
    }
  });

  const typingHandler = (e) => {
    setNewMessage(e.target.value);

    if (!socketConnected) {
      return;
    }

    if (!isTyping) {
      socket.emit("typing", selectedChat._id, user._id);
    }

    let lastTypingTime = new Date().getTime();
    var timerLength = 3000;
    setTimeout(() => {
      var timeNow = new Date().getTime();
      var timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timerLength && isTyping) {
        socket.emit("stop typing", selectedChat._id);
        setIsTyping(false);
      }
    }, timerLength);
  };

  return selectedChat ? (
    <OuterContainer>
      {" "}
      <Header background>
        <InlineSection>
          <Avatar
            alt={capitalize(
              !selectedChat.isGroupChat
                ? getSender(selectedChat.users, user)
                : selectedChat.chatName
            )}
            src={
              selectedChat.isGroupChat
                ? ""
                : getSenderPic(selectedChat.users, user) || ""
            }
            sx={{ width: 40, height: 40 }}
            style={{ boxShadow: "0px 0px 10px -3px #0080ff" }}
          />
          <Typography style={{ color: "white" }}>
            {selectedChat.isGroupChat
              ? capitalize(selectedChat.chatName)
              : getSender(selectedChat.users, user)}
          </Typography>
        </InlineSection>
        {selectedChat.isGroupChat && (
          <SettingsIcon
            onClick={() => setOpen(true)}
            style={{ cursor: "pointer", color: "white" }}
          />
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
          fetchMessages={fetchMessages}
        />
      )}
      {loading ? (
        <Loading marginTop="0%" />
      ) : (
        <Body>
          <ChatContainer>
            {messages.length
              ? messages
                  .slice(0)
                  .reverse()
                  .map((msg, i) => (
                    <MessageOuterContainer
                    
                    >
                      {msg.sender._id !== user._id &&(
                          <Avatar
                            alt={
                              msg.sender.name
                                ? msg.sender.name
                                : msg.sender.firstName +
                                  " " +
                                  msg.sender.lastName
                            }
                            src={msg.sender.pic ? msg.sender.pic : ""}
                            sx={{ width: 30, height: 30 }}
                            style={{ boxShadow: "0px 0px 10px -3px #0080ff" }}
                          />
                        )}
                      <Message
                        sameUser={msg.sender._id === user._id}
                        key={msg._id}
                      >
                        <Content>{msg.content}</Content>
                      </Message>
                    </MessageOuterContainer>
                  ))
              : EmptyChat()}
          </ChatContainer>
          {isTyping && <div>Typing</div>}
          <MessageContainer>
            <Input
              placeholder="Enter a message..."
              onChange={typingHandler}
              value={newMessage}
              style={{ width: "100%" }}
            />
            <Button
              variant="contained"
              endIcon={<SendIcon />}
              onClick={() => sendMessage()}
            />
          </MessageContainer>
        </Body>
      )}
      <ToastContainer
        position={toast.POSITION.TOP_RIGHT}
        autoClose={3000}
        transition={Slide}
        theme="light"
        draggable
      />
    </OuterContainer>
  ) : (
    EmptyChat()
  );
}

export default SingleChat;

const OuterContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  background: ${({ background }) => background && "#1976d2"};
  margin: -1px -1px 0px -1px;
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
  padding: 12px;
  border: ${({ background }) => background && "2px solid #1976d2"};
  align-items: center;
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

const ChatContainer = styled.div`
  display: flex;
  gap: 6px;
  height: 86%;
  align-items: flex-start;
  padding: 10px;
  justify-content: flex-start;
  overflow: auto;
  flex-direction: column-reverse;
  ::-webkit-scrollbar {
    width: 3px;
  }
  ::-webkit-scrollbar-thumb {
    background: lightgray;
  }
`;

const MessageContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 5px;
  border: 2px solid lightgray;
  border-radius: 10px;
  margin: 8px;
  padding: 5px;
  box-shadow: 0px 0px 10px -3px #0080ff;
`;

const Body = styled.div`
  height: 90%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Message = styled.div`
  width: 100%;
  display: flex;
  justify-content: ${({ sameUser }) => (sameUser ? "flex-end" : "flex-start")};
`;

const MessageOuterContainer = styled.div`
  display: flex;
  gap: 4px;
  width: ${({ space }) => !space && "100%"};
  margin-left: ${({ space }) => space && "34px"};
`;

const Content = styled.div`
  padding: 5px 8px;
  border-radius: 10px;
  background: #def7ff;
  display: flex;
  align-items: center;
  &:hover {
    background: #91d7ed;
  }
  overflow-wrap: anywhere;
  max-width: 82%;
`;

const EmptyContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 15px;
`;

const InlineSection = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;
