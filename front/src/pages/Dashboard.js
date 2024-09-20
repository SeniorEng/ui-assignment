import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Modal, Button } from "flowbite-react";

const Dashboard = () => {
  const [rootBeers, setRootBeers] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/drinks?offset=0&length=10`)
      .then((response) => setRootBeers(response.data.items))
      .catch((err) => console.error(err));
  }, []);

  const handleAddBeer = () => {
    setOpenModal(false);
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);

    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/drinks`, formData)
      .then(() => {
        alert("Root Beer added!");
        axios
          .get(`${process.env.REACT_APP_BACKEND_URL}/drinks?offset=0&length=10`)
          .then((response) => setRootBeers(response.data.items))
          .catch((err) => console.error(err));
      })
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <div className="flex justify-between mb-10">
        <p className="text-3xl font-bold">Recently Added Root Beers</p>
        <button
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          onClick={() => setOpenModal(true)}
        >
          Add Root Beer
        </button>
      </div>
      <div className="grid grid-cols-4 gap-5">
        {rootBeers.map((rootBeer) => (
          <Link to={`/drinks/${rootBeer.id}`} key={rootBeer.id}>
            <div className="border border-black rounded-md p-4 flex flex-col gap-2">
              <p className="text-xl font-medium">Name: {rootBeer.name}</p>
              <p>Rating: {rootBeer.reviewAverageRating}</p>
              <p>Description: {rootBeer.description}</p>
            </div>
          </Link>
        ))}
      </div>

      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Add Root Beer</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <div className="flex items-center">
              <p className="leading-relaxed mr-10">Name</p>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-md"
              />
            </div>
            <p className="leading-relaxed">Description</p>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full rounded-md"
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleAddBeer}>Add Root Beer</Button>
          <Button color="gray" onClick={() => setOpenModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Dashboard;
