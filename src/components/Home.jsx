import React, { useEffect, useState } from "react";
import Sidenav from "./partials/Sidenav";
import Topnav from "./partials/Topnav";
import axios from "../utils/axios";
import Header from "./partials/Header";
import HorizontalCards from "./partials/HorizontalCards";
import Dropdown from "./partials/Dropdown";
import Loading from "./Loading";
import Footer from "./Footer";

const Home = () => {
  document.title = "SCSDB | Homepage";

  const [wallpaper, setwallpaper] = useState(null);
  const [trending, settrending] = useState(null);
  const [popular, setpopular] = useState(null);
  const [topRated, settopRated] = useState(null);
  const [upcoming, setupcoming] = useState(null);
  const [category, setcategory] = useState("all");
  const [sidenavOpen, setSidenavOpen] = useState(false); // Add sidebar state

  const GetHeaderWallpaper = async () => {
    try {
      const { data } = await axios.get(`/trending/all/day`);
      let randomdata = data.results[(Math.random() * data.results.length).toFixed()];
      setwallpaper(randomdata);
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  const GetTrending = async () => {
    try {
      const { data } = await axios.get(`/trending/${category}/day`);
      settrending(data.results);
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  const GetPopular = async () => {
    try {
      const { data } = await axios.get(`/movie/popular`);
      setpopular(data.results);
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  const GetTopRated = async () => {
    try {
      const { data } = await axios.get(`/movie/top_rated`);
      settopRated(data.results);
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  const GetUpcoming = async () => {
    try {
      const { data } = await axios.get(`/movie/upcoming`);
      setupcoming(data.results);
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  useEffect(() => {
    GetTrending();
    GetPopular();
    GetTopRated();
    GetUpcoming();
    !wallpaper && GetHeaderWallpaper();
  }, [category]);

  if (!(wallpaper && trending)) {
    return (
      <h1>
        <Loading />
      </h1>
    );
  }

  return (
    <div className="flex flex-col md:flex-row w-full h-full min-h-screen">
      {/* Sidenav: Pass open state and setter */}
      <div className="hidden md:block md:w-[20%] h-full">
        <Sidenav open={sidenavOpen} setOpen={setSidenavOpen} />
      </div>
      
      {/* Mobile Sidenav */}
      <div className="md:hidden">
        <Sidenav open={sidenavOpen} setOpen={setSidenavOpen} />
      </div>
      
      {/* Main content: full width on mobile, 80% on md+ */}
      <div className="w-full md:w-[80%] h-full overflow-auto overflow-x-hidden p-0 m-0">
        <Topnav />
        <Header data={wallpaper} />
        
        {/* Trending Section */}
        <div className="p-3 md:p-5 flex flex-col md:flex-row md:justify-between md:items-center gap-3">
          <h1 className="text-2xl md:text-3xl font-semibold text-zinc-400">Trending</h1>
          <Dropdown
            title="Filter"
            options={["tv", "movie", "all"]}
            func={(e) => setcategory(e.target.value)}
          />
        </div>
        <HorizontalCards data={trending} />

        {/* Popular Movies Section */}
        {popular && (
          <>
            <div className="p-3 md:p-5 pt-8 md:pt-10">
              <h1 className="text-2xl md:text-3xl font-semibold text-zinc-400 mb-3">
                Popular Movies
              </h1>
              
            </div>
            <HorizontalCards data={popular} />
          </>
        )}

        {/* Top Rated Movies Section */}
        {topRated && (
          <>
            <div className="p-3 md:p-5 pt-8 md:pt-10">
              <h1 className="text-2xl md:text-3xl font-semibold text-zinc-400 mb-3">
                Top Rated Movies
              </h1>
              
            </div>
            <HorizontalCards data={topRated} />
          </>
        )}

        {/* Upcoming Movies Section */}
        {upcoming && (
          <>
            <div className="p-3 md:p-5 pt-8 md:pt-10">
              <h1 className="text-2xl md:text-3xl font-semibent text-zinc-400 mb-3">
                Upcoming Releases
              </h1>
              
            </div>
            <HorizontalCards data={upcoming} />
          </>
        )}

        {/* Additional Content Sections */}
        <div className="p-3 md:p-5 pt-8 md:pt-10">
          <h1 className="text-2xl md:text-3xl font-semibold text-zinc-400 mb-3">
            About SCSDB
          </h1>
          <div className="bg-gradient-to-r from-zinc-800/50 to-zinc-700/30 rounded-lg p-4 mb-4">
            <div className="text-zinc-300 text-sm md:text-base leading-relaxed space-y-4 break-words">
              <p>
                Welcome to SCSDB (Screen Cinema Database), your ultimate destination for 
                discovering and exploring the world of movies and television. Our platform 
                brings together comprehensive information about the latest releases, timeless 
                classics, and everything in between.
              </p>
              <p className="text-zinc-400 text-xs md:text-sm">
                Whether you're looking for trending content, critically acclaimed masterpieces, 
                or upcoming releases, SCSDB provides you with detailed information, ratings, 
                and insights to help you make informed viewing decisions. Our curated collections 
                ensure you never miss out on the content that matters most to you.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4 text-center">
                <div className="bg-zinc-700/40 p-3 rounded-lg">
                  <div className="text-2xl font-bold text-blue-400">50K+</div>
                  <div className="text-xs text-zinc-400">Movies & Shows</div>
                </div>
                <div className="bg-zinc-700/40 p-3 rounded-lg">
                  <div className="text-2xl font-bold text-green-400">1M+</div>
                  <div className="text-xs text-zinc-400">User Reviews</div>
                </div>
                <div className="bg-zinc-700/40 p-3 rounded-lg">
                  <div className="text-2xl font-bold text-purple-400">24/7</div>
                  <div className="text-xs text-zinc-400">Updated Database</div>
                </div>
              </div>
            </div>
          </div>
          <div className="text-zinc-400 text-xs md:text-sm leading-relaxed break-words">
            <p>
              Explore our extensive database featuring thousands of movies and TV shows, 
              complete with cast information, plot summaries, user ratings, and professional 
              reviews. Join our community of entertainment enthusiasts and discover your 
              next favorite film or series. Our advanced recommendation engine learns from 
              your preferences to suggest personalized content that matches your taste.
            </p>
          </div>
        </div>

        {/* Features Section */}
        <div className="p-3 md:p-5 pt-8 md:pt-10">
          <h1 className="text-2xl md:text-3xl font-semibold text-zinc-400 mb-3">
            Platform Features
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            <div className="bg-gradient-to-br from-zinc-800 to-zinc-800/70 rounded-lg p-4 border border-zinc-700/50 hover:border-zinc-600/50 transition-all duration-300">
              <div className="flex items-center mb-2">
                <div className="w-8 h-8 bg-red-500/20 rounded-full flex items-center justify-center mr-3">
                  <span className="text-red-400 text-sm">🔥</span>
                </div>
                <h3 className="text-lg font-semibold text-zinc-300">Trending Content</h3>
              </div>
              <p className="text-zinc-500 text-sm leading-relaxed break-words mb-2">
                Stay updated with the latest trending movies and TV shows that are 
                capturing audiences worldwide.
              </p>
              <div className="text-xs text-zinc-400">
                Real-time trending algorithms • Daily updates • Global trends
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-zinc-800 to-zinc-800/70 rounded-lg p-4 border border-zinc-700/50 hover:border-zinc-600/50 transition-all duration-300">
              <div className="flex items-center mb-2">
                <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center mr-3">
                  <span className="text-blue-400 text-sm">📚</span>
                </div>
                <h3 className="text-lg font-semibold text-zinc-300">Curated Collections</h3>
              </div>
              <p className="text-zinc-500 text-sm leading-relaxed break-words mb-2">
                Discover carefully curated collections of popular, top-rated, and 
                upcoming releases.
              </p>
              <div className="text-xs text-zinc-400">
                Expert curation • Quality assurance • Diverse categories
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-zinc-800 to-zinc-800/70 rounded-lg p-4 border border-zinc-700/50 hover:border-zinc-600/50 transition-all duration-300">
              <div className="flex items-center mb-2">
                <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center mr-3">
                  <span className="text-green-400 text-sm">🔍</span>
                </div>
                <h3 className="text-lg font-semibold text-zinc-300">Advanced Filtering</h3>
              </div>
              <p className="text-zinc-500 text-sm leading-relaxed break-words mb-2">
                Use our advanced filtering options to find exactly what you're 
                looking for across different categories.
              </p>
              <div className="text-xs text-zinc-400">
                Multi-criteria search • Smart filters • Instant results
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-zinc-800 to-zinc-800/70 rounded-lg p-4 border border-zinc-700/50 hover:border-zinc-600/50 transition-all duration-300">
              <div className="flex items-center mb-2">
                <div className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center mr-3">
                  <span className="text-purple-400 text-sm">📊</span>
                </div>
                <h3 className="text-lg font-semibold text-zinc-300">Detailed Information</h3>
              </div>
              <p className="text-zinc-500 text-sm leading-relaxed break-words mb-2">
                Access comprehensive details about cast, crew, ratings, and plot 
                summaries for informed viewing.
              </p>
              <div className="text-xs text-zinc-400">
                Complete filmography • Cast details • Critical reviews
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-zinc-800 to-zinc-800/70 rounded-lg p-4 border border-zinc-700/50 hover:border-zinc-600/50 transition-all duration-300">
              <div className="flex items-center mb-2">
                <div className="w-8 h-8 bg-orange-500/20 rounded-full flex items-center justify-center mr-3">
                  <span className="text-orange-400 text-sm">📱</span>
                </div>
                <h3 className="text-lg font-semibold text-zinc-300">Responsive Design</h3>
              </div>
              <p className="text-zinc-500 text-sm leading-relaxed break-words mb-2">
                Enjoy a seamless experience across all devices with our fully 
                responsive design.
              </p>
              <div className="text-xs text-zinc-400">
                Mobile-first • Cross-platform • Optimized performance
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-zinc-800 to-zinc-800/70 rounded-lg p-4 border border-zinc-700/50 hover:border-zinc-600/50 transition-all duration-300">
              <div className="flex items-center mb-2">
                <div className="w-8 h-8 bg-cyan-500/20 rounded-full flex items-center justify-center mr-3">
                  <span className="text-cyan-400 text-sm">🔄</span>
                </div>
                <h3 className="text-lg font-semibold text-zinc-300">Regular Updates</h3>
              </div>
              <p className="text-zinc-500 text-sm leading-relaxed break-words mb-2">
                Our database is constantly updated with the latest releases and 
                information from the entertainment industry.
              </p>
              <div className="text-xs text-zinc-400">
                Live updates • Industry partnerships • Fresh content daily
              </div>
            </div>
          </div>
        </div>

        {/* Footer Section */}
        
           <Footer />
           <div className="p-3 md:p-5 pt-8 md:pt-10 pb-8 md:pb-12">
          <div className="border-t border-zinc-700 pt-6">
            <div className="text-center text-zinc-500 text-sm leading-relaxed break-words">
              <p className="mb-2">
                © 2025 SCSDB - Your Ultimate Entertainment Database
              </p>
              <p>
                Discover, explore, and enjoy the best in movies and television. 
                Stay connected with the latest in entertainment.
              </p>
            </div>
          </div>
        </div>
      </div>
   
    </div>
  );
};

export default Home;