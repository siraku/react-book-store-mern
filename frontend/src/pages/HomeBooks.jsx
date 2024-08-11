import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import { MdOutlineAddBox } from "react-icons/md";
import BookTable from "../components/home/BookTable";
import BookCard from "../components/home/BookCard";

const HomeBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState("table");
  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5555/books")
      .then((resp) => {
        console.log("get books...");
        console.log(resp.data.data);
        setBooks(resp.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);
  return (
    <div>
      <div className="flex justify-center items-center gap-x-6 m-4">
        <button
          className="bg-sky-300 hover:bg-yellow-600 px-4 py-1 rounded-md"
          onClick={() => setShowType("table")}
        >
          table
        </button>
        <button
          className="bg-sky-300 hover:bg-yellow-600 px-4 py-1 rounded-md"
          onClick={() => setShowType("card")}
        >
          card
        </button>
      </div>
      <div className="flex justify-around items-center">
        <h1 className="text-3xl my-9"> Books List</h1>
        <Link to="/books/create">
          <MdOutlineAddBox className="text-sky-500 text-4xl" />
        </Link>
      </div>
      {loading ? (
        <Spinner />
      ) : showType === "table" ? (
        <BookTable books={books} />
      ) : (
        <BookCard books={books} />
      )}
    </div>
  );
};

export default HomeBooks;
