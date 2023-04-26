import axios from "axios";

export const axiosCreate = (url, data) => {
  return axios
    .post(url, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    })
    .catch((err) => {
      if (err.response) {
        // 요청이 이루어졌고 서버가 응답했을 경우
        const { status, config } = err.response;

        if (status === 404) {
          alert(`${config.url} not found`);
        }
        if (status === 500) {
          alert("Server error");
        }
      } else if (err.request) {
        // 요청이 이루어졌으나 서버에서 응답이 없었을 경우
        alert("Error", err.message);
      } else {
        // 그 외 다른 에러
        alert("Error", err.message);
      }
    });
};
