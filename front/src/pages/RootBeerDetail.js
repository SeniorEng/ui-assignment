import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Modal, Button } from "flowbite-react";

const RootBeerDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [rootBeer, setRootBeer] = useState(null);
  const [rootBeerReviews, setRootBeerReviews] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [name, setName] = useState("");
  const [rating, setRating] = useState(0);
  const [text, setText] = useState("");

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/drinks/${id}`)
      .then((response) => setRootBeer(response.data))
      .catch((err) => console.error(err));

    axios
      .get(
        `${process.env.REACT_APP_BACKEND_URL}/drinks/${id}/reviews?offset=0&length=10`
      )
      .then((response) => setRootBeerReviews(response.data.items))
      .catch((err) => console.error(err));
  }, [id]);

  const handleAddReview = () => {
    setOpenModal(false);
    const formData = new FormData();
    formData.append("user_name", name);
    formData.append("description", text);
    formData.append("rating", rating);

    axios
      .post(
        `${process.env.REACT_APP_BACKEND_URL}/drinks/${id}/reviews`,
        formData
      )
      .then(() => {
        alert("Root Review added!");
        axios
          .get(
            `${process.env.REACT_APP_BACKEND_URL}/drinks/${id}/reviews?offset=0&length=10`
          )
          .then((response) => setRootBeerReviews(response.data.items))
          .catch((err) => console.error(err));

        setName("");
        setText("");
        setRating(0);
      })
      .catch((err) => console.error(err));
  };

  if (!rootBeer) return <p>Loading...</p>;

  return (
    <div>
      <div className="flex justify-between mb-10">
        <p className="text-3xl font-bold">{rootBeer.name}</p>
        <div className="flex gap-2">
          <Button color="gray" onClick={() => navigate("/")}>
            Go to Dashboard
          </Button>
          <button
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            onClick={() => setOpenModal(true)}
          >
            Add Review
          </button>
        </div>
      </div>
      <p>Description: {rootBeer.description}</p>
      <p>Rating: {rootBeer.reviewAverageRating}</p>
      <div className="mt-10">
        <h3 className="text-xl font-medium mb-2">Reviews</h3>
        <div className="grid grid-cols-4 gap-5">
          {rootBeerReviews.map((review) => (
            <div
              key={`review_${review.id}`}
              className="border border-black rounded-md p-4"
            >
              <p className="font-medium">From: {review.user_name}</p>
              <p className="text-gray-500 my-2">{review.description}</p>
              <p className="font-medium">Rating: {review.rating}</p>
            </div>
          ))}
        </div>
      </div>

      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Add Review</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <div className="flex items-center">
              <p className="leading-relaxed mr-10 w-fit">UserName</p>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-md"
              />
            </div>
            <p className="leading-relaxed">Description</p>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full rounded-md"
            />
            <div className="flex items-center">
              <p className="leading-relaxed mr-10">Rating</p>
              <input
                type="text"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                className="w-full rounded-md"
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleAddReview}>Add Root Beer</Button>
          <Button color="gray" onClick={() => setOpenModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default RootBeerDetail;
