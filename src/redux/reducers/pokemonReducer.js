import { pokemonConstants } from "../constants";

const initialState = {
  isLoading: true,
  isStatus: false,
  results: [],
};

const pokemonReducer = (state = initialState, action) => {
  // console.log(`authReducer ${action.type}`);
  switch (action.type) {
    case pokemonConstants.GET_POKEMON_LIST_REQUEST:
      state = {
        ...state,
      };
      break;

    case pokemonConstants.GET_POKEMON_LIST_SUCCESS:
      state = {
        ...state,
        isLoading: false,
        isStatus: true,
        results: action.payload.results,
      };
      break;

    case pokemonConstants.GET_POKEMON_LIST_FAILURE:
      state = {
        ...state,
        isLoading: false,
      };
      break;

    default:
      break;
  }

  return state;
};

export default pokemonReducer;
