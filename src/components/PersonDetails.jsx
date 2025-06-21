import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncloadperson, removeperson } from "../store/actions/personActions";
import { Link, Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import Loading from "./Loading";
import HorizontalCards from "./partials/HorizontalCards";
import Dropdown from "./partials/Dropdown";

const PersonDetails = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const { info } = useSelector(state => state.person);
  const dispatch = useDispatch();
  const [category, setcategory] = useState("movie");

  useEffect(() => {
    dispatch(asyncloadperson(id));
    return () => {
      dispatch(removeperson());
    };
  }, [id]);

  return info ? (
    <div className="w-full min-h-screen px-4 sm:px-6 lg:px-[10%] bg-[#1F1E24]">
      
      {/* Part1 - Navigation */}
      <nav className="w-full h-[8vh] sm:h-[10vh] items-center text-zinc-100 flex gap-4 sm:gap-6 lg:gap-10 text-lg sm:text-xl py-4">
        <Link 
          onClick={() => navigate(-1)} 
          className="hover:text-[#6556CD] ri-arrow-left-line text-2xl sm:text-xl"
        />
      </nav>

      {/* Main Content */}
      <div className="w-full flex flex-col lg:flex-row gap-6 lg:gap-0 mb-8">
        
        {/* Part 2 - Left: Profile Image and Personal Details */}
        <div className="w-full lg:w-[25%] flex flex-col items-center lg:items-start">
          
          {/* Profile Image */}
          <div className="flex justify-center lg:justify-start mb-6">
            <img  
              className="shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)] h-[35vh] sm:h-[40vh] lg:h-[42vh] w-[250px] sm:w-[280px] lg:w-full object-cover rounded-lg lg:rounded-none" 
              src={`https://image.tmdb.org/t/p/original/${info.detail.profile_path}`} 
              alt={info.detail.name} 
            /> 
          </div>

          <hr className="bg-zinc-500 border-none w-full lg:w-[79%] h-[1px] mb-6" />

          {/* Social Media Links */}
          <div className="text-2xl flex gap-x-5 text-white justify-center lg:justify-start mb-6 w-full">
            <a target="_blank" href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`}>
              <i className="ri-earth-fill hover:text-[#6556CD] transition-colors"></i>
            </a>

            <a target="_blank" href={`https://www.facebook.com/${info.externalid.facebook_id}`}>
              <i className="ri-facebook-circle-fill hover:text-[#6556CD] transition-colors"></i>
            </a>

            <a target="_blank" href={`https://www.instagram.com/${info.externalid.instagram_id}`}>
              <i className="ri-instagram-fill hover:text-[#6556CD] transition-colors"></i>
            </a>

            <a target="_blank" href={`https://www.twitter.com/${info.externalid.twitter}`}>
              <i className="ri-twitter-x-fill hover:text-[#6556CD] transition-colors"></i>
            </a>
          </div>

          {/* Personal Information */}
          <div className="w-full text-center lg:text-left px-4 lg:px-0">
            <h1 className="text-xl sm:text-2xl text-zinc-400 mb-4 font-semibold">Person Info</h1>
            
            <div className="space-y-3">
              <div>
                <h2 className="text-base sm:text-lg text-zinc-400 font-semibold">Known For</h2>
                <p className="text-zinc-400 text-sm sm:text-base">{info.detail.known_for_department}</p>
              </div>

              <div>
                <h2 className="text-base sm:text-lg text-zinc-400 font-semibold">Gender</h2>
                <p className="text-zinc-400 text-sm sm:text-base">{info.detail.gender == 2 ? "Male" : "Female"}</p>
              </div>

              <div>
                <h2 className="text-base sm:text-lg text-zinc-400 font-semibold">Birthday</h2>
                <p className="text-zinc-400 text-sm sm:text-base">{info.detail.birthday}</p>
              </div>
              
              <div>
                <h2 className="text-base sm:text-lg text-zinc-400 font-semibold">Deathday</h2>
                <p className="text-zinc-400 text-sm sm:text-base">{info.detail.deathday ? info.detail.deathday : "Still Alive"}</p>
              </div>

              <div>
                <h2 className="text-base sm:text-lg text-zinc-400 font-semibold">Place Of Birth</h2>
                <p className="text-zinc-400 text-sm sm:text-base">{info.detail.place_of_birth}</p>
              </div>
              
              <div>
                <h2 className="text-base sm:text-lg text-zinc-400 font-semibold">Also known as</h2>
                <p className="text-zinc-400 text-sm sm:text-base break-words">{info.detail.also_known_as.join(", ")}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Part 3 - Right: Main Details and Information */}
        <div className="w-full lg:w-[75%] lg:ml-[5%]">
          
          {/* Name */}
          <h1 className="text-3xl sm:text-4xl lg:text-6xl font-black text-zinc-400 mb-4 text-center lg:text-left leading-tight">
            {info.detail.name}
          </h1>
          
          {/* Biography */}
          <div className="mb-6">
            <h2 className="text-lg sm:text-xl text-zinc-400 font-semibold mb-2 text-center lg:text-left">Biography</h2>
            <p className="text-zinc-400 text-sm sm:text-base leading-relaxed px-4 lg:px-0 text-justify lg:text-left">
              {info.detail.biography}
            </p>
          </div>

          {/* Known For Section */}
          <div className="mb-6">
            <h2 className="text-lg sm:text-xl text-zinc-400 font-semibold mb-4 text-center lg:text-left">Known For</h2>
            <HorizontalCards data={info.combinedCredits.cast} />
          </div>

          {/* Acting Credits Section */}
          <div className="w-full">
            <div className="w-full flex flex-col sm:flex-row justify-between items-center sm:items-start gap-4 mb-4">
              <h2 className="text-lg sm:text-xl text-zinc-400 font-semibold">Acting Credits</h2>
              <div className="w-full sm:w-auto">
                <Dropdown 
                  title="Category" 
                  options={["tv", "movie"]} 
                  func={(e) => setcategory(e.target.value)}
                />
              </div>
            </div>

            {/* Credits List */}
            <div className="list-disc text-zinc-400 w-full h-[40vh] sm:h-[45vh] lg:h-[50vh] shadow-xl overflow-x-hidden overflow-y-auto shadow-[rgba(255,255,255,0.3)] border-2 border-zinc-700 p-3 sm:p-5 rounded-md">
              {info[category + "Credits"].cast.map((c, i) => (
                <li key={i} className="hover:bg-[#19191d] hover:text-white rounded p-3 sm:p-5 duration-300 cursor-pointer mb-2">
                  <Link to={`/${category}/details/${c.id}`} className="block">
                    <span className="text-sm sm:text-base font-medium">
                      {c.name || 
                       c.title || 
                       c.original_name || 
                       c.original_title}
                    </span>
                    {c.character && (
                      <span className="block ml-3 sm:ml-5 mt-1 sm:mt-2 text-xs sm:text-sm text-zinc-500">
                        Character: {c.character}
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Outlet/>
    </div>
  ) : (
    <Loading/>
  );
}

export default PersonDetails;