import styled from "styled-components";
import PaginationCustom from "react-js-pagination";
// import Button from "../Components/style/Button";

const PaginationWrap = styled.div`
  padding: 1.5rem;
  ul {
    display: flex;
    gap: 5px;
    color: var(--black-700);

    & > li:first-child {
      display: none;
    }

    & > li:nth-child(2) {
      width: 50px;
    }

    & > li:nth-last-child(2) {
      width: 50px;
    }

    & > li:last-child {
      display: none;
    }

    & > li.active {
      border-color: var(--main-400);
      background-color: var(--main-400);
      > a {
        color: var(--white);
      }
    }
  }

  li {
    width: 30px;
    height: 30px;
    padding-top: 3px;
    border: 1px solid var(--black-100);
    border-radius: 0.25rem;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 13px;
    font-weight: 500;
    cursor: pointer;

    &:hover {
      background-color: var(--black-070);
    }
    > a {
      color: var(--black-700);
    }
  }
`;

// const PageBtn = styled.button`
//   background-color: var(--white);
// `;

function Pagination({
  activePage,
  itemsCountPerPage,
  totalItemsCount,
  onChange,
  pageRangeDisplayed = 5,
}) {
  return (
    <>
      <PaginationWrap>
        <PaginationCustom
          activePage={activePage}
          itemsCountPerPage={itemsCountPerPage}
          totalItemsCount={totalItemsCount}
          onChange={onChange}
          pageRangeDisplayed={pageRangeDisplayed}
          prevPageText="Prev"
          nextPageText="Next"
        />
        {/* <Button variant="page" size="pageSize">
          Prev
        </Button>
        <Button variant="page" size="pageSize">
          1
        </Button>
        <Button variant="page" size="pageSize">
          2
        </Button>
        <Button variant="page" size="pageSize">
          3
        </Button>
        <Button variant="page" size="pageSize">
          4
        </Button>
        <Button variant="page" size="pageSize">
          5
        </Button>
        <Button variant="page" size="pageSize">
          ...
        </Button>
        <Button variant="page" size="pageSize">
          Nest
        </Button> */}
      </PaginationWrap>
    </>
  );
}

export default Pagination;
