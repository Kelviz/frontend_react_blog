import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { FaCalendar } from "react-icons/fa";
import { TailSpin } from "react-loader-spinner";

import moment from "moment";
import parse from "html-react-parser";

import Category from "../categories/Category";
import carBlack from "../../assets/carBlack.jpg";
import Author from "../author/Author";
import NextPostDetail from "./NextPostDetail";
import PrevPostDetail from "./PrevPostDetail";
import RelatedPosts from "./RelatedPosts";
import AddComment from "../comment/AddComment";

const API_URL = process.env.REACT_APP_API_URL;

const PostDetail = () => {
  const { postId } = useParams();
  const [postContent, setpostContent] = useState("");

  useEffect(() => {
    axios
      .get(`${API_URL}/posts/${postId}/`)
      .then((response) => {
        setpostContent(response.data);
      })

      .catch((error) => {
        console.error(error);
      });
  }, [postId]);

  if (!postContent) {
    return (
      <div className="mt-9">
        <TailSpin color="#007BFF" height={50} width={50} />
      </div>
    );
  }

  return (
    <>
      <div className="w-full mt-4 flex flex-col p-6  lg:flex-row lg:justify-between lg:items-start justify-center items-center">
        <div className="lg:w-[64%] sm:w-[94%] flex justify-center items-center flex-col">
          <div className="w-full mt-4  bg-white flex flex-col p-7 rounded-[10px] shadow-lg">
            <img
              src={postContent.image}
              alt={postContent.title}
              className="w-full  rounded-lg object-fit shadow-lg"
            />

            <div className="w-full flex justify-start items-center mt-8">
              <div className="flex w-auto justify-start items-center">
                <img
                  src={carBlack}
                  alt={postContent.author_username}
                  className="w-10 h-10 rounded-full"
                />
                <p className="text-black ml-2">{postContent.author_username}</p>
              </div>

              <div className="w-auto ml-4 text-pink-700 flex justify-start items-center">
                <FaCalendar />
                <p className="ml-2 text-black">
                  {moment(postContent.created).format("MMM DD, YYYY")}
                </p>
              </div>
            </div>

            <h1 className="text-[20px] lg:text-[30px] font-bold mt-8 w-full text-black ">
              {postContent.title}
            </h1>

            <div className="w-full text-black text-left mt-8">
              <p>{parse(postContent.body)}</p>
            </div>
          </div>

          <Author />

          <PrevPostDetail postId={postContent.id} />

          <NextPostDetail postId={postContent.id} />

          <AddComment postId={postId} />
        </div>

        <div className="lg:w-[30%] w-full md:p-5 sm:p-6 mt-4 sidebar sticky top-1">
          <RelatedPosts category={postContent.category} />
          <Category />
        </div>
      </div>
    </>
  );
};

export default PostDetail;
