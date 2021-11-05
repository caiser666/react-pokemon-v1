import React from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import Transition from "../utils/Transition";
import * as Io5Icons from "react-icons/io5";
import { Link } from "react-router-dom";
import { getLocalStorage, local } from "../utils/helper";

function MyList() {
  let sm, md, lg, xl;
  var myPokemonList = getLocalStorage(local.POKEMON);
  let list = [];

  if (myPokemonList !== null) {
    list = JSON.parse(myPokemonList);
  }
  
  sm = md = lg = xl = 1;

  // console.log(list);

  if (list.length > 0) {
    if (list.length === 2) {
      md = lg = xl = 2;
    } else if (list.length >= 3) {
      md = 2;
      lg = xl = 3;
    }
  } else {
    return null;
  }

  return (
    <>
      <main className="w-full py-12 min-h-screen">
        <section className="container px-4 mx-auto mt-4">
          <div className="flex flex-wrap justify-center items-center text-white">
            <span className="text-xl sm:text-2xl text-shadow-lg font-semibold p-2 border-b-2 uppercase border-yellow-800">
              My Pokemon List
            </span>
          </div>
        </section>

        <section className="container max-w-screen-xl px-4 mx-auto mt-10">
          <div className="bg-white bg-opacity-20 rounded-sm shadow-lg text-white">
            <ResponsiveMasonry
              columnsCountBreakPoints={{ 310: sm, 758: md, 1014: lg, 1214: xl }}
              className="p-4"
            >
              <Masonry gutter="1rem" className="">
                {list.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className="block overflow-hidden rounded-sm shadow-lg transition transform duration-500 ease-in-out hover:-translate-y-1"
                    >
                      <Transition
                        show={true}
                        appear={true}
                        enter="duration-2000"
                        enterFrom="opacity-0 scale-110 "
                        enterTo="opacity-100 scale-100"
                        leave="duration-2000"
                        leaveFrom="scale-100 opacity-100"
                        leaveTo="scale-10 opacity-0"
                      >
                        <div className="relative transition align-middle transform ease-in-out">
                          <img
                            className="w-full object-cover bg-cover"
                            src={item.sprites.front_default}
                            alt="img"
                          />
                          <div className="absolute top-0 w-full h-full p-2 bg-gradient-to-b from-gray-800 via-transparent to-gray-800 text-white opacity-0 bg-opacity-0 text-opacity-0 transition transform duration-500 ease-in-out hover:bg-opacity-70 hover:text-opacity-100 hover:opacity-100">
                            <div className="flex flex-wrap w-full h-full justify-between items-start">
                              <span className="text-base sm:text-lg">
                                {item.name}
                              </span>
                              <Link
                                className="border-none cursor-pointer no-underline outline-none whitespace-nowrap"
                                to={`/detail/${item.id}`}
                              >
                                <div className="flex flex-wrap space-x-1 py-2 px-4 items-center justify-center bg-transparent transition transform duration-300 ease-in-out hover:bg-yellow-800">
                                  <span className="text-xs sm:text-sm">
                                    Detail
                                  </span>
                                  <Io5Icons.IoArrowForward className="h-4 w-auto" />
                                </div>
                              </Link>
                            </div>

                            <div className="absolute flex bottom-2 py-1 px- rounded-sm">
                              <div className="flex w-full flex-col items-baseline text-shadow-xl text-xl mt-2 space-y-1">
                                <p className="text-xs font-semibold text-shadow-md leading-relaxed capitalize">
                                  Types:{" "}
                                </p>
                                <div className="flex-wrap space-x-1 px-2">
                                  {item.types.map((item, index) => {
                                    return (
                                      <span
                                        className="text-xs sm:text-sm font-semibold px-3 py-1 text-shadow-lg text-gray-700 bg-yellow-500 rounded-md shadow-md lowercase"
                                        key={index}
                                      >
                                        {item.type.name}
                                      </span>
                                    );
                                  })}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Transition>
                    </div>
                  );
                })}
              </Masonry>
            </ResponsiveMasonry>
          </div>
        </section>
      </main>
    </>
  );
}

export default MyList;
