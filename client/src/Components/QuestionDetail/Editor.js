import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import styled from "styled-components";

const EditorContainer = styled.div`
  height: 200px;
  width: 100%;
  font-size: 13px;
`;

const QuillEditor = styled(ReactQuill).attrs(() => ({
  style: { height: "80%" },
}))``;

const Editor = () => {
  const [content, setContent] = useState("");

  const handleContentChange = (value) => {
    setContent(value);
  };

  return (
    <>
      <EditorContainer>
        <QuillEditor value={content} onChange={handleContentChange} />
      </EditorContainer>
    </>
  );
};

export default Editor;
