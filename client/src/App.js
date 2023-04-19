import GlobalStyles from "./GlobalStyles";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Button from "./Components/style/Button";
// import Input from "./Components/style/Input";
// import styled from "styled-components";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
// import Header from "./Components/Header";
// import Nav from "./Components/Nav";
// import HomeAside from "./Components/Aside";

// const onChange = (e) => {
//   console.log(e);
// };

// const Container = styled.div`
//   display: flex;
//   justify-content: space-between;
// `;

function App() {
  return (
    <>
      <BrowserRouter>
        <GlobalStyles />
        {/* <Header />
        <Container>
          <Nav></Nav>
          <HomeAside />
        </Container> */}

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
