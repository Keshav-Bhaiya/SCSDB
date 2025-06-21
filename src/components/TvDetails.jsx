import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncloadtv, removetv } from "../store/actions/tvActions";
import { Link, Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import Loading from "./Loading";
import HorizontalCards from "./partials/HorizontalCards";

const TvDetails = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const { info } = useSelector(state => state.tv);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncloadtv(id));
    return () => {
      dispatch(removetv());
    };
  }, [id]);

  return info ? (
    <div 
      style={{
        background: `linear-gradient(rgba(0,0,0,0.4),rgba(0,0,0,0.7),rgba(0,0,0,0.9)),url(https://image.tmdb.org/t/p/original/${info.detail.backdrop_path})`,
        backgroundPosition: "center",
        backgroundSize: "cover"
      }} 
      className="relative w-full min-h-screen px-4 sm:px-6 lg:px-[10%]"
    >
      {/* Part1 - Navigation */}
      <nav className="w-full h-[8vh] sm:h-[10vh] items-center text-zinc-100 flex gap-4 sm:gap-6 lg:gap-10 text-lg sm:text-xl py-4">
        <Link 
          onClick={() => navigate(-1)} 
          className="hover:text-[#6556CD] ri-arrow-left-line text-2xl sm:text-xl"
        />
        
        <a target="_blank" href={info.detail.homepage} className="hover:text-[#6556CD]">
          <i className="ri-external-link-fill text-xl sm:text-lg"></i>
        </a>

        <a 
          target="_blank" 
          href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`}
          className="hover:text-[#6556CD]"
        >
          <i className="ri-earth-fill text-xl sm:text-lg"></i>
        </a>
       
        <a 
          href={`https://www.imdb.com/title/${info.externalid.imdb_id}`}
          className="hover:text-[#6556CD] text-sm sm:text-base"
        >
          imdb
        </a>
      </nav>

      {/* Part2 - Poster and Details */}
      <div className="w-full flex flex-col lg:flex-row gap-6 lg:gap-0 mb-8">
        {/* TV Show Poster */}
        <div className="flex justify-center lg:justify-start">
          <img  
            className="shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)] h-[40vh] sm:h-[45vh] lg:h-[50vh] w-[250px] sm:w-[300px] lg:w-[600px] object-cover lg:rounded-none rounded-lg" 
            src={`https://image.tmdb.org/t/p/original/${info.detail.poster_path || info.detail.backdrop_path}`} 
            alt="TV Show Poster" 
          /> 
        </div>

        {/* TV Show Details */}
        <div className="content lg:ml-[5%] text-white text-center lg:text-left"> 
          <h1 className="text-3xl sm:text-4xl lg:text-6xl text-white font-black leading-tight">
            {info.detail.name || 
             info.detail.title || 
             info.detail.original_name || 
             info.detail.original_title}
            <small className="block sm:inline text-lg sm:text-xl lg:text-2xl font-bold text-zinc-200 sm:ml-2 mt-2 sm:mt-0">
              ({info.detail.first_air_date.split("-")[0]})
            </small>
          </h1>

          {/* Rating and Info */}
          <div className="mt-4 mb-6 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 sm:gap-x-5">
            <div className="flex items-center gap-4">
              <span className="text-white text-lg sm:text-xl font-semibold w-[8vh] h-[8vh] sm:w-[6vh] sm:h-[6vh] flex justify-center rounded-full items-center bg-yellow-600">
                {(info.detail.vote_average * 10).toFixed()}<sup>%</sup>
              </span>
              <h1 className="font-semibold text-xl sm:text-2xl leading-6">User Score</h1>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-sm sm:text-base">
              <h1>{info.detail.first_air_date}</h1>
              <h1 className="text-center sm:text-left">{info.detail.genres.map((g) => g.name).join(", ")}</h1>
              {info.detail.runtime && <h1>{info.detail.runtime}min</h1>}
            </div>
          </div>

          {/* Tagline */}
          {info.detail.tagline && (
            <h1 className="text-lg sm:text-xl font-semibold italic mb-4 px-4 lg:px-0">
              {info.detail.tagline}
            </h1>
          )}

          {/* Overview */}
          <div className="mb-6">
            <h1 className="text-lg sm:text-xl font-semibold mt-4 mb-2">Overview</h1>
            <p className="text-sm sm:text-base leading-relaxed px-4 lg:px-0">
              {info.detail.overview}
            </p>
          </div>

          {/* Translations */}
          <div className="mb-6">
            <h1 className="text-lg sm:text-xl font-semibold mt-4 mb-2">TV Translations</h1>
            <p className="mb-7 text-sm sm:text-base px-4 lg:px-0">
              {info.translations.join(" , ")}
            </p>
          </div>

          {/* Trailer Button */}
          <div className="flex justify-center lg:justify-start">
            <Link 
              className="rounded-lg py-3 px-5 bg-[#6556CD] hover:bg-[#5a4bc4] transition-colors text-sm sm:text-base inline-flex items-center" 
              to={`${pathname}/trailer`}
            >
              <i className="text-lg sm:text-xl mr-2 ri-play-fill"></i>
              Play Trailer
            </Link>
          </div>
        </div>       
      </div>

      {/* Part3 - Available on Platforms */}
      <div className="w-full flex flex-col gap-y-5 mt-8 lg:mt-10">
        {info.watchproviders && info.watchproviders.buy && (
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-x-10 items-center sm:items-start text-white">
            <h1 className="text-base sm:text-lg font-semibold min-w-fit">Available on Buy</h1>
            <div className="flex flex-wrap justify-center sm:justify-start gap-3">
              {info.watchproviders.buy.map((w, i) => (
                <img 
                  key={i}  
                  title={w.provider_name} 
                  className="w-[6vh] h-[6vh] sm:w-[5vh] sm:h-[5vh] object-cover rounded-md hover:scale-110 transition-transform" 
                  src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}  
                  alt={w.provider_name}
                />
              ))}
            </div>
          </div>
        )}

        {info.watchproviders && info.watchproviders.rent && (
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-x-10 items-center sm:items-start text-white">
            <h1 className="text-base sm:text-lg font-semibold min-w-fit">Available on Rent</h1>
            <div className="flex flex-wrap justify-center sm:justify-start gap-3">
              {info.watchproviders.rent.map((w, i) => (
                <img 
                  key={i} 
                  title={w.provider_name} 
                  className="w-[6vh] h-[6vh] sm:w-[5vh] sm:h-[5vh] object-cover rounded-md hover:scale-110 transition-transform" 
                  src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}  
                  alt={w.provider_name}
                />
              ))}
            </div>
          </div>
        )}

        {info.watchproviders && info.watchproviders.flatrate && (
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-x-10 items-center sm:items-start text-white">
            <h1 className="text-base sm:text-lg font-semibold min-w-fit">Available on Platforms</h1>
            <div className="flex flex-wrap justify-center sm:justify-start gap-3">
              {info.watchproviders.flatrate.map((w, i) => (
                <img 
                  key={i} 
                  title={w.provider_name} 
                  className="w-[6vh] h-[6vh] sm:w-[5vh] sm:h-[5vh] object-cover rounded-md hover:scale-110 transition-transform" 
                  src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}  
                  alt={w.provider_name}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Part 4 - Seasons */}
      <hr className="bg-zinc-500 mt-8 lg:mt-10 border-none h-[1px]" />
      <h1 className="text-2xl sm:text-3xl mt-6 lg:mt-8 font-bold text-white text-center lg:text-left px-4 lg:px-0">
        Seasons
      </h1>
      <div className="w-full overflow-x-auto mb-5 p-2 sm:p-5">
        <div className="flex gap-4 sm:gap-5 min-w-max">
          {info.detail.seasons.length > 0 ? info.detail.seasons.map((s, i) => (
            <div key={i} className="flex-shrink-0 w-[200px] sm:w-[220px] lg:w-[14vw]">
              <img 
                className="shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)] h-[35vh] sm:h-[38vh] lg:h-[40vh] w-full object-cover rounded-lg" 
                src={`https://image.tmdb.org/t/p/original/${s.poster_path}`} 
                alt={s.name} 
              />
              <h1 className="text-lg sm:text-xl lg:text-2xl text-zinc-300 mt-3 font-semibold text-center lg:text-left">
                {s.name}            
              </h1>
            </div>
          )) : (
            <h1 className="text-2xl sm:text-3xl text-white font-black text-center mt-5 w-full">
              Nothing to show
            </h1>
          )}
        </div>
      </div>

      {/* Part 5 - Recommendations and Similar Stuff */}
      <hr className="bg-zinc-500 mt-8 lg:mt-10 border-none h-[1px]" />
      <h1 className="text-2xl sm:text-3xl mt-6 lg:mt-8 font-bold text-white text-center lg:text-left px-4 lg:px-0">
        Recommendations & Similar Stuff
      </h1>
      <div className="mt-4 mb-8">
        <HorizontalCards 
          data={info.recommendations.length > 0 ? info.recommendations : info.similar}
        />
      </div>

      <Outlet/>
    </div>
  ) : (
    <Loading/>
  );
}

export default TvDetails;