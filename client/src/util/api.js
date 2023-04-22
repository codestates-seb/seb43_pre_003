// import axios from "axios";

const BASE_URL = "http://localhost:3000/";
// const BLOG_URL = "http://localhost:3000/question/";

export const axiosCreate = (url, data) => {
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(data),
  })
    .then(() => {
      window.location.href = BASE_URL;
      data.sort((a, b) => b.question.questionId - a.question.questionId);
      console.log(data);
    })
    .catch((error) => {
      console.error("Error", error);
    });

  // axios
  //   .post(url, {
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     data: data,
  //   })
  //   .then(() => {
  //     window.location.href = BASE_URL;
  //   })
  //   .catch((err) => {
  //     if (err.response) {
  //       // 요청이 이루어졌고 서버가 응답했을 경우

  //       const { status, config } = err.response;

  //       if (status === 404) {
  //         console.log(`${config.url} not found`);
  //       }
  //       if (status === 500) {
  //         console.log("Server error");
  //       }
  //     } else if (err.request) {
  //       // 요청이 이루어졌으나 서버에서 응답이 없었을 경우
  //       console.log("Error", err.message);
  //     } else {
  //       // 그 외 다른 에러
  //       console.log("Error", err.message);
  //     }
  //   });
};
