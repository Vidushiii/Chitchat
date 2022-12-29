import React, { useState } from "react";
import styled from "styled-components";
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import MenuItem from '@mui/material/MenuItem';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';

import { ChatState } from "../context/chatProvider";
import MyChats from "../components/MyChats";
import Sidebar from "../components/Sidebar";
import ChatBox from "../components/ChatBox";
import Profile from "../components/Profile";
import Logout from "../components/Logout";

const ChatPage = () => {
    const { user } = ChatState();

    const [anchorElUser, setAnchorElUser] = useState(null);
    const [showSearchSidebar, setShowSearchSidebar] = useState(false); 
    const [showProfileModal, setShowProfileModal] = useState(false); 
    const [showLogoutModal, setShowLogoutModal] = useState(false); 

    const settings = [
      {id: "profile",
        label : 'Profile',
      action : () => setShowProfileModal(true)
    },
      {id: "logout",
        label : 'Logout',
      action: () => setShowLogoutModal(true)
    }
    ];

    const handleOpenUserMenu = (event) => {
      setAnchorElUser(event.currentTarget);
    };
    const handleCloseUserMenu = () => {
      setAnchorElUser(null);
    };
    return (
        <>
        <TopSection> 
            <Search onClick={() => setShowSearchSidebar(true)}>
              <SearchIcon /> Search
            </Search>
           <h2>Chitchat</h2>
           <AccountSection>
            <NotificationsActiveIcon/>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt={user?.firstName} src={user?.pic ? user.pic : ''} />
              </IconButton>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                 <Typography textAlign="center" onClick={() => setting.action()}>{setting.label}</Typography>
                </MenuItem>
              ))}
            </Menu>
           </AccountSection>
        </TopSection>
        <h2>chatssssssssssss</h2>
        <Container>
            {user && <MyChats />}
            {user && <ChatBox />}
        </Container>
        {showSearchSidebar && <Sidebar open={showSearchSidebar} setOpen={() => setShowSearchSidebar(false)} user={user} />}
        {showProfileModal && <Profile open={showProfileModal} setOpen={() => setShowProfileModal(false)} user={user} />}
        {showLogoutModal && <Logout open={showLogoutModal} setOpen={() => setShowLogoutModal(false)} user={user} />}
        </>
    )
};

export default ChatPage;

const TopSection = styled.div`
height: 50px;
width: 98.5%;
background: white;
display: flex;
justify-content: space-between;
align-items: center;
padding: 5px 10px;
`;

const Search = styled.div`
width: 100px;
border-bottom: 2px solid;
display: flex;
cursor: pointer;
`;

const AccountSection = styled.div`
display: flex;
align-items: center;
gap: 10px;
`;

const Container = styled.div`
display: flex;
    justify-content: space-between;
    width: 98%;
    height: 100%;
    padding: 10px;
`;