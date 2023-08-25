import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { HiMenuAlt4, HiX } from "react-icons/hi";
import { RiSearch2Line } from "react-icons/ri";
import { motion } from "framer-motion";
import axios from "axios";

import "./Navbar.css";

const API_URL = process.env.REACT_APP_API_URL;

const Navbar = ({ onSearch }) => {
  const [navLinks, setNavLinks] = useState([]);
  const [activeCategoryId, setActiveCategoryId] = useState(null);
  const [toggle, setToggle] = useState(false);
  const [toggleSearch, setToggleSearch] = useState(false);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleCategoryClick = (item) => {
    setActiveCategoryId(item.id);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(search);
    if (search.trim() !== "") {
      navigate(`/search?query=${encodeURIComponent(search)}`);
    }
    setSearch("");
  };

  useEffect(() => {
    axios
      .get(`${API_URL}/category/`)
      .then((response) => {
        setNavLinks(response.data);
        console.log(response.data);
      })

      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <>
      <nav className="app__navbar flex  w-full justify-between mb-0 items-center px-6 py-0 lg:flex-col lg:px-0 lg:py-0">
        <div className="app__navbar-logo w-140 mt-6">
          <h1 className="font-bold text-[35px] text-center mb-6 lg:text-[40px] w-full">
            <Link to="/">Viza Blog</Link>
          </h1>
        </div>

        <ul className="app__navbar-links  w-full hidden items-center justify-between px-[3rem] mt-4  h-auto lg:flex">
          <div className="app__navbar-links  w-full hidden items-center lg:flex">
            <li
              className={`mx-2 hover:opacity-90 font-bold py-4 px-2 text-[16px] ${
                location.pathname === "/" ? "active-link" : ""
              }`}
            >
              <Link to="/" className="">
                Home
              </Link>
            </li>
            {navLinks.map((item) => (
              <li
                key={`link-${item.id}`}
                className={`mx-2 hover:opacity-90 py-4 px-2 font-bold text-[16px] ${
                  location.pathname.includes(`/categoryPosts/${item.id}`)
                    ? "active-link"
                    : ""
                }`}
              >
                <Link
                  to={`/categoryPosts/${item.id}`}
                  onClick={() => handleCategoryClick(item)}
                  className=""
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </div>

          <div className="font-bold text-[24px] flex">
            {toggleSearch ? (
              <form
                onSubmit={handleSubmit}
                className="flex w-[240px] justify-center items-center"
              >
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search"
                  className="text-black outline-none text-[16px] w-[170px] p-1"
                />
                <button
                  type="submit"
                  className="w-9 mr-2 bg-pink-700 flex justify-center item-center p-1 text-white"
                >
                  <RiSearch2Line />
                </button>

                <HiX
                  onClick={() => setToggleSearch(false)}
                  className="cursor-pointer"
                />
              </form>
            ) : (
              <RiSearch2Line
                onClick={() => setToggleSearch(true)}
                className="cursor-pointer"
              />
            )}
          </div>
        </ul>

        <div className="app__navbar-menu relative flex justify-center items-center lg:hidden">
          {toggle ? (
            <HiX onClick={() => setToggle(false)} />
          ) : (
            <HiMenuAlt4 onClick={() => setToggle(true)} />
          )}
        </div>
      </nav>
      <div className="w-full app__small-menu px-6">
        {toggle && (
          <motion.div
            whileInView={{ y: [0, 20] }}
            transition={{ duration: 0.85, ease: "easeOut" }}
            className="w-full h-[300px] absolute top-[60px] left-0 z-20 flex items-start flex-col lg:hidden"
          >
            <ul className="w-full px-6 mt-1">
              <li className="mt-3 w-auto">
                <Link
                  to="/"
                  onClick={() => setToggle(false)}
                  className={`transition-colors duration-[1s] hover:opacity-[0.6] ${
                    location.pathname === "/"
                      ? "app__small-menu-active-link"
                      : ""
                  }`}
                >
                  Home
                </Link>
              </li>
              {navLinks.map((item) => (
                <li key={`link-${item.id}`} className="mt-4 w-auto">
                  <Link
                    to={`/categoryPosts/${item.id}`}
                    onClick={() => {
                      handleCategoryClick(item);
                      setToggle(false);
                    }}
                    className={`transition-colors duration-[1s] hover:opacity-[0.6] ${
                      location.pathname.includes(`/categoryPosts/${item.id}`)
                        ? "app__small-menu-active-link"
                        : ""
                    }`}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
            <form
              onSubmit={handleSubmit}
              className="flex w-[360] px-6 mt-3 justify-center items-center"
            >
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search"
                className="text-black outline-none text-[16px] border border-gray-100 w-[240px] p-1"
              />
              <button
                type="submit"
                className="w-9 mr-2 bg-pink-700 flex justify-center item-center p-2 text-white"
              >
                <RiSearch2Line />
              </button>
            </form>
          </motion.div>
        )}
      </div>
    </>
  );
};

export default Navbar;
