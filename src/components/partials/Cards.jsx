import React from "react";
import { Link } from "react-router-dom";
import noimage from '/noimage.jpg';

const Cards = ({ data, title }) => {
  return (
    <div className="w-full px-2 sm:px-4">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4 md:gap-6">
        {data.map((c, i) => (
          <Link
            to={`/${c.media_type || title}/details/${c.id}`}
            className="group relative bg-zinc-900 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            key={i}
          >
            {/* Image Container with better aspect ratio for mobile */}
            <div className="relative w-full aspect-[2/3]">
              <img
                className="w-full h-full object-cover"
                src={
                  c.poster_path || c.backdrop_path || c.profile_path
                    ? `https://image.tmdb.org/t/p/original${
                        c.poster_path || c.backdrop_path || c.profile_path
                      }`
                    : noimage
                }
                alt={c.name || c.title || c.original_name || c.original_title}
              />
              
              {/* Vote Average Badge - positioned better for mobile */}
              {c.vote_average && (
                <div className="absolute top-2 right-2 bg-yellow-600 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg">
                  {(c.vote_average * 10).toFixed()}%
                </div>
              )}
            </div>
            
            {/* Title Container with better mobile spacing */}
            <div className="p-2 sm:p-3">
              <h1 className="text-white font-semibold text-sm sm:text-base leading-tight line-clamp-2">
                {c.name || c.title || c.original_name || c.original_title}
              </h1>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Cards;