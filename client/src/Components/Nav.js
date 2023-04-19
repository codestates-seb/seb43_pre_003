import styled from "styled-components";
import Earth from "./style/img/ic-earth.png";
import { Link } from "react-router-dom";
const NavContainer = styled.div`
  height: 100vw;
  flex-direction: column;
  width: 156px;
  font-size: var(--font-medium);
  color: var(--black-600);
  margin-left: 100px;
  padding-top: 48px;
  border-right: 1px solid var(--black-100);
`;

const DivBox = styled.div`
  display: flex;
  align-items: center;
  width: 93%;
  height: 32px;
  padding-left: 23px;

  font-size: var(--font-medium);
  font-weight: 400;
  cursor: pointer;
  &:hover {
    font-weight: bold;
    background: #efefef;
    border-right: 4px solid var(--main-400);
    color: black;
  }
`;

const EarthDiv = styled(DivBox)`
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
  return (
    <NavContainer>
      <Span>PUBLIC</Span>
      <PublicBox>
        <Link to="/">
          <EarthDiv>
            <EarthImg src={Earth} alt="" />
            Question
          </EarthDiv>
        </Link>
        <DivBox>Tags</DivBox>
        <DivBox>Users</DivBox>
        <DivBox>Companies</DivBox>
      </PublicBox>
    </NavContainer>
  );
};

export default Nav;
