import React, { useState, useEffect } from "react";
import axios from "axios";
import Pagination from "react-paginate";
import { TailSpin } from "react-loader-spinner";

import PostCard from "./PostCard";

const API_URL = process.env.REACT_APP_API_URL;

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const postsPerPage = 4;

  const fetchPosts = async () => {
    try {
      const response = await axios.get(`${API_URL}/posts`);
      setPosts(response.data);
      console.log("posts:", posts);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPosts(currentPage);
  }, [currentPage]);

  const indexOfLastPost = (currentPage + 1) * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const displayedPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  const pageCounts = Math.ceil(posts.length / postsPerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {isLoading ? (
        <div className="loader text-black w-full text-center mt-[9rem] flex justify-center items-center">
          <TailSpin color="#007BFF" height={30} width={30} />
        </div>
      ) : displayedPosts.length === 0 ? (
        <div className="loader text-black w-full text-center mt-[9rem] flex justify-center items-center">
          <p>No posts available.</p>
        </div>
      ) : (
        displayedPosts.map((post) => (
          <div
            key={post.id}
            className="bg-white w-full h-auto mb-3 flex flex-col p-4 shadow-md rounded-lg items-center"
          >
            <PostCard post={post} />
          </div>
        ))
      )}

      {pageCounts > 1 && (
        <Pagination
          pageCount={pageCounts}
          onPageChange={handlePageClick}
          containerClassName="pagination"
          activeClassName="active"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakClassName="page-item disabled"
          breakLinkClassName="page-link"
          previousLabel="&#8592;"
          nextLabel="&#8594;"
          breakLabel={"..."}
        />
      )}
    </>
  );
};

export default Posts;
