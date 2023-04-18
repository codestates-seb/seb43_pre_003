import styled from "styled-components";

const PaginationWrap = styled.div`
  margin: 1.25rem 0;
  display: flex;
  gap: 4px;
`;

const PageBtn = styled.button`
  background-color: var(--white);
`;

function Pagination() {
  return (
    <>
      <PaginationWrap>
        <PageBtn>Prev</PageBtn>
        <PageBtn>1</PageBtn>
        <PageBtn>2</PageBtn>
        <PageBtn>3</PageBtn>
        <PageBtn>4</PageBtn>
        <PageBtn>5</PageBtn>
        <PageBtn>...</PageBtn>
        <PageBtn>Next</PageBtn>
      </PaginationWrap>
    </>
  );
}

export default Pagination;
