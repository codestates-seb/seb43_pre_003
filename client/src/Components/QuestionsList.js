import styled from "styled-components";
import { Link } from "react-router-dom";
import { TagDiv } from "./style/Tag";
// import img from "./style/img/ic- trophy.png";

const QuestionsLiContainer = styled.li`
  display: flex;
  position: relative;
  border-bottom: 1px solid var(--black-100);
  padding: 1rem;
`;

const QuestionState = styled.div`
  display: flex;
  flex-shrink: 0;
  flex-wrap: wrap;
  flex-direction: column;
  align-items: flex-end;
  width: 6.75rem;
  margin-right: 1rem;
  gap: 0.5rem;
  font-size: 0.8125rem;
  > div > span {
    font-size: 0.8125rem;
    margin-left: 0.25rem;
  }
  .has-answer {
    border: 1px solid var(--green-700);
    color: var(--green-700);
    border-radius: 0.125rem;
    padding: 0.125rem 0.25rem;
  }
  > div:nth-child(1) > span {
    color: var(--black-900);
  }
`;

const QuestionContent = styled.div`
  max-width: calc(100% - 6.75rem);
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  row-gap: 3px;
`;

const QuestionTitle = styled.h3`
  /* width: 100%; */
  width: calc(100%);
  white-space: normal;
  overflow-wrap: anywhere;
  /* word-break: break-all; */
  /* word-wrap: break-word; */
  /* hyphens: auto; */
  color: var(--blue-600);
  font-size: 1.125rem;
  font-weight: 400;
  line-height: 1.4rem;
  margin: 0 0 1em;
  margin-bottom: 0.3846rem;
  padding-right: 1.5rem;
  &:hover {
    cursor: pointer;
    color: var(--blue-500);
  }
  > a {
    width: calc(100%);
    white-space: normal;
    overflow-wrap: anywhere;

    color: var(--blue-500);
    cursor: pointer;
    text-decoration: none;
    user-select: auto;
  }
`;

const QuestionBody = styled.p`
  font-size: 0.875rem;
  color: var(--black-700);
  margin-bottom: 0.5rem;
  padding-right: 1.5rem;
  line-height: 1.3rem;
  max-height: 43px;
  width: calc(100%);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  white-space: normal;
  overflow-wrap: anywhere;
  word-wrap: break-word;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const QuestionFooter = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  padding-right: 1.5rem;
`;

const Tags = styled.div`
  display: flex;
  flex-flow: row wrap;
  row-gap: 0.125rem;
`;

const UserData = styled.div`
  display: flex;
  margin-left: 0.375rem;
  font-size: 0.75rem;
  padding: 0.25rem 0 0 0.375rem;
  gap: 0.375rem;

  img {
    border-radius: 30%;
  }
`;

const UserName = styled.div`
  font-size: 0.75rem;
  color: var(--blue-500);
  width: auto;
`;

const UserAsked = styled.div`
  font-size: 0.75rem;
  color: val(--black-600);
`;

function QuestionsList({ data }) {
  const el = data.question;
  const elA = data.answer;

  return (
    <>
      <QuestionsLiContainer>
        <QuestionState>
          <div>
            <span>{el.votes}</span>
            <span>votes</span>
          </div>
          <div className={elA.length !== 0 ? "has-answer" : ""}>
            <span>{elA.length}</span>
            <span>answers</span>
          </div>
          <div>
            <span>{el.views}</span>
            <span>views</span>
          </div>
        </QuestionState>
        <QuestionContent>
          <QuestionTitle>
            <Link to={`/question/${el.questionId}`}>{el.title}</Link>
          </QuestionTitle>
          <QuestionBody>{el.content}</QuestionBody>
          <QuestionFooter>
            <Tags>
              {el.tags.map((el, index) => (
                <TagDiv key={index}>{el}</TagDiv>
              ))}
            </Tags>
            <UserData>
              {/* <img width="20" src={el.profileImg} /> */}
              <UserName>{el.userName}</UserName>
              <UserAsked>{el.createdAt}</UserAsked>
            </UserData>
          </QuestionFooter>
        </QuestionContent>
      </QuestionsLiContainer>
    </>
  );
}

export default QuestionsList;
