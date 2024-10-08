import React, { useEffect, useState } from "react";
import BackButton from "../components/BackButton";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../components/Spinner";

const EditBooks = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/books/${id}`)
      .then((resp) => {
        setTitle(resp.data.title);
        setAuthor(resp.data.author);
        setPublishYear(resp.data.publishYear);
        setLoading(false);
      })
      .catch((error) => {
        alert("can not get book info");
        console.log(error);
        setLoading(false);
      });
  }, []);

  const modifyBook = () => {
    const data = {
      title,
      author,
      publishYear,
    };

    setLoading(true);
    axios
      .put(`http://localhost:5555/books/${id}`, data)
      .then((resp) => {
        setLoading(false);
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
        alert("An alert happened , pls check console log");
      });
  };
  return (
    <div>
      <BackButton />
      <h1 className="text-lg my-4">EditBook</h1>
      {loading ? <Spinner /> : ""}
      <div className="felx flex-col border-2 border-sky-400 rounded-xl p-4 w-[600px] mx-auto">
        <div className="">
          <label className="mr-4 text-gray-500">Tile</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border-2 border-gray-500 w-full"
          />
        </div>
        <div className="my-2">
          <label className="mr-4 text-gray-500">Author</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="border-2 border-gray-500 w-full"
          />
        </div>
        <div className="my-2">
          <label className="mr-4 text-gray-500">Publish Year</label>
          <input
            type="text"
            value={publishYear}
            onChange={(e) => setPublishYear(e.target.value)}
            className="border-2 border-gray-500 w-full"
          />
        </div>
        <button
          className="bg-sky-500 p-2 m-2 rounded-lg w-full"
          onClick={modifyBook}
        >
          SaveBook
        </button>
      </div>
    </div>
  );
};

export default EditBooks;
