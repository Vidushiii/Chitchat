import React,{ useState } from "react";
import { Heading, Header, RoomInfoCard, RoomLogo } from "../views/styles";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Grid } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const RoomCard = () => {
return (
    <RoomInfoCard>
        <RoomLogo />
        <div>
        <Heading size="18px" decoration pointer>Room nameeeeee</Heading>
        <br />
        <Heading size="15px">Genre : </Heading>
        </div>
    </RoomInfoCard>
)
}

export const Rooms = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
  return (
    <><Header>
          <Heading>Join a Room</Heading>
          <Button
              variant="contained"
              onClick={handleOpen}
              style={{ backgroundColor: "grey" }}
          >
              <Heading size="18px">Create Room</Heading>
          </Button>
          <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
          >
              <Box sx={style}>
                  <Typography id="modal-modal-title" variant="h6" component="h2">
                      Text in a modal
                  </Typography>
                  <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                      Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                  </Typography>
              </Box>
          </Modal>
      </Header><Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
              {Array.from(Array(10)).map((_, index) => (
                  <Grid item xs={2} sm={4} md={4} key={index}>
                      <RoomCard />
                  </Grid>
              ))}
          </Grid></>
  );
};
