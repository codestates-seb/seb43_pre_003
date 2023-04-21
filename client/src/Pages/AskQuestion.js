import styled from "styled-components";
import Button from "../Components/style/Button";
import Editor from "../Components/QuestionDetail/Editor";
import TitleBg from "../Components/style/img/bg-askQuestion.svg";
import Input from "../Components/style/Input.js";
import Tag from "../Components/style/Tag";
import { ReactComponent as PencilImg } from "../Components/style/img/img-spotPencil.svg";
// import Aside from "../Components/Aside";

// const Container = styled.div`
//   width: 100vw;
//   background-color: var(--black-025);
// `;

const AskQuestionWrap = styled.section`
  padding: 30px;
  /* width: calc(100% - 300px); */
  width: 100%;
  padding-bottom: 64px;
`;

const TitleArea = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 130px;
  background-image: url(${TitleBg});
  background-repeat: no-repeat;
  background-position: right bottom;
`;

const Title = styled.h2`
  font-size: 28px;
  font-weight: 600;
  color: var(--black-900);
  margin: 24px 0;
`;

const InputArea = styled.div`
  width: 100%;
  margin-bottom: 12px;
  display: flex;
  align-items: flex-start;
`;

const CardArea = styled.div`
  width: 70%;
  margin-right: 24px;
  > :first-child {
    margin-top: 0;
  }
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  padding: 24px;
  gap: 6px;
  border: 1px solid var(--black-070);
  margin-top: 12px;
  > .title {
    font-size: 16px;
    font-weight: 700;
    color: var(--black-900);
  }
  > p {
    font-size: 12px;
    color: var(--black-700);
  }
`;

const Aside = styled.div`
  max-width: 298px;
  width: 30%;
  height: auto;
  box-shadow: 0 1px 2px hsla(0, 0%, 0%, 0.05), 0 1px 4px hsla(0, 0%, 0%, 0.05),
    0 2px 8px hsla(0, 0%, 0%, 0.05);
  border: 1px solid var(--black-100);
  border-radius: 2px;
  background-color: var(--white);

  & > div:first-child {
    background-color: var(--black-025);
    font-size: 16px;
    padding: 12px;
    border-bottom: 1px solid var(--black-100);
    color: var(--black-900);
  }
  & > .content {
    display: flex;
    padding: 16px;
    gap: 16px;
    justify-content: center;
    > .img {
      width: 48px;
      height: 48px;
    }
    > div {
      font-size: 12px;
      white-space: normal;
      overflow-wrap: anywhere;
    }
  }
`;

function AskQuestion() {
  return (
    <>
      {/* <Container> */}
      <AskQuestionWrap>
        <TitleArea>
          <Title>Review your question</Title>
        </TitleArea>
        <InputArea>
          <CardArea>
            <Card>
              <h5 className="title">Title</h5>
              <p>
                Be specific and imagine you’re asking a question to another
                person.
              </p>
              <Input />
            </Card>
            <Card>
              <h5 className="title">Body</h5>
              <p>
                The body of your question contains your problem details and
                results. Minimum 30 characters.
              </p>
              <Editor />
            </Card>
            <Card>
              <h5 className="title">Tags</h5>
              <p>
                Add up to 5 tags to describe what your question is about. Start
                typing to see suggestions.
              </p>
              <Tag />
            </Card>
          </CardArea>
          <Aside>
            <div>Writing a good Question</div>
            <div className="content">
              <div className="img">
                <PencilImg />
              </div>
              <div>
                Your title should summarize the problem. <br /> <br /> You might
                find that you have a better idea of your title after writing out
                the rest of the question.
              </div>
            </div>
          </Aside>
        </InputArea>
        <Button variant="mediumBlue" size="custom" padding="8px 10px 8px 10px">
          Post your question
        </Button>
      </AskQuestionWrap>
      {/* </Container> */}
    </>
  );
}

export default AskQuestion;
