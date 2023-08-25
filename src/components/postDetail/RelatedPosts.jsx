import React, { useState, useEffect, useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { TailSpin } from "react-loader-spinner";

const API_URL = process.env.REACT_APP_API_URL;

const RelatedPosts = ({ category }) => {
  const [related, setRelated] = useState([]);
  const { categoryId } = useParams();
  const [isLoading, setIsLoading] = useState(true);

  const fetchPosts = useCallback(async () => {
    try {
      const response = await axios.get(
        `${API_URL}/categoryPosts/${category.id}`
      );
      setRelated(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  }, [category, categoryId]);

  useEffect(() => {
    fetchPosts();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [category, fetchPosts]);

  return (
    <>
      <div className="bg-white w-full h-auto rounded-lg p-4 text-black">
        <h1 className="mb-7 font-bold">Related Posts</h1>

        <div className="flex flex-col w-full justify-start">
          {isLoading ? (
            <div className="loader text-black w-full text-center mt-[9rem] flex justify-center items-center">
              <TailSpin color="#007BFF" height={30} width={30} />
            </div>
          ) : (
            related.slice(0, 3).map((post) => (
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
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default RelatedPosts;
