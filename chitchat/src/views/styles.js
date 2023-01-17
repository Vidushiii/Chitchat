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
  margin-top: 5px;
`;

export const HomeContainer = styled.div`
  margin: 0px 50px;
`;

export const NavbarContainer = styled.div`
  padding: 15px 10px;
  display: flex;
  align-items: center;
  background: #1565c0;
  width: 99%;
  justify-content: space-between;
`;

export const StyledNavLink = styled(NavLink)`
  color: white;
  cursor: pointer;
  font-size: 20px;
  line-height: 15px;
  &.active {
    font-weight: 600;
    color: white;
  }
  &:hover {
    font-weight: 600;
    color: white;
  }
`;

export const SubHeading = styled.div`
  border-radius: 10px;
  padding: 20px;
  margin: 3% 0%;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const Heading = styled.div`
  font-size: ${({ size }) => (size ? size : "25px")};
  text-decoration: ${({ decoration }) => decoration && "underline"};
  margin-left: 10px;
  cursor: ${({ pointer }) => pointer && "pointer"};
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: rgb(146 125 125 / 40%);
  height: 55px;
  border-radius: 10px;
  align-items: center;
  padding: 0px 10px;
  margin-bottom: 30px;
`;

export const RoomInfoCard = styled.div`
  background-color: rgb(146 125 125 / 40%);
  display: flex;
  align-items: center;
  padding: 10px;
  border-radius: 10px;
  width: 300px;
`;

export const RoomLogo = styled.div`
  height: 70px;
  width: 70px;
  border: 2px solid grey;
  border-radius: 50%;
  background-position: center;
  background: ${({ url }) =>
    url
      ? `url(https://wallpaperaccess.com/full/473028.jpg)`
      : `url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvDQhI96KOJP4eaCohSsODK8xtaWhIUbLHFw&usqp=CAU)`};
  background-repeat: no-repeat;
  background-size: cover;
  cursor: pointer;
`;

export const InlineSection = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin: 0px 20px;
`;

export const Search = styled.div`
  width: 130px;
  border-bottom: 2px solid white;
  display: flex;
  cursor: pointer;
  align-items: center;
`;
