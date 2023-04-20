import styled from "styled-components";
import RecommendButton from "./RecommendButton";
import Sharedomain from "./Sharedomain";
import AuthorProfile from "./Authorprofile";

const Main = styled.main`
  display: flex;
  margin: 15px;
  padding-bottom: 18px;
  border-bottom: 1px solid rgb(227, 230, 232);
`;

const Aside1 = styled.aside`
  flex: display;
`;

const Section2 = styled.section`
  flex-grow: 1;
  p {
    margin-left: 12px;
    font-size: 15px;
    font-weight: 500;
    line-height: 22.5px;
  }
`;

const Section3 = styled.section`
  position: relative;
  display: flex;
  justify-content: space-between;
  margin: 25px 0px;
  width: 100%;
`;

const Answer = () => {
  return (
    <Main>
      <Aside1>
        <RecommendButton />
      </Aside1>

      <Section2>
        <div>
          <div>
            <p>Answer입니다.</p>
          </div>
        </div>
        <Section3>
          <Sharedomain />
          <AuthorProfile />
        </Section3>
      </Section2>
    </Main>
  );
};

export default Answer;
