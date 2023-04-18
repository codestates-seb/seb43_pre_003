import styled from "styled-components";

const QuestionsWrap = styled.div`
  border-bottom: 1px solid var(--black-075);
  padding: 1rem;
  display: flex;
  position: relative;
  /* flex-direction: row; */
`;

const QuestionBox = styled.div`
  height: auto;
  color: var(--black-700);
  display: flex;
`;

const QuestionState = styled.div`
  width: 6.75rem;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.5rem;
  margin-right: 1rem;
  font-size: 0.8125rem;
  > span {
    font-size: 0.8125rem;
    color: var(--black-800);
    margin-left: 0.25rem;
  }
`;

const StateVote = styled.div`
  color: var(--black-800);
`;
const StateAnswer = styled.div`
  color: var(--black-800);
`;
const StateView = styled.div`
  color: var(--black-800);
`;

const QuestionContent = styled.div`
  width: auto;
  /* display: flex; */
  /* flex-direction: column;
  flex-wrap: wrap;
  flex-grow: 1;
  overflow-wrap: break-word; */

  /* max-width: 100%; */
  /* width: auto; */
  /* max-width: calc(100% - 6.75rem); */
`;

const QuestionTitle = styled.h3`
  color: var(--blue-600);
  font-size: 1.125rem;
  font-weight: 700;
  line-height: 1.5rem;
  padding-right: 1.5rem;
  margin-bottom: 0.25rem;
  :hover {
    cursor: pointer;
    color: var(--blue-500);
  }
  /* word-break: break-word;
  overflow-wrap: break-word; */
`;

const QuestionMain = styled.div`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  word-break: break-word;
  overflow-wrap: break-word;
`;

const QuestionBody = styled.div`
  /* width: auto; */
  font-size: 0.8125rem;
  margin-right: 0.5rem;
  line-height: 1rem;
  color: var(--black-700);

  /* overflow: hidden; */
  /* word-break: break-word;
  overflow-wrap: break-word; */
`;

function QuestionsList() {
  return (
    <>
      <QuestionsWrap>
        <QuestionBox>
          <QuestionState>
            <StateVote>
              <span>0</span>
              <span>votes</span>
            </StateVote>
            <StateAnswer>
              <span>0</span>
              <span>answers</span>
            </StateAnswer>
            <StateView>
              <span>0</span>
              <span>views</span>
            </StateView>
          </QuestionState>
          <QuestionContent>
            <QuestionTitle>
              How to transfer the fund from Braintree account to paypal account
              using php?
            </QuestionTitle>
            <QuestionMain>
              <QuestionBody>
                When you are doing a ObjectMapper.readValue on type with Generic
                parameters, you use this: new
                ObjectMapper.readValuesomeSourceValue, new TypeReference...
              </QuestionBody>
            </QuestionMain>
          </QuestionContent>
        </QuestionBox>
      </QuestionsWrap>
    </>
  );
}

export default QuestionsList;
