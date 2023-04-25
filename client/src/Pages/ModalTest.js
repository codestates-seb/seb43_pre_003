import styled from "styled-components";
import Button from "../Components/style/Button";
import ImgDrag from "./Modal/ImgDrag";
import { useState } from "react";
import axios from "axios";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
`;

function Testing() {
  return axios
    .get(
      `${process.env.REACT_APP_API_URL}/members/profile`,
      {
        header: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      },
      { withCredentials: true }
    )
    .then((res) => {
      console.log(res.data);
      // alert(localStorage.getItem("token"));
    })
    .catch((err) => {
      console.log(err);
    });
}

function Home() {
  const [modal, setModal] = useState(false);
  const showModal = () => {
    setModal(!modal);
  };

  return (
    <>
      <Container>
        <Button
          size="custom"
          variant="mediumBlue"
          onClick={(showModal, Testing)}
        >
          ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ
        </Button>
      </Container>
      <div>{modal ? <ImgDrag showModal={showModal} /> : null}</div>
    </>
  );
}

export default Home;
