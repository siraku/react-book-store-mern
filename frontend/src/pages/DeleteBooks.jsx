import axios from "axios";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import BackButton from "../components/BackButton";
import { useSnackbar } from "notistack";

const DeleteBooks = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const deleteBook = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:5555/books/${id}`)
      .then(() => {
        setLoading(false);
        enqueueSnackbar("delete book successfully", { variant: "success" });
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
        alert("error happened at delete book, pls check the console log");
      });
  };
  return (
    <div>
      <BackButton />
      <h1 className="text-lg my-4">Delete Book</h1>
      {loading ? <Spinner /> : ""}
      <div className="flex flex-col items-center border-2 border-sky-500 rounded-xl mx-auto w-[600px] p-8">
        <h3 className="p-4 text-lg">do you want to delete this book?</h3>
        <button
          className="bg-red-500 border-sky-500 border-2 text-3xl m-8 w-[400px]"
          onClick={deleteBook}
        >
          delete it
        </button>
      </div>
    </div>
  );
};

export default DeleteBooks;
