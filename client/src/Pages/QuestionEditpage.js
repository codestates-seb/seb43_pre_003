import styled from "styled-components";
import Editor from "../Components/QuestionDetail/Editor";
import Button from "../Components/style/Button";
import Tag from "../Components/style/Tag";
import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import questionAxios from "../util/questionAxios";
import axios from "axios";

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
    font-size: 15px;
    margin: 15px 0px;
    font-weight: bold;
  }

  h3 {
    font-size: 15px;
    margin: 60px 0px 0px 0px;
    font-weight: bold;
  }
`;

const Position = styled.div`
  margin-top: 70px;
`;

const Editbox = styled.header`
  margin-bottom: 10px;
  padding: 16px;
  background-color: var(--yellow-050);
  border: 1px solid hsl(47, 69%, 69%);
  border-radius: 3px;
  p {
    font-size: 12px;
    line-height: 17px;
    white-space: pre-line;
  }
`;
const Input = styled.input`
  padding: 8px 16px 8px 10px;

  border-radius: 2px;
  background-position: 215px center;
  background-repeat: no-repeat;
  border: 1px solid var(--border, var(--black-200));
  &:active,
  &:focus {
    box-shadow: 0px 0px 5px 5px var(--box-shadow, hsl(205, 46%, 92%));
    outline: none;
    border: 1px solid var(--border-hover, var(--blue-500));
  }
`;

const WarningText = styled.div`
  margin-left: 5px;
  margin-top: 10px;
  color: red;
  font-size: 12px;
`;

const QuestionEditpage = () => {
  const { questionId } = useParams();
  const navigate = useNavigate();

  const [list] = questionAxios(
    `${process.env.REACT_APP_API_URL}/question/${questionId}`
  );

  useEffect(() => {
    if (list && list.data && list.data.title) {
      setEditorValue(list.data.content);
      setTitleValue(list.data.title);
    }
  }, [list]);

  const [editorValue, setEditorValue] = useState("");
  const [titleValue, setTitleValue] = useState("");

  const [titleError, setTitleError] = useState(false);
  const [editorError, setEditorError] = useState(false);

  const handleTitleError = () => {
    titleValue.length < 15 ? setTitleError(true) : setTitleError(false);
  };

  const handleEditorError = () => {
    editorValue.length < 30 ? setEditorError(true) : setEditorError(false);
  };
  const handleEditClick = async (questionId) => {
    handleTitleError();
    handleEditorError();
    console.log(titleValue);
    console.log(editorValue);
    try {
      if (titleValue.length > 14 && editorValue.length > 29) {
        await axios.patch(
          `${process.env.REACT_APP_API_URL}/question/${questionId}/edit`,
          {
            title: titleValue,
            content: editorValue,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: localStorage.getItem("token"),
            },
          }
        );
        setEditorValue(editorValue);
        navigate(`/question/${questionId}`);
      }
    } catch (error) {
      console.error("Failed to save edit:", error);
    }
  };

  return (
    <>
      <Container>
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
            <h2>Title</h2>
            <Input
              type="text"
              placeholder="Title"
              value={titleValue}
              onChange={(e) => setTitleValue(e.target.value)}
            />
            {titleError && (
              <WarningText>Title must be at least 15 characters.</WarningText>
            )}
            <h2>Body</h2>
            <Editor value={editorValue} onChange={setEditorValue} />
            {editorError && (
              <WarningText>Body must be at least 30 characters.</WarningText>
            )}
            <h3>Tags</h3>
            <Tag />
            <Position>
              <Button
                variant="mediumBlue"
                size="question"
                onClick={() => handleEditClick(questionId)}
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

export default QuestionEditpage;
