import styled from "styled-components";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Pagination from "../Components/Pagination";
import QuestionsList from "../Components/QuestionsList";
import Aside from "../Components/Aside";
import { SortBtn } from "../Components/SortBtn";
import Button from "../Components/style/Button";

const QuestionWrap = styled.section`
  width: calc(100% - 454px);
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

const NoQuestion = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60vh;
`;

function QuestionsPage({ auth }) {
  const [list, setList] = useState(0); // 총 아이템들
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지. default 값으로 1
  const [currentPosts, setCurrentPosts] = useState([]); // 현재 페이지에서 보여지는 아이템들

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/question?page=${currentPage}&size=10`
      )
      .then((res) => {
        setList(res.data.pageInfo.totalElements);
        setCurrentPosts(res.data.data);
      })
      .catch(() => {
        alert("데이터를 불러오지 못했습니다.");
      });
  }, [currentPage]);

  const setPage = (el) => {
    setCurrentPage(el);
  };

  return (
    <>
      <QuestionWrap>
        <QuestionTitle>
          <Title>All Questions</Title>
          {auth ? (
            <Link to="/question/ask">
              <Button variant="mediumBlue" size="question">
                Ask Question
              </Button>
            </Link>
          ) : (
            <Link to="/login">
              <Button variant="mediumBlue" size="question">
                Ask Question
              </Button>
            </Link>
          )}
        </QuestionTitle>
        <QuestionFilter>
          <QuestionCount>{list} questions</QuestionCount>
          <SortTab>
            <SortBtn />
          </SortTab>
        </QuestionFilter>
        <AllQuestion>
          {currentPosts && list > 0 ? (
            currentPosts.map((el) => (
              <QuestionsList key={el.questionId} data={el} />
            ))
          ) : (
            <NoQuestion>No Question</NoQuestion>
          )}
        </AllQuestion>
        <Pagination currentPage={currentPage} count={list} setPage={setPage} />
      </QuestionWrap>
      <Aside />
    </>
  );
}

export default QuestionsPage;
