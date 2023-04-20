import styled from "styled-components";
import Editor from "../Components/QuestionDetail/Editor";
import Button from "../Components/style/Button";

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
  return (
    <>
      <Container>
        <Contain>
          <Editbox>
            <p>
              Your edit will be placed in a queue until it is peer reviewed.
            </p>
            <br></br>
            <p>
              We welcome edits that make the post easier to understand and more
              valuable for readers. Because community members review edits,
              please try to make the post substantially better than how you
              found it, for example, by fixing grammar or adding additional
              resources and hyperlinks.
            </p>
          </Editbox>
          <h2>Answer</h2>
          <Editor />
          <Position>
            <Button variant="mediumBlue" size="question">
              Save Edits
            </Button>
            <Button variant="mediumWhite" size="question">
              Cancel
            </Button>
          </Position>
        </Contain>
      </Container>
    </>
  );
};

export default AnswerEditpage;
