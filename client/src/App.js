import { BrowserRouter, Routes, Route } from "react-router-dom";
import GlobalStyles from "./GlobalStyles";
import QuestionDetailpage from "./Pages/QuestionDetailpage";
import styled from "styled-components";
import QuestionPage from "./Pages/QuestionPage";
import QuestionEditpage from "./Pages/QuestionEditpage";
import AnswerEditpage from "./Pages/AnswerEditpage";
import MyPage from "./Pages/MyPage/MyPage";
import Nav from "./Components/Nav";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import AskQuestion from "./Pages/AskQuestion";
// import questionAxios from "./util/questionAxios";
// import HomeAside from "./Components/Aside";
import Login from "./Pages/Login";
import SignUp from "./Pages/Signup";

import { useState, useEffect } from "react";
import axios from "axios";

const AppWrap = styled.div`
  width: 100vw;
`;

function App() {
  // const [list, isPending, error] = questionAxios(
  //   `http://ec2-54-180-100-255.ap-northeast-2.compute.amazonaws.com:8080/`
  // );
  const [auth, setAuth] = useState(false);
  const [side, setSide] = useState(true);

  const [user, setUser] = useState({});

  // 자동로그인 작성(새로고침 시 로그인데이터 가지고있게)
  useEffect(() => {
    if (localStorage.getItem("token")) {
      axios
        .get(`${process.env.REACT_APP_API_URL}/members/profile`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
        })
        .then((res) => {
          setAuth(true);
          setUser(res.data);
          console.log(res);
        });
    }
  }, []);
  console.log(user);
  return (
    <AppWrap>
      <GlobalStyles />
      <BrowserRouter>
        {/* {error && <div>{error}</div>} */}
        <Header auth={auth} setAuth={setAuth} side={side} setSide={setSide} />
        {side ? (
          <div className="wrap">
            <div className="container">
              <Nav />
              <Routes>
                <Route path="/" element={<QuestionPage auth={auth} />} />

                <Route
                  path="/mypage"
                  element={
                    <MyPage user={user} setUser={setUser} setAuth={setAuth} />
                  }
                />
                <Route path="/ask" element></Route>
                <Route path="/question/ask" element={<AskQuestion />} />
                <Route
                  path="question/:questionId"
                  element={<QuestionDetailpage auth={auth} user={user} />}
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
          </div>
        ) : null}

        <Routes>
          <Route
            path="/login"
            element={
              <Login
                auth={auth}
                setAuth={setAuth}
                side={side}
                setSide={setSide}
                index
                setUser={setUser}
              />
            }
          />
          <Route path="/signup" element={<SignUp setSide={setSide} />} index />
        </Routes>
        <Footer />
      </BrowserRouter>
    </AppWrap>
  );
}

export default App;
