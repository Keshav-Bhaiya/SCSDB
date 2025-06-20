import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Topnav from "./partials/Topnav";
import Dropdown from "./partials/Dropdown";
import axios from "../utils/axios";
import Cards from "./partials/Cards";
import Loading from "./Loading";
import InfiniteScroll from 'react-infinite-scroll-component';

const Popular = () => {
  document.title = "SCSDB | Popular";
  const navigate = useNavigate();
  const [category, setcategory] = useState("movie");
  const [popular, setpopular] = useState([]);
  const [page, setpage] = useState(1);
  const [hasMore, sethasMore] = useState(true);

  const GetPopular = async () => {
    try {
      const { data } = await axios.get(`${category}/popular?page=${page}`);
      if (data.results.length > 0) {
        setpopular((prevState) => [...prevState, ...data.results]);
        setpage(page + 1);
      } else {
        sethasMore(false);
      }
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  const refreshHandler = () => {
    setpage(1);
    setpopular([]);
    sethasMore(true);
    GetPopular();
  };

  useEffect(() => {
    refreshHandler();
    // eslint-disable-next-line
  }, [category]);

  return popular.length > 0 ? (
    <div className="w-full min-h-screen bg-[#1F1E24] flex flex-col gap-4 px-2 md:px-8 py-4">
      {/* Header Section */}
      <div className="w-full flex flex-col items-center mb-4 gap-3">
        {/* Mobile: Popular centered, dropdowns below; Desktop: all in one row */}
        <div className="w-full flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div className="flex items-center justify-center md:justify-start w-full md:w-auto gap-2">
            <button onClick={() => navigate(-1)} className="text-2xl text-zinc-400 hover:text-[#6556CD] focus:outline-none">
              <i className="ri-arrow-left-line"></i>
            </button>
            <h1 className="text-2xl font-semibold text-zinc-400 text-center w-full md:w-auto">Popular</h1>
          </div>
          <div className="flex items-center justify-center md:justify-end w-full md:w-auto gap-2">
            {/* Search bar with proper width on desktop - centered */}
            <div className="hidden md:flex justify-center flex-1 max-w-5xl mx-60">
              <div className="w-full max-w-lg">
                <Topnav />
              </div>
            </div>
            <div className="flex gap-2 flex-shrink-0">
              <Dropdown title="Category" options={["movie", "tv"]} func={(e) => setcategory(e.target.value)} />
            </div>
          </div>
        </div>
        {/* Mobile: show search bar below header and dropdowns */}
        <div className="w-full md:hidden mt-2">
          <Topnav />
        </div>
      </div>
      {/* Cards Section */}
      <InfiniteScroll
        dataLength={popular.length}
        next={GetPopular}
        hasMore={hasMore}
        loader={<h1>Loading...</h1>}
        className="w-full"
      >
        <Cards data={popular} title={category} />
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
};

export default Popular;