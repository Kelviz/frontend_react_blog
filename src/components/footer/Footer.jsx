import React from "react";
import { BsTwitter, BsInstagram } from "react-icons/bs";
import { FaFacebookF } from "react-icons/fa";

const Footer = () => {
  return (
    <>
      <div className="footer w-full p-9 h-auto flex flex-col justify-center items-center">
        <div className="w-full flex justify-between flex-wrap items-start">
          <div className="flex-none w-1/4 md:w-2/5 sm:w-9/10 min-w-[200px] mt-6">
            <h2>About Us</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
              eiusmod tempor incididunt ut labore dolore magna aliqua.
            </p>
          </div>
          <div className="flex-none w-1/3 min-w-[200px] mt-6">
            <h2>Newsletter</h2>
            <p>Stay updated with our latest trends</p>
            <form className="w-full mt-6 flex">
              <input
                placeholder="Enter Email"
                className="w-[80%] py-2 px-2 outline-none text-black"
              />
              <button className="bg-pink-700  w-[40px]">
                {" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-white w-full"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </button>
            </form>
          </div>

          <div className="flex-none w-1/5 min-w-[150px] mt-6">
            <h2>Follow Us</h2>
            <p>Let us be socia</p>
            <div className="flex w-full justify-start mt-4 items-center">
              <BsTwitter className="" />
              <FaFacebookF className="ml-9" />
              <BsInstagram className="ml-9" />
            </div>
          </div>
        </div>

        <div className="w-full mt-[80px] flex justify-center items-center">
          <p>
            Copyright ©2023 All rights reserved | This template is made with ❤️
            by UrchDev
          </p>
        </div>
      </div>
    </>
  );
};

export default Footer;
