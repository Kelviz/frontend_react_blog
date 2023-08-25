import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { FaCalendar } from "react-icons/fa";
import { TailSpin } from "react-loader-spinner";
import "./FeaturePost.css";

const API_URL = process.env.REACT_APP_API_URL;

const FeaturePost = () => {
  const [featuredPosts, setFeaturedPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/featured/`)
      .then((response) => response.json())
      .then((data) => {
        setFeaturedPosts(data);
        setIsLoading(false);
      })

      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <>
      <div className="w-full flex-col justify-center items-center">
        {isLoading ? (
          <div className="loader text-black w-full text-center mt-[9rem] flex justify-center items-center">
            <TailSpin color="#007BFF" height={30} width={30} />
          </div>
        ) : featuredPosts.length === 0 ? (
          <div className="loader text-black w-full text-center mt-[9rem] flex justify-center items-center">
            <p>No posts available.</p>
          </div>
        ) : (
          <div className="w-full flex justify-start items-center feature-container">
            {featuredPosts.map((post) => (
              <div className="flex  justify-start items-start disa">
                <Link
                  to={`/post/${post.id}`}
                  className="w-full relative flex-col justify-center items-center"
                >
                  <img src={post.image} alt={post.title} className="w-full" />
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b opacity-50 from-gray-500 via-gray-700 to-black" />
                  <div className=" w-full h-full font-bold absolute top-0 flex-col justify-center text-center items-center">
                    <div className="w-full h-full flex flex-col justify-center px-6 feature-post_text items-center">
                      <div className="w-full flex  justify-start items-start ">
                        <p className="mb-6  w-auto text-left border-2 py-2 px-4 border-pink-600 rounded-full">
                          {post.category.name}
                        </p>
                      </div>

                      <h1 className="w-full truncated-title h-[70px] text-[20px] text-left hover:text-pink-700 ">
                        {post.title}
                      </h1>
                      <p className="w-full my-6 truncated-text text-[14px] text-left">
                        {post.excerpt}
                      </p>

                      <div className="flex w-full justify-start items center hover:text-pink-700 ">
                        <FaCalendar />
                        <p className="text-left ml-2">
                          {moment(post.created).format("MMM DD, YYYY")}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default FeaturePost;
