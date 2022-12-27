import React from "react";
import styled from "styled-components";
import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";

function Profile({ open, setOpen, user }) {
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={setOpen}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <OuterContainer>
          <Typography textAlign="center">
            {user.firstName} {user.lastName}
          </Typography>
          <Avatar
            alt={user?.firstName}
            src={user?.pic ? user.pic : ""}
            sx={{ width: 100, height: 100, marginLeft: "40%" }}
          />
          <Typography textAlign="center">Email : {user.email}</Typography>
        </OuterContainer>
      </Fade>
    </Modal>
  );
}

export default Profile;

const OuterContainer = styled.div`
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
