import React, { useEffect, useState } from "react";
import * as AiIcons from "react-icons/ai";
import { Link, useParams } from "react-router-dom";
import * as Io5Icons from "react-icons/io5";
import * as FaIcons from "react-icons/fa";
import Transition from "../utils/Transition";
import {
  getLocalStorage,
  getReduxState,
  local,
  setLocalStorage,
  state,
} from "../utils/helper";
import axiosIntance from "../utils/axiosIntance";
import { useDispatch } from "react-redux";
import { getPokemonListAction } from "../redux/actions";
import { HOME_ROUTE } from "../utils/config";

function Detail() {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState({});
  const [pokemonList, setPokemonList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isMyPokemonList, setIsMyPokemonList] = useState(false);
  const dispatch = useDispatch();

  const handleOnClickDetail = (id) => {
    window.scrollTo(0, 0);
    setIsMyPokemonList(false)
    hitPokemonDetail(id);
  };

  const handleOnClickMoreProject = () => {
    setIsMyPokemonList(false)
    window.scrollTo(0, 0);
  };

  const handleOnClickSavePokemon = (data) => {
    var list = fetchMyPokemonList(data);

    setLocalStorage(local.POKEMON, list);

    setIsMyPokemonList(!isMyPokemonList);
  };

  const fetchMyPokemonList = (data) => {
    var myPokemonList = getLocalStorage(local.POKEMON);
    var list = [];

    if (myPokemonList === null) {
      list.push(data);
      // setLocalStorage(local.POKEMON, list);
    } else {
      list = JSON.parse(myPokemonList);
      // console.log(list);
      const result = list.find((item) => item.id === data.id);
      // console.log(result);
      if (result !== undefined) {
        list = list.filter(function (item) {
          return item.id !== data.id;
        });
      } else {
        list.push(data);
      }

      // console.log(list);
    }
    return list;
  }

  useEffect(() => {
    if (Object.keys(pokemon).length === 0) {
      hitPokemonDetail(id);
      hitPokomenList();
      window.scrollTo(0, 0);
    }
  });

  const hitPokemonDetail = async (id) => {
    await axiosIntance
      .get(`pokemon/${id}`)
      .then((res) => {
        // console.log(res.data);

        const data = res.data;

        setPokemon(data);
        setIsLoading(false);

        var myPokemonList = getLocalStorage(local.POKEMON);
        var list = [];

        if (myPokemonList !== null) {
          list = JSON.parse(myPokemonList);
          const result = list.find((item) => item.id === data.id);
          if (result !== undefined) {
            setIsMyPokemonList(true)
          }
        }

      })
      .catch((err) => {
        // console.log(err);
      });
  };

  const hitPokomenList = async () => {
    let { isLoading, isStatus, results } = getReduxState(state.POKEMON);

    if (results.length === 0) {
      const param = {
        offset: 0,
        limit: 100,
      };

      await dispatch(getPokemonListAction(param));
    }

    isLoading = getReduxState(state.POKEMON).isLoading;
    isStatus = getReduxState(state.POKEMON).isStatus;
    results = getReduxState(state.POKEMON).results;

    if (results.length !== 0 && isStatus && !isLoading) {
      if (pokemonList.length === 0) {
        setPokemonList(results);
      }
    }

    // console.log(results.length);
  };

  return (
    <>
      <main className="w-full py-20 min-h-screen">
        <section className="container lg:w-4/5 xl:w-3/5 mx-auto px-4 sm:mt-10">
          <div className="flex flex-wrap space-y-4 sm:space-y-0 bg-white bg-opacity-20 rounded-sm shadow-lg py-4">
            <div className="w-full sm:w-6/12 mx-auto px-4">
              <Transition
                appear={true}
                show={true}
                enter="duration-1000"
                enterFrom="opacity-0 translate-x-full"
                enterTo="opacity-100 translate-x-0"
                leave="duration-1000"
                leaveFrom="opacity-100 translate-x-0"
                leaveTo="opacity-0 translate-x-full"
              >
                <div className="relative flex flex-col min-w-0 break-words w-full shadow-lg bg-gray-800 transition transform ease-in-out duration-1000">
                  <img
                    className="align-middle object-contain object-center"
                    src={!isLoading ? pokemon.sprites.front_default : ""}
                    alt={!isLoading ? pokemon.sprites.front_default : ""}
                  />
                  <div className="absolute flex w-full h-full justify-center items-center opacity-0 bg-gray-900 bg-opacity-0 hover:opacity-100 hover:bg-opacity-50 transition-all duration-300 ease-out">
                    <button
                      className="bg-transparent focus:outline-none outline-none"
                      onClick={() => handleOnClickSavePokemon(pokemon)}
                    >
                      <AiIcons.AiFillLike
                        className={`text-shadow-xl sm:text-4xl text-3xl transform ransition-all duration-300 ease-out ${
                          isMyPokemonList ? "text-red-700 scale-110 hover:scale-100" : "text-white scale-100 hover:scale-110"
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </Transition>
            </div>

            <div className="w-full mb-6 sm:w-6/12 mx-auto px-4 text-white">
              <Transition
                show={true}
                appear={true}
                enter="duration-1000"
                enterFrom="-translate-x-64 opacity-10"
                enterTo="translate-x-0 opacity-100"
                leave="duration-1000"
                leaveFrom="translate-x-0 opacity-100"
                leaveTo="-translate-x-64 opacity-10"
              >
                <div className="transition transform ease-in-out">
                  <div className="w-full flex justify-between items-start">
                    <p className="text-lg sm:text-xl font-semibold uppercase leading-relaxed">
                      {pokemon.name}
                    </p>
                    <div className="flex space-x-1 items-center justify-center text-yellow-600">
                      <span className="font-mono text-sm sm:text-base shadow-sm text-white">
                        {pokemon.base_experience}
                      </span>
                      <AiIcons.AiFillStar className="text-xl" />
                    </div>
                  </div>
                  <div className="flex w-full flex-col items-baseline text-shadow-xl text-xl mt-2">
                    <p className="text-xs font-semibold text-shadow-md leading-relaxed capitalize">
                      Types:{" "}
                    </p>
                    <div className="flex-wrap space-x-1 px-2">
                      {!isLoading
                        ? pokemon.types.map((item, index) => {
                            return (
                              <span
                                className="text-xs font-semibold text-shadow-md leading-relaxed text-gray-200 bg-gray-800 py-1 px-4 rounded-md shadow-md"
                                key={index}
                              >
                                {item.type.name}
                              </span>
                            );
                          })
                        : null}
                    </div>
                  </div>
                </div>
              </Transition>

              <div className="list-none flex flex-col my-2">
                <Transition
                  show={true}
                  appear={true}
                  enter="duration-1000"
                  enterFrom="-translate-x-32 opacity-10"
                  enterTo="translate-x-0 opacity-100"
                  leave="duration-1000"
                  leaveFrom="translate-x-0 opacity-100"
                  leaveTo="-translate-x-32 opacity-10"
                >
                  <div className="flex w-full flex-col items-baseline text-shadow-xl text-xl mt-2">
                    <p className="text-xs font-semibold text-shadow-md leading-relaxed capitalize">
                      features:{" "}
                    </p>
                    <div className="flex-col w-full space-y-1 py-2 px-4">
                      {!isLoading
                        ? pokemon.stats.map((item, index) => {
                            return (
                              <div
                                className="flex w-full space-x-2 justify-between bg-gray-800 py-1 px-4 rounded-md shadow-md"
                                key={index}
                              >
                                <span className="text-xs font-thin text-shadow-md leading-relaxed text-gray-200">
                                  {item.stat.name.replace("-", " ")}
                                </span>
                                <span className="text-sm font-semibold text-shadow-md leading-relaxed text-yellow-800 ">
                                  {item.base_stat}
                                </span>
                              </div>
                            );
                          })
                        : null}
                    </div>
                  </div>
                </Transition>
              </div>

              <Transition
                show={true}
                appear={true}
                enter="duration-700"
                enterFrom="-translate-x-64 opacity-10"
                enterTo="translate-x-0 opacity-100"
                leave="duration-700"
                leaveFrom="translate-x-0 opacity-100"
                leaveTo="-translate-x-64 opacity-10"
              >
                <div className="transition transform ease-in-out">
                  <p className="text-xs font-semibold text-shadow-md leading-relaxed capitalize">
                    Description:{" "}
                  </p>
                  <div className="flex w-full flex-col my-1 space-y-1">
                    <div className="flex space-x-1 items-center text-yellow-600">
                      <AiIcons.AiOutlineColumnHeight className="text-lg" />
                      <span className="text-xs sm:text-sm shadow-sm text-white">
                        {pokemon.height / 10} m
                      </span>
                    </div>

                    <div className="flex space-x-1 items-center text-yellow-600">
                      <FaIcons.FaWeightHanging className="text-lg" />
                      <span className="text-xs sm:text-sm shadow-sm text-white">
                        {pokemon.weight / 10} kg
                      </span>
                    </div>
                  </div>
                </div>
              </Transition>
            </div>
          </div>
        </section>

        <section className="container flex flex-col space-y-8 lg:w-4/5 xl:w-3/5 mx-auto m-8">
          <div className="flex flex-wrap justify-center items-center text-white">
            <span className="text-2xl sm:text-xl text-shadow-lg font-semibold p-2 border-b-2 uppercase border-yellow-800">
              other pokemon
            </span>
          </div>

          <div className="fle flex-col w-full m-auto p-auto bg-white bg-opacity-20 shadow-2xl rounded-sm">
            <div className="flex overflow-x-scroll py-4 hide-scroll-bar shadow-inner">
              <div className="flex flex-nowrap px-4 space-x-4">
                {pokemonList.map((item, index) => {
                  return (
                    <div key={index} className="inline-block">
                      <div className="w-64 h-64 max-w-xs overflow-hidden rounded-sm shadow-lg bg-transparent hover:shadow-2xl transition-all transform duration-500 ease-in-out hover:-translate-y-1">
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
                          <div className="relative h-full transition align-middle transform ease-in-out">
                            <img
                              className="w-full h-full object-cover"
                              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                                index + 1
                              }.png`}
                              alt={item.name}
                            />
                            <div className="absolute top-0 w-full h-full p-2 bg-gradient-to-b from-gray-800 via-transparent to-gray-800 text-white opacity-0 bg-opacity-0 text-opacity-0 transition transform duration-500 ease-in-out hover:bg-opacity-70 hover:text-opacity-100 hover:opacity-100">
                              <div className="flex flex-wrap w-full h-full justify-between items-start">
                                <span className="text-sm sm:text-base">
                                  {item.title}
                                </span>
                                <Link
                                  className="border-none cursor-pointer no-underline outline-none whitespace-nowrap absolute bottom-2 right-2 text-xs sm:text-sm font-thin"
                                  to={`/detail/${index + 1}`}
                                  onClick={() => handleOnClickDetail(index + 1)}
                                >
                                  <div className="flex flex-wrap space-x-1 py-2 px-4 items-center justify-center bg-transparent transition transform duration-300 ease-in-out hover:bg-yellow-800">
                                    <span className="text-xs sm:text-sm">
                                      Detail
                                    </span>
                                    <Io5Icons.IoArrowForward className="h-4 w-auto" />
                                  </div>
                                </Link>
                              </div>
                            </div>
                          </div>
                        </Transition>
                      </div>
                    </div>
                  );
                })}

                <div className="inline-block ml-4">
                  <div className="h-64 max-w-xs overflow-hiddenbg-transparent flex justify-center">
                    <Link
                      className="flex h-full items-center border-none cursor-pointer no-underline outline-none whitespace-nowrap focus:outline-none"
                      to={HOME_ROUTE}
                      onClick={handleOnClickMoreProject}
                    >
                      <div className="flex space-x-1 py-2 px-4 items-center text-white justify-center bg-transparent transition-all duration-300 ease-in-out hover:text-yellow-500">
                        <span className="text-base sm:text-lg font-semibold text-shadow-lg">
                          more pokemon{" "}
                        </span>
                        <Io5Icons.IoArrowForward className="h-4 w-auto" />
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default Detail;
