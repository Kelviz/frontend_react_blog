import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const Category = () => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    axios
      .get(`${API_URL}/category/`)
      .then((response) => {
        setCategories(response.data);
      })

      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <>
      <div className="bg-white p-4 w-full h-auto mt-4 text-black rounded-lg">
        <h1 className="mb-4 font-bold">Categories</h1>

        <ul className="w-full flex flex-col justify-start items-start">
          {categories.map((category) => (
            <li key={`link-${category.id}`} className="mt-4 w-auto">
              <a href={`/categoryPosts/${category.id}`}>{category.name}</a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Category;
