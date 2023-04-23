import styled from "styled-components";
import axios from "axios";
import { useState } from "react";

const ArrowUp = styled.div`
  width: 0;
  height: 0;
  border-left: 15px solid transparent;
  border-right: 15px solid transparent;
  border-bottom: 15px solid
    ${(props) => (props.disabled ? "#f58124" : "var(--black-200)")};
  padding: 0;
  &:active {
    border-bottom: 15px solid #f58124;
  }
`;

const ArrowBottom = styled.div`
  width: 0;
  height: 0;
  border-left: 15px solid transparent;
  border-right: 15px solid transparent;
  border-top: 15px solid
    ${(props) => (props.disabled ? "#f58124" : "var(--black-200)")};
  &:active {
    border-top: 15px solid "#f58124";
  }
`;

const ArrowButton = styled.button`
  border: 0;
  background: none;
  font-size: 2rem;
  color: #ddd;
  cursor: pointer;
  text-align: center;
  width: 30px;
  &:disabled {
    cursor: default;
  }
`;

const Total = styled.div`
  text-align: center;
  width: 30px;
  padding: 5px 0px;
  font-size: 1.4rem;
  line-height: 1.4rem;
  color: #888;
`;

const RecommendButton = ({ votes, questionId, memberId }) => {
  const [voteCount, setVoteCount] = useState(votes);
  const [upButtonDisabled, setUpButtonDisabled] = useState(false);
  const [downButtonDisabled, setDownButtonDisabled] = useState(false);

  const Voteup = async (questionId, memberId) => {
    try {
      setUpButtonDisabled(true);
      setDownButtonDisabled(true);

      const response = await axios.get(
        `http://localhost:3001/data/${questionId}/${memberId}/vote/up`
      );
      const newVoteCount = response.data.voteCount;
      setVoteCount(newVoteCount);
    } catch (error) {
      console.error("Failed to save edit:", error);
    }
  };

  const Votedown = async (questionId, memberId) => {
    try {
      // 버튼 비활성화
      setUpButtonDisabled(true);
      setDownButtonDisabled(true);

      const response = await axios.get(
        `http://localhost:3001/data/${questionId}/${memberId}/vote/down`
      );
      const newVoteCount = response.data.voteCount;
      setVoteCount(newVoteCount);
    } catch (error) {
      console.error("Failed to save edit:", error);
    }
  };

  return (
    <div>
      <ArrowButton
        onClick={() => Voteup(questionId, memberId)}
        disabled={upButtonDisabled}
      >
        <ArrowUp disabled={downButtonDisabled} />
      </ArrowButton>
      <Total>{voteCount}</Total>
      <ArrowButton
        onClick={() => Votedown(questionId, memberId)}
        disabled={downButtonDisabled}
      >
        <ArrowBottom disabled={downButtonDisabled} />
      </ArrowButton>
    </div>
  );
};

export default RecommendButton;
