import styled from "styled-components";
import Earth from "./style/img/ic-earth.png";
import { Link } from "react-router-dom";
import { useState } from "react";
const NavContainer = styled.div`
  flex-direction: column;
  width: 156px;
  font-size: var(--font-medium);
  color: var(--black-600);
  /* margin-left: 100px; */
  padding-top: 32px;
  border-right: 1px solid var(--black-100);
`;

const DivBox = styled.button`
  display: flex;
  align-items: center;
  width: 93%;
  height: 32px;
  padding-left: 23px;
  background: #ffffff;
  font-size: var(--font-medium);
  font-weight: 400;
  cursor: pointer;
  &:hover {
    font-weight: bold;

    color: black;
  }
  &:active {
    font-weight: bold;
    background: #efefef;
    border-right: 4px solid var(--main-400);
    color: var(--black-900);
  }
`;

const ActiveBox = styled(DivBox)`
  font-weight: bold;
  background: #efefef;
  border-right: 4px solid var(--main-400);
  color: black;
`;

const EarthDiv = styled(DivBox)`
  padding-left: 0px;
`;
const ActEarthDiv = styled(ActiveBox)`
  padding-left: 0px;
`;

const EarthImg = styled.img`
  width: 18px;
  height: 18px;
  margin-right: 4px;
`;

const PublicBox = styled(NavContainer)`
  padding-top: 0px;
  margin-top: 5px;
  margin-left: 10px;
  flex-direction: column;
  border: none;
`;
const Span = styled.span`
  padding-left: 10px;
  font-size: var(--font-small);
  font-weight: 400;
  color: var(--black-600);
`;

const Nav = () => {
  const [nav, setNav] = useState("1");

  return (
    <NavContainer>
      <Span>PUBLIC</Span>
      <PublicBox>
        <Link to="/">
          {nav !== "1" ? (
            <EarthDiv onClick={() => setNav("1")}>
              <EarthImg src={Earth} alt="" />
              Question
            </EarthDiv>
          ) : (
            <ActEarthDiv>
              <EarthImg src={Earth} alt="" />
              Question
            </ActEarthDiv>
          )}
        </Link>
        {nav !== "2" ? (
          <DivBox onClick={() => setNav("2")}>Tags</DivBox>
        ) : (
          <ActiveBox>Tags</ActiveBox>
        )}
        {nav !== "3" ? (
          <DivBox onClick={() => setNav("3")}>Users</DivBox>
        ) : (
          <ActiveBox>Users</ActiveBox>
        )}
        {nav !== "4" ? (
          <DivBox onClick={() => setNav("4")}>Companies</DivBox>
        ) : (
          <ActiveBox>Companies</ActiveBox>
        )}
      </PublicBox>
    </NavContainer>
  );
};

export default Nav;
