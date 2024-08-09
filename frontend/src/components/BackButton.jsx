import React from "react";
import { BsArrowLeft } from "react-icons/bs";
import { Link } from "react-router-dom";

const BackButton = ({ destination = "/" }) => {
  return (
    <div>
      <Link to={destination}></Link>
      <BsArrowLeft className="bg-sky-500 text-white"></BsArrowLeft>
    </div>
  );
};

export default BackButton;
