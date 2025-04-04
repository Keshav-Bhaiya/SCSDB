import React from "react";
import { useState,useEffect } from "react";
import { Link,useNavigate } from "react-router-dom";
import axios from "../utils/axios";
import InfiniteScroll from 'react-infinite-scroll-component';
import Loading from "./Loading";
import Cards from "./partials/Cards";
import Dropdown from "./partials/Dropdown";
import Topnav from "./partials/Topnav";



const Popular = ()=>{
  document.title = "SCSDB | Popular";

  const navigate = useNavigate();
  const[category,setcategory] = useState("movie");
  const[popular,setpopular] = useState([]);
  const[page,setpage] = useState(1);
  const[hasMore,sethasMore] = useState(true);

  const GetPopular = async()=>{
    try{
      const {data} = await axios.get(`${category}/popular?page=${page}`);

      if(data.results.length > 0){
        // setpopular(data.results);
        setpopular((prevState) =>[...prevState,...data.results]);
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
    if(popular.length ===0){
      GetPopular();
    }else{
      setpage(1);
      setpopular([]);
      GetPopular();
    }
  };

  useEffect(()=>{
    refreshHandler()
  },[category])

  return popular.length >0 ?(
    <div className="w-full  h-full">


        <div className=" w-full  flex items-center justify-between ">
          <Link></Link>
          <h1 className=" text-2xl font-semibold text-zinc-400">
          <i onClick={()=>navigate(-1)} className="hover:text-[#6556CD] ri-arrow-left-line"></i>{" "}
          Popular
            </h1>

            <div className="flex items-center w-[80%]">
            <Topnav/>
            <Dropdown title="Category" options={["movie","tv","all"]} func={(e)=>setcategory(e.target.value)}/>
            <div className="w-[2%]"></div>
           
            </div>
        </div>

        <InfiniteScroll
        dataLength={popular.length}
        next={GetPopular}
        hasMore={hasMore}
         loader ={<h1>Loading...</h1>}
        >
        <Cards data={popular} title={category}/>
        </InfiniteScroll>


    </div>
  ):(
    <Loading/>
  )
}

export default Popular;