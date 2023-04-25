import styled from "styled-components";
import RecommendButton from "../Components/QuestionDetail/RecommendButton";
import Sharedomain from "../Components/QuestionDetail/Sharedomain";
import AuthorProfile from "../Components/QuestionDetail/Authorprofile";
import Answer from "../Components/QuestionDetail/Answser";
import Button from "../Components/style/Button";
import Editor from "../Components/QuestionDetail/Editor";

import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import dateCalculate from "../util/dateCalculate";
import questionAxios from "../util/questionAxios";
import Aside from "../Components/Aside";
// import { TagDiv } from "../Components/style/Tag";

const Container = styled.div`
  max-width: 1100px;
  width: calc(100% - 164px);
  border-radius: 0;
  border: 1px solid var(--theme-content-border-color);
  box-sizing: border-box;
`;

const Contain = styled.div`
  display: flex;
  flex-direction: column;
  padding: 24px;
  height: 100%;
  border-left: 1px solid rgb(227, 230, 232);
`;

const Header1 = styled.header`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  h1 {
    font-size: 18px;
  }
`;

const H1 = styled.h1`
  flex-basis: 85%;
  font-size: 27px;
  font-weight: 600;
  color: var(--black-700);
  word-break: break-all;
  line-height: 36px;
`;

const Section1 = styled.section`
  display: flex;
  padding-bottom: 8px;
  margin-bottom: 16px;
  border-bottom: 2px solid var(--black-100);
`;

const Strong = styled.strong`
  color: var(--black-500);
  font-size: 13px;
`;

const Span = styled.span`
  margin: 0px 10px 0px 5px;
  color: var(--black-900);
  font-size: 13px;
`;

const Body = styled.div`
  display: flex;
  width: 100%;
`;

const Main = styled.main`
  display: flex;
  margin: 15px;
  padding-bottom: 18px;
`;

const Aside1 = styled.aside`
  flex: display;
`;

const Section2 = styled.section`
  flex-grow: 1;
  p {
    margin-left: 12px;
    font-size: 15px;
    font-weight: 500;
    line-height: 22.5px;
    white-space: pre-line;
  }
`;

const Section3 = styled.section`
  position: relative;
  display: flex;
  justify-content: space-between;
  margin: 25px 0px;
  width: 100%;
`;

const Section4 = styled.section`
  width: 70%;
  margin-right: 25px;
  h2 {
    font-size: 18px;
    margin: 20px 0;
  }
`;

const Header2 = styled.header`
  display: flex;
  -webkit-box-pack: justify;
  justify-content: space-between;
  h1 {
    font-size: 18px;
    margin-bottom: 15px;
  }
`;

const Position = styled.div`
  margin-top: 70px;
`;
const WarningText = styled.div`
  margin: 10px 5px 20px 0px;
  color: red;
  font-size: 12px;
`;

const QuestionDetailpage = ({ auth }) => {
  const { questionId } = useParams();
  console.log(questionId);
  //const navigate = useNavigate();

  const [list, isPending, error] = questionAxios(
    `${process.env.REACT_APP_API_URL}/question/${questionId}`
  );
  console.log(list);
  const [answerValue, setAnswerValue] = useState("");
  const [zeroeditorError, setzeroEditorError] = useState(false);
  const [thirtyeditorError, setthirtyEditorError] = useState(false);

  const handlezeroEditorError = () => {
    answerValue.length <= 0
      ? setzeroEditorError(true)
      : setzeroEditorError(false);
  };
  const handlethirtyEditorError = () => {
    if (answerValue.length > 0 && answerValue.length < 30) {
      setthirtyEditorError(true);
    } else {
      setthirtyEditorError(false);
    }
  };
  console.log(answerValue);
  const AnswerCreateClick = async (questionId) => {
    handlezeroEditorError();
    handlethirtyEditorError();
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/question/${questionId}`,
        {
          content: answerValue,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setAnswerValue(answerValue);
      //  navigate(`/question/${questionId}`);
      window.location.href = `http://localhost:3000/question/${questionId}`;
    } catch (error) {
      console.error("Failed to save edit:", error);
    }
  };

  return (
    <Container>
      {error && <div>{error}</div>}
      {isPending && <div>Loading...</div>}
      {list && (
        <Contain>
          <Header1>
            <H1>{list.data.title}</H1>

            <Link to="/question/ask">
              <Button variant="mediumBlue" size="question">
                Ask Question
              </Button>
            </Link>
          </Header1>

          <Section1>
            <Strong>Asked</Strong>
            <Span>{dateCalculate(list.data.createdAt)}</Span>
            <Strong>Modified</Strong>
            <Span>{dateCalculate(list.data.modifiedAt)}</Span>
            <Strong>viewed</Strong>
            <Span>{list.data.views}times</Span>
          </Section1>

          <Body>
            <Section4>
              <Main>
                <Aside1>
                  <RecommendButton
                    votes={list.data.votes}
                    questionId={questionId}
                  />
                </Aside1>

                <Section2>
                  <div>
                    <div>
                      <p
                        dangerouslySetInnerHTML={{
                          __html: list.data.content,
                        }}
                      />
                    </div>
                  </div>
                  <Section3>
                    <Sharedomain questionId={questionId} auth={auth} />
                    <AuthorProfile
                      createdAt={list.data.createdAt}
                      userName={list.data.userName}
                    />
                  </Section3>
                </Section2>
              </Main>
              <Header2>
                <h1>{list.data.answerCount} Answers</h1>
              </Header2>
              <Answer answers={list.data.answers} questionId={questionId} />
              <h2>Your Answer</h2>
              <div>
                <Editor value={answerValue} onChange={setAnswerValue} />

                <Position>
                  {zeroeditorError && (
                    <WarningText>Answer is missing</WarningText>
                  )}
                  {thirtyeditorError > 0 && answerValue.length < 30 && (
                    <WarningText>Minimum 30 characters required</WarningText>
                  )}
                  <Button
                    variant="mediumBlue"
                    size="custom"
                    width="130px"
                    onClick={() => AnswerCreateClick(questionId)}
                  >
                    Post your Answer
                  </Button>
                  {(zeroeditorError || thirtyeditorError) && (
                    <WarningText>
                      your answer couldn’t be submitted. Please see the error
                      above.
                    </WarningText>
                  )}
                </Position>
              </div>
            </Section4>
            <Aside />
          </Body>
        </Contain>
      )}
    </Container>
  );
};

export default QuestionDetailpage;
