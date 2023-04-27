import styled from "styled-components";
import Green from "../../Components/style/img/Greenvector.png";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const Container = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
  background: #f1f2f3;
  padding: 0px;
`;
const Greendiv = styled.div`
  background: #dfefe3;
  display: flex;
  align-items: center;
  width: 560px;
  height: 150px;
  border: 1px solid var(--black-100);
  padding: 30px 0px 24px 24px;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.05), 0px 1px 4px rgba(0, 0, 0, 0.05),
    0px 2px 8px rgba(0, 0, 0, 0.05);
`;

const GreenImg = styled.img`
  width: 30px;
  height: 30px;
`;

const TextBox = styled.div`
  margin: 0px 24px;
`;
const HeaderBox = styled.div`
  margin-bottom: 12px;
  width: 200px;
`;
const HeaderSpan = styled.span`
  font-size: var(--font-x-large);
  font-weight: 400;
  margin-bottom: 32px;
`;
const Bodyp = styled.p`
  white-space: pre-wrap;
  font-size: var(--font-large);
`;

function ForgetComplete({ setSide }) {
  const navi = useNavigate();

  useEffect(() => {
    setSide(false);
    const preventGoBack = () => {
      setSide(true);
      navi("/");
    };

    window.addEventListener("popstate", preventGoBack);
  }, []);

  return (
    <>
      <Container>
        <Greendiv>
          <GreenImg src={Green} alt="" />
          <TextBox>
            <HeaderBox>
              <HeaderSpan>
                당신의 이메일로 계정 복구 메일이 발송되었습니다.
              </HeaderSpan>
            </HeaderBox>
            <Bodyp>
              15분 이내에 받은 편지함에 이 이메일이 표시되지 않으면 정크 메일
              폴더에서 찾으십시오. 거기에서 찾으면 {'"'}정크 아님{'"'}으로
              표시하십시오.
            </Bodyp>
          </TextBox>
        </Greendiv>
      </Container>
    </>
  );
}

export default ForgetComplete;
