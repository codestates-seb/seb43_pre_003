import styled from "styled-components";
import axios from "axios";
import { useState } from "react";

const ArrowUp = styled.div`
  width: 0;
  height: 0;
  border-left: 15px solid transparent;
  border-right: 15px solid transparent;
  border-bottom: 15px solid
    ${(props) => (props.active ? "#f58124" : "var(--black-200)")};
  padding: 0;
  cursor: ${(props) => (props.active ? "default" : "pointer")};
`;

const ArrowBottom = styled.div`
  width: 0;
  height: 0;
  border-left: 15px solid transparent;
  border-right: 15px solid transparent;
  border-top: 15px solid
    ${(props) => (props.active ? "#f58124" : "var(--black-200)")};
  cursor: ${(props) => (props.active ? "default" : "pointer")};
`;

const ArrowButton = styled.button`
  border: 0;
  background: none;
  font-size: 2rem;
  color: #ddd;
  cursor: pointer;
  text-align: center;
  width: 30px;
  opacity: ${(props) => (props.disabled ? "0.8" : "1")};
  pointer-events: ${(props) => (props.disabled ? "none" : "auto")};
`;

const Total = styled.div`
  text-align: center;
  width: 30px;
  padding: 5px 0px;
  font-size: 1.4rem;
  line-height: 1.4rem;
  color: #888;
`;

const RecommendButton = ({ votes, questionId }) => {
  const [newVote, setVotes] = useState(votes);
  const [activeButton, setActiveButton] = useState(null);

  const Voteup = (questionId) => {
    setActiveButton("up");
    axios
      .get(`${process.env.REACT_APP_API_URL}/question/${questionId}/vote/up`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setVotes(response.data.data.votes);
      })
      .catch((error) => {
        console.error("Failed to save edit:", error);
      });
  };

  const Votedown = async (questionId) => {
    setActiveButton("down");
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/question/${questionId}/vote/down`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        setVotes(response.data.data.votes);
      })
      .catch((error) => {
        console.error("Failed to save edit:", error);
      });
  };

  return (
    <div>
      <ArrowButton
        onClick={() => Voteup(questionId)}
        disabled={activeButton === "up" || activeButton === "down"}
      >
        <ArrowUp active={activeButton === "up"} />
      </ArrowButton>
      <Total>
        <span>{newVote}</span>
      </Total>
      <ArrowButton
        onClick={() => Votedown(questionId)}
        disabled={activeButton === "up" || activeButton === "down"}
      >
        <ArrowBottom active={activeButton === "down"} />
      </ArrowButton>
    </div>
  );
};

export default RecommendButton;
