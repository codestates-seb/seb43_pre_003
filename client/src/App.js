// import { Routes, Route } from "react-router-dom";
import GlobalStyles from "./GlobalStyles";
import styled from "styled-components";
import QuestionPage from "./Pages/QuestionPage";
import Nav from "./Components/Nav";
import Header from "./Components/Header";
import Footer from "./Components/Footer";

const AppWrap = styled.div`
  width: 100%;
  height: 100vh;
`;

function App() {
  return (
    <AppWrap>
      <GlobalStyles />
      <Header />
      <div className="wrap">
        <div className="container">
          <Nav />
          {/* <Routes>
          <Route path="/" element={<QuestionPage />} />
        </Routes> */}
          <QuestionPage />
        </div>
        <Footer />
      </div>
    </AppWrap>
  );
}

export default App;
