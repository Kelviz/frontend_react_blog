import React from "react";

import Posts from "../posts/Posts";
import FeaturePost from "../featurePosts/FeaturePost";
import Category from "../categories/Category";
import RecentPost from "../recentPost/RecentPost";

const Home = ({ search }) => {
  return (
    <div className="w-full flex  flex-col flex justify-center items-center">
      <div className="featured-post flex  justify-center items-center mt-0">
        <FeaturePost />
      </div>

      <div className="w-full mt-4 mb-6 flex flex-col margin-sm px-[1rem] md:px-[3rem] lg:flex-row lg:justify-between lg:items-start justify-center items-center">
        <div className="lg:w-[64%] sm:w-[97%] md:w-[90%] container-sm  mt-4">
          <Posts />
        </div>

        <div className="lg:w-[30%] sm:w-[97%] md:w-[90%] container-sm mt-4 sidebar sticky top-1">
          <RecentPost />
          <Category />
        </div>
      </div>
    </div>
  );
};

export default Home;
