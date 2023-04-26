import { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import styled from "styled-components";

const EditorContainer = styled.div`
  .ql-formats {
    padding: 4px 12px;
  }
  .ql-editor {
    width: 100%;
    height: 230px;
    > p {
      white-space: normal;
      overflow-wrap: anywhere;
    }
  }
`;

const modules = {
  toolbar: [
    ["bold", "italic"],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ font: [] }],
    ["link", "image", "video"],
    [{ list: "ordered" }, { list: "bullet" }, { align: [] }],
  ],
};

const Editor = ({ value, onChange }) => {
  const [content, setContent] = useState(value || "");

  useEffect(() => {
    setContent(value);
  }, [value]);

  const handleContentChange = () => {
    setContent(value);
    onChange(value);
  };

  return (
    <div>
      <EditorContainer>
        <ReactQuill
          theme="snow"
          value={content}
          onChange={handleContentChange}
          className="quill-editor"
          modules={modules}
        />
      </EditorContainer>
    </div>
  );
};

export default Editor;
