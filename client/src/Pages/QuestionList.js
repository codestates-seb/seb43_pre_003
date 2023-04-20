import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const QuestionDetail = () => {
  const [lists, setList] = useState([]);

  // 질문 목록을 조회하는 함수
  const fetchQuestions = async () => {
    try {
      const response = await fetch("http://localhost:3001/data");
      const data = await response.json();

      setList(data);
    } catch (error) {
      console.error("Failed to fetch questions:", error);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  return (
    <div>
      <h1>질문 목록</h1>
      <ul>
        {lists.map((list) => (
          <li key={list.question.questionId}>
            <p>{list.question.questionId}</p>

            <Link to={`/data/${list.question.questionId}`}>상세 보기</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuestionDetail;
