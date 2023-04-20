import Header from "../../Components/Header";
import Input from "../../Components/style/Input";
import Button from "../../Components/style/Button";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  flex-direction: column;
  padding: 24px 16px;
  align-items: center;
  background: #f1f2f3;
`;

const Emailbox = styled.div`
  flex-direction: column;
  background: var(--white);
  width: 288px;
  height: 220px;
  padding: 24px;
  margin: 24px 0;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.05), 0px 1px 4px rgba(0, 0, 0, 0.05),
    0px 2px 8px rgba(0, 0, 0, 0.05);
  border-radius: 4px;
`;

const TextEl = styled.div`
  width: 100%;
  height: 24px;
  display: flex;
  margin-bottom: 30px;
  white-space: pre-wrap;
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
const EmailSpan = styled.span`
  font-weight: 600;
  font-size: var(--font-large);
`;
const Eldiv = styled.div`
  margin: 10px 0px 3px 0px;
`;

function Forget() {
  return (
    <>
      <Header />
      <Container>
        <Emailbox>
          <TextEl>
            <TextP>
              Forgot your acount {"'"}s password? Enter yout email address and
              we {"'"}ll send you a recovery link.{" "}
            </TextP>
          </TextEl>
          <Eldiv>
            <EmailSpan>Email</EmailSpan>
          </Eldiv>
          <Eldiv>
            <Input type="text" errorType="default" />
          </Eldiv>
          <Link to="/ForgetComplete">
            {" "}
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
          </Link>
        </Emailbox>
      </Container>
    </>
  );
}

export default Forget;
