import styled, { css } from "styled-components";
import ErrIcon from "./img/ic-error.png";
const VARIANTS = {
  default: css`
    --border: var(--black-200);
    --border-hover: var(--blue-500);
    --box-shadow: var(--blue-200);
    --img: none;
  `,
  error: css`
    --border: var(--red-400);
    --border-hover: var(--red-400);
    --box-shadow: #f3ced0;
  `,
};

const TextInput = styled.input`
  ${(p) => p.errorStyle}
  padding: var(--padding, 8px 16px 8px 10px);
  width: 242px;
  border-radius: 2px;
  flex-grow: 10;
  background-image: var(--img, url(${ErrIcon}));
  background-position: 215px center;
  background-repeat: no-repeat;
  border: 1px solid var(--border, var(--black-200));

  &:active,
  &:focus {
    box-shadow: 0px 0px 10px 5px var(--box-shadow, var(--black-200));
    outline: none;
    border: 1px solid var(--border-hover, var(--blue-500));
  }
`;

function Input({ type, placeholder, onChange, errorType }) {
  const errorStyle = VARIANTS[errorType];

  return (
    <TextInput
      type={type}
      placeholder={placeholder}
      onChange={onChange}
      errorStyle={errorStyle}
    ></TextInput>
  );
}

export default Input;
