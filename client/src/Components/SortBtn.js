import styled from "styled-components";

const Container = styled.div`
  display: flex;
  align-items: center;

  .click {
    color: var(--black-700);
    background-color: var(--black-070);
  }

  button {
    height: 2.1875rem;
    padding: 0.625rem;
    color: var(--black-600);
    background-color: var(--white);
    border: 1px solid var(--black-350);
    border-right: 0;
    font-size: 0.8125rem;
    cursor: pointer;
  }
  &:hover {
    background-color: var(--black-050);
  }

  & > button:first-child {
    border-radius: 0.25rem 0 0 0.25rem;
    background-color: var(--black-070);
  }
  & > button:last-child {
    border-right: 1px solid var(--black-350);
    border-radius: 0 0.25rem 0.25rem 0;
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
