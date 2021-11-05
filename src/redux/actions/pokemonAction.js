import axiosIntance from "../../utils/axiosIntance";
import { pokemonConstants } from "../constants";

export const getPokemonListAction = (param) => {
  return async (dispatch) => {
    dispatch({
      type: pokemonConstants.GET_POKEMON_LIST_REQUEST,
    });

    await axiosIntance
      .get(`pokemon`, {
        params: {
          limit: param.limit || 100,
          offset: param.offset || 0,
        },
      })
      .then((res) => {
        // console.log(res.data);

        const { results } = res.data;

        dispatch({
          type: pokemonConstants.GET_POKEMON_LIST_SUCCESS,
          payload: {
            results,
          },
        });
      })
      .catch((err) => {
        // console.log(err);
        dispatch({
          type: pokemonConstants.GET_POKEMON_LIST_FAILURE,
        });
      });
  };
};
