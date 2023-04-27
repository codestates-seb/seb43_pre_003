import axios from "axios";
// import { useNavigate } from "react-router-dom";

export const axiosCreate = (url, data) => {
  // const navigate = useNavigate();
  return axios
    .post(url, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    })
    .catch(() => {
      alert("질문 등록에 성공하지 못했습니다.");
    });
};
