import React, { useState, useEffect } from "react";

const About = () => {
  document.title = "SCSDB | About";
  
  // const navigate = useNavigate(); // Uncomment when using with React Router
  const [activeSection, setActiveSection] = useState("overview");

  const features = [
    "Search millions of movies and TV shows",
    "Detailed information about cast and crew",
    "High-quality movie posters and backdrops",
    "User ratings and reviews",
    "Trending and popular content",
    "Genre-based filtering",
    "Real-time data updates",
    "Mobile-responsive design"
  ];

  const stats = [
    { number: "1M+", label: "Movies" },
    { number: "200K+", label: "TV Shows" },
    { number: "500K+", label: "People" },
    { number: "24/7", label: "Updates" }
  ];

  const techStack = [
    "React.js", "JavaScript", "TMDB API", "CSS3", "HTML5", "Vercel", "REST API"
  ];

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-[#1F1A40] via-[#2D1B69] to-[#6556CD]">
      
      {/* Header Section */}
      <div className="w-full flex items-center justify-between px-[5%] py-4 bg-black/20 backdrop-blur-sm">
        {/* <Link></Link> Uncomment when using with React Router */}
        <h1 className="text-2xl font-semibold text-zinc-400">
          <i 
            onClick={() => window.history.back()} // Replace with navigate(-1) when using React Router
            className="hover:text-[#6556CD] ri-arrow-left-line cursor-pointer"
          ></i>{" "}
          About SCSDB
        </h1>
        <div className="flex items-center w-[80%]">
          {/* <Topnav /> Uncomment when using with your Topnav component */}
        </div>
      </div>

      {/* Main Content */}
      <div className="px-[5%] py-8">
        
        {/* Hero Section */}
        <div className="text-center py-16 text-white mb-12">
          <div className="relative">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-[#6556CD] to-[#FF6B9D] bg-clip-text text-transparent">
              About SCSDB
            </h1>
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-32 h-32 bg-gradient-to-r from-[#6556CD]/20 to-[#FF6B9D]/20 rounded-full blur-3xl"></div>
          </div>
          <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto leading-relaxed text-gray-300">
            Your ultimate destination for discovering movies, TV shows, and entertainment content. 
            Powered by comprehensive data and built with modern web technologies.
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex justify-center mb-12">
          <div className="bg-black/30 backdrop-blur-lg rounded-full p-2 flex gap-2">
            {['overview', 'features', 'tech'].map((section) => (
              <button
                key={section}
                onClick={() => setActiveSection(section)}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 capitalize ${
                  activeSection === section
                    ? 'bg-[#6556CD] text-white shadow-lg'
                    : 'text-gray-400 hover:text-white hover:bg-white/10'
                }`}
              >
                {section}
              </button>
            ))}
          </div>
        </div>

        {/* Content Sections */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          
          {/* What is SCSDB */}
          <div className="bg-gradient-to-br from-black/40 to-black/20 backdrop-blur-lg rounded-2xl p-8 border border-white/10 hover:border-[#6556CD]/50 transition-all duration-500 hover:transform hover:-translate-y-2">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-[#6556CD] to-[#FF6B9D] rounded-xl flex items-center justify-center text-white text-2xl mr-4">
                🎬
              </div>
              <h2 className="text-2xl font-bold text-white">What is SCSDB?</h2>
            </div>
            <p className="text-gray-300 mb-4 leading-relaxed">
              SCSDB (Smart Cinema Streaming Database) is a comprehensive movie and TV show discovery platform 
              that helps you explore, search, and learn about your favorite entertainment content.
            </p>
            <p className="text-gray-300 leading-relaxed">
              Built with React and powered by The Movie Database (TMDB) API, we provide up-to-date 
              information about movies, TV series, cast members, and much more.
            </p>
          </div>

          {/* Features */}
          <div className="bg-gradient-to-br from-black/40 to-black/20 backdrop-blur-lg rounded-2xl p-8 border border-white/10 hover:border-[#FF6B9D]/50 transition-all duration-500 hover:transform hover:-translate-y-2">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-[#FF6B9D] to-[#FFD93D] rounded-xl flex items-center justify-center text-white text-2xl mr-4">
                ⭐
              </div>
              <h2 className="text-2xl font-bold text-white">Key Features</h2>
            </div>
            <ul className="space-y-3">
              {features.map((feature, index) => (
                <li key={index} className="flex items-start group">
                  <span className="text-[#6556CD] font-bold mr-3 mt-1 group-hover:text-[#FF6B9D] transition-colors duration-300">✓</span>
                  <span className="text-gray-300 group-hover:text-white transition-colors duration-300">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="bg-gradient-to-br from-[#6556CD] via-[#FF6B9D] to-[#FFD93D] text-white rounded-2xl p-6 text-center shadow-2xl hover:shadow-[#6556CD]/25 transition-all duration-500 hover:scale-105 group"
            >
              <div className="text-3xl md:text-4xl font-bold mb-2 group-hover:scale-110 transition-transform duration-300">
                {stat.number}
              </div>
              <div className="text-sm md:text-base opacity-90 uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* API Information */}
        <div className="bg-gradient-to-r from-black/60 to-black/40 backdrop-blur-lg text-white rounded-2xl p-8 mb-12 border border-white/10 hover:border-blue-500/50 transition-all duration-500">
          <h3 className="text-2xl font-bold text-[#FFD93D] mb-4 flex items-center">
            <span className="mr-3 text-3xl">🔌</span>
            Powered by TMDB API
          </h3>
          <p className="text-gray-300 mb-6 leading-relaxed">
            Our data is sourced from The Movie Database (TMDB), one of the most comprehensive 
            and reliable movie and TV show databases available. TMDB provides real-time updates, 
            high-quality images, and detailed metadata for millions of titles.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <a 
              href="https://www.themoviedb.org/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-[#01b4e4] to-[#0194c4] hover:from-[#0194c4] hover:to-[#01b4e4] text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              Visit TMDB
            </a>
            <span className="text-gray-400 text-sm">
              This product uses the TMDB API but is not endorsed or certified by TMDB.
            </span>
          </div>
        </div>

        {/* Technology Stack */}
        <div className="bg-gradient-to-br from-black/40 to-black/20 backdrop-blur-lg rounded-2xl p-8 mb-12 border border-white/10 hover:border-green-500/50 transition-all duration-500">
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
            <span className="mr-3 text-3xl">🛠️</span>
            Built With Modern Technology
          </h3>
          <p className="text-gray-300 mb-6 leading-relaxed">
            SCSDB is built using cutting-edge web technologies to ensure fast performance, 
            responsive design, and an excellent user experience across all devices.
          </p>
          <div className="flex flex-wrap gap-3">
            {techStack.map((tech, index) => (
              <span 
                key={index}
                className="bg-gradient-to-r from-[#6556CD]/20 to-[#FF6B9D]/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium border border-white/20 hover:border-[#6556CD]/50 hover:bg-[#6556CD]/30 transition-all duration-300 hover:scale-105"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Mission Statement */}
        <div className="bg-gradient-to-br from-black/40 to-black/20 backdrop-blur-lg rounded-2xl p-8 mb-12 border border-white/10 hover:border-purple-500/50 transition-all duration-500">
          <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
            <span className="mr-3 text-3xl">🎯</span>
            Our Mission
          </h3>
          <p className="text-gray-300 text-lg leading-relaxed">
            To make movie and TV show discovery simple, enjoyable, and accessible to everyone. 
            We believe that great entertainment brings people together, and our platform aims to 
            help you find your next favorite film or series with ease.
          </p>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-gradient-to-br from-black/50 to-black/30 backdrop-blur-lg rounded-2xl p-10 border border-white/10 hover:border-[#6556CD]/50 transition-all duration-500">
          <h3 className="text-3xl font-bold text-white mb-4">Start Exploring Today!</h3>
          <p className="text-gray-300 mb-8 text-lg">
            Discover your next favorite movie or TV show. Search, explore, and dive into the world of entertainment.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button 
              onClick={() => console.log('Navigate to movies')} // Replace with navigate('/movie') when using React Router
              className="bg-gradient-to-r from-[#6556CD] to-[#FF6B9D] hover:from-[#FF6B9D] hover:to-[#6556CD] text-white px-8 py-3 rounded-full font-semibold text-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#6556CD]/50"
            >
              Browse Movies
            </button>
            <button 
              onClick={() => console.log('Navigate to TV shows')} // Replace with navigate('/tv') when using React Router
              className="bg-gradient-to-r from-[#FF6B9D] to-[#FFD93D] hover:from-[#FFD93D] hover:to-[#FF6B9D] text-white px-8 py-3 rounded-full font-semibold text-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#FF6B9D]/50"
            >
              Explore TV Shows
            </button>
          </div>
        </div>

        {/* Footer Note */}
        <div className="text-center mt-12">
          <p className="text-gray-400 text-sm bg-black/20 backdrop-blur-sm rounded-full px-6 py-3 inline-block border border-white/10">
            Made with <span className="text-red-500 animate-pulse">❤️</span> for movie and TV show enthusiasts everywhere
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;