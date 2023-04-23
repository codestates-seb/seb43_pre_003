import styled from "styled-components";
import PaginationCustom from "react-js-pagination";

const PaginationWrap = styled.div`
  padding: 24px;
  margin-bottom: 24px;
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
    border-radius: 4px;
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

function Pagination({ currentPage, count, setPage }) {
  return (
    <>
      <PaginationWrap>
        <PaginationCustom
          activePage={currentPage} // 현재페이지
          itemsCountPerPage={10} //한 페이지 당 보여줄 아이템 수
          totalItemsCount={count} //총 아이템 수
          onChange={setPage} // 페이지 바뀔 때 핸들링 함수
          pageRangeDisplayed={5} // paginator에서 보여줄 페이지 범위
          prevPageText="Prev" // 이전 페이지 가기 나타내는 텍스트
          nextPageText="Next" // 다음 페이지 가기 나타내는 텍스트
        />
      </PaginationWrap>
    </>
  );
}

export default Pagination;
