import { useState } from "react";
import styled from "styled-components";
import Close from "./img/ic-tag-close.png";
import HoverClose from "./img/ic-tag-close-hover.png";

const TagBox = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  min-height: 46px;
  /* margin: 10px; */
  /* padding: 0 10px; */
  padding: 4px 8px;
  border: 1px solid var(--black-200);
  border-radius: 2px;

  &:focus-within {
    border-color: var(--blue-500);
  }
`;

const TagItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 5px;
  padding: 5px;
  background-color: var(--powder-200);
  border-radius: 2px;
  color: var(--powder-700);
  font-size: 13px;
`;

const Text = styled.span`
  font-size: 12px;
`;

const Button = styled.button`
  width: 15px;
  height: 15px;
  background-image: url(${Close});
  background-size: cover;
  margin-left: 5px;

  &:hover {
    background-image: url(${HoverClose});
    background-size: cover;
  }
`;

const TagInput = styled.input`
  display: inline-flex;
  min-width: 150px;
  background: transparent;
  border: none;
  outline: none;
  font-size: 12px;
  cursor: text;
  ::placeholder {
    color: var(--black-200);
    font-size: 13px;
  }
`;

export const TagDiv = styled.a`
  font-size: 12px;
  color: var(--powder-700);
  background-color: var(--powder-100);
  display: inline-block;
  padding: 5px 6px;
  margin: 2px 2px 2px 0;
  line-height: 1;
  white-space: nowrap;
  text-decoration: none;
  text-align: center;
  /* border-width: 1px; */
  /* border-style: solid; */
  border-radius: 2px;
  cursor: pointer;
  :hover {
    color: var(--powder-700);
    background-color: var(--powder-200);
  }
`;

const Tag = () => {
  const [tagItem, setTagItem] = useState("");
  const [tagList, setTagList] = useState([]);

  const onKeyPress = (e) => {
    if (e.target.value.length !== 0 && e.key === "Enter") {
      submitTagItem();
    }
  };

  const submitTagItem = () => {
    let updatedTagList = [...tagList];
    updatedTagList.push(tagItem);
    setTagList(updatedTagList);
    setTagItem("");
  };

  const deleteTagItem = (e) => {
    const deleteTagItem = e.target.parentElement.firstChild.innerText;
    const filteredTagList = tagList.filter(
      (tagItem) => tagItem !== deleteTagItem
    );
    setTagList(filteredTagList);
  };

  return (
    <TagBox>
      {tagList.map((tagItem, index) => {
        return (
          <TagItem key={index}>
            <Text>{tagItem}</Text>
            <Button onClick={deleteTagItem}></Button>
          </TagItem>
        );
      })}
      <TagInput
        type="text"
        placeholder="Press enter to add tags"
        onChange={(e) => setTagItem(e.target.value)}
        value={tagItem}
        onKeyPress={onKeyPress}
      />
    </TagBox>
  );
};

export default Tag;
