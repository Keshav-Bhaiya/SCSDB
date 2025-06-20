import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Topnav from "./partials/Topnav";
import Dropdown from "./partials/Dropdown";
import axios from "../utils/axios";
import Cards from "./partials/Cards";
import Loading from "./Loading";
import InfiniteScroll from 'react-infinite-scroll-component';

const Movies = () => {
  document.title = "SCSDB | Movies";

  const navigate = useNavigate();
  const [category, setcategory] = useState("now_playing");
  const [movie, setmovie] = useState([]);
  const [page, setpage] = useState(1);
  const [hasMore, sethasMore] = useState(true);

  const GetMovie = async () => {
    try {
      const { data } = await axios.get(`/movie/${category}?page=${page}`);
      if (data.results.length > 0) {
        setmovie((prevState) => [...prevState, ...data.results]);
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
    setmovie([]);
    sethasMore(true);
    GetMovie();
  };

  useEffect(() => {
    refreshHandler();
    // eslint-disable-next-line
  }, [category]);

  return movie.length > 0 ? (
    <div className="w-full min-h-screen bg-[#1F1E24] flex flex-col gap-4 px-2 md:px-8 py-4">
      {/* Header Section */}
      <div className="w-full flex flex-col items-center mb-4 gap-3">
        {/* Mobile: Movies centered, dropdowns below; Desktop: all in one row */}
        <div className="w-full flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div className="flex items-center justify-center md:justify-start w-full md:w-auto gap-2">
            <button onClick={() => navigate(-1)} className="text-2xl text-zinc-400 hover:text-[#6556CD] focus:outline-none">
              <i className="ri-arrow-left-line"></i>
            </button>
            <h1 className="text-2xl font-semibold text-zinc-400 text-center w-full md:w-auto">
              Movies <small className="ml-2 text-sm text-zinc-500">({category})</small>
            </h1>
          </div>
          <div className="flex items-center justify-center md:justify-end w-full md:w-auto gap-2">
            {/* Desktop: Search bar with proper width - like Trending.jsx */}
            <div className="hidden md:flex justify-center flex-1 max-w-5xl mx-60">
              <div className="w-full max-w-lg">
                <Topnav />
              </div>
            </div>
            <div className="flex gap-2 flex-shrink-0">
              <Dropdown 
                title="Category" 
                options={["popular", "top_rated", "upcoming", "now_playing"]} 
                func={(e) => setcategory(e.target.value)} 
              />
            </div>
          </div>
        </div>
        {/* Mobile: show search bar below header and dropdowns - like both Popular and Trending */}
        <div className="w-full md:hidden mt-2">
          <Topnav />
        </div>
      </div>
      {/* Cards Section with responsive grid - like Popular.jsx */}
      <InfiniteScroll
        dataLength={movie.length}
        next={GetMovie}
        hasMore={hasMore}
        loader={<h1>Loading...</h1>}
        className="w-full"
      >
        <Cards data={movie} title="movie" />
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
};

export default Movies;