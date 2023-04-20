import styled from "styled-components";

const Sharebutton = styled.button`
  font-size: 13px;
  padding-left: 10px;
  background-color: white;
  color: var(--black-500);
  cursor: pointer;
`;

const Editbutton = styled.button`
  font-size: 13px;
  padding-left: 10px;
  background-color: white;
  color: var(--black-500);
  cursor: pointer;
`;

const Deletebutton = styled.button`
  font-size: 13px;
  padding-left: 10px;
  background-color: white;
  color: var(--black-500);
  cursor: pointer;
`;

const Sharedomain = () => {
  return (
    <div>
      <Sharebutton>Share</Sharebutton>
      <Editbutton>Edit</Editbutton>
      <Deletebutton>Delete</Deletebutton>
    </div>
  );
};

export default Sharedomain;
