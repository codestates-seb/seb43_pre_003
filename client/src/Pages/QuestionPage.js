import styled from "styled-components";
import Pagination from "../Components/Pagination";
import QuestionsList from "../Components/QuestionsList";
import Sidebar from "../Components/Sidebar";
import SortBtn from "../Components/SortBtn";
import { useEffect, useState } from "react";
import axios from "axios";

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
  const [data, setData] = useState([]); // 리스트에 나타낼 아이템들
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지. default 값으로 1
  const [currentPosts, setCurrentPosts] = useState([]); // 현재 페이지에서 보여지는 아이템들

  useEffect(() => {
    axios
      .get("http://localhost:3001/data")
      .then((res) => {
        setData(
          res.data.sort((a, b) => b.question.questionId - a.question.questionId)
        );
        setCurrentPosts(res.data.slice(0, 10)); // 0 , 10
      })
      .catch((error) => {
        console.log("error", error);
      });
  }, []);

  useEffect(() => {
    const firstPost = (currentPage - 1) * 10;
    setCurrentPosts(data.slice(firstPost, firstPost + 10));
  }, [currentPage]);

  const setPage = (el) => {
    setCurrentPage(el);
  };

  return (
    <>
      <QuestionWrap>
        <QuestionTitle>
          <Title>All Questions</Title>
          <AskQuestionBtn>Ask Question</AskQuestionBtn>
        </QuestionTitle>
        <QuestionFilter>
          <QuestionCount>{data.length} questions</QuestionCount>
          <SortTab>
            <SortBtn />
          </SortTab>
        </QuestionFilter>
        <AllQuestion>
          {currentPosts && data.length > 0 ? (
            currentPosts.map((el) => (
              <QuestionsList key={el.question.questionId} data={el} />
            ))
          ) : (
            <div>No Question</div>
          )}
        </AllQuestion>
        <Pagination
          currentPage={currentPage}
          count={data.length}
          setPage={setPage}
        />
      </QuestionWrap>
      <Sidebar />
    </>
  );
}

export default QuestionsPage;
