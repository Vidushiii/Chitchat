import React from "react";
import styled from "styled-components";
import { TailSpin } from "react-loader-spinner";

function Loading({ dimensions, marginTop }) {
  return (
    <OuterContainer marginTop={marginTop ? marginTop : "100%"}>
      <TailSpin
        height={dimensions ? dimensions : "80"}
        width={dimensions ? dimensions : "80"}
        color="#098ef4de"
        ariaLabel="tail-spin-loading"
        radius="1"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </OuterContainer>
  );
}

export default Loading;

const OuterContainer = styled.div`
  display: flex;
  margin-top: ${({marginTop}) => marginTop || ""};
  height: 100%;
  width: 100%;
  align-items: center;
  justify-content: space-evenly;
`;
