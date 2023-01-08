import React, { useState} from "react";
import { toast } from 'react-toastify';
import axios from 'axios';
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { SignInContainer } from "../views/styles";
import {useNavigate} from "react-router-dom";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();


export default function SignupPage() {
  const navigate = useNavigate();
const [pic, setPic] = useState();
const [loading, setLoading] = useState(false);

const createUrl = (picData) => {
  setLoading(true);
  if ( picData === undefined){
    toast.error('Please upload valid Image');
    setLoading(false);
    return ;
  }
  else if(picData.type === "image/png" || picData.type === "image/jpeg"){
const data = new FormData();
data.append("file", picData);
data.append("upload_preset", "chitchat");
data.append("cloud_name", "dbwmzgy06");
fetch("https://api.cloudinary.com/v1_1/dbwmzgy06/image/upload",{
method : 'post',
body: data,}
).then((res) => res.json()).then( data => {
  setPic(data.url.toString());
setLoading(false);}
).catch((err) => {toast(err);
  setLoading(false);});
  }
  else {
    toast.error('Please upload valid Image');
  }
};

  const handleSubmit = async(event) => {
    setLoading(true);
    event.preventDefault();
    const inputData = new FormData(event.currentTarget);
    inputData.set('pic', pic);
try {
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };

  const { data } = await axios.post("/api/user", {
  firstName: inputData.get("firstName"),
      lastName: inputData.get("lastName"),
      email: inputData.get("email"),
      password: inputData.get("password"),
      pic: inputData.get("pic")}, config
  );

  toast.success("Authenticated");
  setLoading(false);
  localStorage.setItem("userInfo", JSON.stringify(data));
  navigate('/homepage');

} catch (error) {
toast.error(error);
setLoading(false);
}

    
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs" style={{ background: "white" }}>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <SignInContainer>
            <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
          </SignInContainer>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                Upload Profile Picture ( Optional )
                <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="label"
                  loading={loading}
                >
                  <input
                    id="pic"
                    name="picture"
                    hidden
                    accept="image/*"
                    type="file"
                    onChange={(e) => createUrl(e.target.files[0])}
                  />
                  <PhotoCamera />
                </IconButton>
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              isLoading={loading}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
