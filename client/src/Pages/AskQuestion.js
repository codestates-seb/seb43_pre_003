import styled from "styled-components";
import { useState } from "react";
import Button from "../Components/style/Button";
import Editor from "../Components/QuestionDetail/Editor";
import TitleBg from "../Components/style/img/bg-askQuestion.svg";
import Input from "../Components/style/Input.js";
import Tag from "../Components/style/Tag";
import { axiosCreate } from "../util/api.js";

import { ReactComponent as PencilImg } from "../Components/style/img/img-spotPencil.svg";

const AskQuestionWrap = styled.section`
  padding: 30px;
  width: 100%;
  /* min-height: 1050px; */
  min-height: 100%;
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

const InputArea = styled.form`
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
  &:nth-child(2) {
    height: 340px;
  }
`;

const ErrTxt = styled.div`
  color: var(--red-400);
  font-size: var(--font-small);
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
const BtnArea = styled.div`
  margin-top: 24px;
  display: flex;
  gap: 12px;
`;

function AskQuestion() {
  const [titleValue, setTitleValue] = useState("");
  const [editorValue, setEditorValue] = useState("");

  const [titleError, setTitleError] = useState(false);
  const [editorError, setEditorError] = useState(false);

  // const listId = useRef(0);
  // const questionListId = useRef(0);

  const handleChange = (e) => {
    setTitleValue(e.target.value);
  };

  const handleTitleError = () => {
    titleValue.length < 15 ? setTitleError(true) : setTitleError(false);
  };

  const handleEditorError = () => {
    editorValue.length < 30 ? setEditorError(true) : setEditorError(false);
  };

  const handleReset = () => {
    setTitleValue("");
    setEditorValue("");
  };

  const handleSubmit = () => {
    handleTitleError();
    handleEditorError();
    // const createdAt = new Date().toLocaleString();

    // const newList = {
    //   id: listId.current,
    //   question: {
    //     questionId: questionListId.current,
    //     title: titleValue,
    //     content: editorValue,
    //     tags: ["kind of beauty"],
    //     userid: 0,
    //     userName: "mooni",
    //     answerCount: 0,
    //     views: 0,
    //     votes: 0,
    //     questionStatus: "QUESTION_REGISTERED",
    //     createdAt,
    //     modifiedAt: "",
    //   },
    //   answer: [],
    // };

    const newList = {
      title: titleValue,
      content: editorValue,
    };

    if (titleValue.length > 14 && editorValue.length > 29) {
      // axiosCreate("http://localhost:3001/data/", newList);
      axiosCreate(`${process.env.REACT_APP_API_URL}/question`, newList);
      // listId.current += 1;
      // questionListId.current += 1;
    }
  };

  return (
    <>
      <AskQuestionWrap>
        <TitleArea>
          <Title>Review your question</Title>
        </TitleArea>
        <InputArea onSubmit={(e) => e.preventDefault()}>
          <CardArea>
            <Card>
              <h5 className="title">Title</h5>
              <p>
                Be specific and imagine you’re asking a question to another
                person.
              </p>
              <Input
                type="text"
                placeholder="e.g. Is there an R function for finding the index of an element in a vector"
                value={titleValue}
                onChange={handleChange}
              />
              {titleError && (
                <ErrTxt>Title must be at least 15 characters.</ErrTxt>
              )}
            </Card>
            <Card>
              <h5 className="title">Body</h5>
              <p>
                The body of your question contains your problem details and
                results. Minimum 30 characters.
              </p>
              <Editor value={editorValue} onChange={setEditorValue} />
              {editorError && (
                <ErrTxt>Body must be at least 30 characters.</ErrTxt>
              )}
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
        <BtnArea>
          <Button
            variant="mediumBlue"
            size="custom"
            padding="8px 10px 8px 10px"
            onClick={() => handleSubmit()}
          >
            Post your question
          </Button>
          <Button
            variant="Discard"
            size="custom"
            padding="8px 10px 8px 10px"
            onClick={() => handleReset()}
          >
            Discard
          </Button>
        </BtnArea>
      </AskQuestionWrap>
    </>
  );
}

export default AskQuestion;
