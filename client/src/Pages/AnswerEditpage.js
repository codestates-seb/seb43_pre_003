import styled from "styled-components";
import Editor from "../Components/QuestionDetail/Editor";
import Button from "../Components/style/Button";
import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
//import questionAxios from "../util/questionAxios";

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
const WarningText = styled.div`
  margin-left: 5px;
  margin-top: 10px;
  color: red;
  font-size: 12px;
`;

const AnswerEditpage = () => {
  const { questionId, answerId } = useParams();

  const [answers, setAnswers] = useState(null);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/question/${questionId}/answers`)
      .then((res) => {
        if (!res.data) {
          throw new Error("No data found");
        }
        setAnswers(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const answerIdToFindNumber = Number(answerId);
  const answerIndex = answers
    ? answers.findIndex((answer) => answer.answerId === answerIdToFindNumber)
    : -1;

  useEffect(() => {
    if (answers && answerIndex !== -1 && answers[answerIndex]) {
      setAEditorValue(answers[answerIndex].content);
    }
  }, [answers, answerIndex]);

  const [aeditorValue, setAEditorValue] = useState("");
  const [zeroeditorError, setzeroEditorError] = useState(false);
  const [thirtyeditorError, setthirtyEditorError] = useState(false);

  const handlezeroEditorError = () => {
    aeditorValue.length <= 0
      ? setzeroEditorError(true)
      : setzeroEditorError(false);
  };

  const handlethirtyEditorError = () => {
    if (aeditorValue.length > 0 && aeditorValue.length < 30) {
      setthirtyEditorError(true);
    } else {
      setthirtyEditorError(false);
    }
  };

  const answerEditClick = (questionId, answerId) => {
    handlezeroEditorError();
    handlethirtyEditorError();
    if (aeditorValue.length <= 0 || aeditorValue.length <= 30) {
      return;
    }
    axios
      .patch(
        `${process.env.REACT_APP_API_URL}/question/${questionId}/${answerId}/edit`,
        {
          content: aeditorValue,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      )
      .then(() => {
        console.log("Edit successfully saved!");
        window.location.href = `http://localhost:3000/question/${questionId}`;
      })
      .catch((error) => {
        console.error("Failed to save edit:", error);
      });
  };

  return (
    <>
      <Container>
        {answers && (
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
                onClick={() => answerEditClick(questionId, answerId)}
              >
                Save Edits
              </Button>

              <Link to={`/question/${questionId}`}>
                <Button variant="mediumWhite" size="question">
                  Cancel
                </Button>
              </Link>
              {zeroeditorError && <WarningText>Answer is missing</WarningText>}
              {thirtyeditorError && (
                <WarningText>Minimum 30 characters required</WarningText>
              )}
            </Position>
          </Contain>
        )}
      </Container>
    </>
  );
};

export default AnswerEditpage;
