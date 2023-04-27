import styled from "styled-components";
import Facebook from "../style/img/vaadin_facebook.png";
import axios from "axios";
import { useState, useEffect } from "react";

const Box = styled.div`
  p {
    font-size: 10px;
    font-weight: 600;
  }
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: 3px;
  position: absolute;
  top: 32px;
  width: 280px;
  padding: 12px;
  background: rgb(255, 255, 255);
  border-radius: 5px;
  border: var(--black-100) solid 2px;

  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 2px, rgba(0, 0, 0, 0.1) 0px 3px 5px,
    rgba(0, 0, 0, 0.1) 0px 3px 8px;
`;

const Input = styled.input`
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
const Img = styled.img`
  width: 12px;
  height: 12px;
`;
const FButton = styled.button`
  width: 23px;
  height: 23px;
  border-radius: 5px;
  background-color: var(---white);
  &:hover {
    background-color: var(--blue-050);
  }
`;

const Sheet = (questionId) => {
  const [url, setUrl] = useState(null);
  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/question/currentUri/${questionId.questionId}`
      )
      .then((res) => {
        if (!res.data) {
          throw new Error("No data found");
        }
        setUrl(res.data);
      })
      .catch((error) => {
        alert("Error", error);
      });
  }, [questionId.questionId]);

  const copyLink = () => {
    if (!navigator.clipboard) {
      alert("클립보드가 지원되지 않습니다.");
      return;
    }

    navigator.clipboard
      .writeText(url)
      .then(() => {
        alert("클립보드에 복사되었습니다", url);
      })
      .catch((err) => {
        alert("클립보드 복사에 실패했습니다.", err);
      });
  };

  return (
    <div>
      <div>
        <Div />
        <Box>
          <p>Share a link to this question</p>
          <Input type="text" readOnly value={url}></Input>
          <Inner>
            <Button type="button" onClick={copyLink}>
              copy link
            </Button>

            <div>
              <FButton>
                <Img src={Facebook} alt="프로필 사진" />
              </FButton>
            </div>
          </Inner>
        </Box>
      </div>
    </div>
  );
};

export default Sheet;
