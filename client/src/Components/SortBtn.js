import styled from "styled-components";

const Container = styled.div`
  display: flex;
  align-items: center;

  .click {
    color: var(--black-700);
    background-color: var(--black-070);
  }

  button {
    color: var(--black-600);
    background-color: var(--white);
    border: 1px solid var(--black-350);
    border-right: 0;
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

const Btn = styled.button`
  height: 36px;
  padding: 10px;
  font-size: 13px;
`;

const SmallBtn = styled.button`
  height: auto;
  padding: 6px;
  font-size: 11px;
`;

export function SortBtn() {
  return (
    <>
      <Container>
        <Btn>Newest</Btn>
        <Btn>Active</Btn>
        <Btn>Unanswered</Btn>
      </Container>
    </>
  );
}

export function SmallSortBtn() {
  return (
    <>
      <Container>
        <SmallBtn>Sort</SmallBtn>
        <SmallBtn>Active</SmallBtn>
        <SmallBtn>Newest</SmallBtn>
      </Container>
    </>
  );
}
