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
border: 2px solid;
width: 67%;
height: 82vh;
padding: 10px;
border-radius: 10px;
display: flex;
flex-direction: column;
gap: 20px;
`;
