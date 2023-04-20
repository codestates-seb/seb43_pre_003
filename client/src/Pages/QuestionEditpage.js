import styled from "styled-components";
import Editor from "../Components/QuestionDetail/Editor";
import Button from "../Components/style/Button";
import Tag from "../Components/style/Tag";

const onChange = (e) => {
  console.log(e.target.value);
};

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
  padding: var(--padding, 8px 16px 8px 10px);

  border-radius: 2px;
  flex-grow: 10;
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
          <h2>Title</h2>
          <Input type="text" placeholder="Title" onChange={onChange} />
          <h2>Body</h2>
          <Editor />
          <h3>Tags</h3>
          <Tag />
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
