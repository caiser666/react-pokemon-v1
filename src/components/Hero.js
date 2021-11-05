import React, { useEffect, useRef, useState } from "react";
import * as Io5Icons from "react-icons/io5";
import { Link } from "react-router-dom";
import Transition from "../utils/Transition";

const Hero = ({ slides }) => {
  const [current, setCurrent] = useState(0);
  const length = slides.length;
  const timeout = useRef(null);
  const interval = 7000;

  useEffect(() => {
    const handleNextSlide = () => {
      setCurrent((current) => (current === length - 1 ? 0 : current + 1));
    };

    timeout.current = setTimeout(handleNextSlide, interval);

    return function () {
      if (timeout.current) {
        clearTimeout(timeout.current);
      }
    };
  }, [current, length]);


  const handleOnClickNextSlide = () => {
    if (timeout.current) {
      clearTimeout(timeout.current);
    }
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const handleOnClickPrevSlide = () => {
    if (timeout.current) {
      clearTimeout(timeout.current);
    }
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  const btnSlider = [
    {
      icon: <Io5Icons.IoArrowBackSharp />,
      onClick: handleOnClickPrevSlide,
    },
    {
      icon: <Io5Icons.IoArrowForward />,
      onClick: handleOnClickNextSlide,
    },
  ];

  if (!Array.isArray(slides) || slides.length <= 0) {
    return null;
  }

  return (
    <>
      <section className="h-screen relative overflow-hidden">
        <div className="w-full h-full relative flex justify-center items-center overflow-hidden">
          {slides.map((slide, index) => {
            return (
              <div key={index} className="w-full h-full z-auto">
                {index === current && (
                  <div className="absolute top-0 left-0 w-full h-full flex items-center">
                    <Transition
                      appear={true}
                      show={true}
                      enter="duration-1000"
                      enterFrom="opacity-10"
                      enterTo="opacity-100"
                      leave="duration-1000"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-10"
                    >
                      <img
                        id="imgSlide"
                        className="absolute top-0 left-0 w-screen h-screen object-contain object-center transform transition-opacity ease-in-out"
                        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`}
                        alt={slide.name}
                      />
                    </Transition>

                    <span className="absolute w-full h-full bg-gradient-to-t from-gray-800 via-transparent to-gray-500"></span>
                    <div className="relative z-10 flex flex-col bg-gray-500 bg-opacity-50 max-w-screen-sm p-3 mx-4 sm:mx-8 md:mx-16 lg:mx-24 xl:mx-32 2xl:mx-40 rounded-sm shadow-2xl text-white text-shadow-lg">
                      <Transition
                        show={true}
                        appear={true}
                        enter="duration-1000"
                        enterFrom="-translate-y-6"
                        enterTo="translate-y-0"
                        leave="duration-1000"
                        leaveFrom="translate-y-0"
                        leaveTo="-translate-y-6"
                      >
                        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-medium md:font-semibold xl:font-bold transition transform ease-in-out capitalize">
                          {slide.name}
                        </h1>
                      </Transition>

                      <Transition
                        show={true}
                        appear={true}
                        enter="duration-1000"
                        enterFrom="translate-y-10 opacity-50 scale-125"
                        enterTo="translate-y-0 opacity-100 scale-100"
                        leave="duration-1000"
                        leaveFrom="translate-y-0 opacity-100 scale-100"
                        leaveTo="translate-y-10 opacity-50 scale-125"
                      >
                        <Link
                          className="flex text-base py-2 sm:py-4 text-white bg-gray-800 justify-center items-center m-2 whitespace-nowrap outline-none border-none cursor-pointer no-underline transition duration-300 ease-in-out transform hover:-translate-y-2 hover:bg-yellow-800"
                          style={{
                            maxWidth: "120px",
                            minWidth: "100px",
                          }}
                          to={`detail/${index + 1}`}
                        >
                          <div className="flex justify-center items-center space-x-1 text-lg font-semibold text-shadow-lg">
                            <span className="text-base font-medium">
                              Detail
                            </span>
                            <Io5Icons.IoArrowForward />
                          </div>
                        </Link>
                      </Transition>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
          <div className="absolute bottom-20 right-4 flex z-10">
            {btnSlider.map((btn, index) => {
              return (
                <button
                  key={index}
                  onClick={btn.onClick}
                  className="bg-gray-800 text-indigo-200 text-3xl mr-4 p-2 rounded-full shadow-lg justify-center items-center cursor-pointer transition duration-200 select-none transform hover:scale-105 hover:bg-yellow-800 focus:outline-none"
                >
                  {btn.icon}
                </button>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
