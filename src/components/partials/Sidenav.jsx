
import React, { useEffect } from "react";
import { Link } from "react-router-dom";


const Sidenav= ()=>{


  return(
    <div className="w-[20%] h-full  border-r-2 p-10 border-zinc-300">
      
      <h1 className="text-2xl text-white font-bold">
      <i className="ri-tv-fill text-[#6556CD] mr-2 "></i>
        <span className="">SCSDB.</span>
      </h1>
      <nav className=" flex flex-col text-zinc-400 text-xl gap-3">
      <h1 className="text-white font-semibold text-xl mt-10 mb-5">
        New Feeds
        </h1>
      <Link to="/trending" className="hover:bg-[#6556CD] hover:text-white rounded-lg duration-300 p-5"><i className="mr-0.5 ri-fire-fill"></i> Trending</Link>
      <Link to="/popular" className="hover:bg-[#6556CD] hover:text-white rounded-lg duration-300 p-5"><i className="mr-1 ri-bard-fill"></i> Popular</Link>
      <Link to="/movie" className="hover:bg-[#6556CD] hover:text-white rounded-lg duration-300 p-5"><i className="mr-2 ri-movie-2-fill"></i>Movies</Link>
      <Link to="/tv" className="hover:bg-[#6556CD] hover:text-white rounded-lg duration-300 p-5"><i className="mr-2 ri-tv-2-fill"></i>Tv Shows</Link>
      <Link to="/person" className="hover:bg-[#6556CD] hover:text-white rounded-lg duration-300 p-5"><i className="mr-2 ri-team-fill"></i>People</Link>

      </nav>

      <hr className="border-none mt-2 h-[1px] bg-zinc-200" />

      <nav className=" flex flex-col text-zinc-400 text-xl gap-3">
      <h1 className="text-white font-semibold text-xl mt-10 mb-5 ">
        Website Information
        </h1>
      <Link className="hover:bg-[#6556CD] hover:text-white rounded-lg duration-300 p-5"><i className="mr-1 ri-information-2-fill"></i> About </Link>
      <Link className="hover:bg-[#6556CD] hover:text-white rounded-lg duration-300 p-5"><i className="mr-1 ri-phone-fill"></i> Contact Us</Link>


      </nav>
     

    </div>

  )
}

export default Sidenav;