import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Drawer from "@mui/material/Drawer";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Avatar, Button } from "@mui/material";
import axios from "axios";
import { ToastContainer, toast, Slide } from "react-toastify";
import { getName } from "../config/appLogic";
import Loading from "./Loading";
import { ChatState } from "../context/chatProvider";
import capitalize from "lodash.capitalize";

function Sidebar({ open, setOpen, user }) {
  const { setSelectedChat, chats, setChats } = ChatState();
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);

  const handleSearch = async () => {
    if (!search) {
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
      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
      setSearchResult(data);
      setLoading(false);
    } catch (error) {
      toast.error(error);
    }
  };

  const getUserData = async () => {
    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(`/api/user`, config);
      setSearchResult(data);
      setLoading(false);
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    if (!search) {
      getUserData();
    }
  }, [search]);

  const accessChat = async (userId) => {
    try {
      setLoadingChat(true);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.post(`/api/chat`, { userId }, config);
      setSelectedChat(data);
      setLoadingChat(false);
    } catch (error) {
      toast.error(error);
    }
  };

  const UserListItem = (data, setOpen) => {
    return (
      <UserCard
        onClick={() => {
          accessChat(data._id);
          setOpen(false);
        }}
      >
        <Avatar
          alt={capitalize(getName(data))}
          src={data.pic ? data.pic : ""}
          sx={{ width: 40, height: 40 }}
        />
        <UserDetail>
          <Typography>
            {capitalize(getName(data))}
          </Typography>
          <Typography>{data.email}</Typography>
        </UserDetail>
      </UserCard>
    );
  };

  return (
    <Drawer anchor="left" open={open} onClose={setOpen}>
      <MainContainer>
        <Header>
          <Typography variant="h5" textAlign="center" color="primary">
            Search User
          </Typography>
          <Search>
            <TextField
              placeholder="Search with Name/Email!"
              id="input-with-icon-textfield"
              onChange={(e) => setSearch(e.target.value)}
              value={search}
              style={{ width: "300px" }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              variant="standard"
            />
            <Button variant="contained" onClick={() => handleSearch()}>Go</Button>
          </Search>
        </Header>
        <BottomContainer>
          {loading ? (
            <Loading />
          ) : (
            searchResult.map((i) => UserListItem(i, setOpen))
          )}
          {loadingChat && !loading && <Loading />}
        </BottomContainer>
      </MainContainer>
      <ToastContainer
        position={toast.POSITION.TOP_RIGHT}
        autoClose={3000}
        transition={Slide}
        theme="light"
        draggable
      />
    </Drawer>
  );
}

export default Sidebar;

const MainContainer = styled.div`
  padding: 18px 15px 0px 15px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 300px;
  overflow: auto;
  ::-webkit-scrollbar {
    width: 3px;
  }
  ::-webkit-scrollbar-thumb {
    background: lightgray;
  }
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  position: fixed;
  background: white;
  top: 0;
  z-index: 1;
  padding: 10px;
  width: 285px;
`;

const BottomContainer = styled.div`
  margin-top: 90px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Search = styled.div`
  display: flex;
  gap: 5px;
  align-items: center;
`;

const UserCard = styled.div`
  display: flex;
  width: 100%;
  height: 50px;
  gap: 15px;
  align-items: center;
  cursor: pointer;
  border-bottom: 2px solid lightblue;
`;

const UserDetail = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`;
