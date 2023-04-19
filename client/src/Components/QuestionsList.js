import styled from "styled-components";
// import { Link } from "react-router-dom";
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
  /* max-width: calc(100% - 6.75rem); */
  height: auto;
  display: flex;
  flex-direction: column;
  row-gap: 3px;
`;

const QuestionTitle = styled.h3`
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
  color: val(--black-600);
`;

function QuestionsList() {
  return (
    <>
      <QuestionsLiContainer>
        <QuestionState>
          <div>
            <span>0</span>
            <span>votes</span>
          </div>
          <div>
            <span>0</span>
            <span>answers</span>
          </div>
          <div>
            <span>0</span>
            <span>views</span>
          </div>
        </QuestionState>
        <QuestionContent>
          <QuestionTitle>
            {/* <Link to={`/questions/${el.questionId}`}> */}
            How to transfer the fund from How to transfer the fund from
            Braintree account to paypal account using php?
            {/* </Link> */}
          </QuestionTitle>
          <QuestionBody>
            When you are doing a ObjectMapper.readValue on type with Generic
            parameters, When you are doing a Object. readValue on type with
            Generic parameters,you use this: new
            ObjectMapper.readValuesomeSourceValue, new TypeReference...
          </QuestionBody>
          <QuestionFooter>
            <Tags>
              <TagDiv>Javascript</TagDiv>
            </Tags>
            <UserData>
              {/* <img width="20" src={img} /> */}
              <UserName>mooni</UserName>asked 1 days ago<UserAsked></UserAsked>
            </UserData>
          </QuestionFooter>
        </QuestionContent>
      </QuestionsLiContainer>
    </>
  );
}

export default QuestionsList;
