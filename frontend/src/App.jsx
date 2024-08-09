import React from "react";
import { Routes, Route } from "react-router-dom";
import CreateBooks from "./pages/CreateBooks";
import DeleteBooks from "./pages/DeleteBooks";
import DisplayBooks from "./pages/DisplayBooks";
import EditBooks from "./pages/EditBooks";
import HomeBooks from "./pages/HomeBooks";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomeBooks />} />
      <Route path="/books/create" element={<CreateBooks />} />
      <Route path="/books/delete/:id" element={<DeleteBooks />} />
      <Route path="/books/edit/:id" element={<EditBooks />} />
      <Route path="/books/details/:id" element={<DisplayBooks />} />
    </Routes>
  );
};

export default App;
