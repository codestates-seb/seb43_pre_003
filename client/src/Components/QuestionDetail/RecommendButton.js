import styled from "styled-components";

const ArrowUp = styled.div`
  width: 0;
  height: 0;
  border-left: 15px solid transparent;
  border-right: 15px solid transparent;
  border-bottom: 15px solid var(--black-200);
  padding: 0;
`;

const ArrowBottom = styled.div`
  width: 0;
  height: 0;
  border-left: 15px solid transparent;
  border-right: 15px solid transparent;
  border-top: 15px solid var(--black-200);
  padding: 0;
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
    cursor: not-allowed;
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

const RecommendButton = ({ votes }) => {
  return (
    <div>
      <ArrowButton>
        <ArrowUp />
      </ArrowButton>
      <Total>{votes}</Total>
      <ArrowButton>
        <ArrowBottom />
      </ArrowButton>
    </div>
  );
};

export default RecommendButton;
