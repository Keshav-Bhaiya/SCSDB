import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "../../utils/axios";
import noimage from "/noimage.jpg";

const Topnav = () => {
  const [query, setquery] = useState("");
  const [searches, setsearches] = useState([]);
  const [showSearch, setShowSearch] = useState(false);
  const location = useLocation();

  const GetSearches = async () => {
    try {
      const { data } = await axios.get(`/search/multi?query=${query}`);
      setsearches(data.results);
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  useEffect(() => {
    if (query.length > 0) {
      GetSearches();
      setShowSearch(true);
    } else {
      setShowSearch(false);
    }
  }, [query]);

  return (
    <nav className="w-full flex flex-col md:flex-row items-center justify-center px-15 md:px-10 py-2 md:py-2 gap-2 md:gap-0 bg-[#1F1E24] sticky top-0 z-30">
      <div className="flex items-center w-full relative justify-center">
        {/* Search container with proper spacing and positioning */}
        <div className="relative w-full max-w-2xl flex items-center">
          {/* Search icon with proper positioning */}
          <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center pointer-events-none z-10">
            <i className="text-lg md:text-xl text-zinc-400 ri-search-line" />
          </div>

          {/* Input field with proper padding */}
          <input
            onChange={(e) => setquery(e.target.value)}
            value={query}
            className="text-white outline-none border-none pl-12 pr-12 py-3 md:py-3 text-base md:text-lg bg-transparent w-full rounded-full text-left placeholder:text-zinc-400 placeholder:font-normal border border-zinc-600 focus:border-zinc-500 transition-colors"
            type="text"
            placeholder="search anything"
            style={{ letterSpacing: '0.01em' }}
          />

          {/* Clear button */}
          {query.length > 0 && (
            <i
              onClick={() => setquery("")}
              className="text-xl md:text-2xl text-zinc-400 ri-close-fill cursor-pointer absolute right-3 md:right-4 top-1/2 -translate-y-1/2 hover:text-zinc-300 transition-colors"
            ></i>
          )}

          {/* Search results dropdown - Fixed positioning */}
          {showSearch && (
            <div className="absolute left-0 right-0 z-[100] max-h-[50vh] overflow-auto bg-zinc-200 top-[110%] rounded shadow-lg mx-auto">
              {searches.map((s, i) => (
                <Link
                  to={`/${s.media_type}/details/${s.id}`}
                  key={i}
                  className="text-zinc-600 font-semibold hover:text-black hover:bg-zinc-300 duration-300 w-full p-4 md:p-6 flex justify-start border-b-2 border-zinc-100 items-center"
                >
                  <img
                    className="w-[8vh] h-[8vh] md:w-[10vh] md:h-[10vh] object-cover rounded mr-4 md:mr-6 shadow-lg"
                    src={
                      s.backdrop_path || s.profile_path
                        ? `https://image.tmdb.org/t/p/original/${s.backdrop_path || s.profile_path}`
                        : noimage
                    }
                    alt=""
                  />
                  <span className="truncate">
                    {s.name || s.title || s.original_name || s.original_title}
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Topnav;