import styled from "styled-components";
import Editor from "../Components/QuestionDetail/Editor";
import Button from "../Components/style/Button";
import Tag from "../Components/style/Tag";
import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
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

const QuestionEditpage = () => {
  const { questionId } = useParams();
  const navigate = useNavigate();

  const [list, isPending, error] = questionAxios(
    `http://localhost:3001/data/${questionId}`
  );

  useEffect(() => {
    if (list && list.question && list.question.title) {
      setEditorValue(list.question.content);
      setTitleValue(list.question.title);
    }
  }, [list]);

  const [editorValue, setEditorValue] = useState("");
  const [titleValue, setTitleValue] = useState("");
  console.log(editorValue);

  const handleEditClick = async (questionId) => {
    try {
      await axios.patch(`http://localhost:3001/data/${questionId}`, {
        question: {
          memberId: list.question.memberId,
          title: titleValue,
          content: editorValue,
        },
      });

      console.log("Edit successfully saved!");

      setEditorValue(editorValue);
      navigate(`/question/${questionId}`);
    } catch (error) {
      console.error("Failed to save edit:", error);
    }
  };

  console.log(editorValue);

  console.log(titleValue);

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
            <h2>Title</h2>
            <Input
              type="text"
              placeholder="Title"
              value={titleValue}
              onChange={(e) => setTitleValue(e.target.value)}
            />
            <h2>Body</h2>
            <Editor value={editorValue} onChange={setEditorValue} />
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
