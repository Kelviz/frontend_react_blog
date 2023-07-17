import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const RelatedPosts = ({ category }) => {
  const [related, setRelated] = useState([]);

  const fetchPosts = useCallback(async (page) => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/categoryPosts/${category}/?page=${page}`
      );
      setRelated(response.data.results);
    } catch (error) {
      console.error(error);
    }
  });

  useEffect(() => {
    fetchPosts();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [category, fetchPosts]);

  return (
    <>
      <div className="bg-white w-full h-auto rounded-lg p-4 text-black">
        <h1 className="mb-7 font-bold">Related Posts</h1>

        <div className="flex flex-col w-full justify-start">
          {related.slice(0, 3).map((post) => (
            <Link to={`/post/${post.id}`}>
              <div
                className="my-3 flex justify-start items-start"
                key={post.id}
              >
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-[40px] h-[40px] rounded-full"
                />
                <div className="ml-2 text-gray-700 text-[14px]">
                  <p>{post.date}</p>
                  <p>{post.title}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default RelatedPosts;
