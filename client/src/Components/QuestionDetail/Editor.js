import { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import styled from "styled-components";

const EditorContainer = styled.div`
  width: 100%;
  .ql-editor {
    height: 200px;
  }
  .ql-editor > p {
    white-space: normal;
    overflow-wrap: anywhere;
  }
`;

const Editor = ({ value, onChange }) => {
  const [content, setContent] = useState(value || "");

  useEffect(() => {
    setContent(value);
  }, [value]);

  const handleContentChange = (value) => {
    setContent(value);
    onChange(value);
  };

  return (
    <div>
      <EditorContainer>
        <ReactQuill
          value={content}
          onChange={handleContentChange}
          className="quill-editor"
        />
      </EditorContainer>
    </div>
  );
};

export default Editor;
