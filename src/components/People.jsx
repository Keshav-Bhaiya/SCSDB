import React from "react";
import { useState,useEffect } from "react";
import { Link,useNavigate } from "react-router-dom";
import axios from "../utils/axios";
import InfiniteScroll from 'react-infinite-scroll-component';
import Loading from "./Loading";
import Cards from "./partials/Cards";
import Dropdown from "./partials/Dropdown";
import Topnav from "./partials/Topnav";

const People = ()=>{
  document.title = "SCSDB | People";

  const navigate = useNavigate();
  const[category,setcategory] = useState("popular");
  const[person,setperson] = useState([]);
  const[page,setpage] = useState(1);
  const[hasMore,sethasMore] = useState(true);

  const GetPerson = async()=>{
    try{
      const {data} = await axios.get(`/person/${category}?page=${page}`);

      if(data.results.length > 0){
        // setperson(data.results);
        setperson((prevState) =>[...prevState,...data.results]);
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
    if(person.length ===0){
      GetPerson();
    }else{
      setpage(1);
      setperson([]);
      GetPerson();
    }
  };

  useEffect(()=>{
    refreshHandler()
  },[category])
  return person.length >0 ?(
    <div className="w-full  h-full">


        <div className=" w-full  flex items-center justify-between ">
          <Link></Link>
          <h1 className=" text-2xl font-semibold text-zinc-400">
          <i onClick={()=>navigate(-1)} className="hover:text-[#6556CD] ri-arrow-left-line"></i>{" "}
          People 
            </h1>

            <div className="flex items-center w-[80%]">
            <Topnav/>
            
            <div className="w-[2%]"></div>
           
            </div>
        </div>

        <InfiniteScroll
        dataLength={person.length}
        next={GetPerson}
        hasMore={hasMore}
         loader ={<h1>Loading...</h1>}
        >
        <Cards data={person} title="person"/>
        </InfiniteScroll>


    </div>
  ):(
    <Loading/>
  )
}
export default People