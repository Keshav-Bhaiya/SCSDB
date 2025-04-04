import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../../utils/axios";
import noimage from "/noimage.jpg"
import Header from "./Header";
const Topnav = ()=>{
  const[query,setquery] = useState("");
  const[searches,setsearches] = useState([]);
  const GetSearches = async()=>{
    try{
      const {data} = await axios.get(`/search/multi?query=${query}`)

      setsearches(data.results);
    }
    catch(error){
      console.error("Error: ",error);
    }
  }
  useEffect(()=>{
    GetSearches();
  },[query])

  return(
    <div className="w-[75%] h-[10vh] relative flex mx-auto items-center pl-[5%] ">
      <i className="text-3xl text-zinc-400 ri-search-line"></i>
      <input 
      onChange={(e)=>setquery(e.target.value)}
      value={query}
       className="text-white outline-none border-none mx-10 p-5 text-xl bg-transparent w-[50%]" type="text" placeholder="search anything" 
       />
       {query.length>0 && (
        <i onClick={()=>setquery("")} className="text-3xl  right-0 text-zinc-400 ri-close-fill"></i>
       )}
     

      <div className="absolute z-[100] w-[60%] max-h-[50vh] overflow-auto  bg-zinc-200 top-[95%] left-[5%]">
        {searches.map((s,i)=>(
           <Link to={`/${s.media_type}/details/${s.id}`} key={i} className="text-zinc-600 font-semibold hover:text-black hover:bg-zinc-300 duration-300 w-[100%] p-10 flex justify-start border-b-2 border-zinc-100  items-center  ">
        <img className="w-[10vh] h-[10vh] object-cover rounded mr-6 shadow-lg" 
        src={s.backdrop_path || s.profile_path ?
         `https://image.tmdb.org/t/p/original/${
          s.backdrop_path || s.profile_path
          }`: noimage
        } alt="" />
        <span>{s.name || s.title || s.original_name || s.original_title}</span>
        </Link>
      ))}
       
      </div>
      </div>
  );
}

export default Topnav;