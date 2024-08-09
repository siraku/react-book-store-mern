import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BackButton from "../components/BackButton";

const ShowBook = () => {
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  useEffect(() => {
    setLoading = true;
    axios
      .get(`http://localhost:5555/books/${id}`)
      .then((resp) => {
        setBook(resp.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  });
  return (
    <div>
      <BackButton />
      <div>ShowBook</div>;
    </div>
  );
};

export default ShowBook;
