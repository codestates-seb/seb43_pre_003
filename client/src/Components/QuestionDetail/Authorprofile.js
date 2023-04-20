import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const Aside = styled.div`
  width: 187px;
  height: 67px;
  padding: 5px 7px;
  background-color: var(--powder-200);
  border-radius: 3px;
  span {
    color: var(--black-500);
  }

  div {
    display: flex;
    align-items: center;
    font-size: 12px;
    justify-content: space-between;
    padding-right: 60px;
    span {
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
          <img src="/Vector.png" alt="프로필 사진" />
          <span>{userName}</span>
        </div>
      </Aside>
    </Wrapper>
  );
};

export default AuthorProfile;
