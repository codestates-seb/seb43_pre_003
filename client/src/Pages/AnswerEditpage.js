import styled from "styled-components";
import Editor from "../Components/QuestionDetail/Editor";
import Button from "../Components/style/Button";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
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

  h2 {
    font-size: 18px;
    margin-bottom: 15px;
    font-weight: bold;
  }
`;

const Position = styled.div`
  margin-top: 70px;
`;

const Editbox = styled.header`
  margin-bottom: 30px;
  padding: 25px;
  background-color: var(--yellow-050);
  border: 1px solid hsl(47, 69%, 69%);
  border-radius: 3px;
  p {
    font-size: 12px;
    line-height: 17px;
    white-space: pre-line;
  }
`;

const AnswerEditpage = () => {
  const { questionId, answerId } = useParams();
  const navigate = useNavigate();
  console.log(questionId);
  console.log(answerId);
  const [list, isPending, error] = questionAxios(
    `http://localhost:3001/data/${questionId}`
  );
  console.log(questionId);

  useEffect(() => {
    if (list && list.answer && list.answer[answerId]) {
      setAEditorValue(list.answer[answerId].content);
    }
  }, [answerId]);

  const [aeditorValue, setAEditorValue] = useState("");
  console.log(aeditorValue);
  const answerEditClick = async (questionId) => {
    try {
      await axios.patch(
        `http://localhost:3001/data/${questionId}/${answerId}`,
        {
          question: {
            answer: {
              memberId: list.answer[answerId].memberId,
              content: aeditorValue,
            },
          },
        }
      );

      console.log("Edit successfully saved!");

      setAEditorValue(aeditorValue);
      navigate(`/question/${questionId}`);
    } catch (error) {
      console.error("Failed to save edit:", error);
    }
  };

  return (
    <>
      <Container>
        {error && <div>{error}</div>}
        {isPending && <div>Loading...</div>}
        {list && (
          <Contain>
            <Editbox>
              <p>
                Your edit will be placed in a queue until it is peer reviewed.
              </p>
              <br></br>
              <p>
                We welcome edits that make the post easier to understand and
                more valuable for readers. Because community members review
                edits, please try to make the post substantially better than how
                you found it, for example, by fixing grammar or adding
                additional resources and hyperlinks.
              </p>
            </Editbox>
            <h2>Answer</h2>
            <Editor value={aeditorValue} onChange={setAEditorValue} />
            <Position>
              <Button
                variant="mediumBlue"
                size="question"
                onClick={() => answerEditClick(questionId)}
              >
                Save Edits
              </Button>
              <Link to={`/question/${questionId}`}>
                <Button variant="mediumWhite" size="question">
                  Cancel
                </Button>
              </Link>
            </Position>
          </Contain>
        )}
      </Container>
    </>
  );
};

export default AnswerEditpage;
