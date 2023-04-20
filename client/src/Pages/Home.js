import Header from "../Components/Header";
import Nav from "../Components/Nav";
import Footer from "../Components/Footer";
import Aside from "../Components/Aside";
import styled from "styled-components";
import Button from "../Components/style/Button";
import Discard from "./Modal/Discard";
import { useState } from "react";
const Container = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Testdiv = styled.div`
  width: 100px;
  height: 100px;
`;

function Home() {
  const [modal, setModal] = useState(false);
  const showModal = () => {
    setModal(!modal);
  };

  return (
    <>
      <Header />
      <Container>
        <Nav></Nav>
        <Testdiv>
          <Button size="md" variant="mediumBlue" onClick={showModal}>
            modal
          </Button>
        </Testdiv>
        <Aside />
      </Container>
      <div>{modal ? <Discard showModal={showModal} /> : null}</div>
      <Footer />
    </>
  );
}

export default Home;
