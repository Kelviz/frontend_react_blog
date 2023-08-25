import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Pagination from "react-paginate";
import { TailSpin } from "react-loader-spinner";

import PostCard from "../posts/PostCard";
import RecentPost from "../recentPost/RecentPost";
import Category from "./Category";

const API_URL = process.env.REACT_APP_API_URL;

const CategoryPosts = () => {
  const { categoryId } = useParams();
  const [catPosts, setCatPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setCurrentPage(0);
  }, [categoryId]);

  const fetchPosts = async (categoryId) => {
    const response = await axios.get(`${API_URL}/categoryPosts/${categoryId}/`);
    setCatPosts(response.data);
    setIsLoading(false);
  };

  useEffect(() => {
    setIsLoading(true);
    fetchPosts(categoryId);
  }, [categoryId]);

  const postsPerPage = 4;
  console.log(catPosts);
  const indexOfLastPost = (currentPage + 1) * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const displayedPosts = catPosts.slice(indexOfFirstPost, indexOfLastPost);
  const pageCounts = Math.ceil(catPosts.length / postsPerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <div className="w-full mt-4 mb-6 flex flex-col margin-sm px-[1rem] md:px-[3rem] lg:flex-row lg:justify-between lg:items-start justify-center items-center">
        <div className="lg:w-[64%] sm:w-[97%] md:w-[90%] container-sm  mt-4">
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
                className="bg-white w-full h-[690px] mb-3 flex flex-col p-4 shadow-md rounded-lg items-center"
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
              forcePage={currentPage}
            />
          )}
        </div>

        <div className="lg:w-[30%] sm:w-[97%] md:w-[90%] container-sm mt-4 sidebar sticky top-1">
          <RecentPost />
          <Category />
        </div>
      </div>
    </>
  );
};

export default CategoryPosts;
