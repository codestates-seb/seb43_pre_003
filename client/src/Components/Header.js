import { Link } from "react-router-dom";
import styled from "styled-components";
import Button from "./style/Button";
import Logo from "./style/img/logo.png";
import Search from "./style/img/ic-search.png";
import Logout from "./style/img/ic-menu.png";
import Inbox from "./style/img/ic-inbox.png";
import Trophy from "./style/img/ic- trophy.png";
import Que from "./style/img/ic-question.png";
// import { useEffect } from "react";

const Container = styled.div`
  width: 100vw;
  height: 100%;
  border-top: 3px solid var(--main-400);
  display: flex;
  justify-content: center;
  background-color: var(--black-025);
  box-shadow: 0 1px 2px hsla(0, 0%, 0%, 0.05), 0 1px 4px hsla(0, 0%, 0%, 0.05),
    0 2px 8px hsla(0, 0%, 0%, 0.05);
`;

const HeaderBox = styled.header`
  width: 100vw;
  min-width: 1264px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Img = styled.img`
  width: 151px;
  height: 30px;
  object-fit: cover;
`;

const LogoBtn = styled.button`
  all: unset;
  background: var(--black-025);
  padding: 8px;
  width: 151px;
  height: 30px;
  border: none;
  cursor: pointer;
  margin-right: 12px;
  &:hover {
    background: #efefef;
  }
`;
const ProductBtn = styled.button`
  text-align: center;
  height: 28px;
  width: 73px;
  border-radius: 30%;
  /* border: 0px solid none; */
  background: var(--black-025);
  margin-right: 12px;
  font-size: var(--font-medium);
  cursor: pointer;

  &:hover {
    background: #efefef;
  }
`;

const Input = styled.input`
  padding: 8px 8px 8px 30px;
  min-width: 775px;
  flex-grow: 1;
  border-radius: 2px;
  background-image: url(${Search});
  background-position: 4px center;
  background-repeat: no-repeat;
  border: 1px solid var(--black-200);
  margin-right: 8px;

  &:active,
  &:focus {
    box-shadow: 0px 0px 10px 5px var(--blue-050);
    outline: none;
    border: 1px solid var(--blue-500);
  }
`;

const LoginInput = styled(Input)`
  width: 775px;
`;

const ProfileButton = styled.button`
  background: blue;
  border: 1px solid black;
  width: 24px;
  height: 24px;
  margin-right: 5px;
`;

const ProfileNumber = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--black-025);
  cursor: pointer;
  width: 61px;
  height: 100%;
  font-size: var(--font-small);

  &:hover {
    background: #efefef;
  }
`;

const LogoutBtn = styled.button`
  background: var(--black-025);
  border: none;
  cursor: pointer;
  margin-right: 12px;
  width: 30px;
  height: 100%;

  &:hover {
    background: #efefef;
  }
`;

const IconDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--black-025);
  border: none;
  cursor: pointer;
  margin-right: 8px;
  width: 30px;
  height: 100%;
  &:hover {
    background: #efefef;
  }
`;

function Header({ auth, setAuth, setSide }) {
  const onClick = () => {
    setAuth(!auth);
    setSide(false);
  };
  // const sidefunc = () => {
  //   setSide(!side);
  // };

  return (
    <>
      <Container>
        {!auth ? (
          <HeaderBox>
            <Link to="/">
              <LogoBtn onClick={() => setSide(true)}>
                <Img src={Logo} alt="" />
              </LogoBtn>
            </Link>
            <Link to="/test">
              <ProductBtn onClick={() => setSide(true)}>Product</ProductBtn>
            </Link>
            <Input />
            <Link to="/Login">
              <Button
                variant="smallWhite"
                size="sm"
                onClick={() => setSide(false)}
              >
                Log in
              </Button>
            </Link>
            <Link to="/signup">
              <Button
                variant="mediumBlue"
                size="sm"
                onClick={() => setSide(false)}
              >
                Sign up
              </Button>
            </Link>
          </HeaderBox>
        ) : (
          <HeaderBox>
            <Link to="/">
              <LogoBtn>
                <Img src={Logo} alt="" />
              </LogoBtn>
            </Link>
            <ProductBtn>Product</ProductBtn>
            <LoginInput />
            <ProfileNumber>
              <ProfileButton />
              <div>22</div>
            </ProfileNumber>
            <IconDiv>
              <img src={Inbox} alt="" />
            </IconDiv>
            <IconDiv>
              <img src={Trophy} alt="" />
            </IconDiv>
            <IconDiv>
              <img src={Que} alt="" />
            </IconDiv>
            <LogoutBtn onClick={onClick}>
              <img src={Logout} alt=""></img>
            </LogoutBtn>
          </HeaderBox>
        )}
      </Container>
    </>
  );
}

export default Header;
