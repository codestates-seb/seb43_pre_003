import { useState, useEffect } from "react";
import axios from "axios";

const questionAxios = (url) => {
  /* useState를 이용하여 lists, isPending, error를 정의하세요. */

  const [lists, setLists] = useState(null);

  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url); // axios를 사용하여 GET 요청
        if (!response.data) {
          throw new Error("No data found");
        }
        setLists(response.data); // 데이터를 lists 상태에 저장
        setIsPending(false);
        setError(null);
      } catch (error) {
        setIsPending(false);
        setError(error.message);
      }
    };

    fetchData();
  }, [url]);

  return [lists, isPending, error, setLists];
};

export default questionAxios;
