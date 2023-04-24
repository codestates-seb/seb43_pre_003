import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Button from "../style/Button";
import Sheet from "./Sheet";

const Sharedomain = ({ questionId, answerId }) => {
  const navigate = useNavigate();
  const [showSheet, setShowSheet] = useState(false);

  const handleqDeleteClick = (id) => {
    axios
      .delete(`http://localhost:3001/data/${id}`)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.error("Error", error);
      });
  };

  const handleaDeleteClick = (id, answerId) => {
    axios
      .delete(`${process.env.REACT_APP_API_URL}/${answerId}`)
      .then(() => {
        navigate(`/question/${questionId}`);
      })
      .catch((error) => {
        console.error("Error", error);
      });
  };

  const handleShareClick = () => {
    setShowSheet(!showSheet);
  };

  return (
    <div>
      <Button
        variant="share"
        size="custom"
        padding="0px 3px 0px 3px"
        onClick={handleShareClick}
      >
        Share
      </Button>
      {answerId ? (
        <Link to={`/question/${questionId}/${answerId}/edit`}>
          <Button variant="share" size="custom" padding="0px 3px 0px 3px">
            Edit
          </Button>
        </Link>
      ) : (
        <Link to={`/question/${questionId}/edit`}>
          <Button variant="share" size="custom" padding="0px 3px 0px 3px">
            Edit
          </Button>
        </Link>
      )}
      {answerId ? (
        <Button
          variant="share"
          size="custom"
          onClick={() => handleaDeleteClick(questionId, answerId)}
          padding="0px 3px 0px 3px"
        >
          Delete
        </Button>
      ) : (
        <Button
          variant="share"
          size="custom"
          onClick={() => handleqDeleteClick(questionId)}
          padding="0px 3px 0px 3px"
        >
          Delete
        </Button>
      )}
      {showSheet && <Sheet />}
    </div>
  );
};

export default Sharedomain;
