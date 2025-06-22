import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";

const Sidenav = ({ open, setOpen }) => {
  const location = useLocation();

  // Close menu when clicking outside or on link
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [setOpen]);

  const handleLinkClick = () => {
    if (window.innerWidth < 768) {
      setOpen(false);
    }
  };

  // Only show hamburger on home page
  const showHamburger = location.pathname === "/";

  return (
    <>
      {/* Hamburger button for mobile - Fixed positioning and z-index */}
      {showHamburger && (
        <button
          className="md:hidden absolute top-2.5 left-3 z-[60] p-2 bg-[#1F1E24] rounded-lg text-white focus:outline-none shadow-lg border border-zinc-600"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <RxHamburgerMenu size={25} />
        </button>
      )}

      {/* Overlay for mobile menu */}
      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-[45] md:hidden"
          onClick={() => setOpen(false)}
        ></div>
      )}

      <aside
        className={`h-screen border-r-2 border-zinc-300 bg-[#1F1E24] w-[70vw] max-w-[320px] md:w-[19vw] md:max-w-[420px] p-13 md:p-10 flex flex-col fixed z-[50] top-0 left-0 overflow-y-auto transition-all duration-300 ease-in-out ${
          open ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <h1 className="text-2xl text-white font-bold mb-6 flex items-center">
          <i className="ri-tv-fill text-[#6556CD] mr-2 text-2xl md:text-3xl"></i>
          <span>SCSDB.</span>
        </h1>
        <nav className="flex flex-col text-zinc-400 text-xl gap-3">
          <h1 className="text-white font-semibold text-xl mt-10 mb-5">
            New Feeds
          </h1>
          <Link
            to="/trending"
            onClick={handleLinkClick}
            className="hover:bg-[#6556CD] hover:text-white rounded-lg duration-300 p-5"
          >
            <i className="mr-1 ri-fire-fill"></i> Trending
          </Link>
          <Link
            to="/popular"
            onClick={handleLinkClick}
            className="hover:bg-[#6556CD] hover:text-white rounded-lg duration-300 p-5"
          >
            <i className="mr-1 ri-bard-fill"></i> Popular
          </Link>
          <Link
            to="/movie"
            onClick={handleLinkClick}
            className="hover:bg-[#6556CD] hover:text-white rounded-lg duration-300 p-5"
          >
            <i className="mr-2 ri-movie-2-fill"></i>Movies
          </Link>
          <Link
            to="/tv"
            onClick={handleLinkClick}
            className="hover:bg-[#6556CD] hover:text-white rounded-lg duration-300 p-5"
          >
            <i className="mr-2 ri-tv-2-fill"></i>Tv Shows
          </Link>
          <Link
            to="/person"
            onClick={handleLinkClick}
            className="hover:bg-[#6556CD] hover:text-white rounded-lg duration-300 p-5"
          >
            <i className="mr-2 ri-team-fill"></i>People
          </Link>
        </nav>
        
        {/* HR Line */}
        <hr className="border-none my-4 h-[1px] bg-zinc-200 w-full self-center" />
        
        <nav className="flex flex-col text-zinc-400 text-xl gap-3">
          <h1 className="text-white font-semibold text-xl mt-10 mb-5">
            Website Information
          </h1>
          <Link
            to="/about"
            onClick={handleLinkClick}
            className="hover:bg-[#6556CD] hover:text-white rounded-lg duration-300 p-5"
          >
            <i className="mr-1 ri-information-2-fill"></i> About
          </Link>
          <Link
            to="/contactus"
            onClick={handleLinkClick}
            className="hover:bg-[#6556CD] hover:text-white rounded-lg duration-300 p-5"
          >
            <i className="mr-1 ri-phone-fill"></i> Contact Us
          </Link>
        </nav>
      </aside>
    </>
  );
};

export default Sidenav;