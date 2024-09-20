import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const AddReview = () => {
  const { id } = useParams();
  const [rating, setRating] = useState(0);
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`http://localhost:4000/api/drinks/${id}/reviews`, { rating, description: text })
      .then((response) => alert("Review added!"))
      .catch((err) => console.error(err));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="number"
        value={rating}
        onChange={(e) => setRating(e.target.value)}
        placeholder="Rating (1-5)"
        required
      />
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Review"
        required
      />
      <button type="submit">Submit Review</button>
    </form>
  );
};

export default AddReview;
