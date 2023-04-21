import styled from "styled-components";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Pagination from "../Components/Pagination";
import QuestionsList from "../Components/QuestionsList";
import Aside from "../Components/Aside";
import SortBtn from "../Components/SortBtn";
import Button from "../Components/style/Button";

const QuestionWrap = styled.section`
  width: calc(100% - 300px);
  padding-right: 30px;
  /* padding: 24px; */
`;

const QuestionTitle = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 24px;
  padding: 24px 0 0 24px;
  > button > a {
    color: var(--white);
    font-size: 13px;
  }
`;

const Title = styled.h3`
  font-size: 26px;
  color: var(--black-900);
  font-weight: 600;
`;

const QuestionFilter = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
  padding-left: 24px;
`;

const QuestionCount = styled.p`
  font-size: 18px;
  color: var(--black-800);
`;

const SortTab = styled.div`
  display: flex;
`;

const AllQuestion = styled.ul`
  display: flex;
  flex-flow: column nowrap;
  margin-bottom: 32px;
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
          <Button variant="mediumBlue" size="question">
            <Link to="/question/ask">Ask Question</Link>
          </Button>
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
      <Aside />
    </>
  );
}

export default QuestionsPage;
