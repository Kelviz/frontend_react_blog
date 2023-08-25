import React, { useState, useEffect } from "react";
import axios from "axios";
import { TailSpin } from "react-loader-spinner";

const API_URL = process.env.REACT_APP_API_URL;

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    axios
      .get(`${API_URL}/category/`)
      .then((response) => {
        setCategories(response.data);
        setIsLoading(false);
      })

      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <>
      <div className="bg-white p-4 w-full h-auto mt-4 text-black shadow-md rounded-lg">
        <h1 className="mb-4 font-bold">Categories</h1>

        <ul className="w-full flex flex-col justify-start items-start">
          {isLoading ? (
            <div className="loader text-black w-full text-center mt-[9rem] flex justify-center items-center">
              <TailSpin color="#007BFF" height={30} width={30} />
            </div>
          ) : (
            categories.map((category) => (
              <li key={`link-${category.id}`} className="mt-4 w-auto">
                <a href={`/categoryPosts/${category.id}`}>{category.name}</a>
              </li>
            ))
          )}
        </ul>
      </div>
    </>
  );
};

export default Category;
