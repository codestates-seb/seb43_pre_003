import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "../style/Button";
import Sheet from "./Sheet";

const Sharedomain = ({ questionId, answerId }) => {
  const navigate = useNavigate();
  const [showSheet, setShowSheet] = useState(false);

  const handleqDeleteClick = () => {
    axios
      .delete(`${process.env.REACT_APP_API_URL}/question/${questionId}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        alert("귀하의 계정이 아니므로 삭제가 불가능합니다", error);
      });
  };

  const handleaDeleteClick = () => {
    axios
      .delete(
        `${process.env.REACT_APP_API_URL}/question/${questionId}/${answerId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then(() => {
        navigate(0);
      })
      .catch((error) => {
        alert("귀하의 계정이 아니므로 삭제가 불가능합니다", error);
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
        height="auto"
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
          onClick={() => handleaDeleteClick()}
          padding="0px 3px 0px 3px"
        >
          Delete
        </Button>
      ) : (
        <Button
          variant="share"
          size="custom"
          onClick={() => handleqDeleteClick()}
          padding="0px 3px 0px 3px"
          height="auto"
        >
          Delete
        </Button>
      )}

      {showSheet && <Sheet questionId={questionId} />}
    </div>
  );
};

export default Sharedomain;
