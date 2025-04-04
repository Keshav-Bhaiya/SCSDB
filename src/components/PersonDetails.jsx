import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncloadperson,removeperson } from "../store/actions/personActions";
import { Link, Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import Loading from "./Loading";
import HorizontalCards from "./partials/HorizontalCards"
import Dropdown from "./partials/Dropdown";

const PersonDetails = ()=>{
    const{pathname} = useLocation();
    const navigate = useNavigate();
    const {id} = useParams();
    const{info} = useSelector(state=>state.person);
    const dispatch = useDispatch();
    const[category,setcategory] = useState("movie");
  
    useEffect(()=>{
      dispatch(asyncloadperson(id));
      return ()=>{
      dispatch(removeperson());
      };
    },[id]);

  return info?(
    <div className="px-[12%] w-full h-full flex flex-col">
      
    {/* Part1 */}
            <nav className="w-full h-[10vh] items-center  text-zinc-100 flex gap-10 text-xl">
    
            <Link onClick={()=>navigate(-1)} className="hover:text-[#6556CD] ri-arrow-left-line">
            </Link>{" "}    
            </nav>


            <div className="w-full flex">
            {/* Part 2 left poser and details */}
              <div className="w-[25%]">
              <img  className="shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)] h-[42vh] object-cover" src={`https://image.tmdb.org/t/p/original/${
          info.detail.profile_path 
          }`} alt="" /> 
          <hr className="bg-zinc-500 mt-10 border-none w-[79%] h-[1px]" />

          {/* Social Media Links */}
          <div className="text-2xl flex gap-x-5 text-white">
            <a target="_blank" href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`}>
            <i target="_blank" className="ri-earth-fill"></i>
            </a>

            <a target="_blank" href={`https://www.facebook.com/${info.externalid.facebook_id}`}>
            <i target="_blank" className="ri-facebook-circle-fill"></i>
            </a>

            <a target="_blank" href={`https://www.instagram.com/${info.externalid.instagram_id}`}>
            <i target="_blank" className="ri-instagram-fill"></i>
            </a>

            <a target="_blank" href={`https://www.twitter.com/${info.externalid.twitter}`}>
            <i target="_blank" className="ri-twitter-x-fill"></i>
            </a>
           
           
          </div>

          {/* Personal Information  */}
          <h1 className="text-2xl text-zinc-400 my-4 font-semibold">Person Info</h1>
          <h1 className="text-lg text-zinc-400 font-semibold">Known For </h1>
          <h1 className=" text-zinc-400 ">{info.detail.known_for_department} </h1>

          <h1 className="text-lg text-zinc-400 mt-3 font-semibold">Gender </h1>
          <h1 className=" text-zinc-400 ">{info.detail.gender==2 ? "Male":"Female"} </h1>

          <h1 className="text-lg text-zinc-400 font-semibold mt-3">Birthday </h1>
          <h1 className=" text-zinc-400 ">{info.detail.birthday} </h1>
          
          <h1 className="text-lg text-zinc-400 font-semibold mt-3">Deathday </h1>
          <h1 className=" text-zinc-400 ">{info.detail.deathday ? info.detail.deathday:"Fucking Alive"} </h1>

          <h1 className="text-lg text-zinc-400 font-semibold mt-3">Place Of Birth </h1>
          <h1 className=" text-zinc-400 ">{info.detail.place_of_birth} </h1>
          
          <h1 className="text-lg text-zinc-400 font-semibold mt-3">Also known as </h1>
          <h1 className=" text-zinc-400 ">{info.detail.also_known_as.join(" , ")} </h1>
              </div>

              {/* Part 3 right details and information */}
              <div className="w-[80%] ml-[5%]">
              <h1 className="text-6xl font-black text-zinc-400 my-4 ">{info.detail.name}</h1>
              <h1 className="text-xl text-zinc-400 font-semibold">Biography </h1>
              <p className="text-zinc-400 mt-4 mb-5">{info.detail.biography}</p>
              <h1 className="text-lg text-zinc-400 font-semibold">Known For </h1>
              <HorizontalCards data = {info.combinedCredits.cast} />

              <div className="w-full flex justify-between">
              <h1 className="text-xl text-zinc-400 font-semibold">Acting </h1>

              <Dropdown title="Category" options={["tv","movie"]} func={(e)=>setcategory(e.target.value)}/>
              </div>

              <div className="list-disc text-zinc-400 w-full h-[50vh] shadow-xl overflow-x-hidden overflow-y-auto shadow-[rgba(255,255,255,0.3)] mt-5 border-2 border-zinc-700 p-5">

                {info[category + "Credits"].cast.map((c,i)=>(
                  <li key={i} className="hover:bg-[#19191d] hover:text-white rounded p-5 duration-300 cursor-pointer">
                  <Link to={`/${category}/details/${c.id}`} className="">
                  <span>
                  {c.name || 
                  c.title || 
                  c.original_name || 
                  c.original_title
                }
                </span>

                  <span className="block ml-5 mt-2">{c.character && `Character name : ${c.character }`}</span>
                  </Link>
                  </li>
                )
                )}
                
              </div>

              </div>
            </div>

            

    </div>
  ):(
    <Loading/>
  )
}

export default PersonDetails;