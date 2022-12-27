import React, { useState } from 'react';
import styled from 'styled-components';
import Drawer from '@mui/material/Drawer';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

function Sidebar({ open, setOpen }) {
    const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);
  console.log("looooooooo", search);
  return (
    <Drawer
    anchor='left'
    open={open}
    onClose={setOpen}
  >
    <MainContainer>
    <Typography textAlign="center">Search User</Typography>
    <Search>
            <TextField
            placeholder='Search with Name/Email!'
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
      hjihihihihijih</MainContainer>
  </Drawer>
  )
}

export default Sidebar;

const MainContainer = styled.div`
padding: 18px 15px 0px 15px;
`;

const Search = styled.div`
display: flex;
gap: 5px;
align-items: center;
`;
