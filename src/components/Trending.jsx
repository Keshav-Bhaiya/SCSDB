import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Topnav from "./partials/Topnav";
import Dropdown from "./partials/Dropdown";
import axios from "../utils/axios";
import Cards from "./partials/Cards";
import Loading from "./Loading";
import InfiniteScroll from 'react-infinite-scroll-component';

const Trending = () => {
  document.title = "SCSDB | Trending";
  const navigate = useNavigate();
  const [category, setcategory] = useState("all");
  const [duration, setduration] = useState("day");
  const [trending, settrending] = useState([]);
  const [page, setpage] = useState(1);
  const [hasMore, sethasMore] = useState(true);

  const GetTrending = async () => {
    try {
      const { data } = await axios.get(`/trending/${category}/${duration}?page=${page}`);
      if (data.results.length > 0) {
        settrending((prevState) => [...prevState, ...data.results]);
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
    settrending([]);
    sethasMore(true);
    GetTrending();
  };

  useEffect(() => {
    refreshHandler();
    // eslint-disable-next-line
  }, [category, duration]);

  return trending.length > 0 ? (
    <div className="w-full min-h-screen bg-[#1F1E24] flex flex-col gap-4 px-2 md:px-8 py-4">
      {/* Header Section */}
      <div className="w-full flex flex-col items-center mb-4 gap-3">
        {/* Mobile: Trending centered, dropdowns below; Desktop: all in one row */}
        <div className="w-full flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div className="flex items-center justify-center md:justify-start w-full md:w-auto gap-2">
            <button onClick={() => navigate(-1)} className="text-2xl text-zinc-400 hover:text-[#6556CD] focus:outline-none">
              <i className="ri-arrow-left-line"></i>
            </button>
            <h1 className="text-2xl font-semibold text-zinc-400 text-center w-full md:w-auto">Trending</h1>
          </div>
          <div className="flex items-center justify-center md:justify-end w-full md:w-auto gap-2">
            {/* Search bar with proper width on desktop */}
            <div className="hidden md:block flex-1 max-w-md min-w-[400px] mr-3">
              <Topnav />
            </div>
            <div className="flex gap-2 flex-shrink-0">
              <Dropdown title="Category" options={["movie", "tv", "all"]} func={(e) => setcategory(e.target.value)} />
              <Dropdown title="Duration" options={["week", "day"]} func={(e) => setduration(e.target.value)} />
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
        dataLength={trending.length}
        next={GetTrending}
        hasMore={hasMore}
        loader={<h1>Loading...</h1>}
        className="w-full"
      >
        <Cards data={trending} title={category} />
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
};

export default Trending;