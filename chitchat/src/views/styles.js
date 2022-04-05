import styled from "styled-components";
import { NavLink } from "react-router-dom";

export const MainContainer = styled.div``;

export const Logo = styled.div`
  height: 100px;
  width: 100px;
`;

export const SignInContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const HomeContainer = styled.div`
  margin: 0px 50px;
`;

export const NavbarContainer = styled.div`
  margin: 30px 0px;
  display: flex;
  align-items: center;
`;

export const StyledNavLink = styled(NavLink)`
  cursor: pointer;
  color: white;
  font-size: 20px;
  line-height: 15px;
  margin-left: 50px;
  font-family: cursive;
  &.active {
    font-weight: 600;
    color: blue;
  }
  &:hover {
    font-weight: 600;

    color: blue;
  }
`;

export const SubHeading = styled.div`
  background-color: rgb(146 125 125 / 40%);
  color: white;
  border-radius: 10px;
  padding: 20px;
  margin: 3% 0%;
  font-size: 18px;
  line-height: 15px;
  font-family: cursive;
`;

export const Heading = styled.div`
  font-size: ${({ size }) => (size ? size : "25px")};
  line-height: 15px;
  font-family: cursive;
  color: white;
  margin-left: 10px;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: rgb(146 125 125 / 40%);
  height: 55px;
  border-radius: 10px;
  align-items: center;
  padding: 0px 10px;
`;
