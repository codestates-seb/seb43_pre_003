import styled from "styled-components";
import Button from "./style/Button";
import Logo from "./style/img/logo.png";
import Search from "./style/img/ic-search.png";
import Logout from "./style/img/ic-menu.png";
import { useState } from "react";
import Inbox from "./style/img/ic-inbox.png";
import Trophy from "./style/img/ic- trophy.png";
import Que from "./style/img/ic-question.png";

const HeaderBox = styled.header`
  background: var(--black-025);
  width: 100vw;
  height: 50px;
  border-top: 3px solid var(--main-400);
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
  border-radius: 40%;
  border: 0px solid none;
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
  width: 875px;
  border-radius: 2px;
  background-image: url(${Search});
  background-position: 4px center;
  background-repeat: no-repeat;
  border: 1px solid var(--black-200);
  margin-right: 8px;

  &:active,
  &:focus {
    box-shadow: 0px 0px 10px 5px  var(--blue-050);
    outline: none;
    border: 1px solid var(--blue-500);
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

function Header() {
  const [isLogin, setisLogin] = useState(false);

  return (
    <>
      {!isLogin ? (
        <HeaderBox>
          <LogoBtn>
            <Img src={Logo} alt="" />
          </LogoBtn>
          <ProductBtn>Product</ProductBtn>
          <Input />
          <Button
            variant="smallWhite"
            size="sm"
            onClick={() => setisLogin(true)}
          >
            Log in
          </Button>
          <Button variant="mediumBlue" size="sm">
            Sign up
          </Button>
        </HeaderBox>
      ) : (
        <HeaderBox>
          <LogoBtn>
            <Img src={Logo} alt="" />
          </LogoBtn>
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
          <LogoutBtn onClick={() => setisLogin(false)}>
            <img src={Logout} alt=""></img>
          </LogoutBtn>
        </HeaderBox>
      )}
    </>
  );
}

export default Header;
