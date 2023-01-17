import React from 'react';
import styled from 'styled-components';
import SingleChat from './SingleChat';

function ChatBox() {
  return (
    <OuterContainer><SingleChat /></OuterContainer>
  )
}

export default ChatBox;

const OuterContainer = styled.div`
border: 2px solid lightgray;
width: 67%;
height: 84.7vh;
border-radius: 10px;
display: flex;
flex-direction: column;
gap: 20px;
`;
