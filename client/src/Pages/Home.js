import Header from "../Components/Header";
import Nav from "../Components/Nav";
import Footer from "../Components/Footer";
import Aside from "../Components/Aside";
import styled from "styled-components";
const Container = styled.div`
  display: flex;
  justify-content: space-between;
`;
function Home() {
  return (
    <>
      <Header />
      <Container>
        <Nav></Nav>
        <Aside />
      </Container>
      <Footer />
    </>
  );
}

export default Home;
