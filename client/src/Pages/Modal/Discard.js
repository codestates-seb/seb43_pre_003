import styled from "styled-components";
import Button from "../../Components/style/Button";
import XImg from "../../Components/style/img/tabler_x.png";

const Container = styled.div`
  width: 570px;
  height: 190px;
  z-index: 999;
  position: absolute;
  top: 30%;
  left: 30%;
  transfrom: translate(-50%, -50%);
  background-color: #ffffff;
  border-radius: 10px;
  border: 1px solid var(--black-100);
  padding: 24px;
`;

const ModalContainer = styled.div`
  width: 100%;
  height: 100%;
  z-index: 900;
  position: absolute;
  top: 0%;
  left: 0%;
  transfrom: translate(-50%, -50%);
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
  width: 20px;
  margin: 20px 0px;
  height: 10px;
`;
const Buttondiv = styled.div`
  display: flex;
  margin-top: 40px;
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

function Discard({ showModal }) {
  return (
    <>
      <ModalContainer />
      <Container>
        <HeaderDiv>
          <H1>Discard Question</H1>
          <XBtn onClick={showModal}>
            <Ximg src={XImg} alt="" />
          </XBtn>
        </HeaderDiv>

        <Textdiv>
          <Span>
            Are you sure you want to discard this question? This cannot be
            undone.
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
          >
            Discard Question
          </Button>
          <Button
            size="custom"
            variant="share"
            width="120px"
            height="40px"
            onClick={showModal}
          >
            Cansel
          </Button>
        </Buttondiv>
      </Container>
    </>
  );
}

export default Discard;
