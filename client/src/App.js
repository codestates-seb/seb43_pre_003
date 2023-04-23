import { BrowserRouter, Routes, Route } from "react-router-dom";
import GlobalStyles from "./GlobalStyles";
import QuestionDetailpage from "./Pages/QuestionDetailpage";
import styled from "styled-components";
import QuestionPage from "./Pages/QuestionPage";
import QuestionEditpage from "./Pages/QuestionEditpage";
import AnswerEditpage from "./Pages/AnswerEditpage";
import MyPage from "./Pages/MyPage";
import Nav from "./Components/Nav";
import Header from "./Components/Header";
import Footer from "./Components/Footer";

// import Button from "./Components/style/Button";
// import Input from "./Components/style/Input";

const AppWrap = styled.div`
  width: 100%;
  height: 100vh;
`;

function App() {
  return (
    <AppWrap>
      <GlobalStyles />
      <BrowserRouter>
        <Header />
        <div className="wrap">
          <div className="container">
            <Nav />
            <Routes>
              <Route path="/" element={<QuestionPage />} />
              <Route path="/mypage" element={<MyPage />} />
              <Route
                path="/question/:questionId"
                element={<QuestionDetailpage />}
              />
              <Route
                path="/question/:questionId/:answerId/edit"
                element={<AnswerEditpage />}
              />
              <Route
                path="/question/:questionId/edit"
                element={<QuestionEditpage />}
              />
            </Routes>
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    </AppWrap>
  );
}

export default App;
