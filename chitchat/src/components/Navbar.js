import React, { useState, useEffect } from "react";
import { BsChatTextFill } from "react-icons/bs";
import { truncate } from "lodash";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import SearchIcon from "@mui/icons-material/Search";
import MenuItem from "@mui/material/MenuItem";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import {
  NavbarContainer,
  StyledNavLink,
  InlineSection,
  Search,
} from "../views/styles";
import { ChatState } from "../context/chatProvider";
import Profile from "./Profile";
import Logout from "./Logout";
import Sidebar from "./Sidebar";
import { getSender } from "../config/appLogic";

const Navbar = () => {
  const { user, notification, setNotification, setSelectedChat } = ChatState();
  const pathname = window.location.pathname;

  const [anchorElUser, setAnchorElUser] = useState(null);
  const [anchorElNotification, setAnchorElNotification] = useState(null);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showSearchSidebar, setShowSearchSidebar] = useState(false);

  const settings = [
    {
      id: "profile",
      label: "Profile",
      action: () => setShowProfileModal(true),
    },
    { id: "logout", label: "Logout", action: () => setShowLogoutModal(true) },
  ];

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleOpenNotification = (event) => {
    setAnchorElNotification(event.currentTarget);
  };
  const handleCloseNotification = () => {
    setAnchorElNotification(null);
  };

  const getName = (notifData) => {
    return !notifData.isGroupChat
      ? getSender(notifData.users, user)
      : notifData.chatName;
  };

  const markNotifRead = (notifId) => {
    setNotification([...notification.filter((i) => i._id !== notifId)]);
  };

  return (
    <>
      <NavbarContainer>
        <InlineSection>
          <BsChatTextFill style={{ color: "white", fontSize: "1.5em" }} />
          <StyledNavLink to={pathname === "/homepage" ? "/myChats" : "/"}>
            {pathname === "/homepage" ? "My Chats" : "Home"}
          </StyledNavLink>
        </InlineSection>
        <InlineSection>
          {pathname !== "/homepage" && (
            <Search onClick={() => setShowSearchSidebar(true)}>
              <SearchIcon style={{ color: "white", fontSize: "1.5em" }} />
              <Typography variant="body2" style={{ color: "#f6e8e8" }}>
                Search User...
              </Typography>
            </Search>
          )}
          {pathname !== "/homepage" && <Badge
            badgeContent={notification.length > 0 && notification.length}
            color="secondary"
            invisible={notification.length === 0}
          >
            <NotificationsActiveIcon
              badgeContent={4}
              style={{ color: "white", cursor: "pointer" }}
              onClick={handleOpenNotification}
            />
          </Badge>}
          <IconButton
            onClick={handleOpenUserMenu}
            sx={{ p: 0 }}
            style={{ boxShadow: "0px 0px 20px -3px white" }}
          >
            <Avatar
              alt={user && user.firstName}
              src={user && user.pic ? user.pic : ""}
            />
          </IconButton>
          <Menu
            sx={{ mt: "45px" }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            {settings.map((setting) => (
              <MenuItem key={setting} onClick={handleCloseUserMenu}>
                <Typography textAlign="center" onClick={() => setting.action()}>
                  {setting.label}
                </Typography>
              </MenuItem>
            ))}
          </Menu>
          <Menu
            sx={{ mt: "45px" }}
            id="menu-notificationbar"
            anchorEl={anchorElNotification}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorElNotification)}
            onClose={handleCloseNotification}
          >
            {notification.length > 0 ? (
              notification.map((notif) => (
                <MenuItem
                  key={notif._id}
                  onClick={() => {
                    markNotifRead(notif._id);
                    setSelectedChat(notif.chat);
                  }}
                >
                  <Typography textAlign="center">
                    Received message, "
                    <b>
                      {truncate(notif.content, {
                        length: 40,
                      })}
                    </b>
                    " {notif.chat.isGroupChat ? "in" : "from"}{" "}
                    <b>{getName(notif.chat)}</b>
                  </Typography>
                </MenuItem>
              ))
            ) : (
              <MenuItem>
                <Typography color="primary">No new notification !</Typography>
              </MenuItem>
            )}
          </Menu>
        </InlineSection>

        {showProfileModal && (
          <Profile
            open={showProfileModal}
            setOpen={() => setShowProfileModal(false)}
            user={user}
          />
        )}
        {showLogoutModal && (
          <Logout
            open={showLogoutModal}
            setOpen={() => setShowLogoutModal(false)}
            user={user}
          />
        )}
        {showSearchSidebar && (
          <Sidebar
            open={showSearchSidebar}
            setOpen={() => setShowSearchSidebar(false)}
            user={user}
          />
        )}
      </NavbarContainer>
    </>
  );
};

export default Navbar;
