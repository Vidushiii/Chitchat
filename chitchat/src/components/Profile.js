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
          <Typography variant="h5" textAlign="center" color="primary">
            {user.name ? user.name : user.firstName + " " + user.lastName}
          </Typography>
          <Avatar
            alt={user && user.firstName}
            src={user && user.pic ? user.pic : ""}
            sx={{ width: 120, height: 120, marginLeft: "36%" }}
            style={{ boxShadow: "0px 0px 20px -3px #0080ff" }}
          />
          <Typography variant="body1" textAlign="center" color="primary">Email : {user.email}</Typography>
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
  border: 2px solid #0080ff;
  padding: 30px 30px 40px 30px;
  color: black;
  background: white;
  border-radius: 20px;
  display:flex;
  gap: 25px;
  flex-direction: column;
`;
