import styled from "styled-components";

const Box = styled.div`
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: 3px;
  position: absolute;
  top: 32px;
  width: 280px;
  padding: 12px;
  background: rgb(255, 255, 255);
  border-radius: 7px;
  border: var(--black-100) solid 2px;

  box-shadow: rgba(0, 0, 0, 0.06) 0px 1px 3px, rgba(0, 0, 0, 0.06) 0px 2px 6px,
    rgba(0, 0, 0, 0.09) 0px 3px 8px;
  .p {
    margin-left: 2px;
    font-size: 10px;
    font-weight: 600;
  }
`;

const Input = styled.div`
  padding: 8px;
  border: 1px solid var(--black-200);
  border-radius: 3px;
  font-size: 10px;
`;

const Inner = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Button = styled.button`
  padding: 0px;
  border: none;
  color: rgb(0, 116, 204);
  background-color: inherit;
  font-size: 11px;
  text-align: left;
`;

const Div = styled.div`
  position: relative;
  z-index: 2;
  &::before {
    content: "";
    position: absolute;
    border-style: solid;
    border-width: 0px 10px 10px;
    border-color: var(--black-100) transparent;
    display: block;
    top: -13px;
    left: 10px;
  }
  &::after {
    content: "";
    position: absolute;
    border-style: solid;
    border-width: 0px 10px 10px;
    border-color: var(--white) transparent;
    display: block;
    top: -11px;
    left: 10px;
  }
`;
const Contain = styled.div``;

const Sheet = () => {
  return (
    <Contain>
      <Div />
      <Box>
        <p>Share a link to this question</p>
        <Input type="text" readOnly value="https//:stackoverflow.com"></Input>
        <Inner>
          <Button type="button">copy link</Button>
          <div>
            <src></src>
            <src></src>
          </div>
        </Inner>
      </Box>
    </Contain>
  );
};

export default Sheet;
