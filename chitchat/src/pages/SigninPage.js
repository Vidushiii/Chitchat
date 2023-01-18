import React, {useState, useEffect} from 'react';
import { ToastContainer, toast, Slide } from 'react-toastify';
import axios from 'axios';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {useNavigate} from "react-router-dom";

import { SignInContainer } from '../views/styles';

const theme = createTheme();

export default function SigninPage() {
  const navigate = useNavigate();

const[loading, setLoading] = useState(false);

useEffect(() => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  if (userInfo) navigate("/homepage");
}, []);

  const handleSubmit = async(event) => {
    setLoading(true);
    event.preventDefault();
    const inputData = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
    
      const { data } = await axios.post("/api/user/login", {
          email: inputData.get("email"),
          password: inputData.get("password")}, config
      );
      setLoading(false);
      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate('/homepage');
    
    } catch (error) {
    setLoading(false);
    toast.error("Invalid credentials!")
    }
    
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://static.vecteezy.com/system/resources/previews/002/240/543/original/people-chatting-in-messenger-or-social-network-internet-communication-online-instant-messaging-or-information-exchange-illustration-in-flat-cartoon-style-vector.jpg)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}>
          </Grid>
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            
            <Typography variant="h3" component="h2" color="primary" mb={5} >
              CHITCHAT
            </Typography>
            <SignInContainer>
            <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5" color="primary">
              Sign in
            </Typography>
            </SignInContainer>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                style={{ boxShadow: "0px 0px 10px -3px #0080ff" }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                style={{ boxShadow: "0px 0px 10px -3px #0080ff" }}
              />
              <Button
              loading={loading}
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  {/* <Link href="#" variant="body2">
                    Forgot password?
                  </Link> */}
                </Grid>
                <Grid item>
                  <Link href="./signup" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}