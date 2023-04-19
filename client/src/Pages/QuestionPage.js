import styled from "styled-components";
import Pagination from "../Components/Pagination";
import QuestionsList from "../Components/QuestionsList";
import Sidebar from "../Components/Sidebar";
import SortBtn from "../Components/SortBtn";

const QuestionWrap = styled.section`
  width: calc(100% - 18.75rem);
  /* padding: 1.5rem; */
`;

const QuestionTitle = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1.5rem;
  padding: 1.5rem 0 0 1.5rem;
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

const QuestionFilter = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.75rem;
  padding-left: 1.5rem;
`;

const QuestionCount = styled.p`
  font-size: 1.125rem;
  color: var(--black-800);
`;

const SortTab = styled.div`
  display: flex;
`;

const AllQuestion = styled.ul`
  display: flex;
  flex-flow: column nowrap;
  margin-bottom: 2rem;
  border-top: 1px solid var(--black-100);
`;

function QuestionsPage() {
  return (
    <>
      <QuestionWrap>
        <QuestionTitle>
          <Title>All Questions</Title>
          <AskQuestionBtn>Ask Question</AskQuestionBtn>
        </QuestionTitle>
        <QuestionFilter>
          <QuestionCount>123 questions</QuestionCount>
          <SortTab>
            <SortBtn />
          </SortTab>
        </QuestionFilter>
        <AllQuestion>
          <QuestionsList />
        </AllQuestion>
        <Pagination />
      </QuestionWrap>
      <Sidebar />
    </>
  );
}

export default QuestionsPage;
