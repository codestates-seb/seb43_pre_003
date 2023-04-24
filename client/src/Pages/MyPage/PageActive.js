import { Link } from "react-router-dom";
import styled from "styled-components";
import Button from "../../Components/style/Button";
import { SmallSortBtn } from "../../Components/SortBtn";
import { ReactComponent as SummaryOne } from "../../Components/style/img/img-summary-01.svg";
import { ReactComponent as SummaryTwo } from "../../Components/style/img/img-summary-02.svg";
import { ReactComponent as SummaryThree } from "../../Components/style/img/img-summary-03.svg";

const ActiveWrap = styled.div`
  display: flex;
  flex-direction: column;
`;

const Main = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  /* flex-direction: row; */
  /* flex-grow: 1; */
  gap: 32px;
`;

const ColumnOne = styled.div`
  grid-column-start: 1;
  grid-column-end: 3;
`;

const Summary = styled.div`
  display: flex;
  gap: 16px;
  > div:first-child {
    flex-grow: 1;
    flex-basis: 25%;
    /* width: 25%; */
  }
  > div:nth-child(2) {
    flex-grow: 1;
    flex-basis: 16%;
  }
  > div:last-child {
    flex-grow: 1;
    flex-basis: 8%;
  }
`;

const SummaryContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  line-height: 1.4;
  border: 1px solid var(--black-100);
  border-radius: 6px;
  text-align: center;

  padding: 24px 12px;
  gap: 8px;
  > h2 {
    font-size: 16px;
    color: var(--black-800);
    /* margin-bottom: 4px; */
    white-space: normal;
    overflow-wrap: anywhere;
  }
  > p {
    white-space: normal;
    overflow-wrap: anywhere;
    color: var(--black-500);
    margin-bottom: 12px;
  }
`;

const Items = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 24px;
`;

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  color: var(--black-900);
  font-size: 22px;
  font-weight: 500;
  margin-bottom: 8px;
`;

const Content = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
  line-height: 1.4;
  border: 1px solid var(--black-100);
  color: var(--black-500);
  border-radius: 6px;
  padding: 24px;

  > p > a:link {
    margin-left: 4px;
    color: var(--blue-500);
  }
  > p > a:hover {
    color: var(--blue-900);
  }
  > p > a:visited {
    margin-left: 4px;
    color: var(--blue-500);
  }
`;

function PageActive() {
  return (
    <>
      <ActiveWrap>
        <Title>Summary</Title>
        <Main>
          <ColumnOne>
            <Summary>
              <SummaryContent>
                <SummaryOne />
                <h2>Reputation is how the community thanks you</h2>
                <p>
                  When users upvote your helpful posts, you will earn
                  <br />
                  reputation and unlock new privileges.
                </p>
                <p>Learn more about reputation and privileges</p>
              </SummaryContent>
              <SummaryContent>
                <SummaryTwo />
                <h2>Earn badges for helpful actions</h2>
                <p>
                  Badges are bits of digital flair that you get when you
                  participate in especially helpful ways.
                </p>
                <Link to={"https://stackoverflow.com/tour"}>
                  <Button
                    size="custom"
                    variant="mediumBlue"
                    padding="8px 10px 8px 10px"
                  >
                    Take the Tour and earn your first badge
                  </Button>
                </Link>
              </SummaryContent>
              <SummaryContent>
                <SummaryThree />
                <h2>Measure your impact</h2>
                <p>
                  Your posts and helpful actions here help hundreds or thousands
                  of people searching for help.
                </p>
              </SummaryContent>
            </Summary>
          </ColumnOne>
          <Items>
            <Title>
              Answers
              <SmallSortBtn />
            </Title>
            <Content>
              <p>You have not answered any questions.</p>
            </Content>
          </Items>
          <Items>
            <Title>
              Questions
              <SmallSortBtn />
            </Title>
            <Content>
              <p>You have not asked any questions.</p>
            </Content>
          </Items>
          <Items>
            <Title>
              Tags
              <SmallSortBtn />
            </Title>
            <Content>
              <p>You have not participated in any tags.</p>
            </Content>
          </Items>
          <Items>
            <Title>
              Reputation
              <SmallSortBtn />
            </Title>
            <Content>
              <p>You have no recent reputation changes.</p>
            </Content>
          </Items>
          <ColumnOne>
            <Title>Badges</Title>
            <Content>
              <p>You have not earned any badges</p>
            </Content>
          </ColumnOne>
          <ColumnOne>
            <Title>
              Followed posts <SmallSortBtn />
            </Title>
            <Content>
              <p>You are not following any posts.</p>
            </Content>
          </ColumnOne>
          <ColumnOne>
            <Title>
              Active bounties (0) <SmallSortBtn />
            </Title>
            <Content>
              <p>You have no active bounties</p>
            </Content>
          </ColumnOne>
          <ColumnOne>
            <Title>
              Articles <SmallSortBtn />
            </Title>
            <Content>
              <p>You have not created any articles.</p>
            </Content>
          </ColumnOne>
        </Main>
      </ActiveWrap>
    </>
  );
}

export default PageActive;
