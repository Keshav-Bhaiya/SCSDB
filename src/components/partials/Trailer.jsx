import React from "react";
import ReactPlayer from "react-player";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import NotFound from "../NotFound";

const Trailer = ()=>{
  const navigate = useNavigate();
  const {pathname} = useLocation();
  const category = pathname.includes("movie") ? "movie" : "tv";
  const ytvideo = useSelector((state)=>state[category].info.videos);

  return (
    <div className="absolute z-[100] bg-[rgba(0,0,0,0.9)] top-0 left-0 w-screen h-screen flex items-center justify-center">
      <Link onClick={()=>navigate(-1)} className="text-3xl text-white right-[5%] top-[5%] absolute hover:text-[#6556CD] ri-close-fill">
      </Link>{" "}

      {ytvideo ?(
        <ReactPlayer controls height={650} width={1200}
        url={`https://www.youtube.com/watch?v=${ytvideo.key}`}/>
      )
    :(
      <NotFound/>
    )}

    </div>
  )
}
export default Trailer