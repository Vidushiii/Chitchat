import React, { useState } from "react";
import { BsChatTextFill } from "react-icons/bs";
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import MenuItem from '@mui/material/MenuItem';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import { NavbarContainer, StyledNavLink, InlineSection } from "../views/styles";
import { ChatState } from "../context/chatProvider";
import Profile from "./Profile";
import Logout from "./Logout";

const Navbar = () => {
  const { user } = ChatState();
  const pathname = window.location.pathname;

  const [anchorElUser, setAnchorElUser] = useState(null);
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
      <NavbarContainer>
        <InlineSection>
          <BsChatTextFill style={{ color: "white", fontSize: "1.5em" }} />
        <StyledNavLink to={pathname === "/homepage" ? "/myChats" : "/"}>{pathname === "/homepage" ? "My Chats" : "Home"}</StyledNavLink>
        </InlineSection>
        <InlineSection>
            <NotificationsActiveIcon style={{ color: "white",  }} />
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }} style={{ boxShadow: "0px 0px 20px -3px white" }}>
                <Avatar alt={user && user.firstName} src={user && user.pic ? user.pic : ''} />
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
           </InlineSection>

           {showProfileModal && <Profile open={showProfileModal} setOpen={() => setShowProfileModal(false)} user={user} />}
        {showLogoutModal && <Logout open={showLogoutModal} setOpen={() => setShowLogoutModal(false)} user={user} />}
      </NavbarContainer>
    </>
  );
};

export default Navbar;
