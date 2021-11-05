import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getPokemonListAction } from "../redux/actions";
import Hero from "../components/Hero";
import { getReduxState, state } from "../utils/helper";

const Home = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    hitPokomenList()
  });

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
      <main className="bg-gray-200"><Hero slides={pokemonList} /></main>
    </>
  );
};

export default Home;
