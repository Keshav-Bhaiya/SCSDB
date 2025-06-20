import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const HorizontalCards = ({ data }) => {
  return (
    <div className="w-full p-3 md:p-5">
      <div className="w-full flex overflow-y-hidden overflow-x-auto gap-4 pb-4">
        {data.map((item, index) => (
          <CardItem key={item.id || index} item={item} />
        ))}
      </div>
    </div>
  );
};

const CardItem = ({ item }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Maximum characters to show when collapsed
  const maxLength = 150;
  
  // Get overview text (handle both movie and TV show data)
  const overview = item.overview || '';
  
  // Check if text needs truncation
  const needsTruncation = overview.length > maxLength;
  
  // Get display text based on expanded state
  const displayText = isExpanded || !needsTruncation 
    ? overview 
    : overview.slice(0, maxLength) + '...';

  // Get title (handle both movie and TV show data)
  const title = item.title || item.name || 'Unknown Title';
  
  // Get image URL
  const imageUrl = item.poster_path || item.backdrop_path 
    ? `https://image.tmdb.org/t/p/w500${item.poster_path || item.backdrop_path}`
    : '/api/placeholder/300/450';

  // Get media_type for correct details link
  const mediaType = item.media_type || (item.title ? 'movie' : 'tv');

  return (
    <div className="min-w-[280px] md:min-w-[320px] bg-zinc-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group">
      {/* Image section */}
      <div className="relative h-40 md:h-48 overflow-hidden">
        <img 
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            e.target.src = '/api/placeholder/300/450';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        
        {/* Rating badge */}
        {item.vote_average && (
          <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-sm rounded-full px-2 py-1">
            <span className="text-yellow-400 text-xs font-semibold">
              ⭐ {item.vote_average.toFixed(1)}
            </span>
          </div>
        )}
      </div>
      
      {/* Content section with controlled height */}
      <div className="p-4">
        {/* Title with consistent height */}
        <h3 className="text-lg font-semibold text-white mb-1 line-clamp-2 min-h-[3.5rem] leading-tight">
          {title}
        </h3>
        
        {/* Release date */}
        {(item.release_date || item.first_air_date) && (
          <p className="text-zinc-500 text-sm mb-3">
            {new Date(item.release_date || item.first_air_date).getFullYear()}
          </p>
        )}
        
        {/* Description section with fixed structure */}
        <div className="min-h-[100px] flex flex-col">
          {/* Description text */}
          <div className={`text-zinc-400 text-sm leading-relaxed mb-3 transition-all duration-300 ${
            isExpanded ? 'max-h-none' : 'max-h-[4.5rem] overflow-hidden'
          }`}>
            <p className="break-words hyphens-auto">
              {displayText || 'No description available.'}
            </p>
          </div>
          
          {/* Action buttons container */}
          <div className="flex items-center justify-between mt-auto">
            {/* More/Less button */}
            {needsTruncation && (
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors duration-200 flex items-center gap-1"
              >
                {isExpanded ? (
                  <>
                    <span>Show less</span>
                    <svg className="w-3 h-3 transform rotate-180" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </>
                ) : (
                  <>
                    <span>More</span>
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </>
                )}
              </button>
            )}
            
            {/* View Details Link */}
            <Link
              to={`/${mediaType}/details/${item.id}`} 
              className="bg-zinc-700 hover:bg-zinc-600 text-white text-xs px-3 py-1.5 rounded-full transition-colors duration-200 flex items-center gap-1"
            >
              <span>View Details</span>
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HorizontalCards;