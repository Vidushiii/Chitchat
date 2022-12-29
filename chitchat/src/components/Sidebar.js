import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Drawer from "@mui/material/Drawer";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Avatar } from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";

import Loading from "./Loading";
import { ChatState } from "../context/chatProvider";

function Sidebar({ open, setOpen, user }) {
  const { setSelectedChat, chats, setChats } = ChatState();
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);
  console.log("looooooooo", search);

  const handleSearch = async () => {
    if (!search) {
      console.log("Please add some text!");
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

  const getSearchResults = () => {
    let time;
    return () => {
      clearTimeout(time);
      time = setTimeout(() => handleSearch(), 2000);
    };
  };

  useEffect(() => {
    if (!search) {
      getUserData();
    } else {
      getSearchResults();
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

  const UserListItem = (data) => {
    return (
      <UserCard onClick={() => accessChat(data._id)}>
        <Avatar
          alt={data.name}
          src={data?.pic ? data.pic : ""}
          sx={{ width: 40, height: 40 }}
        />
        <UserDetail>
          <Typography>
            {data.name ? data.name : data.firstName + " " + data.lastName}
          </Typography>
          <Typography>{data.email}</Typography>
        </UserDetail>
      </UserCard>
    );
  };

  console.log("serarch results", searchResult);

  return (
    <Drawer anchor="left" open={open} onClose={setOpen}>
      <MainContainer>
        <Typography textAlign="center">Search User</Typography>
        <Search>
          <TextField
            placeholder="Search with Name/Email!"
            id="input-with-icon-textfield"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            variant="standard"
          />
        </Search>
        {loading ? <Loading /> : searchResult.map((i) => UserListItem(i))}
        {loadingChat && !loading && <Loading />}
      </MainContainer>
    </Drawer>
  );
}

export default Sidebar;

const MainContainer = styled.div`
  padding: 18px 15px 0px 15px;
  display: flex;
  flex-direction: column;
  gap: 15px;
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
`;

const UserDetail = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`;
