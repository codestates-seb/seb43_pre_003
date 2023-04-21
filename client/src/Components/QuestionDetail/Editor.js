import { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import styled from "styled-components";

const EditorContainer = styled.div`
  width: 100%;
  height: 200px;
`;

const QuillEditor = styled(ReactQuill).attrs(() => ({
  style: { height: "100%" },
}))``;

const Editor = ({ value, onChange }) => {
  const [content, setContent] = useState(value || "");

  useEffect(() => {
    setContent(value);
  }, [value]);

  const handleContentChange = (value) => {
    setContent(value);
    onChange(stripHtmlTags(value));
  };

  const stripHtmlTags = (html) => {
    const tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  };

  return (
    <div>
      <EditorContainer>
        <QuillEditor
          value={content}
          onChange={handleContentChange}
          className="quill-editor"
        />
      </EditorContainer>
    </div>
  );
};

export default Editor;
