import { useState, useEffect } from "react";
import axios from "axios";

const questionAxios = (url) => {
  const [lists, setLists] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(url)
      .then((response) => {
        if (!response.data) {
          throw new Error("No data found");
        }
        setLists(response.data);
        setIsPending(false);
        setError(null);
      })
      .catch((error) => {
        setIsPending(false);
        setError(error.message);
      });
  }, [url]);

  return [lists, isPending, error, setLists];
};

export default questionAxios;
