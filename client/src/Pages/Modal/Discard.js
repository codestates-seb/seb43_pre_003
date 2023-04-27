import styled from "styled-components";
import Button from "../../Components/style/Button";
import XImg from "../../Components/style/img/tabler_x.png";
import GlobalStyles from "../../GlobalStyles";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 570px;
  /* height: 190px; */
  z-index: 999;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #ffffff;
  border-radius: 10px;
  border: 1px solid var(--black-100);
  padding: 24px;
`;

const ModalContainer = styled.div`
  width: 100vw;
  height: 100vh;
  z-index: 900;
  position: absolute;
  top: 0%;
  left: 0%;
  background-color: #000000;
  padding: 30px;
  opacity: 50%;
`;

const H1 = styled.span`
  font-size: var(--font-xx-large);
  font-weight: 700;
  text-alignt: center;
  color: var(--red-400);
`;

const Textdiv = styled.div`
  margin: 16px 4px;
  > span {
    white-space: normal;
    overflow-wrap: anywhere;
    line-height: 1.4;
  }
`;
const Buttondiv = styled.div`
  display: flex;
  margin-top: 24px;
`;
const Span = styled.span`
  font-size: var(--font-large);
`;
const XBtn = styled.button`
  width: 30px;
  height: 30px;
  background: #ffffff;
  color: var(--black-500);
  text-align: center;

  &:hover {
    background: var(--black-100);
  }
`;

const Ximg = styled.img`
  width: 20px;
  height: 20px;
`;

const HeaderDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

function Discard({ showModal, handleDelete }) {
  return (
    <>
      <GlobalStyles posi="fixed" />
      <ModalContainer />
      <Container>
        <HeaderDiv>
          <H1>Delete Profile</H1>
          <XBtn onClick={showModal}>
            <Ximg src={XImg} alt="" />
          </XBtn>
        </HeaderDiv>

        <Textdiv>
          <Span>
            I have read the information stated above and understand the
            implications of having my profile deleted. I wish to proceed with
            the deletion of my profile.
          </Span>
        </Textdiv>
        <Buttondiv>
          <Button
            size="custom"
            variant="Discard"
            width="120px"
            height="40px"
            padding="3px 3px 3px 3px"
            margin="0px 3px 0px 0px"
            onClick={() => {
              showModal();
              handleDelete();
            }}
          >
            Yes
          </Button>
          <Button
            size="custom"
            variant="share"
            width="120px"
            height="40px"
            onClick={showModal}
          >
            Cancel
          </Button>
        </Buttondiv>
      </Container>
    </>
  );
}

export default Discard;
