import React from "react";
import * as FaIcons from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
import { PokeballImage } from "../assets/images";
import { APP_NAME, NAV_ITEMS } from "../utils/config";

function Navbar({ toggle, isChangeColor }) {
  const handleChangeLink = (e) => {
    // console.log(window.location.pathname);
    // console.log(window.location.href);
    // console.log(e.target.getAttribute("href"));
    let pathCurrent = window.location.pathname;
    let pathClick = e.target.getAttribute("href");

    if (pathClick !== pathCurrent) {
      window.scrollTo(0, 0);
    }
    
  };

  return (
    <>
      <nav
        className={`top-0 fixed z-50 w-full transition duration-300 flex flex-wrap px-2 py-3 ${
          isChangeColor ? "bg-gray-800" : "bg-transparent"
        }`}
      >
        <div className="container lg:w-4/5 px-4 mx-auto flex flex-wrap justify-between items-center">
          <div className="w-full relative flex items-center justify-between text-white">
            <div className="flex-shrink-0 flex items-center ">
              <Link
                className="flex space-x-2 text-shadow-md text-sm sm:text-base font-medium sm:font-semibold items-center leading-relaxed mr-4 whitespace-nowrap uppercase outline-none focus:outline-none"
                to="/"
              >
                <img
                  className="h-10 sm:h-12 w-auto"
                  src={PokeballImage}
                  alt="icon-logo"
                />
                <span>{APP_NAME}</span>
              </Link>
            </div>

            <button
              className="cursor-pointer text-shadow-md text-xl leading-none p-2 rounded-lg hidden outline-none sm:hidden transition duration-300 hover:bg-yellow-800 focus:outline-none focus:text-white"
              type="button"
              onClick={toggle}
            >
              <FaIcons.FaBars />
            </button>

            <div className="flex-row ml-auto block sm:block">
              {NAV_ITEMS.map((item, index) => {
                return (
                  <NavLink
                    onClick={(e) => handleChangeLink(e)}
                    key={index}
                    to={item.path}
                    exact={item.exact}
                    className="inline-block mx-2 my-1 px-2 py-1 text-base text-white text-shadow-lg font-medium no-underline outline-none rounded-sm text-center border-yellow-800 border-opacity-0 transition duration-300 ease-in-out border-b-2 hover:border-opacity-75"
                    activeClassName="bg-opacity-100 border-opacity-100 font-semibold hover:border-opacity-100"
                  >
                    {item.title}
                  </NavLink>
                );
              })}
            </div>
          </div>
        </div>
      
      </nav>
    </>
  );
}

export default Navbar;
