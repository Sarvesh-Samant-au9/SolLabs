import React from "react";
import styled from "styled-components";
const Navbar = () => {
  return (
    <NavbarWrapper>
      <Heading>Tickers</Heading>
    </NavbarWrapper>
  );
};

const NavbarWrapper = styled.div`
  height: 10vh;
  background: #5454d4;
  color: #ffff;
  display: flex;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 100;
`;
const Heading = styled.h1`
  color: #fff;
  font-weight: 500;
  font-size: 24px;
  font-family: sans-serif;
  padding-left: 20px;
`;
export default Navbar;
