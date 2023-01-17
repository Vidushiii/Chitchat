import React from "react";
import styled from "styled-components";
import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import {useNavigate} from "react-router-dom";

function Logout({ open, setOpen }) {

    const navigate = useNavigate();

    const logoutHandler = () => {
        localStorage.removeItem("userInfo");
        navigate("/");
    }
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
          <Typography variant="h6" textAlign="center" color="primary">Do you want to logout?</Typography>
          <Container>
            <Button variant="contained" onClick={() => logoutHandler()}>Yes</Button>
            <Button variant="contained" onClick={setOpen}>No</Button>
          </Container>
        </OuterContainer>
      </Fade>
    </Modal>
  );
}

export default Logout;

const OuterContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  border: 2px solid #0080ff;
  padding: 20px;
  color: black;
  background: white;
  border-radius: 20px;
`;

const Container = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin-top: 20px;
`;
