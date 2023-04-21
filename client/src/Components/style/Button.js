import styled, { css } from "styled-components";

const SIZE = {
  sm: css`
    --button-width: 65px;
    --button-height: 32px;
  `,
  md: css`
    --button-width: 69px;
    --button-height: 40px;
  `,
  shareSize: css`
    --button-width: 47px;
    --button-height: 29px;
    --button-padding: 4px 4px 4px 4px;
  `,
  pageSize: css`
    --button-width: 23px;
    --button-height: 22px;
    --button-padding: 3px 8px 3px 8px;
  `,
  question: css`
    --button-width: 102px;
    --button-height: 37px;
    --button-padding: 3px 8px 3px 8px;
  `,
  custom: css`
    --button-width: ${(props) => props.width || "38px"};
    --button-height: ${(props) => props.height || "38px"};
    --button-padding: ${(props) => props.padding || "0px 0px 0px 0px"};
    --margin: ${(props) => props.margin || "0px 0px 0px 0px"};
  `,
};

const VARIANTS = {
  smallWhite: css`
    --button-color: var(--blue-500);
    --button-bg-color: var(--blue-050);
    --button-hover-bg-color: var(--blue-050);
    --button-hover-color: var(--blue-900);
    --button-disable-color: var(--black-200);
    --button-disable-bg-color: var(--white);
    --button-active-bg-color: var(--blue-050);
    --button-active-color: var(--blue-900);
  `,
  mediumBlue: css`
    --button-color: var(--white);
    --button-bg-color: var(--blue-500);
    --button-hover-bg-color: var(--blue-600);
    --button-hover-color: var(--white);
    --button-disable-color: var(--white);
    --button-disable-bg-color: var(--powder-200);
    --button-active-bg-color: var(--blue-600);
    --button-active-color: var(--white);
    box-shadow: inset 0 1px 0 0 hsla(0, 0%, 100%, 0.4);
  `,
  smallBlue: css`
    --button-color: var(--powder-700);
    --button-bg-color: var(--powder-200);
    --button-hover-bg-color: var(--powder-300);
    --button-hover-color: var(--powder-700);
    --button-disable-color: var(--powder-200);
    --button-disable-bg-color: var(--powder-100);
    --border-line: 1px solid var(--powder-700);
    --border-hover-line: 1px solid var(--powder-700);
    --border-disable-line: 1px solid var(--powder-200);
    --button-active-bg-color: var(--powder-300);
    --button-active-color: var(--powder-700);
    --border-active-line: 1px solid var(--powder-700);
  `,
  mediumWhite: css`
    --button-color: var(--black-900);
    --button-bg-color: var(--white);
    --button-hover-bg-color: var(--black-025);
    --button-hover-color: var(--black-900);
    --button-disable-color: var(--black-200);
    --button-disable-bg-color: var(--black-050);
    --border-line: 1px solid var(--black-200);
    --border-hover-line: 1px solid var(--black-200);
    --border-disable-line: 1px solid var(--black-200);
    --button-active-bg-color: var(--black-025);
    --button-active-color: var(--black-900);
    --border-active-line: 1px solid var(--black-200);
  `,
  share: css`
    --button-color: var(--black-500);
    --font-size: 14px;
    --button-hover-color: var(--black-350);
    --button-active-color: var(--black-350);
    --margin: 0px 2px 0px 0px;
  `,
  page: css`
    --button-color: var(--black-700);
    --button-bg-color: var(--white);
    --border-line: 1px solid var(--black-200);
    --font-size: 13px;
    --font-weight: 400;
    --button-hover-color: var(--black-700);
    --button-hover-bg-color: var(--black-100);
    --border-hover-line: var(1px solid --black-200);
    --button-active-color: var(--white);
    --button-active-bg-color: var(--main-400);
    --margin: 0px 2px 0px 0px;
  `,
  Discard: css`
    --button-bg-color: var(--red-400);
    --button-color: var(--white);
    --button-hover-bg-color: var(--red-700);
    --border-hover-line: var(1px solid --black-200);
    --button-active-color: var(--white);
    --button-active-bg-color: var(--main-400);
  `,
};

function Button({
  disabled,
  size,
  variant,
  children,
  onClick,
  onChange,
  width,
  height,
  padding,
  margin,
}) {
  const variantStyle = VARIANTS[variant];
  const sizeStyle = SIZE[size];

  return (
    <StyleButton
      sizeStyle={sizeStyle}
      variantStyle={variantStyle}
      disabled={disabled}
      onClick={onClick}
      onChange={onChange}
      width={width}
      height={height}
      padding={padding}
      margin={margin}
    >
      {children}
    </StyleButton>
  );
}

export const StyleButton = styled.button`
  ${(p) => p.sizeStyle}
  ${(p) => p.variantStyle}
  padding: var(--button-padding, 8px 10px 8px 10px);
  width: var(--button-width, 69px);
  height: var(--button-height, 40px);
  cursor: pointer;
  background: var(--button-bg-color, #ffffff);
  color: var(--button-color, var(--blue-500));
  font-size: var(--font-size, 13px);
  text-align: center;
  border: var(--border-line, 0px none var(--white));
  border-radius: 4px;
  font-weight: var(--font-weight, 500);
  margin: var(--margin, 0px 0px 0px 0px);

  &:hover {
    background: var(--button-hover-bg-color, #ffffff);
    color: var(--button-hover-color, #ffffff);
    border: var(--border-hover-line, 0px none #ffffff);
  }

  &:active {
    background: var(--button-active-bg-color, #ffffff);
    color: var(--button-active-color, #ffffff);
    border: var(--border-active-line, 0px none #ffffff);
  }

  &:disabled {
    cursor: default;
    color: var(--button-disable-color, #ffffff);
    background: var(--button-disable-bg-color, #ffffff);
    border: var(--border-disable-line, 0px none #ffffff);
  }
`;

export default Button;
