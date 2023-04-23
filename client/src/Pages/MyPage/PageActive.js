import styled from "styled-components";
import { ReactComponent as SummaryOne } from "../../Components/style/img/img-summary-01.svg";
import { ReactComponent as SummaryTwo } from "../../Components/style/img/img-summary-02.svg";
import { ReactComponent as SummaryThree } from "../../Components/style/img/img-summary-03.svg";

const ActiveWrap = styled.div`
  display: flex;
`;

const Main = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding: 12px;
`;

const Items = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 24px;
`;

const Title = styled.p`
  color: var(--black-900);
  font-size: 22px;
  font-weight: 500;
  margin-bottom: 8px;
`;

const SummaryContent = styled.div`
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  gap: 16px;
  > div:first-child {
    flex-grow: 3;
  }
  > div:nth-child(2) {
    flex-grow: 2;
  }
  > div:last-child {
    flex-grow: 1;
  }
`;

const Content = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
  line-height: 1.4;
  border: 1px solid var(--black-100);
  border-radius: 6px;
  padding: 12px;

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

const Summary = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px 0;
  gap: 8px;
  > h2 {
    font-size: 16px;
    color: var(--black-800);
    /* margin-bottom: 4px; */
  }
`;

function PageActive() {
  return (
    <>
      <ActiveWrap>
        <Main>
          <Items>
            <Title>Summary</Title>
            <SummaryContent>
              <Content>
                <Summary>
                  <SummaryOne />
                  <h2>Reputation is how the community thanks you</h2>
                  <p>
                    When users upvote your helpful posts, you will earn
                    reputation and unlock new privileges.
                  </p>
                </Summary>
              </Content>
              <Content>
                <Summary>
                  <SummaryTwo />
                  <h2>Earn badges for helpful actions</h2>
                  Earn badges for helpful actions
                </Summary>
              </Content>
              <Content>
                <Summary>
                  <SummaryThree />
                  <h2>Measure your impact</h2>
                  Measure your impact
                </Summary>
              </Content>
            </SummaryContent>
          </Items>
        </Main>
      </ActiveWrap>
    </>
  );
}

export default PageActive;
