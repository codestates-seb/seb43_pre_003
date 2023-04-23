import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Button from "../style/Button";
import Sheet from "./Sheet";

const Sharedomain = ({ questionId, answerId }) => {
  const navigate = useNavigate();

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
      .delete(`http://localhost:3001/data/${id}/${answerId}`)
      .then(() => {
        navigate(`/question/${questionId}`);
      })
      .catch((error) => {
        console.error("Error", error);
      });
  };

  return (
    <div>
      <Button variant="share" size="custom">
        Share
      </Button>
      {answerId ? (
        <Link to={`/question/${questionId}/${answerId}/edit`}>
          <Button variant="share" size="custom">
            Edit
          </Button>
        </Link>
      ) : (
        <Link to={`/question/${questionId}/edit`}>
          <Button variant="share" size="custom">
            Edit
          </Button>
        </Link>
      )}
      {answerId ? (
        <Button
          variant="share"
          size="custom"
          onClick={() => handleaDeleteClick(questionId, answerId)}
        >
          Delete
        </Button>
      ) : (
        <Button
          variant="share"
          size="custom"
          onClick={() => handleqDeleteClick(questionId)}
        >
          Delete
        </Button>
      )}
      <Sheet></Sheet>
    </div>
  );
};

export default Sharedomain;
