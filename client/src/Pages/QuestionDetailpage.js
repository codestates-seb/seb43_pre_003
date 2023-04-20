import styled from "styled-components";
import RecommendButton from "../Components/QuestionDetail/RecommendButton";
import Sharedomain from "../Components/QuestionDetail/Sharedomain";
import AuthorProfile from "../Components/QuestionDetail/Authorprofile";
import Answer from "../Components/QuestionDetail/Answser";
import Button from "../Components/style/Button";
import Editor from "../Components/QuestionDetail/Editor";

import { useParams } from "react-router-dom";

import dateCalculate from "../util/dateCalculate";
import questionAxios from "../util/questionAxios";

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
  h2 {
    font-size: 18px;
    margin-bottom: 15px;
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

const QuestionDetailpage = () => {
  const { questionId } = useParams();
  console.log(questionId);

  const [list, isPending, error] = questionAxios(
    `http://localhost:3001/data/${questionId}`
  );
  const handleButtonClick = () => {
    console.log("Button clicked!");
    // 원하는 동작을 수행하도록 추가적인 로직 작성
  };

  return (
    <Container>
      {error && <div>{error}</div>}
      {isPending && <div>Loading...</div>}
      {list && (
        <Contain>
          <Header1>
            <H1>{list.question.title}</H1>
            <Button variant="mediumBlue" size="question">
              Ask Question
            </Button>
          </Header1>

          <Section1>
            <Strong>Asked</Strong>
            <Span>{dateCalculate(list.question.createdAt)}</Span>
            <Strong>Modified</Strong>
            <Span>{dateCalculate(list.question.modifiedAt)}</Span>
            <Strong>viewed</Strong>
            <Span>{list.question.views}times</Span>
          </Section1>

          <Body>
            <Section4>
              <Main>
                <Aside1>
                  <RecommendButton votes={list.question.votes} />
                </Aside1>

                <Section2>
                  <div>
                    <div>
                      <p>{list.question.content}</p>
                    </div>
                  </div>
                  <Section3>
                    <Sharedomain />
                    <AuthorProfile
                      createdAt={list.question.createdAt}
                      userName={list.question.userName}
                    />
                  </Section3>
                </Section2>
              </Main>
              <Header2>
                <h1>{list.question.answerCount} Answers</h1>
              </Header2>
              <Answer />
              <h2>Your Answer</h2>
              <div>
                <Editor />
                <Position>
                  <Button
                    variant="mediumBlue"
                    size="postyouranswer"
                    onClick={handleButtonClick}
                  >
                    Post your Answer
                  </Button>
                </Position>
              </div>
            </Section4>
          </Body>
        </Contain>
      )}
    </Container>
  );
};

export default QuestionDetailpage;