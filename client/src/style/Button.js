import styled from "styled-components";

export const smallBtn = styled.button`
  padding: 8px 10px;
  width: 65px;
  height: 32px;
  cursor: pointer;
  background: var(--blue-050);
  color: var(--blue-500);

  &:hover {
    background: var(--blue-050);
    color: var(--blue-900);
  }

  &:disabled {
    background: var(--black-200);
    color: var(--white-100);
  }
`;

export const mediumBtn = styled.button`
  padding: 8px 10px;
  width: 69px;
  height: 40px;
  cursor: pointer;
  background: var(--blue-500);
  color: var(--white-100);

  &:hover {
    background: var(--blue-600);
  }

  &:disabled {
    background: var(--powder-200);
  }
`;

export default smallBtn;
