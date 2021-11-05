import React from "react"
import { NavLink } from "react-router-dom"
import Transition from "../utils/Transition"
import * as Io5Icons from "react-icons/io5"
import { NAV_ITEMS } from "../utils/config"

function Sidebar({ isOpen, toggle }) {
  const handleChangeLink = (e) => {
    // console.log(window.location.pathname);
    // console.log(window.location.href);
    // console.log(e.target.getAttribute("href"));
    let pathCurrent = window.location.pathname;
    let pathClick = e.target.getAttribute("href");

    if (pathClick !== pathCurrent) {
      window.scrollTo(0, 0);
      // console.log("To Top");
    }
    toggle();
  };

  return (
    <div className="overflow-auto">
      <Transition
        appear={true}
        show={isOpen}
        enter="duration-500"
        enterFrom="opacity-0"
        enterTo="opacity-50"
        leave="duration-500"
        leaveFrom="opacity-50"
        leaveTo="opacity-0"
      >
        <div
          onClick={toggle}
          className="fixed z-50 inset-0 bg-white bg-opacity-40 transition transform ease-in-out"
        />
      </Transition>

      <Transition
        appear={true}
        show={isOpen}
        enter="duration-500"
        enterFrom="translate-x-full"
        enterTo="translate-x-0"
        leave="duration-500"
        leaveFrom="translate-x-0"
        leaveTo="translate-x-full"
      >
        <aside className="fixed z-50 h-full w-3/5 bg-gray-800 shadow-lg flex flex-col right-0 transition transform ease-in-out text-white">
          <div className="flex items-center justify-end m-4 px-2">
            <button
              className="cursor-pointer text-shadow-md text-3xl leading-none rounded-lg bg-transparent block outline-none sm:hidden transition duration-300 hover:bg-yellow-800 focus:outline-none focus:text-white"
              type="button"
              onClick={toggle}
            >
              <Io5Icons.IoCloseSharp />
            </button>
          </div>
          <nav className="flex flex-col flex-grow">
            {NAV_ITEMS.map((item, index) => {
              return (
                <NavLink
                  onClick={(e) => handleChangeLink(e)}
                  key={index}
                  to={item.path}
                  exact={item.exact}
                  className="inline-block ml-4 my-1 px-2 py-1 text-sm text-white text-shadow-md rounded-l-md font-normal no-underline outline-none transition duration-300 ease-in-out hover:bg-gray-600"
                  activeClassName="bg-yellow-800 font-semibold hover:bg-yellow-800"
                >
                  {item.title}
                </NavLink>
              );
            })}
          </nav>
        </aside>
      </Transition>
    </div>
  
  );
}

export default Sidebar;
