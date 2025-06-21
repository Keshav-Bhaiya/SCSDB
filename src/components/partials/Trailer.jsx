import React from "react";
import ReactPlayer from "react-player";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import NotFound from "../../components/NotFound";

const Trailer = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const category = pathname.includes("movie") ? "movie" : "tv";
  const ytvideo = useSelector((state) => state[category].info.videos);

  return (
    <div className="absolute z-[100] bg-[rgba(0,0,0,0.9)] top-0 left-0 w-screen h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <Link 
        onClick={() => navigate(-1)} 
        className="text-2xl sm:text-3xl text-white right-[3%] sm:right-[5%] top-[3%] sm:top-[5%] absolute hover:text-[#6556CD] ri-close-fill z-10"
      >
      </Link>
      
      {ytvideo ? (
        <div className="w-full h-full max-w-[95vw] max-h-[85vh] sm:max-w-[90vw] sm:max-h-[80vh] lg:max-w-[1200px] lg:max-h-[650px] aspect-video">
          <ReactPlayer 
            controls 
            width="100%"
            height="100%"
            url={`https://www.youtube.com/watch?v=${ytvideo.key}`}
            config={{
              youtube: {
                playerVars: {
                  modestbranding: 1,
                  rel: 0,
                  showinfo: 0
                }
              }
            }}
          />
        </div>
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <NotFound />
        </div>
      )}
    </div>
  );
};

export default Trailer;