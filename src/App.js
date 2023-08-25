import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";

import {
  Home,
  PostDetail,
  Navbar,
  CategoryPosts,
  Footer,
  SearchPost,
} from "./components";
import "./App.css";

function App() {
  const [search, setSearch] = useState("");

  const handleSearch = (query) => {
    setSearch(query);
  };

  return (
    <>
      <div className="app">
        <div className="app__container">
          <Navbar onSearch={handleSearch} />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/post/:postId" element={<PostDetail />} />
            <Route
              path="/categoryPosts/:categoryId"
              element={<CategoryPosts />}
            />
            <Route path="/search" element={<SearchPost search={search} />} />
          </Routes>

          <Footer />
        </div>
      </div>
    </>
  );
}

export default App;
