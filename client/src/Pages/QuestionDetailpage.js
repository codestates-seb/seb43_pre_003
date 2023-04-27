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
import { TagDiv } from "../Components/style/Tag";

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
  margin-bottom: 14px;
  h1 {
    font-size: 26px;
    white-space: normal;
    overflow-wrap: anywhere;
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
  padding-bottom: 16px;
  margin-bottom: 24px;
  border-bottom: 1px solid var(--black-100);
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
  padding-bottom: 32px;
`;

const Aside1 = styled.aside`
  flex: display;
  margin-right: 24px;
`;

const Section2 = styled.section`
  flex-grow: 1;
  > p > p {
    font-size: 15px;
    line-height: 22.5px;
    white-space: pre-line;
  }
`;

const Tags = styled.div`
  display: flex;
  margin: 24px 0;
  flex-flow: row wrap;
  row-gap: 2px;
`;

const Section3 = styled.section`
  position: relative;
  display: flex;
  justify-content: space-between;
  margin: 40px 0px;
  width: 100%;
`;

const Section4 = styled.section`
  width: 70%;
  margin-right: 25px;
  h2 {
    font-size: 18px;
    margin: 20px 0;
    color: var(--black-900);
  }
`;

const Header2 = styled.div`
  display: flex;
  /* -webkit-box-pack: justify; */
  /* justify-content: space-between; */
  margin: 20px 0;
  color: var(--black-900);
  font-size: 18px;
  font-weight: 400;
`;

const Position = styled.div`
  margin-top: 24px;
`;
const WarningText = styled.div`
  margin: 10px 5px 20px 0px;
  color: var(--red-400);
  font-size: 12px;
`;

const QuestionDetailpage = () => {
  const { questionId } = useParams();

  const arr = questionAxios(
    `${process.env.REACT_APP_API_URL}/question/${questionId}`
  );

  const list = arr[0];
  const setLists = arr[3];

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

  const AnswerCreateClick = () => {
    handlezeroEditorError();
    handlethirtyEditorError();
    if (answerValue.length <= 0 || answerValue.length <= 30) {
      return;
    }

    axios
      .post(
        `${process.env.REACT_APP_API_URL}/question/${questionId}`,
        {
          content: answerValue,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
        }
      )
      .then((e) => {
        setLists((prev) => {
          return {
            data: {
              ...prev.data,
              answers: [...prev.data.answers, e.data],
            },
          };
        });
        setAnswerValue("");
      })
      .catch((err) => {
        alert("답변을 게시하려면 먼저 로그인이 필요합니다.", err);
      });
  };

  return (
    <Container>
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
            <Span>{list.data.views} times</Span>
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
                  <p
                    dangerouslySetInnerHTML={{
                      __html: list.data.content,
                    }}
                  />
                  <Tags>
                    <TagDiv>kind of beauty</TagDiv>
                  </Tags>
                  <Section3>
                    <Sharedomain questionId={questionId} />
                    <AuthorProfile
                      createdAt={list.data.createdAt}
                      userName={list.data.userName}
                    />
                  </Section3>
                </Section2>
              </Main>
              <Header2>{list.data.answerCount} Answers</Header2>
              {list.data.answers.map((el) => (
                <Answer
                  key={el.answerId}
                  answers={el}
                  questionId={questionId}
                />
              ))}

              <Header2>Your Answer</Header2>
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
                    onClick={() => AnswerCreateClick()}
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
