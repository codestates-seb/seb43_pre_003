import styled from "styled-components";
import Input from "../Components/style/Input";
import Button from "../Components/style/Button";
import Oauth from "../Components/OauthBtn";
import Question from "../Components/style/img/fluent_comment-multiple-16-filled.png";
import Tag from "../Components/style/img/icomoon-free_price-tags.png";
import Trophy from "../Components/style/img/ic-trophy.png";
import Updown from "../Components/style/img/up-down.png";
import Sign from "../Components/style/img/sign.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
const Container = styled.div`
  display: flex;
  width: 1264px;
  height: 100vh;
  justify-content: center;
  align-items: center;
  background: #f1f2f3;
  padding: 0px;
`;

const TextBox = styled.div`
  width: 422px;
  height: 300px;
  flex-direction: column;
  margin: 0px 48px 0px 0px;
`;

const TextEl = styled.div`
  width: 100%;
  height: 24px;
  display: flex;
  font-size: var(--font-large);
  margin-bottom: 30px;
  white-space: pre-wrap;
`;

const IconImg = styled.img`
  width: 26px;
  height: 26px;
  margin-right: 10px;
`;
const SignBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 300px;
  padding: 12px;
`;

const HeaderSpan = styled.span`
  font-size: var(--font-xx-large);
  font-weight: 400;
  margin-bottom: 32px;
`;
const Headerdiv = styled(TextEl)`
  padding: 0px;
  margin-bottom: 32px;
`;

const TextBottom = styled(TextEl)`
  padding: 0px;
  margin-bottom: 0px;
  height: 15px;
  width: 105%;
`;

const TextP = styled.p`
  font-size: var(--font-xx-large);
  font-weight: 400;
  margin-bottom: 32px;
  font-size: var(--font-medium);
  margin-right: 5px;
  color: var(--black-600);
  white-space: pre-wrap;
`;

const EmailBox = styled.div`
  width: 288px;
  height: ${(p) => p.height || "400px"};
  background: var(--white);
  border-radius: 4px;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.05), 0px 1px 4px rgba(0, 0, 0, 0.05),
    0px 2px 8px rgba(0, 0, 0, 0.05);
  margin: 12px 0px;
  padding: 24px;
`;

const EmailSpan = styled.span`
  font-weight: 600;
  font-size: var(--font-large);
`;
const Eldiv = styled.div`
  margin: 4px 0;
`;

const BottomText = styled.span`
  font-size: ${(props) => props.size || "var(--font-medium)"};
  font-weight: ${(props) => props.weight || "400"};
  margin-right: 5px;
  color: var(--black-600);
`;

const ForgetBtn = styled.a`
  font-weight: ${(props) => props.weight || "400"};
  font-size: var(--font-small);
  color: var(--blue-500);
  cursor: pointer;
`;

const Emaildiv = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
  margin-bottom: 4px;
`;

const Bottomdiv = styled(Eldiv)`
  display: flex;
  justigy-content: center;
  align-items: center;
  margin-top: 12px;
`;

const Signimg = styled.img`
  width: 12px;
  height: 12px;
  margin-left: 5px;
  color: blue;
`;

const Errdiv = styled.div`
  padding-top: 5px;
  color: var(--red-400);
  font-size: var(--font-small);
`;

function Signup({ setSide }) {
  const navi = useNavigate();
  const [member, setmember] = useState({
    email: "",
    userName: "",
    password: "",
  });
  const [check, setCheck] = useState(true);
  const [errMessage, setErrMessage] = useState("");
  const [errpw, setErrpw] = useState("");
  const [dispErr, setDisplayErr] = useState("");

  const handleInputValue = (key) => (e) => {
    setmember({ ...member, [key]: e.target.value });
  };

  const funcSignup = () => {
    setSide(false);
    if (!member.userName) {
      setDisplayErr("닉네임을 입력하세요.");
      setCheck(false);
      return;
    }

    if (!member.email) {
      setErrMessage("아이디를 입력하세요.");
      setCheck(false);
      return;
    }

    if (!member.password) {
      setErrpw("비밀번호를 입력하세요.");
      setCheck(false);
      return;
    }

    return axios
      .post(`${process.env.REACT_APP_API_URL}/members/join`, {
        email: member.email,
        userName: member.userName,
        password: member.password,
      })
      .then((res) => {
        console.log(res.data);
        setErrMessage("");
        setErrpw("");
        navi("/Login");
        alert("아이디가 생성되었습니다, 생성된 아이디로 로그인 해주세요.");
      })
      .catch((err) => {
        console.log(err);
        setErrMessage("이메일 또는 패스워드가 올바르지 않습니다.");
      });
  };

  useEffect(() => {
    setSide();
  }, []);

  return (
    <>
      <Container>
        <TextBox>
          <Headerdiv>
            <HeaderSpan>Join the Stack Overflow community</HeaderSpan>
          </Headerdiv>
          <TextEl>
            <IconImg src={Question} alt="" />
            Get unstuck — ask a question
          </TextEl>
          <TextEl>
            <IconImg src={Updown} alt="" />
            Unlock new privileges like voting and commenting
          </TextEl>
          <TextEl>
            <IconImg src={Tag} alt="" />
            Save your favorite questions, answers, watch tags, and more
          </TextEl>
          <TextEl>
            <IconImg src={Trophy} alt="" />
            Earn reputation and badges
          </TextEl>
          <TextBottom>
            <BottomText>
              Collaborate and share knowledge with a private group for FREE.
            </BottomText>
          </TextBottom>
          <ForgetBtn href="">
            Get Stack Overflow for Teams free for up to 50 users.
          </ForgetBtn>
        </TextBox>
        <SignBox>
          <Oauth />
          <EmailBox height={check ? "400px" : "440px"}>
            <form onSubmit={(e) => e.preventDefault()}>
              <Eldiv>
                <EmailSpan>Display name</EmailSpan>
              </Eldiv>
              {check ? (
                <Input
                  type="text"
                  id="userName"
                  errorType="default"
                  onChange={handleInputValue("userName")}
                ></Input>
              ) : (
                <>
                  <Input
                    type="text"
                    id="userName"
                    errorType="error"
                    onChange={handleInputValue("userName")}
                  />
                  <Errdiv>{dispErr}</Errdiv>
                </>
              )}
              <Emaildiv>
                <EmailSpan>Email</EmailSpan>
              </Emaildiv>
              {check ? (
                <Input
                  type="text"
                  id="email"
                  errorType="Login"
                  onChange={handleInputValue("email")}
                ></Input>
              ) : (
                <>
                  <Input
                    type="text"
                    id="email"
                    errorType="error"
                    onChange={handleInputValue("email")}
                  />
                  <Errdiv>{errMessage}</Errdiv>
                </>
              )}
              <Emaildiv>
                <EmailSpan>Password</EmailSpan>
              </Emaildiv>
              {check ? (
                <Input
                  type="password"
                  id="password"
                  errorType="Login"
                  onChange={handleInputValue("password")}
                ></Input>
              ) : (
                <>
                  <Input
                    type="password"
                    id="password"
                    errorType="error"
                    onChange={handleInputValue("password")}
                  />
                  <Errdiv>{errpw}</Errdiv>
                </>
              )}
              <div></div>
              <Button
                type="submit"
                size="custom"
                variant="mediumBlue"
                width="242px"
                height="35px"
                padding="10px 10px 10px 10px"
                margin="20px 0px 20px 0px"
                onMouseDown={(e) => e.preventDefault()}
                onClick={funcSignup}
              >
                Sign up
              </Button>
            </form>
            <TextBottom>
              <TextP>
                가입을 클릭하면 <ForgetBtn href="#">서비스 약관</ForgetBtn> ,
                <ForgetBtn href="#"> 개인 정보 보호 정책</ForgetBtn> 및 쿠키
                정책에 동의하는것입니다.
              </TextP>
            </TextBottom>
          </EmailBox>
          <Bottomdiv>
            <BottomText weight="600">Already have an account?</BottomText>{" "}
            <ForgetBtn weight="600" href="/Login">
              Log in{" "}
            </ForgetBtn>
          </Bottomdiv>
          <Bottomdiv>
            <BottomText weight="600">Are you an employer?</BottomText>
            <ForgetBtn weight="600" href="#">
              Sign up on Talent{" "}
            </ForgetBtn>
            <Signimg src={Sign} alt="" />
          </Bottomdiv>
        </SignBox>
      </Container>
    </>
  );
}

export default Signup;
