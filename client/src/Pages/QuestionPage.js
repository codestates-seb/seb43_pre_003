import styled from "styled-components";
import Pagination from "../Components/Pagination";
import QuestionsList from "../Components/QuestionsList";

const QuestionWrap = styled.section`
  width: calc(100% - 18.75rem);
  padding: 1.5rem;
`;

const QuestionTitle = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1.5rem;
`;

const Title = styled.h3`
  font-size: 1.625rem;
  color: var(--black-900);
  font-weight: 600;
`;

const AskQuestionBtn = styled.button`
  border-radius: 0.25rem;
  font-size: 0.8125rem;
  color: var(--white);
  background-color: var(--blue-500);
  padding: 0.75rem;
  :hover {
    background-color: var(--blue-600);
  }
`;

function QuestionsPage() {
  return (
    <>
      <QuestionWrap>
        <QuestionTitle>
          <Title>Top Questions</Title>
          <AskQuestionBtn>Ask Question</AskQuestionBtn>
        </QuestionTitle>
        <QuestionsList />
        <Pagination />
      </QuestionWrap>
    </>
  );
}

export default QuestionsPage;
