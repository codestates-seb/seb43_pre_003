import styled from "styled-components";
import Header from "../Components/Header";
import Logoimg from "../Components/style/img/logo-stackof.png";
import Input from "../Components/style/Input";
import Button from "../Components/style/Button";
import Sign from "../Components/style/img/sign.png";
import Oauth from "../Components/OauthBtn";
//import { useState } from "react";

const Container = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  flex-direction: column;
  padding: 24px 16px;
  align-items: center;
  background: #f1f2f3;
`;

const Logo = styled.img`
  width: 31px;
  height: 39px;
  margin: 24px;
`;

const Emailbox = styled.div`
  flex-direction: column;
  background: var(--white);
  width: 288px;
  height: 250px;
  padding: 24px;
  margin: 24px 0;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.05), 0px 1px 4px rgba(0, 0, 0, 0.05),
    0px 2px 8px rgba(0, 0, 0, 0.05);
  border-radius: 4px;
`;

const EmailSpan = styled.span`
  font-weight: 600;
  font-size: var(--font-large);
`;

const BottomText = styled.span`
  font-size: var(--font-medium);
  margin-right: 5px;
`;

const ForgetBtn = styled.a`
  font-size: var(--font-small);
  color: var(--blue-500);
  cursor: pointer;
`;

const Eldiv = styled.div`
  margin: 4px 0;
`;
const Passworddiv = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
  margin-bottom: 4px;
`;

const Bottomdiv = styled(Eldiv)`
  display: flex;
  justigy-content: center;
  align-items: center;
`;

const Signimg = styled.img`
  width: 12px;
  height: 12px;
  margin-left: 5px;
  color: blue;
`;

function Login() {
  return (
    <>
      <Header />
      <Container>
        <Logo src={Logoimg} alt=""></Logo>
        <Oauth />
        <Emailbox>
          <Eldiv>
            <EmailSpan>Email</EmailSpan>
          </Eldiv>
          <Input type="text" errorType="default"></Input>
          <Eldiv>
            <Passworddiv>
              <EmailSpan>Password</EmailSpan>
              <ForgetBtn>Forgot password?</ForgetBtn>
            </Passworddiv>
            <Input type="Password" errorType="default"></Input>
          </Eldiv>
          <Button
            size="custom"
            variant="mediumBlue"
            width="242px"
            height="35px"
            padding="10px 10px 10px 10px"
            margin="20px 0px 20px 0px"
          >
            Log in
          </Button>
        </Emailbox>
        <Bottomdiv>
          <BottomText>Don’t have an account?</BottomText>
          <ForgetBtn>Sign up</ForgetBtn>
        </Bottomdiv>
        <Bottomdiv>
          <BottomText>Are you an employer?</BottomText>
          <ForgetBtn>Sign up on Talent </ForgetBtn>
          <Signimg src={Sign} alt="" />
        </Bottomdiv>
      </Container>
    </>
  );
}

export default Login;
