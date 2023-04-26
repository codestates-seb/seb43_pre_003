import styled from "styled-components";
import { ReactComponent as ProfileImg } from "../style/img/img-profile.svg";

const Wrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const Aside = styled.div`
  display: flex;
  flex-direction: column;
  width: 200px;
  padding: 8px 10px;
  background-color: var(--powder-200);
  border-radius: 3px;
  span {
    font-size: 12px;
    color: var(--black-500);
  }

  div {
    display: flex;
    align-items: center;
    font-size: 12px;
    margin-top: 4px;
    svg {
      width: 32px;
      height: 32px;
      border-radius: 2px;
    }
    span {
      white-space: normal;
      overflow-wrap: anywhere;
      margin-left: 8px;
      font-size: 15px;
      color: var(--blue-600);
    }
  }
`;

const AuthorProfile = ({ createdAt, userName }) => {
  const formattedDate = new Date(createdAt).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
  });
  return (
    <Wrapper>
      <Aside>
        <span>asked {formattedDate}</span>
        <div>
          <ProfileImg />
          <span>{userName}</span>
        </div>
      </Aside>
    </Wrapper>
  );
};

export default AuthorProfile;
