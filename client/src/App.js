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
import HomeAside from "./Components/Aside";
import Login from "./Pages/Login";
import SignUp from "./Pages/Signup";
// import Button from "./Components/style/Button";
// import Input from "./Components/style/Input";
import Modaltest from "./Pages/ModalTest";
import { useState } from "react";
const AppWrap = styled.div`
  width: 100vw;
  height: 100%;
`;
function App() {
  const [auth, setAuth] = useState(false);
  const [side, setSide] = useState(false);

  return (
    <AppWrap>
      <GlobalStyles />
      <BrowserRouter>
        <Header auth={auth} setAuth={setAuth} side={side} setSide={setSide} />
        <Routes>
          <Route
            path="/login"
            element={<Login auth={auth} setAuth={setAuth} />}
          />
          <Route
            path="/signup"
            element={<SignUp auth={auth} setAuth={setAuth} />}
          />
        </Routes>

        {!side ? (
          <div className="wrap">
            <div className="container">
              <Nav />
              <Routes>
                <Route path="/" element={<QuestionPage />} />
                <Route path="/test" element={<Modaltest />} />
                <Route path="/mypage" element={<MyPage />} />
                <Route
                  path="question/:questionId"
                  element={<QuestionDetailpage />}
                />
              </Routes>
              <HomeAside />
            </div>
            <Footer />
          </div>
        ) : null}
      </BrowserRouter>
    </AppWrap>
  );
}

export default App;
