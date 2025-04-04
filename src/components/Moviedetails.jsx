import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncloadmovie,removemovie } from "../store/actions/movieActions";
import { Link, Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import Loading from "./Loading";
import HorizontalCards from "./partials/HorizontalCards"


const Moviedetails = ()=>{
  const{pathname} = useLocation();
  const navigate = useNavigate();
  const {id} = useParams();
  const{info} = useSelector(state=>state.movie);
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(asyncloadmovie(id));
    return ()=>{
    dispatch(removemovie());
    };
  },[id]);


  return info ?(
    <div style={{
      background: `linear-gradient(rgba(0,0,0,0.4),rgba(0,0,0,0.7),rgba(0,0,0,0.9)),url(https://image.tmdb.org/t/p/original/${
          info.detail.backdrop_path
          })`,
          backgroundPosition:"center",
          backgroundSize:"cover"
    }} className="relative w-full h-[180vh] px-[10%] ">

      {/* Part1 */}
        <nav className="w-full h-[10vh] items-center  text-zinc-100 flex gap-10 text-xl">

        <Link onClick={()=>navigate(-1)} className="hover:text-[#6556CD] ri-arrow-left-line">
        </Link>{" "}

        <a target="_blank" href={info.detail.homepage}>
          <i className="ri-external-link-fill"></i>
        </a>

        <a target="_blank" href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`}>
        <i target="_blank" className="ri-earth-fill"></i>
        </a>
       
        <a href={`https://www.imdb.com/title/${info.externalid.imdb_id}`}>
          imdb
          </a>


        </nav>

        {/* Part2 Poster and details */}
        <div className="w-full flex ">
        <img  className="shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)] h-[50vh] object-cover" src={`https://image.tmdb.org/t/p/original/${
          info.detail.poster_path || info.detail.backdrop_path 
          }`} alt="" /> 

        <div className="content ml-[5%] text-white"> 
        <h1 className="text-6xl  text-white font-black">{info.detail.name || 
        info.detail.title || 
        info.detail.original_name || 
        info.detail.original_title
        }
        <small className="text-2xl font-bold text-zinc-200 ml-2 ">
          ({info.detail.release_date.split("-")[0]})
          </small>
        </h1>

        <div className="mt-4 mb-6 flex items-center gap-x-5 ">
        <span className="text-white text-xl font-semibold w-[6vh] h-[6vh] flex justify-center rounded-full items-center bg-yellow-600">
          {(info.detail.vote_average*10).toFixed()}<sup>%</sup>
          </span>

          <h1 className="font-semibold text-2xl w-[60px] leading-6">User Score</h1>
          <h1 className="">{info.detail.release_date}</h1>
          <h1>{info.detail.genres.map((g)=>g.name).join(",")}</h1>
          <h1>{info.detail.runtime}min</h1>
        </div>

        <h1 className="text-xl font-semibold  italic">{info.detail.tagline}</h1>

        <h1 className="text-xl font mt-4 mb-2 ">Overview</h1>
        <p>{info.detail.overview}</p>

        <h1 className="text-xl font mt-4 mb-2 ">Movie Translations</h1>
        <p className="mb-7">{info.translations.join(" , ")}</p>

        <Link className=" rounded-lg py-3 px-5 bg-[#6556CD]" to={`${pathname}/trailer`}>
        <i className="text-xl mr-2 ri-play-fill"></i>
        Play Trailer
        </Link>

         
          </div>       
        </div>


          {/* Part3 Available on Platforms */}
        <div className="w-[80%] flex flex-col gap-y-5 mt-10">
          

            {info.watchproviders && info.watchproviders.buy && (
            <div className="flex gap-x-10 items-center text-white">
              <h1>Available on Buy</h1>
             {info.watchproviders.buy.map((w,i)=> (<img key={i}  title={w.provider_name} className="w-[5vh] h-[5vh] object-cover rounded-md" src={`https://image.tmdb.org/t/p/original/${
              w.logo_path
              }`}  alt=""
              />))}
            </div> )}

            {info.watchproviders && info.watchproviders.rent && (
            <div className="flex gap-x-10 items-center text-white">
              <h1>Available on Rent</h1>
             {info.watchproviders.rent.map((w,i)=> (<img key={i} title={w.provider_name} className="w-[5vh] h-[5vh] object-cover rounded-md" src={`https://image.tmdb.org/t/p/original/${
              w.logo_path
              }`}  alt=""
              />))}
            </div> )}

             
            {info.watchproviders && info.watchproviders.flatrate && (
            <div className="flex gap-x-10 items-center text-white">
              <h1>Available on Platforms</h1>
             {info.watchproviders.flatrate.map((w,i)=> (<img key={i} title={w.provider_name} className="w-[5vh] h-[5vh] object-cover rounded-md" src={`https://image.tmdb.org/t/p/original/${
              w.logo_path
              }`}  alt=""
              />))}
            </div> )}
             
          
          </div>

          {/* Part 4 Recommendations and Similar Stuff */}
          <hr className="bg-zinc-500 mt-10 border-none h-[1px]" />
          <h1 className="text-3xl mt-8 font-bold text-white ">
            Recommendations & Similar Stuff
            </h1>
          <HorizontalCards 
           data =  {info.recommendations.length >0 ? info.recommendations : info.similar}
          />

    <Outlet/>
    </div>
  ):(
    <Loading/>
  );
}

export default Moviedetails;