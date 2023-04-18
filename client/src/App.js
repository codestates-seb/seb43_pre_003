// import { Routes, Route } from "react-router-dom";
import GlobalStyles from "./GlobalStyles";
import styled from "styled-components";
import QuestionPage from "./Pages/QuestionPage";
import Nav from "./Components/Nav";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
// import Button from "./Components/style/Button";
// import Input from "./Components/style/Input";

const AppWrap = styled.div`
  width: 100%;
  height: 100vh;
`;

// const onChange = (e) => {
//   console.log(e.target.value);
// };

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
