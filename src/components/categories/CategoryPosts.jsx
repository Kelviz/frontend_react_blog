import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Pagination from "react-paginate";

import PostCard from "../posts/PostCard";
import RecentPost from "../recentPost/RecentPost";
import Category from "./Category";

const API_URL = process.env.REACT_APP_API_URL;

const CategoryPosts = () => {
  const { categoryId } = useParams();
  const [catPosts, setCatPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const postsPerPage = 4;

  const fetchPosts = useCallback(
    async (page) => {
      try {
        const response = await axios.get(
          `${API_URL}/categoryPosts/${categoryId}/?page=${page}`
        );
        setCatPosts(response.data.results);

        const totalCount = response.data.count;
        const totalPagesCount = Math.ceil(totalCount / postsPerPage);
        setTotalPages(totalPagesCount);
        console.log(totalPages);
      } catch (error) {
        console.error(error);
      }
    },
    [categoryId, postsPerPage, totalPages]
  );

  useEffect(() => {
    fetchPosts(currentPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [categoryId, currentPage, fetchPosts]);

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected + 1);
  };

  return (
    <>
      <div className="w-full mt-4 flex justify-between items-start">
        <div className="lg:w-[64%] sm:w-[94%]  md:w-[74%]  mt-4 posts">
          {catPosts.map((post) => (
            <div
              key={post.id}
              className="bg-white w-full h-[690px] mb-3 flex flex-col p-4 shadow-md rounded-lg items-center"
            >
              <PostCard post={post} />
            </div>
          ))}

          <Pagination
            pageCount={totalPages}
            onPageChange={handlePageChange}
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
        </div>
        <div className="w-[30%] mt-4 sidebar sticky top-1">
          <RecentPost />
          <Category />
        </div>
      </div>
    </>
  );
};

export default CategoryPosts;
