import React from "react";
import { BsChatTextFill } from "react-icons/bs";
import { NavbarContainer, StyledNavLink } from "../views/styles";

const Navbar = () => {
  return (
    <>
      <NavbarContainer>
        <StyledNavLink to="/">
          <BsChatTextFill style={{ color: "white", fontSize: "1.5em" }} />
        </StyledNavLink>

        <StyledNavLink to="/">Home</StyledNavLink>

        <StyledNavLink to="/joinRoom">Join Room</StyledNavLink>
      </NavbarContainer>
    </>
  );
};

export default Navbar;
