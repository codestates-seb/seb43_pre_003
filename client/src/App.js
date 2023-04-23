import { BrowserRouter, Routes, Route } from "react-router-dom";
import GlobalStyles from "./GlobalStyles";
import QuestionDetailpage from "./Pages/QuestionDetailpage";
import styled from "styled-components";
import QuestionPage from "./Pages/QuestionPage";
import MyPage from "./Pages/MyPage/MyPage";
import Nav from "./Components/Nav";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import AskQuestion from "./Pages/AskQuestion";
import questionAxios from "./util/questionAxios";

// import Button from "./Components/style/Button";
// import Input from "./Components/style/Input";

const AppWrap = styled.div`
  width: 100%;
  height: 100vh;
`;
// const onChange = (e) => {
//   console.log(e);
// };

function App() {
  const [list, isPending, error] = questionAxios(`http://localhost:3001/data/`);

  return (
    <AppWrap>
      <GlobalStyles />
      <BrowserRouter>
        {error && <div>{error}</div>}

        <Header />
        <div className="wrap">
          <div className="container">
            <Nav />
            <Routes>
              <Route
                path="/"
                element={<QuestionPage list={list} isPending={isPending} />}
              />
              {/* <Route path="/login" element={<Login />} /> */}
              {/* <Route path="/signup" element={<SignUp />} /> */}
              <Route path="/mypage" element={<MyPage />} />
              <Route
                path="question/:questionId"
                element={<QuestionDetailpage />}
              />
              <Route path="/question/ask" element={<AskQuestion />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    </AppWrap>
  );
}

export default App;
