import React from "react";
import { Link } from "react-router-dom";

const Header = ({data})=>{
  return(
    <div style={{
      background: `linear-gradient(rgba(0,0,0,0.4),rgba(0,0,0,0.7),rgba(0,0,0,0.9)),url(https://image.tmdb.org/t/p/original/${
          data.backdrop_path || data.profile_path
          })`,
      backgroundPosition: "center",
      backgroundSize: "cover"
    }} className="w-full h-[38vh] sm:h-[45vh] md:h-[50vh] flex flex-col items-start justify-end px-5 sm:px-8 md:px-16 py-6 md:py-10 text-left mx-2 sm:mx-auto sm:rounded-xl sm:shadow-lg">
      <h1 className="w-full sm:w-[90%] md:w-[70%] text-2xl sm:text-4xl md:text-5xl font-black text-white break-words mb-2 md:mb-4">
        {data.name || data.title || data.original_name || data.original_title}
      </h1>
      <p className="w-full sm:w-[90%] md:w-[70%] mt-1 sm:mt-2 md:mt-3 mb-2 sm:mb-2 md:mb-3 text-white text-sm sm:text-base md:text-lg">
        {data.overview.slice(0,200)}...
        <Link to={`/${data.media_type}/details/${data.id}`} className="text-blue-200">more</Link>
      </p>
      <p className="text-white flex flex-col sm:flex-row gap-y-1 gap-x-2 text-xs sm:text-sm md:text-base mb-2 items-start sm:items-center justify-center">
        <span className="flex items-center"><i className="text-yellow-500 ri-megaphone-fill"></i>{" "}{data.release_date || "No Information"}</span>
        <span className="flex items-center"><i className="sm:ml-4 md:ml-5 text-yellow-500 ri-album-fill"></i>{data.media_type.toUpperCase()}</span>
      </p>
      <Link to={`/${data.media_type}/details/${data.id}/trailer`} className="p-2 sm:p-3 md:p-3.5 text-xs sm:text-base text-white mt-3 md:mt-5 rounded bg-[#6556CD]">
        Watch Trailer
      </Link>
          </div>
  )
}
export default Header;