import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "../style/Button";
import Sheet from "./Sheet";

const Sharedomain = ({ questionId, answerId, auth }) => {
  const navigate = useNavigate();
  const [showSheet, setShowSheet] = useState(false);

  const handleqDeleteClick = (id) => {
    axios
      .delete(`${process.env.REACT_APP_API_URL}/question/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then(() => {
        navigate("/");
        //window.location.href = `http://localhost:3000`;
      })
      .catch((error) => {
        console.error("Error", error);
      });
  };

  const handleaDeleteClick = (id, answerId) => {
    axios
      .delete(`${process.env.REACT_APP_API_URL}/question/${id}/${answerId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then(() => {
        //navigate(`/question/${questionId}`);
        window.location.href = `http://localhost:3000/question/${questionId}`;
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
      {
        <Button
          variant="share"
          size="custom"
          padding="0px 3px 0px 3px"
          onClick={handleShareClick}
        >
          Share
        </Button>
      }
      {auth && answerId ? (
        <Link to={`/question/${questionId}/${answerId}/edit`}>
          <Button variant="share" size="custom" padding="0px 3px 0px 3px">
            Edit
          </Button>
        </Link>
      ) : (
        auth && (
          <Link to={`/question/${questionId}/edit`}>
            <Button variant="share" size="custom" padding="0px 3px 0px 3px">
              Edit
            </Button>
          </Link>
        )
      )}
      {auth && answerId ? (
        <Button
          variant="share"
          size="custom"
          onClick={() => handleaDeleteClick(questionId, answerId)}
          padding="0px 3px 0px 3px"
        >
          Delete
        </Button>
      ) : (
        auth && (
          <Button
            variant="share"
            size="custom"
            onClick={() => handleqDeleteClick(questionId)}
            padding="0px 3px 0px 3px"
          >
            Delete
          </Button>
        )
      )}
      {showSheet && <Sheet />}
    </div>
  );
};

export default Sharedomain;
