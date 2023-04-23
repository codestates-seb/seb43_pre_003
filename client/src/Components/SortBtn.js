import styled from "styled-components";

const Container = styled.div`
  display: flex;
  align-items: center;

  .click {
    color: var(--black-700);
    background-color: var(--black-070);
  }

  button {
    height: 36px;
    padding: 10px;
    color: var(--black-600);
    background-color: var(--white);
    border: 1px solid var(--black-350);
    border-right: 0;
    font-size: 13px;
    cursor: pointer;
  }
  &:hover {
    background-color: var(--black-050);
  }

  & > button:first-child {
    border-radius: 4px 0 0 4px;
    background-color: var(--black-070);
  }
  & > button:last-child {
    border-right: 1px solid var(--black-350);
    border-radius: 0 4px 4px 0;
  }
`;

function SortBtn() {
  return (
    <>
      <Container>
        <button>Newest</button>
        <button>Active</button>
        <button>Unanswered</button>
      </Container>
    </>
  );
}

export default SortBtn;
