import axios from "axios";

export const axiosCreate = (url, data) => {
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
