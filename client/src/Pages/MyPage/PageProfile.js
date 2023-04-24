import styled from "styled-components";
import { ReactComponent as PostsImg } from "../../Components/style/img/img-posts.svg";

const ProfileWrap = styled.div`
  display: flex;
`;

const Nav = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: calc(25% - 24px);
  padding: 12px;
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

const Content = styled.div`
  display: flex;
  flex-wrap: wrap;
  border: 1px solid var(--black-100);
  border-radius: 6px;
  padding: 12px;
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  line-height: 1.4;
  padding: 32px;
  background-color: var(--black-025);
  color: var(--black-500);
  border: 1px solid var(--black-100);
  border-radius: 6px;
  > svg {
    margin-bottom: 24px;
  }
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

const StatContent = styled.div`
  flex-basis: calc(50% - 16px);
  margin: 8px;
  > div:first-child {
    font-size: 16px;
    font-weight: 600;
    color: var(--black-900);
  }
  > div:last-child {
    color: var(--black-500);
  }
`;

function PageProfile() {
  return (
    <>
      <ProfileWrap>
        <Nav>
          <Items>
            <Title>Stats</Title>
            <Content>
              <StatContent>
                <div>0</div>
                <div>reputation</div>
              </StatContent>
              <StatContent>
                <div>0</div>
                <div>reached</div>
              </StatContent>
              <StatContent>
                <div>0</div>
                <div>answers</div>
              </StatContent>
              <StatContent>
                <div>0</div>
                <div>questions</div>
              </StatContent>
            </Content>
          </Items>
        </Nav>
        <Main>
          <Items>
            <Title>About</Title>
            <MainContent>
              Your about me section is currently blank.
              <br />
              Would you like to add one?
            </MainContent>
          </Items>
          <Items>
            <Title>Badges</Title>
            <MainContent>
              <p>
                You have not earned any
                <a href="https://stackoverflow.com/help/badges" target="blank">
                  badges
                </a>
              </p>
            </MainContent>
          </Items>
          <Items>
            <Title>Posts</Title>
            <MainContent>
              <PostsImg />
              <p>
                Just getting started? Try answering a question!
                <br />
                <br />
                Your most helpful questions, answers and tags will appear here.
                <br />
                Start byanswering a question or selecting tags that match topics
                you’re interested in.
              </p>
            </MainContent>
          </Items>
        </Main>
      </ProfileWrap>
    </>
  );
}

export default PageProfile;
