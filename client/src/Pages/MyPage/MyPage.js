import styled from "styled-components";
import { useState } from "react";
import ProfileImg from "../../Components/style/img/img-profile.svg";
import { ReactComponent as WelcomeImg } from "../../Components/style/img/ic-celebration.svg";
import { ReactComponent as Edit } from "../../Components/style/img/ic-pencil.svg";
import Button from "../../Components/style/Button";
import Profile from "./PageProfile";
import Active from "./PageActive";

const MyPageWrap = styled.section`
  padding: 30px;
  width: 100%;
  padding-bottom: 64px;
`;

const ProfileWrap = styled.div`
  position: relative;
  margin-bottom: 24px;
`;

const ProfileContent = styled.div`
  display: flex;
  align-items: center;
  > img {
    border-radius: 4px;
  }
`;

const ProfileTxt = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 16px;
  > div:first-child {
    font-size: 32px;
    color: var(--black-900);
    font-weight: 600;
    margin: 4px 4px 12px;
  }
  > div:last-child {
    display: flex;
    gap: 4px;
    margin: 4px;
    color: var(--black-500);
    > svg {
      fill: var(--black-500);
      width: 16px;
      height: 16px;
    }
  }
`;

const ProfileBtn = styled.div`
  position: absolute;
  display: flex;
  top: 0;
  right: 0;
  > button {
    display: flex;
    gap: 4px;
    align-items: center;
  }
`;

const Tabmenu = styled.ul`
  /* background-color: #dcdcdc; */
  /* list-style: none; */
  cursor: pointer;
  color: var(--black-600);
  font-weight: bold;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 24px 0;
  gap: 8px;

  .submenu {
    display: flex;
    width: auto;
    padding: 8px 16px;
    font-size: 15px;
    transition: 0.5s;
    border-radius: 1000px;
  }

  .focused {
    background-color: var(--main-400);
    color: var(--white);
    font-weight: 600;
  }
`;

const TabContent = styled.div`
  width: 100%;
`;

function MyPage() {
  const [currentTab, setCurrentTab] = useState(0);

  const tabArr = [
    { id: 0, name: "Profile", content: <Profile /> },
    { id: 1, name: "Active", content: <Active /> },
  ];

  return (
    <>
      <MyPageWrap>
        <ProfileWrap>
          <ProfileContent>
            <img src={ProfileImg} alt="user profile"></img>
            <ProfileTxt>
              <div>User name</div>
              <div>
                <WelcomeImg />
                {/* <img src={WelcomeImg} alt="welcome icon" fill=""></img>Welcome */}
                <p>Welcome stackoverflow</p>
              </div>
            </ProfileTxt>
            <ProfileBtn>
              <Button
                size="custom"
                variant="mediumWhite"
                padding="8px 10px 8px 10px"
              >
                <Edit />
                Edit profile
              </Button>
            </ProfileBtn>
          </ProfileContent>

          <Tabmenu>
            {tabArr.map((e) => (
              <li
                role="presentation"
                key={e.id}
                className={currentTab === e.id ? "submenu focused" : "submenu"}
                onClick={() => setCurrentTab(e.id)}
                onKeyDown={() => {}}
              >
                {e.name}
              </li>
            ))}
          </Tabmenu>
          <TabContent>{tabArr[currentTab].content}</TabContent>
        </ProfileWrap>
      </MyPageWrap>
    </>
  );
}

export default MyPage;
