import styled from "styled-components";
import Sharedomain from "./Sharedomain";
import AuthorProfile from "./Authorprofile";

const Main = styled.main`
  display: flex;
  margin-top: 30px;
  padding-bottom: 18px;
  border-bottom: 1px solid rgb(227, 230, 232);
`;

const Section2 = styled.section`
  flex-grow: 1;
  p {
    margin-left: 7px;
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

const List = styled.main`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Answer = ({ answers, questionId, auth }) => {
  if (!answers) {
    return null;
  }
  return (
    <List>
      {answers.map((answer) => (
        <Main key={answer.answerId}>
          <Section2>
            <div>
              <div>
                <p
                  dangerouslySetInnerHTML={{
                    __html: answer.content,
                  }}
                />
              </div>
            </div>
            <Section3>
              <Sharedomain
                questionId={questionId}
                answerId={answer.answerId}
                auth={auth}
              />
              <AuthorProfile
                createdAt={answer.createdAt}
                userName={answer.userName}
              />
            </Section3>
          </Section2>
        </Main>
      ))}
    </List>
  );
};

export default Answer;
