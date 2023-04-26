import styled from "styled-components";
import Input from "../../Components/style/Input";
import Button from "../../Components/style/Button";
import Discard from "../Modal/Discard";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { ReactComponent as ProfileImg } from "../../Components/style/img/img-profile.svg";

const ProfileWrap = styled.div`
  display: flex;
`;

const Nav = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: calc(25% - 24px);
  padding: 12px;
  > div > div {
    width: auto;
    padding: 8px 16px;
    font-size: 13px;
    border-radius: 1000px;
    background-color: var(--main-400);
    color: var(--white);
    font-weight: 600;
  }
`;

const Main = styled.div`
  /* width: 75%; */
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

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  line-height: 1.4;
  padding: 32px;
  color: var(--black-500);
  border: 1px solid var(--black-100);
  border-radius: 6px;
  gap: 24px;
`;

const SubTitle = styled.p`
  font-size: 16px;
  color: var(--black-900);
  font-weight: 600;
  margin-bottom: 4px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 60%;
  > svg {
    border-radius: 4px;
    width: 164px;
    height: 164px;
  }
  > input {
    width: 50%;
  }
  > .name {
    font-size: 32px;
    color: var(--black-900);
    font-weight: 600;
    margin-top: 12px;
  }
`;

const InputArea = styled.div`
  display: flex;
  gap: 8px;
  > div {
    width: 100%;
  }
`;

const DeleteCon = styled.div`
  display: flex;
  flex-direction: column;
  > ul {
    width: 90%;
    margin-left: 30px;
    color: var(--black-900);
    > li {
      margin: 8px 0;
      font-size: 15px;
      list-style: disc;
      white-space: normal;
      overflow-wrap: anywhere;
    }
  }
  > p {
    margin: 8px 0;
    font-size: 15px;
    color: var(--black-900);
    white-space: normal;
    overflow-wrap: anywhere;
  }
  > button {
    margin-top: 24px;
  }
`;

const ErrTxt = styled.div`
  margin-top: 4px;
  color: var(--red-400);
  font-size: var(--font-small);
`;

function PageSetting({ user, setUser, setAuth }) {
  const [modal, setModal] = useState(false);
  const [name, setName] = useState(user.userName);
  const [err, setErr] = useState(false);

  const navigate = useNavigate();

  const showModal = () => {
    setModal(!modal);
  };

  const handleChange = (e) => {
    setName(e.target.value);
  };

  const handleErr = () => {
    name.length === 0 ? setErr(true) : setErr(false);
  };

  const handleEdit = () => {
    handleErr();

    const editName = {
      userName: name,
    };

    if (name.length > 0) {
      axios
        .patch(`${process.env.REACT_APP_API_URL}/members/profile`, editName, {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
        })
        .then(() => {
          setUser((prev) => {
            return { ...prev, userName: name };
          });
        })
        .catch((err) => {
          alert(("Failed to save edit:", err));
        });
    }
  };

  const handleDelete = () => {
    axios
      .delete(`${process.env.REACT_APP_API_URL}/members/profile/delete`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      })
      .then(() => {
        setAuth(false);
        setUser({});
        navigate("/");
        localStorage.removeItem("token");
      })
      .catch((err) => {
        alert(("Failed to save edit:", err));
      });
  };

  return (
    <>
      <ProfileWrap>
        <Nav>
          <Items>
            <div>profile setting</div>
          </Items>
        </Nav>
        <Main>
          <Items>
            <Title>Edit your profile</Title>
            <MainContent>
              <Content>
                <ProfileImg />
                <p className="name">{user.userName}</p>
              </Content>
              <Content>
                <SubTitle>Display name</SubTitle>
                <InputArea>
                  <div>
                    {name.length !== 0 || !err ? (
                      <Input value={name} onChange={handleChange} />
                    ) : (
                      <>
                        <Input
                          value={name}
                          onChange={handleChange}
                          errorType="error"
                        />
                        <ErrTxt>Name must be at least 0 characters.</ErrTxt>
                      </>
                    )}
                  </div>
                  <Button
                    variant="mediumBlue"
                    size="custom"
                    width="auto"
                    height="34px"
                    padding="3px 8px 3px 8px"
                    onClick={handleEdit}
                  >
                    Save name
                  </Button>
                </InputArea>
              </Content>
            </MainContent>
          </Items>
          <Items>
            <Title>Delete Profile</Title>
            <MainContent>
              <DeleteCon>
                <p>
                  Before confirming that you would like your profile deleted, we
                  &#39;d like to take a moment to explain the implications of
                  deletion&#58;
                </p>
                <ul>
                  <li>
                    Deletion is irreversible, and you will have no way to regain
                    any of your original content, should this deletion be
                    carried out and you change your mind later on.
                  </li>
                  <li>
                    Your questions and answers will remain on the site, but will
                    be disassociated and anonymized &#40;the author will be
                    listed as &#34;user21631443&#34; &#41; and will not indicate
                    your authorship even if you later return to the site.
                  </li>
                </ul>
                <p>
                  Confirming deletion will only delete your profile on Stack
                  Overflow - it will not affect any of your other profiles on
                  the Stack Exchange network. If you want to delete multiple
                  profiles, you&#39;ll need to visit each site separately and
                  request deletion of those individual profiles.
                </p>
                <Button
                  variant="Discard"
                  size="custom"
                  width="100px"
                  padding="3px 8px 3px 8px"
                  onClick={showModal}
                >
                  Delete profile
                </Button>
              </DeleteCon>
            </MainContent>
          </Items>
        </Main>
      </ProfileWrap>
      <div>
        {modal ? (
          <Discard showModal={showModal} handleDelete={handleDelete} />
        ) : null}
      </div>
    </>
  );
}

export default PageSetting;
