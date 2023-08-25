import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { TailSpin } from "react-loader-spinner";

const API_URL = process.env.REACT_APP_API_URL;

const RecentPost = () => {
  const [RecentPosts, setRecentPosts] = useState([]);
  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${API_URL}/posts/`)
      .then((response) => {
        console.log(response.data);
        setRecentPosts(response.data);
        setisLoading(false);
      })

      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <>
      <div className="bg-white w-full h-auto rounded-lg shadow-md p-4 text-black">
        <h1 className="mb-7 font-bold">Recent Posts</h1>

        <div className="flex flex-col w-full justify-start">
          {isLoading ? (
            <div className="loader text-black w-full text-center mt-[9rem] flex justify-center items-center">
              <TailSpin color="#007BFF" height={30} width={30} />
            </div>
          ) : (
            RecentPosts.slice(0, 3).map((post) => (
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

export default RecentPost;
