import styled from "styled-components";
import Sharedomain from "./Sharedomain";
import AuthorProfile from "./Authorprofile";

const Main = styled.main`
  display: flex;
  /* margin-top: 30px; */
  padding: 18px 10px;
  border-bottom: 1px solid rgb(227, 230, 232);
`;

const Section2 = styled.section`
  flex-grow: 1;
  > p > p {
    font-size: 15px;
    font-weight: 500;
    line-height: 22.5px;
    white-space: normal;
    overflow-wrap: anywhere;
  }
`;

const Section3 = styled.section`
  position: relative;
  display: flex;
  justify-content: space-between;
  margin: 25px 0px 0px;
  width: 100%;
`;

const List = styled.main`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Answer = ({ questionId, answers }) => {
  if (!answers) {
    return null;
  }
  return (
    <List>
      <Main key={answers.answerId}>
        <Section2>
          <p
            dangerouslySetInnerHTML={{
              __html: answers.content,
            }}
          />
          <Section3>
            <Sharedomain questionId={questionId} answerId={answers.answerId} />
            <AuthorProfile
              createdAt={answers.createdAt}
              userName={answers.userName}
            />
          </Section3>
        </Section2>
      </Main>
    </List>
  );
};

export default Answer;
