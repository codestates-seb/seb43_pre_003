import styled from "styled-components";
import { Link } from "react-router-dom";
import { TagDiv } from "./style/Tag";
import Profile from "./style/img/ic- trophy.png";
import { useEffect, useRef, useState } from "react";

const QuestionsLiContainer = styled.li`
  display: flex;
  position: relative;
  border-bottom: 1px solid var(--black-100);
  padding: 16px;
`;

const QuestionState = styled.div`
  display: flex;
  flex-shrink: 0;
  flex-wrap: wrap;
  flex-direction: column;
  align-items: flex-end;
  width: 108px;
  margin-right: 16px;
  gap: 8px;
  font-size: 13px;
  > div > span {
    font-size: 13px;
    margin-left: 4px;
  }
  .has-answer {
    border: 1px solid var(--green-700);
    color: var(--green-700);
    border-radius: 2px;
    padding: 2px 4px;
  }
  > div:nth-child(1) > span {
    color: var(--black-900);
  }
`;

const QuestionContent = styled.div`
  max-width: calc(100% - 124px);
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  row-gap: 3px;
`;

const QuestionTitle = styled.h3`
  /* width: 100%; */
  width: calc(100%);
  white-space: normal;
  overflow-wrap: anywhere;
  /* word-break: break-all; */
  /* word-wrap: break-word; */
  /* hyphens: auto; */
  font-size: 18px;
  font-weight: 400;
  line-height: 1.3;
  margin: 0 0 1em;
  margin-bottom: 6px;
  padding-right: 24px;
  > a {
    font-size: 18px;
    width: calc(100%);
    white-space: normal;
    overflow-wrap: anywhere;
    color: var(--blue-600);
    cursor: pointer;
    text-decoration: none;
    user-select: auto;
    &:hover {
      cursor: pointer;
      color: var(--blue-500);
    }
  }
`;

const QuestionBody = styled.div`
  font-size: 14px;
  color: var(--black-700);
  margin-bottom: 8px;
  padding-right: 24px;
  line-height: 1.5;
  max-height: 43px;
  width: calc(100%);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  white-space: normal;
  overflow-wrap: anywhere;
  word-wrap: break-word;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const QuestionFooter = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  padding-right: 24px;
`;

const Tags = styled.div`
  display: flex;
  flex-flow: row wrap;
  row-gap: 2px;
`;

const UserData = styled.div`
  display: flex;
  margin-left: 6px;
  font-size: 12px;
  padding: 4px 0 0 6px;
  gap: 6px;

  img {
    border-radius: 30%;
  }
`;

const UserName = styled.div`
  font-size: 12px;
  color: var(--blue-500);
  width: auto;
`;

const UserAsked = styled.div`
  font-size: 12px;
  color: val(--black-600);
`;

function QuestionsList({ data }) {
  const el = data;
  const elA = data.answers;

  const [test, setTest] = useState("");
  const htmlTxt = useRef();

  useEffect(() => {
    setTest(htmlTxt.current.textContent);
  }, []);

  return (
    <>
      <QuestionsLiContainer>
        <QuestionState>
          <div>
            <span>{el.votes}</span>
            <span>votes</span>
          </div>
          <div className={elA.length !== 0 ? "has-answer" : ""}>
            <span>{elA.length}</span>
            <span>answers</span>
          </div>
          <div>
            <span>{el.views - 1}</span>
            <span>views</span>
          </div>
        </QuestionState>
        <QuestionContent>
          <QuestionTitle>
            <Link to={`/question/${el.questionId}`}>{el.title}</Link>
          </QuestionTitle>
          <QuestionBody>
            {test}
            <p
              style={{ display: "none" }}
              dangerouslySetInnerHTML={{
                __html: el.content,
              }}
              ref={htmlTxt}
            />
          </QuestionBody>
          <QuestionFooter>
            <Tags>
              {/* {el.tags.map((el, index) => (
                <TagDiv key={index}>{el}</TagDiv>
              ))} */}
              <TagDiv>kind of beauty</TagDiv>
            </Tags>
            <UserData>
              <img width="16" alt="프로필 사진" src={Profile} />
              <UserName>{el.userName}</UserName>
              <UserAsked>{el.createdAt}</UserAsked>
            </UserData>
          </QuestionFooter>
        </QuestionContent>
      </QuestionsLiContainer>
    </>
  );
}

export default QuestionsList;
