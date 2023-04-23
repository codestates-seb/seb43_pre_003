import styled from "styled-components";
import Logoimg from "../Components/style/img/logo-stackof.png";
import Input from "../Components/style/Input";
import Button from "../Components/style/Button";
import Sign from "../Components/style/img/sign.png";
import Oauth from "../Components/OauthBtn";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

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
  height: height: ${(p) => p.height || "250px"};
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

const Errdiv = styled.div`
  padding-top: 5px;
  color: var(--red-400);
  font-size: var(--font-small);
`;

function Login({ setAuth, side, setSide }) {
  const navi = useNavigate();
  const [check, setCheck] = useState(true);
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });
  const [errMessage, setErrMessage] = useState("");
  const [errpw, setErrpw] = useState("");
  const [count, setCount] = useState(true);

  useEffect(() => {
    setSide();
    console.log(side);
  }, []);

  const handleInputValue = (key) => (e) => {
    console.log({ ...loginInfo, [key]: e.target.value });
    setLoginInfo({ ...loginInfo, [key]: e.target.value });
  };

  const funcLogin = () => {
    axios.defaults.withCredentials = true;

    // const headers = {
    //   "Access-Control-Allow-Origin": "*",
    //   "Content-Type": "application/json",
    // };

    if (!loginInfo.email) {
      setErrMessage("아이디를 입력하세요.");
      setCheck(false);
      return;
    }

    if (!loginInfo.password) {
      setErrpw("비밀번호를 입력하세요.");
      setCheck(false);
      return;
    }

    return axios
      .post("http://localhost:3001/member", { loginInfo }, {})
      .then((res) => {
        console.log(res.data);
        if (res.data.loginInfo.email === loginInfo.email) {
          setAuth(true);
          setErrMessage("");
          setErrpw("");
          navi("/");
          setCount(true);
        }
      })
      .catch((err) => {
        console.log(err);
        setCount(false);
        setErrMessage("이메일 또는 패스워드가 올바르지 않습니다.");
      });
  };

  return (
    <>
      <Container>
        <Logo src={Logoimg} alt=""></Logo>
        <Oauth />
        <Emailbox height={check ? "250px" : "320px"}>
          <Eldiv>
            <EmailSpan>Email</EmailSpan>
          </Eldiv>
          <form onSubmit={(e) => e.preventDefault()}>
            {loginInfo.email.length === 0 && count ? (
              <Input
                type="text"
                id="email"
                errorType="Login"
                onChange={handleInputValue("email")}
              />
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

            <Eldiv>
              <Passworddiv>
                <EmailSpan>Password</EmailSpan>
                <Link to="/Forget">
                  <ForgetBtn>Forgot password?</ForgetBtn>
                </Link>
              </Passworddiv>
              {loginInfo.password.length === 0 && count ? (
                <Input
                  type="password"
                  id="password"
                  errorType="Login"
                  onChange={handleInputValue("password")}
                />
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
            </Eldiv>
            <Button
              type="submit"
              size="custom"
              variant="mediumBlue"
              width="242px"
              height="35px"
              padding="10px 10px 10px 10px"
              margin="20px 0px 20px 0px"
              onClick={(funcLogin, () => setSide(false))}
            >
              Log in
            </Button>
          </form>
        </Emailbox>
        <Bottomdiv>
          <BottomText>Don’t have an account?</BottomText>
          <Link to="/Signup">
            <ForgetBtn>Sign up</ForgetBtn>
          </Link>
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
