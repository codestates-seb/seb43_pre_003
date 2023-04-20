import GlobalStyles from "./GlobalStyles";
import { BrowserRouter, Routes, Route } from "react-router-dom";

//import QuestionEditpage from "./Pages/QuestionEditpage";
import QuestionDetailpage from "./Pages/QuestionDetailpage";
//import AnswerEditpage from "./Pages/AnswerEditpage";
//import questionFetch from "./util/questionFetch";
import QuestionList from "./Pages/QuestionList";

function App() {
  return (
    <>
      <BrowserRouter>
        <GlobalStyles />

        <Routes>
          <Route path="/" element={<QuestionList />} />
          <Route path="question/:questionId" element={<QuestionDetailpage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
