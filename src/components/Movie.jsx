import React from "react";
import { useState,useEffect } from "react";
import { Link,useNavigate } from "react-router-dom";
import axios from "../utils/axios";
import InfiniteScroll from 'react-infinite-scroll-component';
import Loading from "./Loading";
import Cards from "./partials/Cards";
import Dropdown from "./partials/Dropdown";
import Topnav from "./partials/Topnav";

const Movies = ()=>{
  document.title = "SCSDB | Movies";

  const navigate = useNavigate();
  const[category,setcategory] = useState("now_playing");
  const[movie,setmovie] = useState([]);
  const[page,setpage] = useState(1);
  const[hasMore,sethasMore] = useState(true);

  const GetMovie = async()=>{
    try{
      const {data} = await axios.get(`/movie/${category}?page=${page}`);

      if(data.results.length > 0){
        // setmovie(data.results);
        setmovie((prevState) =>[...prevState,...data.results]);
        setpage(page+1);
      }else{
          sethasMore(false);
      }
    }
    
    catch(error){
      console.error("Error: ",error);
    }
  }

  const refreshHandler = ()=>{
    if(movie.length ===0){
      GetMovie();
    }else{
      setpage(1);
      setmovie([]);
      GetMovie();
    }
  };

  useEffect(()=>{
    refreshHandler()
  },[category])

  return movie.length >0 ?(
    <div className="w-full  h-full">


        <div className=" w-full  flex items-center justify-between ">
          <Link></Link>
          <h1 className=" text-2xl font-semibold text-zinc-400">
          <i onClick={()=>navigate(-1)} className="hover:text-[#6556CD] ri-arrow-left-line"></i>{" "}
          Movie <small className="ml-2 text-sm text-zinc-500">({category})</small>
            </h1>

            <div className="flex items-center w-[80%]">
            <Topnav/>
            <Dropdown title="Category" options={["popular","top_rated","upcoming","now_playing"]} func={(e)=>setcategory(e.target.value)}/>
            <div className="w-[2%]"></div>
           
            </div>
        </div>

        <InfiniteScroll
        dataLength={movie.length}
        next={GetMovie}
        hasMore={hasMore}
         loader ={<h1>Loading...</h1>}
        >
        <Cards data={movie} title="movie"/>
        </InfiniteScroll>


    </div>
  ):(
    <Loading/>
  )
}
export default Movies;