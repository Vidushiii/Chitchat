import React, { createContext, useContext, useState, useEffect } from "react";
import {useNavigate} from "react-router-dom";

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const [selectedChat, setSelectedChat] = useState();
  const [user, setUser] = useState();
  const [notification, setNotification] = useState([]);
  const [chats, setChats] = useState();
  const [fetchAgain, setFetchAgain] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if(!user){
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    setUser(userInfo);}
   // if (!userInfo) navigate("/homepage");
  }, [user]);

  return (
    <ChatContext.Provider
      value={{
        selectedChat,
        setSelectedChat,
        user,
        setUser,
        notification,
        setNotification,
        chats,
        setChats,
        fetchAgain,
        setFetchAgain
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const ChatState = () => {
  return useContext(ChatContext);
};

export default ChatProvider;