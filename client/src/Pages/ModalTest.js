import styled from "styled-components";
import Button from "../Components/style/Button";
import ImgDrag from "./Modal/ImgDrag";
import { useState } from "react";
const Container = styled.div`
  display: flex;
  justify-content: space-between;
`;

function Home() {
  const [modal, setModal] = useState(false);
  const showModal = () => {
    setModal(!modal);
  };

  return (
    <>
      <Container>
        <Button size="custom" variant="mediumBlue" onClick={showModal}>
          ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ
        </Button>
      </Container>
      <div>{modal ? <ImgDrag showModal={showModal} /> : null}</div>
    </>
  );
}

export default Home;
