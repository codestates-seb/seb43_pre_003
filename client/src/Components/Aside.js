import styled from "styled-components";
import Pen from "./style/img/ic-pencil.png";
import Message from "./style/img/ic-message.png";
import SOIcon from "./style/img/ic-stackoverflow.png";

const AsideContainer = styled.div`
  margin-top: 24px;
  /* margin-right: 100px; */
`;
const YellowBox = styled.div`
  width: 298px;
  height: 401px;
  background: var(--yellow-100);
  border: 1px solid #f1e5bc;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.05), 0px 1px 4px rgba(0, 0, 0, 0.05),
    0px 2px 8px rgba(0, 0, 0, 0.05);
  border-radius: 4px;
  margin-bottom: 40px;
`;

const YellowHeader = styled.div`
  padding: 12px 15px;
  border: 1px solid var(--black-070);
`;
const Span = styled.span`
  font-size: var(--font-small);
  font-weight: 700;
`;
const YellowBody = styled.ul``;
const YellowEl = styled.li`
  padding: 6px 16px;
  width: 270px;
  display: flex;
  cursor: pointer;
`;

const YellowIcon = styled.img`
  width: 14px;
  height: 14px;
`;
const HotIcon = styled.img`
  width: 14px;
  height: 14px;
`;
const YellowP = styled.p`
  font-size: var(--font-small);
  font-weight: 400;
  width: 100%;
  margin-left: 8px;
  white-space: pre-wrap;
`;

const HotHeader = styled.div`
  height: 27px;
  margin-bottom: 20px;
`;
const HotSpan = styled.span`
  height: 27px;
  font-size: var(--font-x-large);
`;
const HotEl = styled.div`
  display: flex;
  width: 298px;
  height: 44px;
  padding: 2px 0px 8px;
  cursor: pointer;
`;
const HotP = styled.p`
  color: var(--blue-600);
  font-size: var(--font-small);
  margin-left: 8px;
  white-space: pre-wrap;
  &:hover {
    color: var(--blue-500);
  }
`;

const hotData = [
  "How can one transform a neutral lookup table texture for color blindness?",
  "M1 MacBook Air Base Model - How Much SSD Free Space exists on my 256 storage Mac?",
  "Antonym for “elitist” with a negative connotation?",
  "Is there an idiom for failed attempts to capture the meaning of art?",
  "Can I apply for ESTA with passport valid since february?",
  `What's up with banks closing down their high yield savings accounts and incentives lately?`,
  "What does Thoreau mean about the Tract Society printing the story of Putnam?",
  "String Comparison",
];

const HomeAside = () => {
  return (
    <AsideContainer>
      <YellowBox>
        <YellowHeader>
          <Span>The Overflow Blog</Span>
        </YellowHeader>
        <YellowBody>
          <YellowEl>
            <YellowIcon src={Pen} alt="" />
            <YellowP>Are meetings making you less productive?</YellowP>
          </YellowEl>
        </YellowBody>
        <YellowBody>
          <YellowEl>
            <YellowIcon src={Pen} alt="" />
            <YellowP>The philosopher who believes in Web Assembly.</YellowP>
          </YellowEl>
        </YellowBody>

        <YellowHeader>
          <Span>Featured on Meta</Span>
        </YellowHeader>
        <YellowBody>
          <YellowEl>
            <YellowIcon src={Message} alt="" />
            <YellowP>
              Improving the copy in the close modal and post notices - 2023
              edition
            </YellowP>
          </YellowEl>
        </YellowBody>
        <YellowBody>
          <YellowEl>
            <YellowIcon src={SOIcon} alt="" />
            <YellowP>The philosopher who believes in Web Assembly.</YellowP>
          </YellowEl>
          <YellowEl>
            <YellowIcon src={SOIcon} alt="" />
            <YellowP>Temporary policy: ChatGPT is banned</YellowP>
          </YellowEl>
          <YellowEl>
            <YellowIcon src={SOIcon} alt="" />
            <YellowP>The [protection] tag is being burninated</YellowP>
          </YellowEl>
        </YellowBody>

        <YellowHeader>
          <Span>Featured on Meta</Span>
        </YellowHeader>
        <YellowBody>
          <YellowEl>
            <YellowIcon src={SOIcon} alt="" />
            <YellowP>
              At what point (if ever) is a fact-based question about the
              behaviour of...
            </YellowP>
          </YellowEl>
        </YellowBody>
      </YellowBox>
      <div className="Hot">
        <HotHeader>
          <HotSpan>Hot Network Questions</HotSpan>
        </HotHeader>

        {hotData.map((item, idx) => {
          return (
            <HotEl key={idx}>
              <HotIcon src={Pen} alt="" />
              <HotP>{item}</HotP>
            </HotEl>
          );
        })}
      </div>
    </AsideContainer>
  );
};

export default HomeAside;
