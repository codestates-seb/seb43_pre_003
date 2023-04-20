import styled from "styled-components";
import Google from "../Components/style/img/logos_google-icon.png";
import Git from "../Components/style/img/codicon_github.png";
import Facebook from "../Components/style/img/la_facebook-square.png";

const Oauthimg = styled.img`
  witdh: 16px;
  height: 16px;
  margin-right: 6px;
  border-radius: 2px;
  background: #ffffff;
`;

const Gitimg = styled(Oauthimg)`
  background: white;
  border-radius: 50px;
  witdh: 20px;
  height: 20px;
`;

const OauthBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid var(--black-100);
  width: 288px;
  height: 37px;
  background: var(--white);
  cursor: pointer;
  border-radius: 4px;
  margin: 4px 0;
  font-size: var(--font-medium);
  font-weight: 500;

  &:hover {
    background: var(--black-025);
  }
`;

const GitBtn = styled(OauthBtn)`
  border: none;
  background: var(--black-800);
  color: var(--white);

  &:hover {
    background: var(--black-900);
  }
`;

const FacebookBtn = styled(OauthBtn)`
  border: none;
  background: #385499;
  color: var(--white);

  &:hover {
    background: var(--blue-900);
  }
`;

function Oauth() {
  return (
    <>
      <OauthBtn>
        <Oauthimg src={Google} alt="" />
        Log in with Google
      </OauthBtn>
      <GitBtn>
        <Gitimg src={Git} alt="" />
        Log in with GitHub
      </GitBtn>
      <FacebookBtn>
        <Oauthimg src={Facebook} alt="" />
        Log in with Facebook
      </FacebookBtn>
    </>
  );
}

export default Oauth;
