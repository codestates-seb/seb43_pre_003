import styled from "styled-components";

import XImg from "../../Components/style/img/tabler_x.png";
import Drag from "../../Components/style/img/drag.png";
import { useState, useRef, useEffect } from "react";
import GlobalStyles from "../../GlobalStyles";

const Container = styled.div`
  width: 680px;
  height: 500px;
  z-index: 999;
  position: absolute;
  top: 10%;
  left: 30%;
  transfrom: translate(-50%, -50%);
  background-color: #ffffff;
  border-radius: 10px;
  border 1px solid var(--black-100);
  padding: 24px;
`;

const ModalContainer = styled.div`
  width: 100%;
  height: 100%;
  z-index: 900;
  position: absolute;
  top: 0%;
  left: 0%;
  transfrom: translate(-50%, -50%);
  background-color: #000000;
  padding: 30px;
  opacity: 50%;
`;

const XBtn = styled.button`
  width: 30px;
  height: 30px;
  background: #ffffff;
  color: var(--black-500);
  text-align: center;

  &: hover {
    background: var(--black-100);
  }
`;

const Ximg = styled.img`
  width: 20px;
  height: 20px;
`;

const HeaderDiv = styled.div`
  width: 100%;
  height: 260px;
  border-radius: 2px;
  border: 3px dashed var(--black-200);
`;

const Img = styled.img`
  width: ${(prop) => prop.width || "auto"};
  height: ${(prop) => prop.height || "auto"};
`;

function ImgDrag({ showModal }) {
  const [imgFile, setImgFile] = useState("");
  const imgRef = useRef();

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const saveImgFile = () => {
    const file = imgRef.current.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      console.log(reader);
      setImgFile(reader.result);
    };
  };
  const dragImgFile = (e) => {
    e.preventDefault();
    setImgFile(e.dataTransfer.files);
    const file = e.dataTransfer.files[0];
    const reader = new FileReader();

    console.log(reader.readAsDataURL(file));
    reader.onloadend = () => {
      console.log(reader);
      setImgFile(reader.result);
    };
  };

  useEffect(() => {
    console.log(imgFile);
  }, []);
  return (
    <>
      <GlobalStyles posi="fixed" />
      <ModalContainer />
      <Container>
        <HeaderDiv onDragOver={handleDragOver} onDrop={dragImgFile}>
          {!imgFile ? (
            <Img src={Drag} alt="" width="100%" height="100%" />
          ) : (
            <Img src={imgFile} alt="" />
          )}
          <input
            type="file"
            accept="image/*"
            id="profileImg"
            onChange={(e) => dragImgFile(e)}
            ref={imgRef}
            hidden
          />
        </HeaderDiv>
        <input
          type="file"
          accept="image/*"
          id="profileImg"
          onChange={((e) => setImgFile(e.target.files), saveImgFile)}
          ref={imgRef}
        />
        <div>
          <XBtn onClick={showModal}>
            <Ximg src={XImg} alt="" />
          </XBtn>
        </div>
      </Container>
    </>
  );
}

export default ImgDrag;
