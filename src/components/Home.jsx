import React, { useEffect, useState } from "react";
import Sidenav from "./partials/Sidenav";
import Topnav from "./partials/Topnav";
import axios from "../utils/axios";
import Header from "./partials/Header";
import HorizontalCards from "./partials/HorizontalCards";
import Dropdown from "./partials/Dropdown";
import Loading from "./Loading";

const Home=()=>{
  document.title = "SCSDB | Homepage";

  const[wallpaper,setwallpaper] = useState(null);
  const[trending,settrending] = useState(null);
  const[category,setcategory] = useState("all");

  const GetHeaderWallpaper = async()=>{
    try{
      const {data} = await axios.get(`/trending/all/day`)
      let randomdata = data.results[(Math.random() * data.results.length).toFixed()];
      setwallpaper(randomdata);
    }
    catch(error){
      console.error("Error: ",error);
    }
  }

  const GetTrending = async()=>{
    try{
      const {data} = await axios.get(`/trending/${category}/day`)
      settrending(data.results);
    }
    catch(error){
      console.error("Error: ",error);
    }
  }

  useEffect(()=>{
    GetTrending();
    !wallpaper && GetHeaderWallpaper();
    
  },[category]);




    return wallpaper && trending ?(
      <>
        <Sidenav/>
        <div className="w-[80%] h-full overflow-auto overflow-x-hidden">
          <Topnav/>
          <Header data={wallpaper}/>

          <div className="p-5 flex justify-between">
      <h1 className=" text-3xl font-semibold text-zinc-400 ">
        Trending
        </h1>

      <Dropdown title="Filter" options={["tv","movie","all"]} func ={(e) => setcategory(e.target.value)}  />
      </div>

          <HorizontalCards data={trending} />
        </div>
      </>
    ): <h1><Loading/></h1>
}
export default Home